
const {MongoClient, ObjectID} = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if (err){
        return console.log('Unable to Connect MongoDB Server');
    }
    console.log('Connected to MongoDB Server');
     const db = client.db('ToDoApp');


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
