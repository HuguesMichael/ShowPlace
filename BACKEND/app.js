import express from 'express';
import bodyParser from 'body-parser';
import placeRoutes from './routes/places-routes.js';
import utilisateursRoutes from './routes/utilisateurs-routes.js'
import HttpError from './models/http-error.js';
import mongoose from 'mongoose';
const app= express();
const port =5000;

//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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


