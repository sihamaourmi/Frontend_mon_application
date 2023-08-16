import React ,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


//pour les dates 
import moment from 'moment/moment';
import 'moment/locale/fr'


function EditTache() {

  let navigate = useNavigate();
  const params = useParams();

 //Données
 const[tache,setTache] = useState({})

 const [file,setFile] = useState(null);
 const [num_demande,setNum_demande] = useState('');
 const [employe,setEmploye] = useState ('');
 const [service,setService] = useState('');
 const [num_tache,setNum_tache] = useState('');
 const [description_tache,setDescription_tache] = useState('');
 const [date_prevue,setDate_prevue] = useState(''); 
 const [date_realisation,setDate_realisation] = useState(''); 
 const [statut,setStatut] = useState(''); 
 const [photo,setPhoto] = useState('');


const handelFileChange = (event)=>{
  setFile(event.target.files[0]);
  setPhoto(event.target.files[0].name); 
};
const handelNum_demandeChange = (event)=>{
  setNum_demande(event.target.value);
};
const handelEmployeChange = (event)=>{
  setEmploye(event.target.value);
};
const handelServiceChange = (event)=>{
  setService(event.target.value);
};

const handelNum_tacheChange = (event)=>{
  setNum_tache(event.target.value);
};
const handelDescription_tacheChange = (event)=>{
  setDescription_tache(event.target.value);
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









useEffect(()=>{
  axios.get(`http://localhost:5000/tache/${params.id}`,{withCredentials:true})
  .then(result =>{
    var response=result.data;
      setTache(response.data)
      setNum_demande(response.data.num_demande)
      setEmploye(response.data.employe)
      setService(result.data.service)
      setNum_tache(response.data.num_tache)
      setDescription_tache(response.data.description_tache)
      setDate_prevue(response.data.date_prevue)
      setDate_realisation(response.data.date_realisation)
      setStatut(response.data.statut)
      setPhoto(response.data.photo)
      
  }).catch(error =>{
    console.log(error);
  })
},[])

const handelSubmit = (event)=>{
    event.preventDefault();
    
      const formData = new FormData();
      formData.append('file',file);//ajouter à l'interieur de formdata un element file
      formData.append('num_demande',num_demande);
      formData.append('employe',employe);
      formData.append('service',service);
      formData.append('num_tache',num_tache);
      formData.append('description_tache',description_tache);
      formData.append('date_prevue',date_prevue);
      formData.append('date_realisation',date_realisation);
    //  if(file){
      console.log("=================>"+service);
        if(service==="Conception"){
          formData.append('statut',statut);
          if(file){
          formData.append('photo',photo);
          }

        }
        else if(service==="Fabrication"){
          formData.append('statutFabrication',statut);
          if(file){
          formData.append('photoFabrication',photo);
          }
        }
        else if(service==="Automatisation"){
          formData.append('statutAutomatisation',statut);
          if(file){
          formData.append('photoAutomatisation',photo);
          }
        }
    //  }
        axios.put(`http://localhost:5000/tache/edit/${params.id}`,formData)
        .then(( response )=>{
            console.log(response.data);
            return navigate("/alltache/"+num_demande);
        }).catch(( error )=>{
            console.log(error);
        });
}
  return (
      <React.Fragment>
    <div class="container">
        <div> 
          <h3 class="text-center bg-info text-white mt-3 mb-3"> Modifier la Tache</h3>
          </div>

          <div class="row align-items-center  border ">
<form  onSubmit={handelSubmit} >

<div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Num Demande :</label>
          </div>
          <div class="col-md-2">
  <input type="text"  name="num_demande" class="form-control" onChange={handelNum_demandeChange} value={num_demande} disabled/>
  </div>
          </div>



          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Employe :</label>
          </div>
          <div class="col-md-2">
  <input type="text"  name="employe"  class="form-control" onChange={handelEmployeChange} value={employe} disabled/>
  </div>
          </div>

          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Service :</label>
          </div>
          <div class="col-md-3">
  <select name="service" value={service} class="form-select" onChange={handelServiceChange} disabled>
    <option>Sélectionnez votre Service </option>
    <option >Conception</option>
    <option >Automatisation</option>
    <option >Fabrication</option>
    <option >Assemblage</option>
   </select>
   </div>
          </div>
   

          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Num de la tache :</label>
          </div>
          <div class="col-md-2">
  <input type="number"  name="num_tache" class="form-control"  onChange={handelNum_tacheChange } value={num_tache} disabled/>
  </div>
          </div>
  
          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" > Description de la tache :</label>
          </div>
          <div class="col-md-3">
  <textarea type="text"  name="description_tache" class="form-control"  onChange={handelDescription_tacheChange} value={description_tache} />
  </div>
          </div>
  
          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" > Date Prevue :</label>
          </div>
          <div class="col-md-2">
  <input type="date"  name="date_prevue"  class="form-control" onChange={handelDate_prevueChange} value={moment(date_prevue).format('YYYY-MM-DD')} />
  </div>
          </div>
  
  
          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Date Realisation :</label>
          </div>
          <div class="col-md-2">
  <input type="date"  name="date_realisation" class="form-control" onChange={handelDate_realisationChange} value={moment(date_realisation).format('YYYY-MM-DD')} />
  </div>
          </div>
  
          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Statut :</label>
          </div>
          <div class="col-md-3">
  <select name="statut" class="form-select"  onChange={handelStatutChange}>
    <option>Sélectionnez vetat actuel de la tache </option>
    <option >Encours</option>
    <option >Terminer</option>
    <option >En retard</option>
    <option >Bloquer</option>
   </select>
   </div>
          </div>
   

      
          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Fichier :</label>
          </div>
          <div class="col-md-2">
           <input type="file"  class="form-control"  onChange={handelFileChange}/>
           </div>
          </div>
           

          <div class="row paddingTop paddingBtn">
         <div class="col-md-7">
        <button type='submit'  class="btn btn-primary rightLabel tailleBtn">Valider</button>
        </div>
        <div class="col-md-2">
        <a class="btn btn-secondary tailleBtn"   href={`/alltache/${num_demande}`} role="button">Annuler </a>
        </div>
        </div>
        
          
        </form>
  
        </div>
  
        </div>
      </React.Fragment>
    )
  }

export default EditTache