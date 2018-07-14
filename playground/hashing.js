const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password  = 'abac123!'

// bcrypt.genSalt(10, (err, salt)=>{
//     bcrypt.hash(password,salt,(err, hash)=>{
//         console.log(hash);
//     });
// });

var hashPassword = '$2a$10$eYkyf3n6lVUHXWiIrOAhs.TYDiesPiHGhbwgHU4CzglkSYjyAyJ/G'

bcrypt.compare(password, hashPassword, (err, res)=>{
    console.log(res);
});
// var msg = "hey i am newwork";
// var hash = SHA256(msg).toString();

// console.log(msg, "********", hash);
// var data = {
//     id:4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+"some secret").toString()
// }

// console.log(token.hash);

// var data = {
//     id:4
// }
// var token  = jwt.sign(data, "some secret");
// console.log(token);

// var decoded = jwt.verify(token, 'some secret');
// console.log(decoded);