import react from "react";
import "./ListePlaces.css";
import Card from "../../Partage/composants/UIElements/Card";
import ItemPlace from "./ItemPlace";

const ListePlaces = props => {
    if(props.items.length === 0) { 
      return <div className="liste-places-center">
        <Card className="liste-places-card">
          <h2>Aucune place trouvée. Voulez-vous en creer une?</h2>
          <button className="btn" onClick={props.onCreatePlace}>Creer une place</button>    
        </Card>
        </div>;
    }
    return (
        <ul className="liste-places">
            {props.items.map(place => {
                return (
                    <ItemPlace
                        key={place.id}
                        id={place.id}
                        image={place.imageUrl}
                        title={place.title}
                        description={place.description}
                        address={place.address}
                        creatorId={place.creator}
                        coordonnees={place.localisation}
                    />
                );
            })}
        </ul>
    );
                    
}
export default ListePlaces;