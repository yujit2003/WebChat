// Importing
import mongoose from 'mongoose';
import express from 'express';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

//App config
const app = express(); 
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1500976",
    key: "6e06ef754dc6cac41498",
    secret: "e2e92390fa05dd765147",
    cluster: "ap2",
    useTLS: true
  });


//middleware
app.use(express.json());
app.use(cors()); //it would set header for us
// app.use((req, res, next) => {
//     res.setHeader("Access-control-Allow-Origin", "*")
//     res.setHeader("Access-control-Allow-Header", "*")
// });

//DB config
const connection_url = 'mongodb+srv://yujityadav:8824270600%40yujit@cluster0.r724pqz.mongodb.net/wpclone?retryWrites=true&w=majority'
const connectDB = (url) => {
    return mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
  }

const db = mongoose.connection;

db.once("open", () => {
        console.log("DB connected");

        // "messagecontents" => schema name given in dbMessage Folder

        const msgCollection = db.collection("messagecontents");
        const changeStream = msgCollection.watch();

        changeStream.on("change", (change) => {
        console.log(change);
        
        if(change.operationType == 'insert') {
            const messageDetail = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetail.name,
                message: messageDetail.message,
                timestamp: messageDetail.timestamp
            });
            console.log("pusher is activated")
        }else{
            console.log("pusher error");
        }


    });
});


//????

//api routes
app.get('/', (req,res) => res.status(200).send("hello world"));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        }else {
            res.status(200).send(data);
        }
    });
});


app.post('/messages/new', (req,res)=>{
    //req.body matlab ho bhi data aa raha hai usse save krna hai
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if(err) {
            console.log(err);
        }else {
            res.status(201).send(data)
        }
    })
    
});




//listening


const start = async () => {
    try{
        await connectDB(connection_url);
        app.listen(port, ()=> console.log(`Listening on localhost:${port}`));
    }
    catch (error){
        console.log(error);
    }
};

start();