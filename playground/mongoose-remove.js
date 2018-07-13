 
const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });  //5b46bba5a5acb8b0f8ad2de3

Todo.findByIdAndRemove('5b46bba5a5acb8b0f8ad2de3').then((doc)=>{
    console.log(doc);
});