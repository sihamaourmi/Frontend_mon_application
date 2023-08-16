import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Inscription from './Components/Inscription/Inscription';
import AllUtilisateur from './Components/AllUtilisateur/AllUtilisateur';
import NewDemande from './Components/NewDemande/NewDemande';
import AllDemande from './Components/AllDemande/AllDemande';
import EditUtilisateur from './Components/EditUtilisateur/EditUtilisateur';
import EditDemande from './Components/EditDemande/EditDemande';
import NewTache from './Components/NewTache/NewTache';
import AllTache from './Components/AllTache/AllTache';
import EditTache from './Components/EditTache/EditTache';
import Traitement from './Components/Traitement/Traitement';

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/new-utilisateur' element={<Inscription/>}/>
        <Route path='/allutilisateur' element={<AllUtilisateur/>}/>
        <Route path='/utilisateur/:id' element={<EditUtilisateur/>}/>
        <Route path='/new-demande' element={<NewDemande/>}/>
        <Route path='/alldemande' element={<AllDemande/>}/>
        <Route path='/demande/:id' element={<EditDemande/>}/>
        <Route path='/new-tache/:id' element={<NewTache/>}/>
        <Route path='/alltache/:num_demande' element={<AllTache/>}/>
        <Route path='/tache/:id' element={<EditTache/>}/>
        <Route path='/traitement/:id' element={<Traitement/>}/>
      </Routes>

    </div>
  );
}

export default App;
