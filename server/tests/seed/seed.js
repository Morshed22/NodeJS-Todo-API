const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneID = new ObjectID();
const usertwoID = new ObjectID();

    const users = [ {
            _id: userOneID,
            email:'jamal123@gmail.com',
            password: 'userOnePass',
            tokens:[{
                access:'auth',
                token:jwt.sign({_id:userOneID,access:'auth'}, process.env.JWT_SECRET).toString()
            }]
        },
            {
                _id: usertwoID,
                email:'Ohhyaaa@gmail.com',
                password: 'userTwoPass',
                tokens:[{
                    access:'auth',
                    token:jwt.sign({_id:usertwoID,access:'auth'}, process.env.JWT_SECRET).toString()
                }]
            }
  
  ];



const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator:userOneID
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    _creator:usertwoID,
    completed: true,
    completedAt: 333
  }]; 


  const populateUsers = (done)=>{
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save();
        var usertwo = new User(users[1]).save();

        return Promise.all([userOne, usertwo])
    }).then(()=> done());
  };

const populatesTodos = (done) => {
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(()=> done());
}


module.exports = {todos, populatesTodos, users, populateUsers};
