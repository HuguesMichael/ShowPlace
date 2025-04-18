import react from "react";
import "./ItemPlace.css";
import Card from "../../Partage/composants/UIElements/Card";

const ItemPlace = props => {
    return <li className="item-place">  
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
            <button className="btn">VOIR SUR LA CARTE</button> 
            <button className="btn">Modifier</button> 
            <button className="btn">Supprimer</button>
            </div>
        </Card>
    </li>;
}

export default ItemPlace;