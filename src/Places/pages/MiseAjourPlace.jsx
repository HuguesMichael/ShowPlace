import React from 'react';
import "./MiseAjourPlace.css";
import "./PlaceForm.css";
import { useParams } from 'react-router-dom';
import Input from '../../Partage/composants/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Partage/Util/validators'; // on importe la fonction validate qui va nous permettre de valider notre input
import Button from '../../Partage/composants/FormElements/Button';
import { useCallback, useReducer } from 'react';

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
    const placeId = useParams().placeId; // Récupération de l'ID de la place depuis l'URL
    const identifiedPlace = PLACE_PROVISOIRE.find(place => place.id === placeId); // Filtrage des places par utilisat
    if(!identifiedPlace) {
        return <div className='center'>Place non trouvée</div>; // Si la place n'est pas trouvée, on affiche un message d'erreur
    }

    return <form className="place-form">
        <Input
         id="title"
          element="input" 
          type="text" // type de l'input
          label="Titre"
           placeholder="Titre de la place" 
            validators={[VALIDATOR_REQUIRE()]} // ceci est un tableau de validations. Ici nous validons que le champ est requis
            errorText="Veuillez entrer un titre valide" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={()=>{}} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
            value={identifiedPlace.title} // valeur de l'input correspondant à la place identifiée
            valid={true} // validité de l'input
           
          />
           <Input
          id="description"
          element="textarea" 
          label="Description"
           placeholder="Description de la place" 
            validators={[VALIDATOR_MINLENGTH(5)]} // ceci est un tableau de validations. Ici nous validons que le champ taille au moins 5 caractères
            errorText="Veuillez entrer une description valide (au moins 5 caractères)" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={()=>{}} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
            // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
            value={identifiedPlace.description} // valeur du textarea correspondant à la place identifiée
            valid={true} // validité de l'input
           
          />
          <Button type="submit" disabled={true}>Mettre à jour</Button> 
    </form>;

}
export default MiseAjourPlace;