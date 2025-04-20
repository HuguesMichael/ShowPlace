import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom';
import Utilisateur from './Utilisateurs/pages/Utilisateur';
import UtilisateurPlaces from './Places/pages/UtilisateurPlaces';
 import NouvellePlace from './Places/pages/NouvellePlace'; // Importation de la page NouvellePlace
import MiseAjourPlace from './Places/pages/MiseAjourPlace'; // Importation de la page MiseAjourPlace
 import NagitionPrincipale from './Partage/Navigation/NavigationPrincipale';

const App = () => {
  return (
    <Router>
      <NagitionPrincipale /> {/* Utilisation de la navigation principale */}
      <main>
      <Switch>
          {/* Définition des routes */}
        
          <Route path="/" exact> 
            <Utilisateur />
          </Route>
          <Route path="/utilisateur/:userId/places" exact>
            <UtilisateurPlaces /> {/* Utilisation de la page UtilisateurPlaces */}
          </Route>
          <Route path="/places/nouvelle" exact>
            <NouvellePlace /> {/* Utilisation de la page NouvellePlace */}  
          </Route>
          <Route path="/places/:placeId" exact>
            <MiseAjourPlace /> {/* Utilisation de la page Mise à jour */}  
          </Route>
        <Redirect to="/" />
      </Switch>
      </main>
    </Router>
  );
}

export default App;
