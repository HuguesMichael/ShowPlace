import react,{useState} from "react";
import "./ItemPlace.css";
import Card from "../../Partage/composants/UIElements/Card";
import Button from "../../Partage/composants/FormElements/Button";
import Modal from "../../Partage/composants/UIElements/Modal";
import React from "react";
import Map from "../../Partage/composants/UIElements/Map"; // Importation du composant Map


const ItemPlace = props => {
    const [VoirCarte, setVoirCarte] = useState(false); // Etat pour afficher ou masquer le modal
    const ouvrirCarteHandler = () => {
        setVoirCarte(true); // Ouvre le modal
    };
    const fermerCarteHandler = () => { 
        setVoirCarte(false); // Ferme le modal
    }

    return <React.Fragment>
    <Modal
        show={VoirCarte} // Affiche le modal si l'état est vrai
        onCancel={fermerCarteHandler} // Ferme le modal lorsque l'utilisateur clique en dehors de celui-ci
        header={props.address} // Titre du modal
        footer={<Button inverse onClick={fermerCarteHandler}>FERMER</Button>} // Bouton pour fermer le modal    
        contentClass="item-place__modal-content" // Classe CSS pour le contenu du modal
        headerClass="item-place__modal-header" // Classe CSS pour l'en-tête du modal
        footerClass="item-place__modal-actions" // Classe CSS pour le pied de page du modal
        > {/* Affichage de la carte sans utiliser le composant Map  mais plutot une iframe */}
         <div className="map-container" style={{padding:"5px"}}>
          <iframe title="map" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
          src={'https://maps.google.com/maps?q=' + props.coordonnees.lat.toString() + ',' + props.coordonnees.lng.toString() + '&t=&z=15&ie=UTF8&iwloc=&output=embed'}>
         </iframe><script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=5a33be79e53caf0a07dfec499abf84b7b481f165'></script>
        </div>
        {/* Utilisation du composant Map pour afficher la carte 
          mais une erreur s'affiche dans la console: "Uncaught TypeError: Cannot read properties of undefined (reading 'Map')"
          Il faut s'assurer que la bibliothèque OpenLayers est correctement importée et que le composant Map est bien configuré.
        */}
        {/*<div className="map-container" >
          <Map center={props.coordonnees} zoom={16} /> 
        </div>*/}

        </Modal>
     <li className="item-place">  
    <Card className="item-place__card"> 
        <div className="item-place__image">
            <img src={props.image} alt={props.title} />
        </div>
        <div className="item-place__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
        </div>
        <div className="item-place__actions">
            <Button inverse onClick={ouvrirCarteHandler} >VOIR SUR LA CARTE</Button> 
            <Button to={`/places/${props.id}`}>Modifier</Button> 
            <Button danger>Supprimer</Button>
            </div>
        </Card>
    </li>
    </React.Fragment>; 
}

export default ItemPlace;