import React ,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

//pour les dates 
import moment from 'moment/moment';
import 'moment/locale/fr'


function EditDemande() {

  let navigate = useNavigate();
  const params = useParams();

 //Données
 const[demande,setDemande] = useState({})

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
const [statut,setStatut] = useState('');
const [date_validation,setDate_validation] = useState('');
const [image,setImage] = useState('');



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
useEffect(()=>{
  axios.get(`http://localhost:5000/demande/${params.id}`,{withCredentials:true})
  .then(result =>{
    var response=result.data;

      setDemande(response.data)
      setNum_demande(response.data.num_demande)
      setClient(response.data.client)
      setService(response.data.service)
      setNum_ligne(response.data.num_ligne)
      setNom_machine(response.data.nom_machine)
      setZone(response.data.zone)
      setDegre_urgence(response.data.degre_urgence)
      setDescription(response.data.description)
      setDate_prevue(response.data.date_prevue)
      setDate_realisation(response.data.date_realisation)
      setStatut(response.data.statut)
      setDate_validation(response.data.date_validation)
      setImage(response.data.image)
      
  }).catch(error =>{
    console.log(error);
  })
},[])

const handelSubmit = (event)=>{
    event.preventDefault();
    alert(file);
  
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
        if(file){
        formData.append('image',image);
        }
        formData.append('date_validation',date_validation);
        formData.append('statut',statut);
        axios.put(`http://localhost:5000/demande/edit/${params.id}`,formData)
        .then(( response )=>{
            console.log(response.data);
            return navigate("/alldemande");
        }).catch(( error )=>{
            console.log(error);
        });
}
  return (
      <React.Fragment>
  
  <div class="container">
        <div> 
          <h3 class="text-center bg-info text-white mt-3 mb-3"> Modifier la Demande</h3>
        </div>
  
        <div class="row align-items-center  border ">
        <form  onSubmit={handelSubmit} >  
  
        <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Num Demande :</label>
          </div>
          <div class="col-md-2">
          <input type="text" class="form-control"  name="num_demande" onChange={handelNum_demandeChange} value={num_demande} disabled/>
          </div>
          </div>
  
          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel">Client :</label>
          </div>
          <div class="col-md-2">
          <input type="text"  class="form-control" name="client" onChange={handelClientChange} value={client} disabled/>
          </div>
          </div>
  
          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Num Ligne :</label>
          </div>
          <div class="col-md-2">
          <input type="number" class="form-control"  name="num_ligne" onChange={handelNum_ligneChange }   value={num_ligne}/>
          </div>
          </div>


          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Service :</label>
          </div>
          <div class="col-md-3">
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
          <label class="form-label rightLabel" >Nom machine :</label>
          </div>
          <div class="col-md-2">
          <input type="text"   class="form-control"  name="nom_machine" onChange={handelNom_machineChange }  value={nom_machine}/>
          </div>
          </div>

          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Zone :</label>
          </div>
          <div class="col-md-3">
          <select name="zone" class="form-select" value={zone} onChange={handelZoneChange}>
            <option>Sélectionnez la zone </option>
            <option >Gecleur</option>
            <option >Bobine</option>
            <option >Electrovain</option>
           </select>
           </div>
           </div>

           <div class="row paddingTop">
      <div class="col-md-6 ">
           <label class="form-label rightLabel" >Degre D'urgence :</label>
           </div>
           <div class="col-md-3">
           <select name="degre_urgence" class="form-select" value={degre_urgence} onChange={handelDegre_urgenceChange}>
            <option>Sélectionnez urgence </option>
            <option value="AM" >Arret Machine</option>
            <option value="AP">Arret Production</option>
            <option value="AC">Amelioration continue</option>
           </select>
           </div>
           </div>

           <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel"> Description :</label>
          </div>
          <div class="col-md-3">
          <textarea type="text"   class="form-control" name="description" onChange={handelDescriptionChange}  value={description}/>
          </div>
           </div>


           <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel">Date Prevue :</label>
          </div>
          <div class="col-md-2">
          <input type="date" class="form-control" name="date_prevue" onChange={handelDate_prevueChange} value={moment(date_prevue).format('YYYY-MM-DD')} />
          </div>
           </div>

           <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel">Date Realisation :</label>
          </div>
          <div class="col-md-2">
          <input type="date" class="form-control" name="date_realisation" onChange={handelDate_realisationChange}  value={date_realisation} disabled/>
          </div>
           </div>

           <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel">Statut :</label>
          </div>
          <div class="col-md-3">
         <select name="statut" class="form-select" onChange={handelStatutChange} disabled>
          <option>Sélectionnez etat d'avancement </option>
          <option >Accepter</option>
          <option >En cours</option>
          <option >Terminer</option>
          <option selected>A traiter</option>
          <option >Attend validation</option>
          <option >Valider</option>
         </select> 
          </div>
           </div>
         
           <div class="row paddingTop">
      <div class="col-md-6 ">
         <label class="form-label rightLabel">Date Validation </label>
         </div>
          <div class="col-md-2">
        <input type="date" class="form-control"  name="date_validation" onChange={handelDate_validationChange} value={date_validation} disabled/><br/><br/>
        </div>
           </div>
          
           <div class="row paddingTop">
      <div class="col-md-6 ">
           <label class="form-label rightLabel">Fichier :</label>
           </div>
          <div class="col-md-2">
           <input type="file"  class="form-control"   onChange={handelFileChange}/>
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
    )
  }

export default EditDemande