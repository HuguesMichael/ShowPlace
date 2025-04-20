import react from "react";
import ListePlaces from "../composants/ListePlaces";
import {useParams} from "react-router-dom";


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

const UtilisateurPlaces = () => {
    //const [places, setPlaces] = useState([]);
    const userId = useParams().userId; // Récupération de l'ID de l'utilisateur depuis l'URL
    const loadedPlaces = PLACE_PROVISOIRE.filter(place => place.creator === userId); // Filtrage des places par utilisateur
    return <ListePlaces
        items={loadedPlaces}
        onCreatePlace={() => {}}
        onDeletePlace={() => {}}
        onEditPlace={() => {}}
        onViewMap={() => {}} 
        />;
}   

export default UtilisateurPlaces;