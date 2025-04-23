import react,{useState,useContext} from 'react';
import "../../Places/pages/PlaceForm.css";
import Input from '../../Partage/composants/FormElements/Input';
import Button from '../../Partage/composants/FormElements/Button';
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../Partage/Util/validators'; // on importe la fonction validate qui va nous permettre de valider notre input
import {useForm} from '../../Partage/hooks/Form-hooks'; // on importe le hook useForm qui va nous permettre de gérer l'état de mon formulaire
import React from 'react';
import "./Auth.css";
import Card from '../../Partage/composants/UIElements/Card';
import { AuthContext } from '../../Partage/context/auth-context'; // on importe le contexte d'authentification


const Auth = () => {  
  const auth = useContext(AuthContext); // on utilise le contexte d'authentification pour gérer l'état de mon formulaire
  const [isLoginMode, setIsLoginMode] = useState(true); // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
  const [formState, inputHandler, setFormData] = useForm(
        { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
            email: { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation   
                value: '', // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
                isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
            },
            motdepasse: { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
                value: '', // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
                isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
            },   
        }, // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
        false // on initialise l'état de mon formulaire avec les inputs et la validité
    ); // on utilise le hook useForm pour gérer l'état de mon formulaire

    const swicthModeHandler = () => { // fonction qui va gérer le changement de mode entre connexion et inscription
      if(!isLoginMode){ // si le mode de connexion est faux
            setFormData( 
              {
                ...formState.inputs, // on utilise le spread operator pour garder l'état précédent et mettre à jour la valeur
                nom: undefined
            },
              formState.inputs.email.isValid && formState.inputs.motdepasse.isValid // on met à jour la validité de mon formulaire
            )} else{

            setFormData( // on met à jour l'état de mon formulaire
              {
                ...formState.inputs, // on utilise le spread operator pour garder l'état précédent et mettre à jour la valeur
                nom: { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
                    value: '', // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
                    isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
                },
              },
              false // on initialise l'état de mon formulaire avec les inputs et la validité
            ) // on utilise le hook useForm pour gérer l'état de mon formulaire
            }
      
      setIsLoginMode(prevMode => !prevMode); // on inverse le mode de connexion
      
        }
    
    const compteSubmitHandler = event => { // fonction qui va gérer la soumission de mon formulaire
        event.preventDefault(); // on empêche le comportement par défaut du formulaire
        // on va récupérer les valeurs de mon formulaire et les envoyer à mon API en backend
       // console.log(formState.inputs); // on affiche les valeurs de mon formulaire dans la console
       auth.login()
     // isLoginMode?auth.login():auth.logout(); // si le mode de connexion est vrai, on appelle la fonction login du contexte d'authentification
       // console.log(Button.value); // on affiche un message dans la console
    } 

 

    return <Card className="auth"> {/* on utilise la classe auth pour styliser mon formulaire */}
        {isLoginMode ? <h2> Connexion obligatoire </h2> : <h2> Inscription obligatoire </h2>} {/* on affiche le titre en fonction du mode de connexion */}
     <form className="place-form" onSubmit={compteSubmitHandler}> {/* on utilise la classe place-form pour styliser mon formulaire */}
       { !isLoginMode && <Input
         id="nom"
          element="input" 
          type="text" // type de l'input, ici c'est un texte
          label="Nom*"
           placeholder="Votre nom" 
            validators={[VALIDATOR_REQUIRE]} // ceci est un tableau de validations. Ici nous validons que le champ taille au moins 5 caractères
            errorText="Veuillez entrer un nom valide" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
          />}
        <Input
         id="email"
          element="input" 
          type="email" // type de l'input, ici c'est un email
          label="E-mail*"
           placeholder="Votre email" 
            validators={[VALIDATOR_EMAIL]} // ceci est un tableau de validations. Ici nous validons que le champ est requis
            errorText="Veuillez entrer une adresse email valide" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
          />
           <Input
          id="motdepasse"
          element="input"
          type="password" // type de l'input, ici c'est un mot de passe 
          label="Mot de passe*"
           placeholder="Mot de passe" 
            validators={[VALIDATOR_MINLENGTH(8)]} // ceci est un tableau de validations. Ici nous validons que le champ taille au moins 5 caractères
            errorText="Veuillez entrer un mot de passe (au moins 8 caractères)" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
            // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
          />
           <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode?'CONNEXION':'INSCRIPTION'}
           </Button>  
          <React.Fragment> 
          {isLoginMode && <a href="/motPasseOublie">Mot de passe oublié </a>} 
            </React.Fragment>
            <Button inverse onClick={swicthModeHandler}> {/* on utilise le bouton inverse pour changer de mode */}
             SWITCH A {!isLoginMode?'CONNEXION':'INSCRIPTION'}
            </Button> {/* on utilise le bouton inverse pour changer de mode */}
        </form>
        </Card>
        
}
export default Auth;