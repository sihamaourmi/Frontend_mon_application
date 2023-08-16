import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Navbar from '../NavBar/NavBar'


function NewDemande() {

let navigate = useNavigate();
const [file,setFile] = useState(null);
const [num_demande,setNum_demande] = useState('');
const [client,setClient] = useState ('');
const [service,setService] = useState('');
const [num_ligne,setNum_ligne] = useState('');
const [nom_machine,setNom_machine] = useState('');
const [zone,setZone] = useState('');
const [degre_urgence,setDegre_urgence] = useState(''); 
const [description,setDescription] = useState('');
const [date_prevue,setDate_prevue] = useState(''); 
const [date_realisation,setDate_realisation] = useState(''); 
const [image,setImage] = useState('');
const [date_validation,setDate_validation] = useState('');
const [statut,setStatut] = useState('');



//Ccounteur demande 












const handelFileChange = (event)=>{
  setFile(event.target.files[0]);
  setImage(event.target.files[0].name); 
};
const handelNum_demandeChange = (event)=>{
  setNum_demande(event.target.value);
};
const handelClientChange = (event)=>{
  setClient(event.target.value);
};
const handelNum_ligneChange = (event)=>{
  setNum_ligne(event.target.value);
  };
const handelServiceChange = (event)=>{
  
  setService(event.target.value);
};

const handelNom_machineChange = (event)=>{
  setNom_machine(event.target.value);
};
const handelZoneChange = (event)=>{
  setZone(event.target.value);
};
const handelDegre_urgenceChange = (event)=>{
  setDegre_urgence(event.target.value);
};
const handelDescriptionChange = (event)=>{
  setDescription(event.target.value);
};
const handelDate_prevueChange = (event)=>{
  setDate_prevue(event.target.value);
};
const handelDate_realisationChange = (event)=>{
  setDate_realisation(event.target.value);
};
const handelStatutChange = (event)=>{
  setStatut(event.target.value);
};
const handelDate_validationChange = (event)=>{
  setDate_validation(event.target.value);
};


  //{withCredentials:true}:Pour authentification


const handelSubmit = (event)=>{
    event.preventDefault();
    if(file){
        const formData = new FormData();
        formData.append('file',file);//ajouter à l'interieur de formdata un element file
        formData.append('num_demande',num_demande);
        formData.append('client',client);
        formData.append('service',service);
        formData.append('num_ligne',num_ligne);
        formData.append('nom_machine',nom_machine);
        formData.append('zone',zone);
        formData.append('degre_urgence',degre_urgence);
        formData.append('description',description);
        formData.append('date_prevue',date_prevue);
        formData.append('date_realisation',date_realisation);
        formData.append('statut',statut);
        formData.append('date_validation',date_validation);
        formData.append('image',image);
        
        axios.post(`http://localhost:5000/submit-demande`,formData)
        .then(( response )=>{
            console.log(response.data);
            return navigate("/alldemande");
        }).catch(( error )=>{
            console.log(error);
        });
}}


axios.get('http://localhost:5000/alldemande',{withCredentials:true})
.then(response=>{

    

    var lastDemand= response.data.data.reduce(
      (prev, current) => {
        return parseInt(prev.num_demande,10) > parseInt(current.num_demande,10) ? prev : current
      }).num_demande;
      setNum_demande(parseInt(lastDemand,10)+1);
      setClient(response.data.nom)
      setService(response.data.service)
      

      //  dispatch({type: 'FETCH_SUCCESS' , payload: response.data});

    }).catch(error=>{  
      console.log("errrooooooooooooor");
        // dispatch({type: 'FETCH_ERROR'});
      });


  return (

    <React.Fragment>
<Navbar />
<React.Fragment> 
<div class="container">
      <div> 
      <h3 class="text-center bg-info text-white mt-3 mb-3">Nouvelle Demande</h3>
      </div>
      <div class="row align-items-center  border ">

      <form  onSubmit={handelSubmit} >

      <div class="row paddingTop">
      <div class="col-md-6 ">
        <label  for="num_demande"  class="form-label rightLabel" >Num Demande :</label>
        </div>
        <div class="col-md-2 ">
        <input type="text" class="form-control"   name="num_demande" id="num_demande" value={num_demande} onChange={handelNum_demandeChange} disabled/>
         </div>
         </div>


         <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel" >Client :</label>
        </div>
        
        <div class="col-md-2 ">
        <input type="text"  class="form-control"  name="client" onChange={handelClientChange} value={client} disabled/>
        </div>
        </div>

        
        <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel">Num Ligne :</label>
        </div>
        <div class="col-md-2 ">
        <input type="number" class="form-control" name="num_ligne" onChange={handelNum_ligneChange } />
        </div>
        </div>

        <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel">Service :</label>
        </div>
        <div class="col-md-3 ">
        <select name="service" class="form-select" value={service} onChange={handelServiceChange} disabled>
          <option>Sélectionnez votre Service </option>
          <option >Qualite</option>
          <option >Production</option>
          <option >Maitenance</option>
          <option >Methode</option>
         </select>
         </div>
         </div>
         <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel">Nom machine :</label>
        </div>
        <div class="col-md-2 ">
        <input type="text" class="form-control"  name="nom_machine" onChange={handelNom_machineChange } />
        </div>
        </div>

        <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel">Zone :</label>
        </div>
        <div class="col-md-3 ">
        <select name="zone" class="form-select" onChange={handelZoneChange}>
          <option>Sélectionnez la zone </option>
          <option >Gecleur</option>
          <option >Bobine</option>
          <option >Electrovain</option>
         </select>
         </div>
         </div>
         <div class="row paddingTop">
      <div class="col-md-6 ">
         <label class="form-label rightLabel">Degre D'urgence :</label>
         </div>
         <div class="col-md-3 ">
         <select name="degre_urgence" class="form-select" onChange={handelDegre_urgenceChange}>
          <option>Sélectionnez urgence </option>
          <option >Arret Machine</option>
          <option >Arret Production</option>
          <option >Amelioration continue</option>
         </select>
         </div>
         </div>

         <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel"> Description :</label>
        </div>
        <div class="col-md-3 ">
        <textarea   class="form-control" name="description" onChange={handelDescriptionChange} />
        </div>
        </div>


        <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel" >Date Prevue :</label>
        </div>
        <div class="col-md-2 ">
        <input type="date"  class="form-control"  name="date_prevue" onChange={handelDate_prevueChange} />
        </div>
        </div>

        <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel">Date Realisation :</label>
        </div>
        <div class="col-md-2 ">
        <input type="date" class="form-control"  name="date_realisation" onChange={handelDate_realisationChange} disabled/>
        </div>
        </div>

        <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel">Statut :</label>
        </div>
        <div class="col-md-3 ">
         <select name="statut" class="form-select" onChange={handelStatutChange} >
          <option selected>Sélectionnez etat d'avancement </option>
          <option >Accepter</option>
          <option >En cours</option>
          <option >Terminer</option>
          <option  >A traiter</option>
          <option >Pre-validation</option>
          <option >Valider</option>
         </select>
         </div>

         </div>
        
         <div class="row paddingTop">
      <div class="col-md-6 ">
         <label  class="form-label rightLabel">Date Validation :</label>
         </div>
         <div class="col-md-2 ">
        <input type="date"   class="form-control" name="date_validation" onChange={handelDate_validationChange}  disabled />
        </div>
         </div>

         <div class="row paddingTop">
      <div class="col-md-6 ">
         <label class="form-label rightLabel">Fichier</label>
         </div>
         <div class="col-md-2 ">
         <input type="file" class="form-control" onChange={handelFileChange}/>
         </div>
         </div>
         <div class="row paddingTop paddingBtn">
         <div class="col-md-7">
        <button type='submit'  class="btn btn-primary rightLabel tailleBtn">Valider</button>
        </div>
        <div class="col-md-2">
        <a class="btn btn-secondary tailleBtn"   href="/alldemande" role="button">Annuler </a>
        </div>
        </div>
      
      </form>
      </div>
      </div>
      </React.Fragment>

      </React.Fragment>
    
  )
}

export default NewDemande