import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom'; // on importe le hook useHistory pour rediriger l'utilisateur vers une autre page
import "./PlaceForm.css";
import Input from '../../Partage/composants/FormElements/Input';
import Button from '../../Partage/composants/FormElements/Button';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../Partage/Util/validators'; // on importe la fonction validate qui va nous permettre de valider notre input
import {useForm} from '../../Partage/hooks/Form-hooks'; // on importe le hook useForm qui va nous permettre de gérer l'état de mon formulaire
import { useHttpClient } from '../../Partage/hooks/http-hook';
import { AuthContext } from '../../Partage/context/auth-context'; // on importe le contexte d'authentification
import ErrorModal from '../../Partage/composants/UIElements/ErrorModal'; 
import LoadingSpinner from '../../Partage/composants/UIElements/LoadingSpinner';// on importe le composant ErrorModal qui va nous permettre de gérer les erreurs

const NouvellePlace = () => { 
  const auth = useContext(AuthContext);  
  const {isLoading, error, sendRequest, clearError}=useHttpClient(); // on utilise le hook useHttpClient pour gérer les requêtes HTTP
  const [formState, inputHandler] = useForm(
        { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
            title: { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation   
                value: '', // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
                isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
            },
            description: { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
                value: '', // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
                isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
            },
            adress: { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation  
                value: '', // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
                isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false 
            }
        }, // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
        false // on initialise l'état de mon formulaire avec les inputs et la validité
    ); // on utilise le hook useForm pour gérer l'état de mon formulaire

    const history = useHistory(); // on utilise le hook useHistory pour rediriger l'utilisateur vers une autre page
    
    const placeSubmitHandler = async (event) => { // fonction qui va gérer la soumission de mon formulaire
        event.preventDefault(); // on empêche le comportement par défaut du formulaire
        // on va récupérer les valeurs de mon formulaire et les envoyer à mon API en backend
      try {
          await sendRequest("http://localhost:5000/api/places", "POST", { // on envoie une requête POST à mon API
            'Content-Type': 'application/json' // on envoie les données au format JSON
        }, JSON.stringify({ // on convertit les données en JSON
            title: formState.inputs.title.value, // on récupère la valeur de mon input title
            description: formState.inputs.description.value, // on récupère la valeur de mon input description
            address: formState.inputs.adress.value,
            creator: auth.userId, // on récupère la valeur de mon input creator
            localisation:{lat:formState.inputs.lat.value,
                          lng :formState.inputs.lng.value} // on récupère la valeur de mon input adress
        })); 
        history.push("/"); // on redirige l'utilisateur vers la page d'accueil après la soumission du formulaire
        // on redirige l'utilisateur vers une différente page après la soumission du formulaire
      } catch (error) {
        
      }


    } 


    return <React.Fragment>
      <ErrorModal error={error} onClear={ clearError}/>
       {/* on utilise le composant LoadingSpinner pour afficher un loader pendant le chargement de la requête */}
      <form className="place-form" onSubmit={placeSubmitHandler}> {/* on utilise la classe place-form pour styliser mon formulaire */}
      {isLoading&&<LoadingSpinner asOverlay/>}
        {/*Nous allons faire un champ de saisie qui validera ce que l utilisateur a saisi*/}
        <Input
         id="title"
          element="input" 
          label="Titre"
           placeholder="Titre de la place" 
            validators={[VALIDATOR_REQUIRE()]} // ceci est un tableau de validations. Ici nous validons que le champ est requis
            errorText="Veuillez entrer un titre valide" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
          />
           <Input
          id="description"
          element="textarea" 
          label="Description"
           placeholder="Description de la place" 
            validators={[VALIDATOR_MINLENGTH(5)]} // ceci est un tableau de validations. Ici nous validons que le champ taille au moins 5 caractères
            errorText="Veuillez entrer une description valide (au moins 5 caractères)" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
            // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
          />
           <Input
         id="adress"
          element="input" 
          label="Adresse"
           placeholder="Adresse de la place" 
            validators={[VALIDATOR_REQUIRE()]} // ceci est un tableau de validations. Ici nous validons que le champ est requis
            errorText="Veuillez entrer une adresse valide" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
          />
           <Input
         id="lat"
          element="input" 
          label="latitude"
           placeholder="latitude de la place" 
            validators={[VALIDATOR_REQUIRE()]} // ceci est un tableau de validations. Ici nous validons que le champ est requis
            errorText="Veuillez entrer une latitude valide" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
          />
           <Input
         id="lng"
          element="input" 
          label="longitude"
           placeholder="longitude de la place" 
            validators={[VALIDATOR_REQUIRE()]} // ceci est un tableau de validations. Ici nous validons que le champ est requis
            errorText="Veuillez entrer une longitude valide" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
          />
            <Button type="submit" disabled={!formState.isValid}>Ajouter</Button> {/* le bouton est désactivé si le formulaire n'est pas valide */}
            {/* le bouton est désactivé si le formulaire n'est pas valide */}
        </form>
        </React.Fragment>
}
export default NouvellePlace;