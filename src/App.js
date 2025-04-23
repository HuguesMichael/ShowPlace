import React,{useState,useCallback} from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom';
import Utilisateur from './Utilisateurs/pages/Utilisateur';
import UtilisateurPlaces from './Places/pages/UtilisateurPlaces';
 import NouvellePlace from './Places/pages/NouvellePlace'; // Importation de la page NouvellePlace
import MiseAjourPlace from './Places/pages/MiseAjourPlace'; // Importation de la page MiseAjourPlace
 import NagitionPrincipale from './Partage/Navigation/NavigationPrincipale';
 import Auth from './Utilisateurs/pages/Auth'; // Importation de la page Auth
import MotPasseOublie from './Utilisateurs/pages/MotPasseOublie';
import { AuthContext } from './Partage/context/auth-context'; // Importation du contexte d'authentification


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour gérer la connexion de l'utilisateur
  const login = useCallback(() => { // Fonction pour connecter l'utilisateur
    setIsLoggedIn(true); // Met à jour l'état de connexion
  }, []);
  const logout = useCallback(() => { // Fonction pour déconnecter l'utilisateur
    setIsLoggedIn(false); // Met à jour l'état de connexion
  }, []);

  let routes; // Déclaration de la variable routes
  if(isLoggedIn){ // Si l'utilisateur est connecté
    routes = ( // Définition des routes
      <Switch>
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
    );
  } else {
    routes = ( // Définition des routes
      <Switch>
        <Route path="/" exact> 
          <Utilisateur />
        </Route>
        <Route path="/utilisateur/:userId/places" exact>
          <UtilisateurPlaces /> {/* Utilisation de la page UtilisateurPlaces */}
        </Route>
        <Route path="/authentification" exact>
          <Auth /> {/* Utilisation de la page Auth */}  
        </Route>
        <Route path="/motPasseOublie" exact>
          < MotPasseOublie/> {/* Utilisation de la page MotPasseOublie */}  
        </Route>
        <Redirect to="/authentification" />
      </Switch>
    );
  } 

  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, login:login, logout:logout}}> {/* Fournisseur de contexte d'authentification */}
    <Router>
      <NagitionPrincipale /> {/* Utilisation de la navigation principale */}
      <main>
        <div className="contenu-principal"> {/* Conteneur principal */}
          {routes} {/* Affichage des routes */}
        </div>
      </main>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
