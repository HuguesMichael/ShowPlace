import react from 'react';
import "./PlaceForm.css";
import Input from '../../Partage/composants/FormElements/Input';
import Button from '../../Partage/composants/FormElements/Button';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../Partage/Util/validators'; // on importe la fonction validate qui va nous permettre de valider notre input
import {useForm} from '../../Partage/hooks/Form-hooks'; // on importe le hook useForm qui va nous permettre de gérer l'état de mon formulaire


const NouvellePlace = () => {  
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

    
    
    const placeSubmitHandler = event => { // fonction qui va gérer la soumission de mon formulaire
        event.preventDefault(); // on empêche le comportement par défaut du formulaire
        // on va récupérer les valeurs de mon formulaire et les envoyer à mon API en backend
        console.log(formState.inputs); // on affiche les valeurs de mon formulaire dans la console
    } 


    return <form className="place-form" onSubmit={placeSubmitHandler}> {/* on utilise la classe place-form pour styliser mon formulaire */}
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
            <Button type="submit" disabled={!formState.isValid}>Ajouter</Button> {/* le bouton est désactivé si le formulaire n'est pas valide */}
            {/* le bouton est désactivé si le formulaire n'est pas valide */}
        </form>
}
export default NouvellePlace;