import express from 'express';
import * as placesControllers from "../controllers/places-controllers.js"
import {check} from 'express-validator';


const router = express.Router();
router.get('/:pid', placesControllers.getPlaceById);
router.get('/user/:uid',placesControllers.getPlacesByUserId);
router.post(
    '/', 
    [check('title').not().isEmpty(),    // ici on met tous nos mesures de contrôles. les paramètres de check
                 // doivent êtes les mêmes nom qui sont trasmis dans le body de la requête
        check('description').isLength({min:5}),
        check('address').not().isEmpty(),
        check('localisation').not().isEmpty()
    ],
    placesControllers.createPlace) /* une remarque, lorsqu'on crée un tel middleware, on ne peut ajouter plus d'une méthode après
le chemin*/
router.patch(
    '/:pid', 
    [check('title').not().isEmpty(),    // ici on met tous nos mesures de contrôles. les paramètres de check
        // doivent êtes les mêmes nom qui sont trasmis dans le body de la requête
      check('description').isLength({min:5}),
    ],
placesControllers.updatePlace)
router.delete('/:pid',placesControllers.deletePlace)
export default router;