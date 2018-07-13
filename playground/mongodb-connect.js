// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if (err){
        return console.log('Unable to Connect MongoDB Server');
    }
    console.log('Connected to MongoDB Server');
     const db = client.db('ToDoApp');
    // db.collection('Todos').insertOne({
    //     text : 'Something to do',
    //     completed: false
    // },(err, result)=>{
    //     if (err){
    //         console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name : 'Morshed Alam',
    //     age: 29,
    //     location : 'Banglasesh'
    // },(err, result)=>{
    //     if (err){
    //        return  console.log('Unable to insert user', err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b36a79530ccd20ff41462d0')}).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err)=>{
    //     console.log(err)
    // });
    db.collection('Todos').find().count().then((count)=>{
        console.log(`count is ${count}`);
    }, (err)=>{
        console.log(err)
    });
   // client.close();
});
