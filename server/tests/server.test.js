const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')
const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const {todos, populatesTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populatesTodos);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
      var text = 'Test todo text';
  
      request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e) => done(e));
        });
    });
  

    it('should not create todo with invalid data ', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });

});

describe('GET/todos', ()=>{
    it('should get all todos', (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2)
        }).end(()=> done())

    });
});


describe('Get /todos/:id', ()=>{
    it('should return todo doc', (done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
         .expect((res)=>{
           expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });   
    
    it('should return 404 if todo not found', (done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}}`)
        .expect(404)
         
        .end(done);
    }); 

    it('should return 404 for non object IDs', (done)=>{
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done)
  }); 

});

describe('DELETE/todos/:id',()=>{
    it('should remove a todo', (done)=>{
        var hexID = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(hexID);
            })
            .end((err, res)=>{
                if (err){
                    return done(err);
                }
             Todo.findById(hexID).then((todo)=>{
                expect(todo).toBeFalsy()
                done();
             }).catch((e) => done(e));  

            });
    }); 

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
    
        request(app)
          .delete(`/todos/${hexId}`)
          .expect(404)
          .end(done);
      });
    
//       it('should return 404 for non object IDs', (done)=>{
//         request(app)
//         .delete(`/todos/123`)
//         .expect(404)
//         .end(done)
//   });
    
});

describe("PATCH /todos/:id", ()=>{
   it("should update the todo",(done) =>{
                var hexid = todos[0]._id.toHexString();
                var text = 'this should be next text';

                request(app)
                    .patch(`/todos/${hexid}`)
                    .send({
                       completed : true,
                       text 
                    }).expect(200)
                    .expect((res)=>{
                        expect(res.body.todo.text).toBe(text);
                        expect(res.body.todo.completed).toBe(true);
                        expect(typeof res.body.todo.completedAt).toBe('number');
                    }).end(done);

   });

   it("should clear at completedAt when todo is not completed", (done)=>{
    var hexid = todos[1]._id.toHexString();
    var text = 'this should be next text!!';

    request(app)
        .patch(`/todos/${hexid}`)
        .send({
           completed : false,
           text 
        }).expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBeFalsy;
        }).end(done);
   });
});


/////////********************USER**************************/

describe('GET/user/me', ()=>{

   it('should return a user if authenticated', (done)=>{
         request(app)
           .get('/users/me')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done)

   });
   it('should return 401 if not authenticated', (done)=>{
    request(app)
      .get('/users/me')
       .expect(401)
       .expect((res)=>{
           expect(res.body).toEqual({});
       })
       .end(done)

});
});


describe('POST/users', ()=>{
  it('should create user', (done)=>{
        var email = 'aminoto@gmail.com';
        var password = 'aminoto';

        request(app)
          .post('/users')
          .send({email, password})
          .expect(200)
          .expect((res)=>{
              expect(res.body._id).toBeTruthy();
              expect(res.headers['x-auth']).toBeTruthy();
              expect(res.body.email).toBe(email);
          })
          .end((err)=>{
              if (err){
                  return done(err)
              }
        User.findOne({email}).then((user)=>{
            expect(user).toBeTruthy();
            expect(user.password).not.toBe(password);
            done();
        }).catch((e) => done(e)); 
     });
  });

it('should return validation error if request invalid', (done)=>{

    request(app)
    .post('/users')
    .send({email:'jlsdhsh',
     password : 'shdkhsdfkd'
    })
    .expect(400)
    .end(done);

});
it('should not create user if email already used', (done)=>{

    request(app)
    .post('/users')
    .send({email:users[0].email,
     password : 'iamodoingit'
    })
    .expect(400)
    .end(done);

});


});