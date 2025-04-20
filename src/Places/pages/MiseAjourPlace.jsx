import React, {use, useEffect,useState}from 'react';
import "./MiseAjourPlace.css";
import "./PlaceForm.css";
import { useParams } from 'react-router-dom';
import Input from '../../Partage/composants/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Partage/Util/validators'; // on importe la fonction validate qui va nous permettre de valider notre input
import Button from '../../Partage/composants/FormElements/Button';
import { useCallback, useReducer } from 'react';
import { useForm } from '../../Partage/hooks/Form-hooks'; // on importe le hook useForm qui va nous permettre de gérer l'état de mon formulaire

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
    }
];

const  MiseAjourPlace = () => {
    const [isLoading, setIsLoading] = useState(true); // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation

    const placeId = useParams().placeId; // Récupération de l'ID de la place depuis l'URL
    
    {/* pour un depart on met value='' et isValid=false pour patientier que le chargement des bonnes valeurs
        depuis la base de données et une fois cela fais on utilisera setDataform pour mettre les bonnes valeurs
        on fait cela car les hooks ne peuvent pas être utilisés dans une condition, 
        donc on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
        */}


    const [formState, inputHandler, setFormData] = useForm({

        title: { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
            value: '', // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
            isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
        },
        description: { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
            value: '', // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
            isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
        }
    },false )

    const identifiedPlace = PLACE_PROVISOIRE.find(place => place.id === placeId); // Filtrage des places par utilisat
   
    useEffect(() => { // useEffect est un hook qui permet de gérer les effets de bord dans un composant fonctionnel
     setFormData({
        title: { 
            value: identifiedPlace.title, // valeur initiale provenant de la place identifiee après la requete de selection
            isValid: true // on met la validité de l'input à true car on a déjà une valeur valide
        },
        description: {
            value: identifiedPlace.description, // valeur initiale provenant de la place identifiee après la requete de selection
            isValid: true // on met la validité de l'input à true car on a déjà une valeur valide
        }
         // on met l'état de mon formulaire à false car le chargement est terminé
     }, true)// on utilise la fonction setFormData pour mettre à jour l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation 
     setIsLoading(false);
    }, [setFormData, identifiedPlace]); // on utilise le hook useEffect pour mettre à jour l'état de mon formulaire lorsque la place identifiée change
   
    if(!identifiedPlace) {
        return <div className='center'>
            <h2>Place non trouvée </h2>
            </div>; // Si la place n'est pas trouvée, on affiche un message d'erreur
    }

    if(isLoading) 
        { 
        return <div className='center'>
                 <h2>Loading..... </h2>
               </div>; 
    
    }

    const placeUpdateSubmitHandler = event => { // fonction qui sera appelée lors de la soumission du formulaire
        event.preventDefault(); // on empêche le rechargement de la page lors de la soumission du formulaire    
       console.log(formState.inputs); // on affiche les inputs du formulaire dans la console
       // ici on peut envoyer une requête HTTP pour mettre à jour la place dans la base de données
    }
 

    return <form className="place-form" onSubmit={placeUpdateSubmitHandler}> {/* onSubmit est une fonction qui sera appelée lors de la soumission du formulaire */}
        <Input
         id="title"
          element="input" 
          type="text" // type de l'input
          label="Titre"
           placeholder="Titre de la place" 
            validators={[VALIDATOR_REQUIRE()]} // ceci est un tableau de validations. Ici nous validons que le champ est requis
            errorText="Veuillez entrer un titre valide" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
           initialValue={formState.inputs.title.value} // valeur de l'input correspondant à la place identifiée
            initialValid={formState.inputs.title.isValid} // validité de l'input
           
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
            initialValue={formState.inputs.description.value} // valeur du textarea correspondant à la place identifiée
            initialValid={formState.inputs.description.isValid} // validité de l'input
           
          />
          <Button type="submit" disabled={!formState.isValid}>Mettre à jour</Button> 
    </form>;

}
export default MiseAjourPlace;