import HttpError from '../models/http-error.js';
import { validationResult } from 'express-validator';
import User from '../models/user.js'


// ------------------ get users --------------------------------------------------------------

const getUtilisateurs = async (req, res, next)=>{   // ":" permet de creer un paramètre. pid sera remplacer par une valeur spécifique
        
         let users;
         try {
             users = await User.find({},'-motdepasse');
        } catch (error) {
             return next (
                new HttpError(
                    "Impossible de trouver les utilisateurs, veuillez reassez plutard", 
                    500))
        }
        if(users.length===0){ return res.json({message:"Aucun utilisateur existant pour le moment"});} 
         res.json({users:users.map(u=>u.toObject({getters:true}))}); // {place} <=> {place: place}
    
    }
// ------------------------------- create user ------------------------------------------------
    const createUser = async (req, res, next)=>{
        const {nom,email, motdepasse} =req.body;
        const errors= validationResult(req); // il se sert da la configuration de check effectuée
        console.log(errors);
       if(!errors.isEmpty()){
        throw new HttpError('Les Entrées sont invalides, vérifiez vos données', 422);

       }
       let existedUser;
       try {
           existedUser = await User.findOne({email:email})
        
       } catch (error) {
         return  next(
            new HttpError("Impossible de créer cet utilisateur, ressayez plutard",500)
           )
       }

       if(existedUser){

        return next(new HttpError(
            "Impossible de créer cet utilisateur, cet email existe déja",
            422))
    }
        
        const createdUser= new User({
            nom,
            email,
            motdepasse,
            image:'https://upload.wikimedia.org/wikipedia/commons/b/b7/Maple_Leaf_%28from_roundel%29.png',
            places: []
        });
        
        try {
               await createdUser.save();
        } catch (error) {
          return  next(
                new HttpError("Impossible de créer cet utilisateur, ressayez plutard",500)
               )
        }
        res.status(201).json({user:createdUser.toObject({getters:true})}); 
    }


    //---------------------- login user ---------------------------------------------------
    const loginUser= async (req, res, next)=>{
        const {email, motdepasse} =req.body;
        let findedUser;
        try {
            findedUser= await User.findOne({email:email})
        } catch (error) {
            return next (
                new HttpError('Erreur de connexion, reasseyer plutard',500)
            )
        }
      
        if(!findedUser || findedUser.motdepasse!==motdepasse ){
            return next( 
                new HttpError("Utilisateur inexistant, veuillez entrer les bonnes informations",
                    401));
        }
        res.status(200).json({message: "connecté avec succès"});
       // res.status(200).json(findedUser);

    }

    export {getUtilisateurs, createUser,loginUser}
