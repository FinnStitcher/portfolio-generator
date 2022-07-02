const fs = require("fs");
const inquirer = require("inquirer");

const generatePage = require("./src/page-template.js");

const dummyData = {
	name: "Lernantino",
	github: "lernantino",
	confirmAbout: true,
	about: "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.",
	projects: [
		{
			name: "Run Buddy",
			description:
				"Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.",
			languages: ["HTML", "CSS"],
			link: "https://github.com/lernantino/run-buddy",
			feature: true,
			confirmAddProject: true,
		},
		{
			name: "Taskinator",
			description:
				"Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.",
			languages: ["JavaScript", "HTML", "CSS"],
			link: "https://github.com/lernantino/taskinator",
			feature: true,
			confirmAddProject: true,
		},
		{
			name: "Taskmaster Pro",
			description:
				"Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.",
			languages: ["JavaScript", "jQuery", "CSS", "HTML", "Bootstrap"],
			link: "https://github.com/lernantino/taskmaster-pro",
			feature: false,
			confirmAddProject: true,
		},
		{
			name: "Robot Gladiators",
			description:
				"Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.",
			languages: ["JavaScript"],
			link: "https://github.com/lernantino/robot-gladiators",
			feature: false,
			confirmAddProject: false,
		},
	],
};

// generic validation text
const inputError = (input) => {
	if (input) {
		return true;
	} else {
		console.log("This information is required.");
		return false;
	}
};

// async
const promptUser = () => {
	return inquirer.prompt([
		{
			type: "input",
			name: "name",
			message: "What is your name?",
			validate: (input) => inputError(input),
		},
		{
			type: "input",
			name: "github",
			message: "What is your GitHub username?",
			validate: (input) => inputError(input),
		},
		{
			type: "confirm",
			name: "confirmAbout",
			message:
				'Would you like to enter some information for an "About" section?',
			default: true,
		},
		{
			type: "input",
			name: "about",
			message: "Provide some information about yourself:",
			when: ({confirmAbout}) => {
				if (confirmAbout) {
					return true;
				} else {
					return false;
				}
			},
		},
	]);
};

// async
const promptProject = (portfolioData) => {
	// check if portfolioData contains a property called projects
	if (!portfolioData.projects) {
		// there isn't, so let's make one, assigning it an empty array
		portfolioData.projects = [];
	}

	console.log(`
    ==========
    Add A New Project
    ==========
    `);

	// return the end result of this method chain
	return inquirer
		.prompt([
			{
				type: "input",
				name: "name",
				message: "What is the name of your project?",
				validate: (input) => inputError(input),
			},
			{
				type: "input",
				name: "description",
				message: "Provide a description of the project:",
				validate: (input) => inputError(input),
			},
			{
				type: "checkbox",
				name: "languages",
				message:
					"What did you build this project with? (Check all that apply.)",
				choices: [
					"JavaScript",
					"HTML",
					"CSS",
					"ES6",
					"jQuery",
					"Bootstrap",
					"Node",
				],
			},
			{
				type: "input",
				name: "link",
				message: "Enter the GitHub link to your project:",
				validate: (input) => inputError(input),
			},
			{
				type: "confirm",
				name: "feature",
				message: "Would you like to feature this project?",
				default: false,
			},
			{
				type: "confirm",
				name: "confirmAddMore",
				message: "Would you like to enter another project?",
				default: false,
			},
		])
		.then((projectData) => {
			// receive the array returned by .prompt, and put it in portfolioData.projects
			portfolioData.projects.push(projectData);

			// check if they said yes or no to adding more
			if (projectData.confirmAddMore) {
				return promptProject(portfolioData);
				// run promptProject() all over again, giving it the new value of portfolioData
			} else {
				return portfolioData;
				// portfolioData and its contents will be shuttled up to the top
			}
		});
};

// run promptUser
promptUser(dummyData)
    // then run promptProject with the returned data...
	.then(promptProject)
    /// then run generatePage with the returned data...
	.then((portfolioData) => {
		return generatePage(portfolioData);
	})
    // then run writeFile...
	.then((pageHTML) => {
		return writeFile(pageHTML);
	})
    // then log the response and run copyFile...
	.then((writeFileResponse) => {
		console.log(writeFileResponse);
		return copyFile();
	})
    // then log that response...
	.then((copyFileResponse) => {
		console.log(copyFileResponse);
	})
    // and here, catch any errors
	.catch((err) => {
		console.log(err);
	});

// promptUser()
//     .then(promptProject)
//     .then(portfolioData => {
//         const pageHTML = generatePage(portfolioData);

//         fs.writeFile('./index.html', pageHTML, err => {
//             if (err) throw new Error(err);

//             console.log("Page created. Check out index.html to see the output.")
//         })
//         // three arguments:
//         // name of file being written
//         // data to be written to the file - here, that's the data returned from generatePage()
//         // callback function that will run when the file has been written - handling errors and successes
//     });

// const dummyFunction = () => {
// 	const pageHTML = generatePage(dummyData);

// 	fs.writeFile("./dist/index.html", pageHTML, (err) => {
// 		if (err) {
//             console.log(err);
//             return;
//         }
//         // here, return just shuts things down

// 		console.log("Page created.");

//         fs.copyFile('./src/style.css', './dist/style.css', err => {
//             if (err) {
//                 console.log(err);
//                 return;
//             }

//             console.log("Stylesheet copied.");
//         })
// 	});
// 	// three arguments:
// 	// name of file being written
// 	// data to be written to the file - here, that's the data returned from generatePage()
// 	// callback function that will run when the file has been written - handling errors and successes
// };

// dummyFunction();
