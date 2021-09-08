//IMPORTER EXPRESS
const express = require('express');
//IMPORTER BODY PARSER
const bodyParser = require('body-parser'); 
//IMPORTER MONGOOSE PR CRÉER BASE DE DONNÉES
const { MongoClient } = require('mongodb');
//IMPORTER THING
const Thing = require('./models/Thing');

//CONNECTER MONGOOSE AVEC ROUTE MONGO DB
const uri = "mongodb+srv://kadyson:<princess99>@clusterk.jdqgr.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true})
    console.log(client);

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//CRÉER MON APPLICATION
const app = express();

      //ROUTES => CRÉER FONCTION (MIDDLEWARE) PR RÉPONDRE À TOUT TYPE DE REQ.(MÉTHODE USE) 
//PR GET => PR APPLI. ACCÉDE SS PROB. À L'API (CORS SECURITY) MIDDLEWARE GÉNÉRAL SS ROUTE SPÉCIFIQUE, APPLIQUÉ À TTES ROUTES DU SERVER
app.use((req, res, next) => { //UTILISER HEADERS DS OBJET RES. *** .USE TRAITE TTES LES REQ.
  res.setHeader('Access-Control-Allow-Origin', '*');//TT LE MONDE
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//AUTORISATION DE USE CERTAINS HEADERS SUR OBJET REQ.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//AUTORISATION PR CERTAINES METHODES DE REQ.
  next();
});

//PR USE UNE MÉTHODE DE BODY PARSER => FORMAT JSON (TTES LES ROUTES)
app.use(bodyParser.json()); 

//PR POST => EXTRAIRE OBJET JSON DE LA REQ. FRONTEND
app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;//KOM 2(_ID / ID) RETIRER CHAMP AVANT COPIER OBJET
  const thing = new Thing({
    ...req.body  //OPÉRATOR SPREAD AU LIEU DE TILE:REQ.BODY.TITLE PR CHQ CHAMP
});
//SAVE THING DS BASE DE DONNÉES (MÉTHODE SAVE RETURN PROMISE(THEN/CATCH))
thing.save()
  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))//MÊME SI SAVE => SEND RES. TO FRONTEND SINON REQ. EXPIRE
  .catch(error => res.status(400).json({ error }));//AU LIEU DE ERROR:ERROR
  next();
});

//PR GET => RÉCUPÉRER PRODUIT À VENDRE (MÉTHODE FIND RETURN PROMISE)
app.use('/api/stuff', (req, res, next) => {//URL VISÉ PAR APPI.(ROUTE)
  Thing.find()
    .then(things => res.status(200).json(things))//RETURN TABLEAU DE TS LES THING
    .catch(error => res.status(400).json({ error }));
});


//EXPORTER APPLI. PR POUVOIR USE DEPUIS AUTRE FICHIERS (KOM SERVER NODE)
module.exports = app;





/*const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kadyson:<princess99>@clusterk.jdqgr.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));*/


/*//PR EXPRESS
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
  });
//PR MODIFIER CODE REQ.HTTP
app.use((req, res, next) => {
    res.status(201);
    next();
  });
//PR APPLI.
app.use((req, res, next) => {
    res.json({ message: 'Votre  a bien été reçue !' });
    next();  
 });
 //PR LA RES.(CHANGE FROM RES 201)
 app.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
  }) */


  /*app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    })*/