const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if (err){
        return console.log('Unable to Connect MongoDB Server');
    }
    console.log('Connected to MongoDB Server');
     const db = client.db('ToDoApp');
    
   db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b36a91e066f170fff9fed4b')
   }, {
      $set:{
          name:'MammaStyle'
      }, 
      $inc:{
          age:2
      }
   },{
    returnOrginal:false
   }).then((result)=>{
    console.log(result);
   });
   
});
