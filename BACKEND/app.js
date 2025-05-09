import express from 'express';
import bodyParser from 'body-parser';
import placeRoutes from './routes/places-routes.js';
import utilisateursRoutes from './routes/utilisateurs-routes.js'
import HttpError from './models/http-error.js';
import mongoose from 'mongoose';
import cors from 'cors'; // Importation de cors pour gérer les problèmes de CORS
const app= express();
const port =5000;
app.use(cors()); // Utilisation de cors pour gérer les problèmes de CORS

//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
/* Middleware pour contourner l' erreur  "Access to fetch at 'http://localhost:5000/api/users/signup' 
from origin 'http://localhost:3000' has been blocked by CORS policy ..." visible dans la console du navigateur */
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-requested-With, Content-Type, Accept, Authorization');
   res.setHeader('Access-Control-Allows-Methods','GET, POST, PATCH, DELETE'); 
  next();
})
app.use('/api/places/',placeRoutes); //=> /api/places/... express ne transmettra que les requêtes commençant par
                                     // /api/places/

 app.use('/api/users/',utilisateursRoutes); 
                
  app.use((req, res, next)=>{
       const error = new HttpError('Chemin non valide',404);
       throw error;

  })
app.use((error, req, res, next)=>{  // si vous utilisez un middleware avec quatre paramètres, express le considera comme une fonction erreur
if(res.headerSent){
  return next (error);
}
res.status(error.code|| 500); // on pouvais .json() greffer à la suite status(). pour des soucis de lisibilité on prefère le mettre sur une ligne
res.json({message:error.message || "Une erreur inconnue s est produite"})

})
const url = 'mongodb+srv://huguesmichaelpro:20f03j1922MGDB@cluster0.8kvqtgc.mongodb.net/places_DB?retryWrites=true&w=majority&appName=Cluster0'
 mongoose.connect(url)
 .then(()=>{
  app.listen(port,()=>{

    console.log(`Le serveur tourne sur le port ${port}`);
})

 })
 .catch(error=>{
    console.log(error);

 })


