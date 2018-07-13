 
const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5b3e6694209bb3414778bb6d11';

if (!ObjectID.isValid(id)){
   return console.log('object id not valid');
}

// Todo.find({_id: id}).then((todos)=>{
//     console.log(todos);
// });

// Todo.findOne({_id: id}).then((todo)=>{
//     console.log(todo);
// });

Todo.findById(id).then((todo)=>{
    if (!todo){
       return console.log('Id not found')
    }
    console.log(todo);
}).catch((e)=> console.log(e));
