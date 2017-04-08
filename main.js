var basicCard = require("./BasicCard.js");
var clozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");

var myUser = new basicCard.basicCardCon();

function Main () {
	inquirer.prompt([{
		type: "list",
		name: "name",
		message: "What is your login?",
		choices: ["Admin Basic", "Admin Close", "User"]
		},
	]).then(function(response) {
		if (response.name === "Admin Basic") {
			console.log("Edit new flashcard..");
			inquirer.prompt([{
				name: "question",
				message: "Type in your question",
				validate: function validateFirstname(answer) {
							if (answer === '') {
								console.log('\n' + "Enter a value");
								return;
							}
							else return true;
						}
				}
				]).then(function(question) {
					inquirer.prompt([{
					name: "answer",
					message: "Type in your answer",
					validate: function validateFirstname(answer) {
							if (answer === '') {
								console.log('\n' + "Enter a value");
								return;
							}
							else return true;
						}        
					}
					]).then(function(response2) {
						var inputedQuestion = new basicCard.basicCardCon(question.question, response2.answer);
						inputedQuestion.newEntry();
						console.log(inputedQuestion.front);
						console.log(inputedQuestion.back);
					});
				});
			}
		else if (response.name === "Admin Close") {
			console.log("Edit new flashcard..");
			inquirer.prompt([{
				name: "question",
				message: "Type in your question",
				validate: function validateFirstname(answer) {
							if (answer === '') {
								console.log('\n' + "Enter a value");
								return;
							}
							else return true;
						}        
				}
				]).then(function(question) {
					inquirer.prompt([{
					name: "answer",
					message: "Type in your answer",
					validate: function validateFirstname(answer) {
							if (answer === '') {
								console.log('\n' + "Enter a value");
								return;
							}
							if (!question.question.toLowerCase().includes(answer.toLowerCase())) {
								console.log('\n' + "The answer must be included in the full statement");
								return;
							}
							else return true;
						}
					}
					]).then(function(response2) {
						var inputedQuestion = new clozeCard.clozeCardCon(question.question, response2.answer);
						inputedQuestion.newEntry()
						console.log(inputedQuestion.close);
						console.log(inputedQuestion.full);
						console.log(inputedQuestion.partial());
					});
				});
			}
		else {
			myUser.getFile(function(data) {
					var someItem = [];
				function askQuestion(data) {
					someItem = randItem(data);
					inquirer.prompt([
					{
					type: "input",
					name: "answer",
					message: someItem.front,
					validate: function validateFirstname(answer) {
							if (answer === '') {
								console.log('\n' + "Enter a value");
								return;
							}
							else return true;	 
						}
					}
					]).then(function(response) {
						if (response.answer.toLowerCase() === someItem.back.toLowerCase()) {
							console.log(response.answer);
							console.log("That is correct!");
							if (data.length > 0) {
							askQuestion(data);
							}
							else return console.log("Thats all the cards! Study again sometime!");
						}
						else {
							console.log("Incorrect, the answer is: " + someItem.back);
							if (data.length > 0) {
								askQuestion(data);
								}
							else return console.log(" Thats all the cards! Study again sometime!");  
							}
					});
				};
				askQuestion(data);
			});
		}
		});
	};
	function randItem(arr) {  
		var itemIndex = Math.floor(Math.random() * arr.length);
		var itemValue = arr[itemIndex]
		arr.splice(itemIndex,1);
		return itemValue;
	};

Main();