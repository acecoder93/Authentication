
// Create and store password
// 1. Take the user password
// 2. Generate a salt (string of random characters)
// 3. Combine the saltt and the user eneterd password
// 4. Hash the combined string

var pbkdf2 = require ('pbkdf2');
var crypto = require('crypto');


// A salt with a length of 20 characters
var salt = crypto.randomBytes(20).toString('hex');
console.log(salt);

// This is the password the user created when the account was developed
var password = 'some-password';

// Combining
var key = pbkdf2.pbkdf2Sync(password, salt, 36000, 256, 'sha256');

console.log(key);

// Converting key from buffer to a hex
var hash = key.toString('hex');
console.log(hash);


// Storing password to allow for decryption (This is stored in the database)
var stored_pass = `pbkdf2_sha256$36000$${salt}$${hash}`;

// Checking password
// Retreiving password from database
// A split will create an array of items
var pass_parts = stored_pass.split('$');

// This is the password the user is using to login to their existing account
var enteredPassword = 'some-password';

var key = pbkdf2.pbkdf2Sync(enteredPassword, pass_parts[2], parseInt(pass_parts[1]), 256, 'sha256');

var hash = key.toString('hex');
console.log(hash);

// Comparing passwords
if (hash === pass_parts[3]){
    console.log ('Passwords Matched!');
} else {
    console.log('You suck, try again');
};