import React ,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function NewTache() {


let navigate = useNavigate();
const params = useParams();

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

//pour recuperer l'id et le num de la demande et l'afficher sur la tache et on a importer aussi useEffect en haut  de la page , et  aussi on ajoute la route /tache/:id sur app.js au lieu de /tache/
useEffect(()=>{

  setNum_demande(`${params.id}`)
  /*axios.get(`http://localhost:5000/demande/${params.id}`)
  .then(response =>{

      setNum_demande(response.data.num_demande)

      
  }).catch(error =>{
    console.log(error);
  })*/
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
        formData.append('statut',statut);
        if(file){
        formData.append('photo',photo);
        }
        axios.post(`http://localhost:5000/submit-tache`,formData)
        .then(( response )=>{
            console.log(response.data);
            return navigate("/alltache/"+num_demande);
        }).catch(( error )=>{
            console.log(error);
        });
}

axios.get(`http://localhost:5000/alltaches`,{withCredentials:true})
.then(response=>{
  //  console.log("dsdsdsdsds  "+response.data.data);


    var lastTask= response.data.data.reduce(
      (prev, current) => {
        //console.log(current.num_tache);
        return parseInt(prev.num_tache,10) > parseInt(current.num_tache,10) ? prev : current
      }).num_tache;
      setNum_tache(parseInt(lastTask,10)+1);
      setEmploye(response.data.nom)
      setService(response.data.service)

        //dispatch({type: 'FETCH_SUCCESS' , payload: response.data});

    }).catch(error=>{  
         //dispatch({type: 'FETCH_ERROR'});
        });


  return (
    <React.Fragment>
  <div class="container">
      <div> 
        <h3 class="text-center bg-info text-white mt-3 mb-3">Nouvelle Tache</h3>
      </div>

      <div class="row align-items-center  border ">
      <form  onSubmit={handelSubmit} >

  {/* disabled pour griser le num de la demande pour qu'il soit juste pour l'affichafge au niveau du service indus */}
  <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Num Demande :</label>
          </div>
          <div class="col-md-2">
        <input type="text" class="form-control"  name="num_demande" onChange={handelNum_demandeChange} value={num_demande} disabled />
        </div>
          </div>

          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Employe :</label>
          </div>
          <div class="col-md-2">
        <input type="text" class="form-control" name="employe" onChange={handelEmployeChange} value={employe} disabled/>
        </div>
          </div>
        

          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Service :</label>
          </div>
          <div class="col-md-3">
        <select name="service" class="form-select"  value={service} onChange={handelServiceChange} disabled>
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
        <input type="number"  name="num_tache" class="form-control" onChange={handelNum_tacheChange } value={num_tache} disabled/>
        </div>
          </div>
        
          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" > Description de la tache :</label>
          </div>
          <div class="col-md-3">
        <textarea type="text" class="form-control" name="description_tache" onChange={handelDescription_tacheChange} />
        </div>
          </div>
        
          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" > Date Prevue :</label>
          </div>
          <div class="col-md-2">
        <input type="date" class="form-control"  name="date_prevue" onChange={handelDate_prevueChange} />
        </div>
          </div>
        
        
          <div class="row paddingTop">
      <div class="col-md-6 ">
          <label class="form-label rightLabel" >Date Realisation :</label>
          </div>
          <div class="col-md-2">
        <input type="date" class="form-control"  name="date_realisation" onChange={handelDate_realisationChange} />
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
         <input type="file" class="form-control"  onChange={handelFileChange}/>
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

export default NewTache