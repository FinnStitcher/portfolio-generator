const fs = require("fs");

const writeFile = (fileContent) => {
	// new Promise() takes a function as a parameter
	// the parameter function needs to have two parameters, called resolve and reject
	// resolve and reject are also function, but their mechanics are hard-coded under the hood - we just call them and give them data
	return new Promise((resolve, reject) => {
		// we can use this file path because this will be run from the root
		fs.writeFile("./dist/index.html", fileContent, (err) => {
			// if there's an error, call reject
			if (err) {
				reject(err);
				return;
			}

			resolve({
				ok: true,
				message: "HTML created.",
			});
		});
	});
};

const copyFile = () => {
	return new Promise((resolve, reject) => {
		fs.copyFile("./src/style.css", "./dist/style.css", (err) => {
			if (err) {
				reject(err);
				return;
			}

			resolve({
				ok: true,
				message: "Stylesheet copied.",
			});
		});
	});
};

module.exports = { writeFile, copyFile };