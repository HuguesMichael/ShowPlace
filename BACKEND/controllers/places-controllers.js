import { v4 as uuidv4 } from 'uuid';
import HttpError from '../models/http-error.js';
let PLACE_PROVISOIRE = [
    {
        id: "p1",
        imageUrl: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
        title: "Un endroit magnifique",
        description: "C'est un endroit magnifique",
        address: "Paris, France",
        creator: "u1",
        localisation: {
            lat: 48.8566,
            lng: 2.3522
        }
    },
    {
        id: "p2",
        imageUrl: "https://www.saimondy.com/wp-content/uploads/2021/10/Le-match-Cameroun-Mozambique-se-jouera-a-Japoma.jpg",
        title: "stade de Japoma",
        description: "C'est l'un des plus grands stades du Cameroun",
        address: "Douala, Cameroun",
        creator: "u2",
        localisation: {
            lat: 4.0059909,
            lng: 9.8227537
        }
    },
    {
        id: "p3",
        imageUrl: "https://www.saimondy.com/wp-content/uploads/2021/10/Le-match-Cameroun-Mozambique-se-jouera-a-Japoma.jpg",
        title: "stade olembé",
        description: "C'est l'un des plus grands stades du Cameroun",
        address: "Yaoundé, Cameroun",
        creator: "u2",
        localisation: {
            lat: 4.0059909,
            lng: 9.8227537
        }
    }
     ];


const getPlaceById = (req, res, next)=>{   // ":" permet de creer un paramètre. pid sera remplacer par une valeur spécifique
    const placeId = req.params.pid; // permet de recuperer les paramètres sous cette forme par exemple {pid: 'p1'}
        const place =PLACE_PROVISOIRE.find(p=>p.id===placeId);
        if(!place){
            throw new HttpError('Nous ne pouvons pas trouvé ce lieu',404); /*throw=lancer. Nous lançons simplement l'erreur. 
                          Pas besoin de return car throw annule déja l'exécution de la fonction
                          ceci est utiliser pour les opérations synchrones*/
         }
        res.json({place}); // {place} <=> {place: place}
    
    }

    const getPlacesByUserId = (req, res, next)=>{   
        const userId = req.params.uid; 
        const places =PLACE_PROVISOIRE.filter(p=>p.creator===userId);
        if(!places || places.length===0){
           return next(
            new HttpError('Cet utilisateur n a aucun lieu enregistré',404)
         ); /* je transmet l'erreur au prochain  middleware de gestion 
                           erreur en ligne. Biensur il se  trouve dans app.js 
                           ceci est utliser pour les opérations asynchrones*/
            
         }
        res.json({places}); // {place} <=> {place: place}
        
        }

        const createPlace = (req, res, next)=>{
            const {title, description,address, creator, localisation } =req.body;

            const createdPlace={
                id: uuidv4(),
                title,
                description,
                address,
                creator,
                localisation
            };

            PLACE_PROVISOIRE.push(createdPlace);
            res.status(201).json({place:createdPlace}); 
         

        }
        const updatePlace = (req, res, next)=>{
            const {title, description } =req.body;
            const placeId = req.params.pid; // permet de recuperer les paramètres sous cette forme par exemple {pid: 'p1'}
        const updatePlace ={...PLACE_PROVISOIRE.find(p=>p.id===placeId)}; // ceci ne cree pas une copie du tableau entier mais celui de la place recherchée
        const placeIndex = PLACE_PROVISOIRE.findIndex(p=>p.id===placeId); // je conserve l'index du lieu que je veux metre à jour
        updatePlace.title =title;  // je vais la mise à jour
        updatePlace.description=description;
        PLACE_PROVISOIRE[placeIndex]=updatePlace; // je met à jour dans le tableau
       
        ;

            res.status(200).json({place:updatePlace}); 
         

        }

        const deletePlace=(req, res, next)=>{
            const placeId = req.params.pid;

            PLACE_PROVISOIRE= PLACE_PROVISOIRE.filter(p=>p.id!==placeId)
            res.status(200).json({message:"place supprimée avec succès"}); 

        }

        export {getPlaceById, getPlacesByUserId, createPlace, updatePlace,deletePlace};