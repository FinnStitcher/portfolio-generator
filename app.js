const fs = require("fs");
const generatePage = require("./src/page-template.js");

const profileDataArgs = process.argv.slice(2, process.argv.length);
// take everything from index 2 to the end and put it in profileDatArgs
// if i run node app.js "Finn", process.argv is filled with file paths and the string "Finn"
const [name, github] = profileDataArgs;
// create 2 variables called user and github
// fill them with the first two values of profileDataArgs

fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw new Error(err);
    // throw means, if there's an error, stop the whole process and display error message
    // we're specifically making sure it returns an Error object

    console.log('Portfolio complete! Check out index.html to see the output!');
});
// three arguments:
// name of file being written
// data to be written to the file - here, that's the data returned from generatePage()
// callback function that will run when the file has been written - handling errors and successes

// btw, errors are objects too!! the two main properties of an Error object are the name and message :)