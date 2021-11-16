let express = require('express');
let app = express();
let cors= require('cors');
let MongoClient = require('mongodb').MongoClient;

app.use(express.json());
app.use(cors());
app.listen(8080, ()=> console.log('server running on port 8080'));


var url = "mongodb://localhost:27017/";

app.get('/api/applicants', (req, res)=>{
    MongoClient.connect(url, {useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("data");
        dbo.collection("applicants").find({}).toArray(
        function(err, result) {
            if (err) throw err;
            res.json(result);
            console.log('collection retrived');
            db.close();
        });
    });
})

app.delete('/api/applicants', (req,res)=>{
    MongoClient.connect(url, {useUnifiedTopology: true }, function(err,db){
        if(err) throw err;
        let dbo = db.db("data");
        dbo.collection("applicants").deleteMany({});
        console.log('documents deleted');
    });
})

app.get('/api/applicants/:email', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("data");
        dbo.collection("applicants").findOne({
            email: req.params.email
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            console.log('1 document retrived');
            db.close();
        });
    });
});

app.post('/api/applicants', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("data");
        dbo.collection("applicants").insertOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
            
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            console.log('1 document inserted');
            db.close();
        });
    });
});

app.put('/api/applicants/:email', (req,res)=>{
    MongoClient.connect(url, {useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("data");
        dbo.collection("applicants").updateOne({
            email: req.params.email
        }, 
        {$set:{
            password: req.body.password,
        }},
        function(err, result) {
            if (err) throw err;
            res.json(result);
            console.log('1 document updated');
            db.close();
        });
    });
})

app.delete('/api/applicants/:email', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("data");
        dbo.collection("applicants").deleteOne({
            email: req.params.email
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            console.log('1 document deleted');
            db.close();
        });
    });
});

