require("dotenv").config();
const MongoClient = require('mongodb').MongoClient,
	  url = "mongodb+srv://michael:"+process.env.MONGOPASSSWORD+"@cluster0.uxhya.mongodb.net/vokoban1?retryWrites=true&w=majority";

const tagComputers = []

//function nodeFilter(){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("vokoban1");
  let query = { tag: "computers" };
  dbo.collection("words").find(query).toArray(function(err, result) {
    if (err) throw err;
    tagComputers.push(result);
	  console.log(tagComputers);
    db.close();
  });
});


//module.exports = nodeFilter;