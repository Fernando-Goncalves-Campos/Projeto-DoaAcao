const express = require('express');
const app = express();
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
  passowod: String
});

const Work = mongoose.model('work', workSchema);
const Entity = mongoose.model('entity', entitySchema);
const volunteer = mongoose.model("volunteer", volunteerSchema)

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

newVolunteer = new volunteer({
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
  "reasons": ["str1","str2"],
  "skills": ["skill 1", "skill 2"],
  "password": "senha"
})

newWork.save();
newEntity.save();
newVolunteer.save();


app.post("User", async (request, response) => {
  const user = new User(request.body);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/users", async (request, response) => {
  const users = await User.find({});
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.use((req, res, next) => {
  console.log("Foi");
  next();
});

app.get('/', function (req, res) {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
