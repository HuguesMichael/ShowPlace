import HttpError from '../models/http-error.js';
const PLACE_PROVISOIRE = [
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

    const getPlaceByUserId = (req, res, next)=>{   
        const userId = req.params.uid; 
        const place =PLACE_PROVISOIRE.filter(p=>p.creator===userId);
        if(place.length===0){
           return next(
            new HttpError('Cet utilisateur n a aucun lieu enregistré',404)
         ); /* je transmet l'erreur au prochain  middleware de gestion 
                           erreur en ligne. Biensur il se  trouve dans app.js 
                           ceci est utliser pour les opérations asynchrones*/
            
         }
        res.json({place}); // {place} <=> {place: place}
        
        }

        const createPlace = (req, res, next)=>{
            const {} =req.body;
         

        }

        export {getPlaceById, getPlaceByUserId, createPlace};