import express from 'express';
import {MongoClient, ServerApiVersion} from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;
 
app.use(cors());
app.use(express.static('public'));
dotenv.config();
 
//lees de connection string uit de environment file
const databaseUrl = process.env.CONNECTION_URL;
const client = new MongoClient(databaseUrl);

//op de / route geven we de documenten terug uit de MongoDB database

    app.get('/', (req, res) => {
  
    
        res.send(`API listen on port ${port}`)
    })
  




  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});




app.get('/ko-stats', (req,res)=>{
    fetchKo().then(koStats=>{
        res.json(koStats)
    }); 
})

//Deze functie geeft alle documenten terug uit een collectie in MongoDB
async function fetchKo() {
    try {
        // we verbinden de client met de server
        await client.connect();
        //hier verbinden we met de database, je moet nog wel een naam invullen
        const database = client.db('practice');
        //hier verbinden we met de collectie, je moet nog wel een naam invullen
        const collection = database.collection('random');
        //hier halen we de documenten uit de collectie in de vorm van een array
        const documents = await collection.find().toArray();
        //uiteindelijk geven we de documenten terug
        return documents;
    } finally {
        //we zorgen ervoor dat aan het einde de database verbinding weer wordt gesloten
        await client.close();
    }
}

                
            