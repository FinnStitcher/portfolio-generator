const profileDataArgs = process.argv.slice(2, process.argv.length);
// take everything from index 2 to the end and put it in profileDatArgs
// if i run node app.js "Finn", process.argv is filled with file paths and the string "Finn"
// then just "Finn" will be console logged, as it was extracted from the other thing

const printProfileData = (profileDataArr) => {
    profileDataArr.forEach(profileItem => console.log(profileItem));
};

printProfileData(profileDataArgs);