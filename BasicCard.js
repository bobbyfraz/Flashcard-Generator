var fs = require("fs");

exports.basicCardCon = function(question, answer) {
	this.file = "basic.txt";
	this.front = question;
	this.back = answer;

	this.newEntry = function() {
		fs.appendFile(this.file, JSON.stringify({
			front: this.front,
			back: this.back

		}) + "\n", function(error) {
			if(error){ console.log("error appending")}
		});
	};
	this.getFile = function(callback) {
		fs.readFile(this.file, "utf8", function(error, data) {
				if(error){
					console.log("error reading file");
				}
				var records = data.split('\n');
				var userObj = [];
				for (var i = 0; i < records.length; i++) {
					if (records[i].length > 0) {
						userObj.push(JSON.parse(records[i]));
					}
				}
				callback(userObj);
		});
	}
};