import React ,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function EditUtilisateur() {


  let navigate = useNavigate();
    const params = useParams();
 //Données
 const[utilisateur,setUtilisateur] = useState({})
  const [file,setFile] = useState(null);
  const [nom,setNom] = useState('');
  const [prenom,setPrenom] = useState ('');
  const [email,setEmail] = useState('');
  const [service,setService] = useState('');
  const [password,setPassword] = useState('');
  const [imagename,setImagename] = useState('');

   const handelFileChange = (event)=>{
    setFile(event.target.files[0]);
    setImagename(event.target.files[0].name); 
};
  const handelNomChange = (event)=>{
    setNom(event.target.value);
};
const handelPrenomChange = (event)=>{
  setPrenom(event.target.value);
};
const handelEmailChange = (event)=>{
  setEmail(event.target.value);
};
const handelServiceChange = (event)=>{
  setService(event.target.value);
};
const handelPasswordChange = (event)=>{
  setPassword(event.target.value);
};


 useEffect(()=>{
  axios.get(`http://localhost:5000/utilisateur/${params.id}`)
  .then(response =>{
      setUtilisateur(response.data)
      setNom(response.data.nom)
      setPrenom(response.data.prenom)
      setEmail(response.data.email)
      setService(response.data.service)
      setPassword(response.data.password)
     
      setImagename(response.data.imagename)
  }).catch(error =>{

      setUtilisateur({})
  })
}, [])
const handelSubmit = (event)=>{
  event.preventDefault();
  console.log("test");

      const formData = new FormData();
      formData.append('file',file);//ajouter à l'interieur de formdata un element file
          formData.append('nom',nom);
          formData.append('prenom',prenom);
          formData.append('email',email);
          formData.append('service',service);
          formData.append('password',password);
          if(file){
          formData.append('imagename',imagename);
          }
      
      axios.put(`http://localhost:5000/utilisateur/edit/${params.id}`,formData)
      .then(( response )=>{
          console.log(response.data);
          return navigate("/allutilisateur");
      }).catch(( error )=>{
          console.log(error);
      });
}

  return (
    <React.Fragment>
<div class="container">
      <div> 

      <h3  class="text-center bg-info text-white mt-3 mb-3 "> Modifier Utilisateur</h3>
    </div>
    <div class="row align-items-center  border ">
    <form  onSubmit={handelSubmit} >

    <div class="row paddingTop">
      <div class="col-md-6 ">
      <label class="form-label rightLabel fs-3 ">Nom  </label>
      </div>
      <div class="col-md-2 ">
      <input type="text" class="form-control" name="nom" onChange={handelNomChange} value={nom}/><br/><br/>
      </div>
        </div>
        <div class="row paddingTop">
      <div class="col-md-6 ">
      <label class="form-label rightLabel fs-3 "  >Prénom  </label>
      </div>
        <div class="col-md-2 ">
      <input type="text" class="form-control"  name="prenom" onChange={handelPrenomChange} value={prenom}/><br/><br/>
      </div>
        </div>
        <div class="row paddingTop">
      <div class="col-md-6 ">
      <label class="form-label rightLabel fs-3 ">Email   </label>
      </div>
        <div class="col-md-2 ">
      <input type="email" class="form-control" name="email" onChange={handelEmailChange} value={email}/><br/><br/>
      </div>
        </div>

        <div class="row paddingTop">
      <div class="col-md-6 ">
      <label class="form-label rightLabel fs-3 ">Service </label>
      </div>
        <div class="col-md-3 ">
      <select name="service" class="form-select" value={service} onChange={handelServiceChange}>
        <option>Sélectionnez votre Service </option>
        <option >Conception</option>
        <option >Fabrication</option>
        <option >Automatisation</option>
        <option >Assemblage</option>
        <option >Qualite</option>
        <option >Production</option>
        <option >Maitenance</option>
        <option >Methode</option>
       </select>
       </div>
         </div>

         <div class="row paddingTop">
           <div class="col-md-6 ">
      <label class="form-label rightLabel fs-3 "  >Mot de passe   </label>
      </div>
        <div class="col-md-2 ">
      <input type="password" class="form-control" name="password" onChange={handelPasswordChange}  value={password} /><br/><br/>
      </div>
        </div>

      

        <div class="row paddingTop">
      <div class="col-md-6 ">
       <label class="form-label rightLabel fs-3 ">Photo </label>
       </div>
         <div class="col-md-3 ">
       <input type="file" class="form-control" onChange={handelFileChange}/><br/><br/>
       </div>
         </div>
         <div class="row paddingTop paddingBtn">
         <div class="col-md-7">
      <button type="submit" class="btn btn-primary rightLabel">Enregistrer</button>
      </div>
      <div class="col-md-2">
        <a class="btn btn-secondary "   href="/allutilisateur" role="button">Annuler </a>
        </div>
          </div>

    </form>
    </div>
      </div>



  </React.Fragment>
)
}

export default EditUtilisateur