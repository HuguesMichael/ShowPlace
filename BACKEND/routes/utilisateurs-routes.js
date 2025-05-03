import express from 'express';
import * as utilisateursControllers from "../controllers/utilisateurs-controllers.js"
import {check} from 'express-validator';

const router = express.Router();
router.get('/', utilisateursControllers.getUtilisateurs);
router.post(
    '/signup',
    [check('name').not().isEmpty(),    
     check('email').isEmail(),
     check('password').isLength({min:8})
   ],
    utilisateursControllers.createUser)
router.post('/login', utilisateursControllers.loginUser)

export default router;

