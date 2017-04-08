var basicCard = require("./BasicCard.js");
var clozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");

var myUser = new basicCard.basicCardCon();

inquirer.prompt([{
	type: "list",
	name: "name",
	message: "What is your login?",
	choices: ["Admin Basic", "Admin Cloze", "Study Buddy"]
	},
]).then(function(response) {
	if (response.name === "Admin Basic") {
		console.log("Edit new flashcard..");
		inquirer.prompt([{
			name: "question",
			message: "What is your question",
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
				message: "What is your answer",
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
	else if (response.name === "Admin Cloze") {
		console.log("Edit new flashcard..");
		inquirer.prompt([{
			name: "question",
			message: "What is your statement",
			validate: function validateFirstname(answer) {
						if (answer === '') {
							console.log('\n' + "Enter a value");
							return;
						}
						else return true;
					}
			}]).then(function(question) {
				inquirer.prompt([{
				name: "answer",
				message: "What is your answer",
				validate: function validateFirstname(answer) {
						if (answer === '') {
							console.log('\n' + "Enter a value");
							return;
						}
						if (!question.question.toLowerCase().includes(answer.toLowerCase())) {
							console.log('\n' + "The answer must be a full statement");
							return;
						}
						else return true;
					}
				}]).then(function(response2) {
					var inputedQuestion = new clozeCard.clozeCardCon(question.question, response2.answer);
					inputedQuestion.newEntry()
					console.log(inputedQuestion.cloze);
					console.log(inputedQuestion.full);
					console.log(inputedQuestion.partial());
				});
			});
		}
	else {
		myUser.getFile(function askQuestion(data) {
			var someItem = [];
			someItem = randItem(data);
			inquirer.prompt([{
				type: "input",
				name: "answer",
				message: someItem.front,
				validate: function validateFirstname(answer) {
					if (answer === '') {
						console.log('\n' + "Enter a value");
						return;
					}
					else return true;
				}}]).then(function(response) {
				if (response.answer.toLowerCase() === someItem.back.toLowerCase()) {
					console.log(response.answer);
					console.log("That is correct!");
					if (data.length > 0) {
						askQuestion(data);
					}
					else return console.log("That's all our cards! Thank you for studying with me!");
				}
				else {
					console.log("Incorrect, the correct answer is: " + someItem.back);
					if (data.length > 0) {
						askQuestion(data);
						}
					else return console.log("That's all our cards! Thank you for studying with me!");  
					}
			});
		});
		askQuestion(data);
	}
});

function randItem(arr) {  
	var itemIndex = Math.floor(Math.random() * arr.length);
	var itemValue = arr[itemIndex]
	arr.splice(itemIndex,1);
	return itemValue;
};
