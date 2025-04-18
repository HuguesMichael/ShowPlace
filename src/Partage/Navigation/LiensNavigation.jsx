import React from "react";
import "./LiensNavigation.css"; // Importation du fichier CSS
import { NavLink } from "react-router-dom"; // Importation de NavLink pour la navigation    

const LiensNavigation = props => {  
    return (
        <ul className="liens-navigation">
            <li className="liens-navigation__element">
                <NavLink to="/" exact> 
                   Tous les Utilisateurs
                </NavLink>
            </li>
            <li className="liens-navigation__element">
                <NavLink to="/u1/places/" exact> 
                    Mes lieux
                </NavLink>
            </li>
            <li className="liens-navigation__element">
                <NavLink to="/places/nouvelle" exact> 
                    Ajouter lieu
                </NavLink>
            </li>
            <li className="liens-navigation__element">
                <NavLink to="/authentification" exact> 
                    Authentification
                </NavLink>
            </li>
        </ul>
    );
} 

export default LiensNavigation;