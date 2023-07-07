const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
const port = 8000;

const mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'VolunTech';
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection failed');
      });
  }
}

module.exports = new Database();

const workSchema = new mongoose.Schema({
  name: String,
  entity: String,
  img: String,
  address: String,
  frequency: String,
  description: String,
  date: String,
  complement: String,
  quantity: Number,
  time: String,
  reasons: [String],
  skills: [String],
  distance: Boolean,
  volunteers: [{
    name: String,
    email: String,
    phone: String,
    rating: String,
    CPF: String
  }]
});

const entitySchema = new mongoose.Schema({
  name: String,
  CNPJ: String,
  streetName: String,
  socialReason: String,
  img: String,
  email: String,
  phone: String,
  secondPhone: String,
  CEP: String,
  addressNumber: Number,
  complement: String,
  district: String,
  state: String,
  city: String,
  referencePoint: String,
  responsible: String,
  position: String,
  password: String
});

const volunteerSchema = new mongoose.Schema({
  name: String,
  birthday: String,
  CPF: String,
  streetName: String,
  img: String,
  email: String,
  phone1: String,
  secondPhone: String,
  CEP: String,
  addressNumber: Number,
  complement: String,
  district: String,
  state: String,
  city: String,
  referencePoint: String,
  reasons: [String],
  skills: [String],
  password: String
});

const Work = mongoose.model('work', workSchema);
const Entity = mongoose.model('entity', entitySchema);
const Volunteer = mongoose.model("volunteer", volunteerSchema)

newWork = new Work({
  "name": "nome",
  "entity": "nome da entidede",
  "img": "abc",
  "address": "Address",
  "frequency": "Pontual",
  "description": "Descrição",
  "date": "data",
  "complement": "complemento",
  "quantity": 10,
  "time": "horário",
  "reasons": ["pq sim", "Pq eu gosto"],
  "skills": ["dormir", "comer"],
  "distance": false,
  "volunteers": [
    {
      "name": "nome1",
      "email": "email1",
      "phone": "phone1",
      "rating": "rating1",
      "CPF": "cpf1"
    },
    {
      "name": "nome2",
      "email": "email2",
      "phone": "phone2",
      "rating": "rating2",
      "CPF": "cpf2"
    }
  ]
});

newEntity = new Entity({
  "name": "nome",
  "CNPJ": "entityCNPJ",
  "streetName": "streetName",
  "socialReason": "socialReason",
  "img": "",
  "email": "email",
  "phone": "phone",
  "secondPhone": "secondPhone",
  "CEP": "CEP",
  "addressNumber": 123,
  "complement": "complement",
  "district": "district",
  "state": "state",
  "city": "city",
  "referencePoint": "referencePoint",
  "responsible": "Responsible",
  "position": "position",
  "password": "senha"
})

newVolunteer = new Volunteer({
  "name": "nome",
  "birthday": "birthday",
  "CPF": "volunteerCPF",
  "streetName": "streetName",
  "img": "",
  "email": "email",
  "phone1": "phone1",
  "secondPhone": "secondPhone",
  "CEP": "CEP",
  "addressNumber": 310,
  "complement": "complement",
  "district": "district",
  "state": "state",
  "city": "city",
  "referencePoint": "referencePoint",
  "reasons": ["str1", "str2"],
  "skills": ["skill 1", "skill 2"],
  "password": "senha"
})

// newWork.save();
// newEntity.save();
// newVolunteer.save();

app.use(express.json());
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send("Hello world!");
});

app.get('/works', async function (req, res) {
  res.status(200).send(await Work.find({}).then());
})

app.post('/entities/:entityName/works', function (req, res) {
  console.log("Post em /trabalhos")
  try {
    newWork = new Work(req.body);
    newWork.save();
    res.status(200).send(newWork)
  } catch (err) {
    console.log(err)
    res.status(500).send({})
  }
});

app.delete("/entities/:entityName/works", async (req, res) => {
  console.log("delete em /trabalhos")
  let work = req.body;
  console.log(work)
  try {
    await Work.findByIdAndDelete(work._id["$oid"])
    res.status(200).send(`work ${work._id} was delete`)
  } catch (err) {
    res.status(500).send(err);
    console.log(err)
  }
})

app.post('/login', async function (req, res) {
  console.log("Get em /user")
  console.log(req.body.email)
  console.log(req.body.password)
  let aux=[];
  try {
    await Volunteer.find({ email: req.body.email, password: req.body.password }, { password: 0 }).then(userFound => {
      if(userFound.length>0){
        aux={user: {...userFound}, entity:false};
        console.log("achou um volunteer")
      }
    });

    await Entity.find({ email: req.body.email, password: req.body.password }, { password: 0 }).then(userFound => {
      if(userFound.length>0){
        aaux={user: {...userFound}, entity:true};
        console.log("achou uma entity")
      }
    });
    
    if(aux.length==0){
      res.status(404).send(aux);
    }else{
      res.status(200).send(aux)
    }
  } catch (err) {
    res.status(500).send(err)
    console.log(err)
  }
});

app.post('/user', async function (req, res) {
  console.log("POST em /user");
  encontrado=false;
  newUser=req.body;
  try{
    await Volunteer.find({$or:[{email: newUser.email},{CPF: newUser.CPF}]}).then(userFound =>{
      if(userFound.length>0){
        encontrado=true;
      }
    });
  
    await Entity.find({$or:[{email: newUser.email},{CNPJ: newUser.CNPJ}]}).then(userFound =>{
      if(userFound.length>0){
        encontrado=true;
      }
    });
  
    if(encontrado==true){
      console.log("Usuário já existe")
      res.status(409).send({});
    }else{
      if(newUser.hasOwnProperty("CPF")){
        newVolunteer=new Volunteer(newUser);
        newVolunteer.save();
      }else{
        newEntity=new Entity(newUser);
        newEntity.save();
      }
      res.status(201).send(newUser);
    }
  }catch(err){
    console.log(err);
    res.status(500);
  }
  
});

app.post('/entities/:entityName/works/:workName', async function (req, res) {
  console.log("POST para adicionar voluntário a um trabalho");
  console.log(req.params.entityName);
  console.log(req.params.workName);
  try{
    work= await Work.find({name: req.params.workName,entity: req.params.entityName}).then();
    if(work.length==0){
      console.log("Trabalho não encontrado");
      res.status(404).send({});
    }else{
      work=work[0];
      work.volunteers.push(req.body);
      console.log(work)
      console.log(work._id);
      await Work.findByIdAndUpdate(work._id,work).then();
      res.status(200).send(work)
    }
  }catch(err){
    console.log(err)
    res.status(500).send({});
  }

});

app.put('/volunteers/:volunteerCPF', async function (req, res) {
  console.log("PUT em /volunteers");
  console.log(req.params.volunteerCPF);
  try{
    volunteer=await Volunteer.find({CPF: req.params.volunteerCPF}).then();
    if(volunteer.length==0){
      console.log("Voluntário não encontrado");
      res.status(404).send({});
    }else{
      volunteer=volunteer[0];
      await Volunteer.findByIdAndUpdate(volunteer._id,{ $set: req.body }).then();
      res.status(200).send({});
    }
  }catch(err){
    console.log(err);
    res.status(500).send({});
  }

});

app.put('/entity/:entityName', async function (req, res) {
  console.log("PUT em /entity");
  console.log(req.params.entityName);
  try{
    entity=await Entity.find({name: req.params.entityName}).then();
    if(entity.length==0){
      console.log("Entity não encontrada");
      res.status(404).send({});
    }else{
      entity=entity[0];
      await Entity.findByIdAndUpdate(entity._id,{ $set: req.body }).then();
      res.status(200).send({});
    }
  }catch(err){
    console.log(err);
    res.status(500).send({});
  }

});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
