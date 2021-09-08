//IMPORTER MONGOOSE
const mongoose = require('mongoose');

//CRÉER SCHÉMA DE DONNÉES (F. SCHÉMA DU PACKAGE MONGOODE)
const thingSchema = mongoose.Schema({//AUQUEL JE PASSE UN OBJET AVEC CHAMPS UTILES À SCHÉMA THING
    title: { type: String, required: true },//SS _ID => GÉNÉRER PAR MONGOOSE
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
  });

  //EXPORTER MODEL THING (MÉTHODE MODULE.EXPORTS)
  module.exports = mongoose.model('Thing', thingSchema);