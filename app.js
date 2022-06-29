const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};
// returns a promise
// it doesn't seem like i have to process it into json... that's very strange

const promptProject = (portfolioData) => {
    // check if portfolioData contains a property called projects
    if (!portfolioData.projects) {
        // there isn't, so let's make one, assigning it an empty array
        portfolioData.projects = [];
    };

    console.log(`
    ==========
    Add A New Project
    ==========
    `);

    // return the end result of this method chain
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project:'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply.)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project:'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddMore',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then((projectData) => {
        // receive the array returned by .prompt, and put it in portfolioData.projects
        portfolioData.projects.push(projectData);

        // check if they said yes or no to ading more
        if (projectData.confirmAddMore) {
            return promptProject(portfolioData);
            // run promptProject() all over again, giving it the new value of portfolioData
        } else {
            return portfolioData;
            // portfolioData and its contents will be shuttled up to the top
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => console.log(portfolioData));

// const fs = require("fs");
// const generatePage = require("./src/page-template.js");

// const pageHTML = generatePage(name, github);

// fs.writeFile("./index.html", pageHTML, err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });


/* OLD CODE */
// const profileDataArgs = process.argv.slice(2, process.argv.length);
// // take everything from index 2 to the end and put it in profileDatArgs
// // if i run node app.js "Finn", process.argv is filled with file paths and the string "Finn"
// const [name, github] = profileDataArgs;
// // create 2 variables called user and github
// // fill them with the first two values of profileDataArgs

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw new Error(err);
//     // throw means, if there's an error, stop the whole process and display error message
//     // we're specifically making sure it returns an Error object

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
// // three arguments:
// // name of file being written
// // data to be written to the file - here, that's the data returned from generatePage()
// // callback function that will run when the file has been written - handling errors and successes

// // btw, errors are objects too!! the two main properties of an Error object are the name and message :)