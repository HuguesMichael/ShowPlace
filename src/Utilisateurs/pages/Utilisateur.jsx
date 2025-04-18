import React from 'react';
import ListeUtilisateurs from '../composants/ListeUtilisateurs'; // Importation du composant ListeUtilisateurs
const Utilisateur = () => {
   const UTILISATEURS=[
  {
   id:"u1", 
   nom:"Temgoua", 
   image:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Maple_Leaf_%28from_roundel%29.png/330px-Maple_Leaf_%28from_roundel%29.png",
   nombreDePlaces:3
  },
  {
    id:"u2", 
    nom:"Hugues", 
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Maple_Leaf_%28from_roundel%29.png/330px-Maple_Leaf_%28from_roundel%29.png",
    nombreDePlaces:5
   }]; // contiendra les utilisateurs provenant de la base de données
  // const [utilisateurs, setUtilisateurs] = useState([]); // État pour stocker les utilisateurs
  return (
   <ListeUtilisateurs utilisateurs={UTILISATEURS}/>
  );
}
export default Utilisateur;