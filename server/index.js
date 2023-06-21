import express from "express"
import cors from "cors"
const app = express();
const port = 8000; 

let database = {
    volunteers: [],
    entities: [],
}

app.use(cors());

app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    console.log();
  next();
});


app.get('/', function(req, res){
    res.send("Hello world!");
 });

app.get('/works', (req, res) => {
    res.status(200).send([]);
});

app.get('/entities/:entityName', (req, res) => {   
    res.json("Acessou /entities/entityName,GET");
});

app.get('/entities/:entityName/works/:workName', (req, res) => {
    res.json("Acessou /entities/:entityName/works/:workNamee,GET");
});

app.get('/volunteers/:volunteerName', (req, res) => {
    res.json("Acessou /volunteers/:volunteerName,GET");
});

app.post('/login', express.json(), (req, res) => {
  res.json("Acessou /login,POST");
});

app.post('/entities', express.json(), (req, res) => {
    res.json("Acessou /entities,POST");
});

app.post('/entities/:entityName/works', express.json(), (req, res) => {
    res.json("Acessou /entities/:entityName/works,POST");
});

app.post('/volunteers', express.json(), (req, res) => {
    res.json("Acessou /volunteers,POST");
});

app.put('/entities/:entityName', express.json(), (req, res) => {
  res.json("Acessou /entities/:entityName,PUT");
});

app.put('/volunteers/:volunteerName', express.json(), (req, res) => {
    res.json("Acessou /volunteers:volunteerName,PUT");
  });

app.delete('/entities/:entityName/works/:workName',express.json(),(req,res)=>{
    res.json("Acessou /entities/:entityName/works/:workName,DELETE")
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
