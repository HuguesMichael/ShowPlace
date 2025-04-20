import react,{useCallback,useReducer} from 'react';
import "./PlaceForm.css";
import Input from '../../Partage/composants/FormElements/Input';
import Button from '../../Partage/composants/FormElements/Button';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../Partage/Util/validators'; // on importe la fonction validate qui va nous permettre de valider notre input

const formReducer = (state, action) => { // fonction de mon réducteur qui va gérer l'état gnéral de mon formulaire
    switch (action.type) {  
        case 'INPUT_CHANGE':
            let formValid = true; // on initialise la validité de mon formulaire à true
            for(const inputId in state.inputs){ // on parcourt les inputs de mon formulaire
            if(inputId === action.inputId){ // si l'inputId est égal à l'inputId de l'action
            formValid = formValid && action.isValid; // on met à jour la validité de mon formulaire
        } else {
            formValid = formValid && state.inputs[inputId].isValid; // on met à jour la validité de mon formulaire
        }
    }   
            return { // on retourne un nouvel état
                ...state, // on utilise le spread operator pour garder l'état précédent et mettre à jour la valeur
                inputs: { // on met à jour les inputs de mon formulaire 
                    ...state.inputs, // on utilise le spread operator pour garder l'état précédent et mettre à jour la valeur
                    [action.inputId]: { // on met à jour l'inputId de mon formulaire  
                        value: action.value, // on met à jour la valeur de l'input
                        isValid: action.isValid // on met à jour la validité de l'input
                    }  
                },
                isValid: formValid // on met à jour la validité de mon formulaire
            };
        default:
            return state; // on retourne l'état précédent
    }
}   
// le réducteur est une fonction qui prend l'état actuel et une action, et retourne un nouvel état

const NouvellePlace = () => {  
    // Utilisation de useReducer pour gérer l'état du formulaire
    const [formState, dispatch] = useReducer(formReducer, { // on utilise le hook useReducer pour gérer l'état de mon formulaire    
        inputs: { // on initialise l'état de mon formulaire
            title: { // on initialise l'état de mon input
                value: '', // valeur initiale de l'input
                isValid: false // validité initiale de l'input
            },
            description: { // on initialise l'état de mon input
                value: '', // valeur initiale de l'input
                isValid: false // validité initiale de l'input
            }
        },
        isValid: false // validité initiale de mon formulaire
    }); // on initialise l'état de mon formulaire avec un objet qui contient les inputs et la validité du formulaire


    const inputHandler = useCallback((id, value, isValid) => { // ces trois paramètres sont passés par le composant Input
        dispatch({ // on utilise la fonction dispatch pour mettre à jour l'état de mon formulaire
            type: 'INPUT_CHANGE', // type d'action
            value: value, // valeur de l'input
            isValid: isValid, // validité de l'input
            inputId: id // id de l'input
        }); // on utilise la fonction dispatch pour mettre à jour l'état de mon formulaire
    }, []); // useCallback est un hook qui permet de mémoriser une fonction et de ne pas la recréer à chaque rendu du composant
    
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