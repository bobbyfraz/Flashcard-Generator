var fs = require("fs");

exports.clozeCardCon = function(full, close) {
	this.file = "cloze.txt";
	this.cloze = cloze;
	this.full = full;

	this.partial = function() {
		var updateText = this.full.toLowerCase().replace(this.close.toLowerCase(), "...");
		return updateText;
	};

	this.newEntry = function() {
		fs.appendFile(this.file, JSON.stringify({
			full: full,
			cloze: cloze,
			partial: this.partial()
		}) + "\n", function(error) {
			if(error){ console.log("error appending")}
		});
	};
};