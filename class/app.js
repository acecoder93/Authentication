
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


var password = 'some password';

// Combining
var key = pbkdf2.pbkdf2Sync(password, salt, 36000, 256, 'sha256');

console.log(key);

// Converting key from buffer to a hex
var hash = key.toString('hex');
console.log(hash);


// Storing password to allow for decryption
var stored_pass = 'pbkdf2_sha256&36000${salt}${hash}'