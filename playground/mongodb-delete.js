const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if (err){
        return console.log('Unable to Connect MongoDB Server');
    }
    console.log('Connected to MongoDB Server');
     const db = client.db('ToDoApp');
    
   
    // db.collection('Todos').deleteMany({text:'Eat launch'}).then((result)=>{
    //     console.log(result);
    // });

    db.collection('Todos')
           .findOneAndDelete({_id: new ObjectID('5b375817ca0d2a5d8472e65c')})
           .then((result)=>{
            console.log(result);
    });
   // client.close();
});
