const bcrypt = require('bcryptjs');

//to run, type node demo.js in console
//must run with each change
//results will show in terminal
//all methods are from the documentation

async function makePassword(text){
    const user = {
        name: 'A. Person',
        email: 'mail@mail.com',
        password: text
    };
    const salt = await bcrypt.genSalt(10);
    //salt is the algorith factor used to encrypt
    //The number is a length used by algorithm to salt (default 10)
    //will console.log the salt, comment out before moving on

    //console.log(salt);

    //hashing is the way the information is stored.
    //it takes in the salt, runs the algorith and stores at that index
    user.password = await bcrypt.hash(text, salt);
    //will console.log the user and password. Comment out before moving on
    //save the user from the console

    //console.log(user);
}

//after getting user and password comment out
//makePassword('myVerySecretPassword');

// remove slash and asterix the enter saved password in function
// call as a string.


async function comparePasswords(text, hash){
    const matched = await bcrypt.compare(text, hash);

    // the hash can then retrieve the information
    // it returns true or false 

    if (matched) {
        console.log("It's a match");
    } else {
        console.log("They don't match");
    }
}

comparePasswords('myVerySecretPassword', 
'$2a$10$6SrPTcYznflqk7zO3rZkJ.CC4D7PtsTanTaznQMwHSw/sxcU5YQOi');


//can change password string and/or hashed string to change results.
//can change back so match.
//must run node demo.js each time.