import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function Inscription() {
  let navigate = useNavigate();
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

  const handelSubmit = (event)=>{
      event.preventDefault();
      if(file){
          const formData = new FormData();
          formData.append('file',file);//ajouter à l'interieur de formdata un element file
          formData.append('nom',nom);
          formData.append('prenom',prenom);
          formData.append('email',email);
          formData.append('service',service);
          formData.append('password',password);
          formData.append('imagename',imagename);
          formData.append('admin',service==='admin');
          axios.post(`http://localhost:5000/submit-login`,formData)
          .then(( response )=>{
              console.log(response.data);
              return navigate("/allutilisateur");
          }).catch(( error )=>{
              console.log(error);
          });
  }}
  return (
    <React.Fragment>
<div class="container">
      <div> 
        <h3 class="text-center bg-info text-white mt-3 mb-3 ">Créez un nouveau compte</h3>
      </div>
      <div class="row align-items-center  border ">

      <form  onSubmit={handelSubmit} >


      <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel fs-3 " >Nom  </label>
        </div>
        <div class="col-md-2 ">
        <input type="text" class="form-control"  name="nom" onChange={handelNomChange}/>
        </div>
        </div>

        <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel fs-3 " >Prénom  </label>
        </div>
        <div class="col-md-2 ">
        <input  type="text" class="form-control"   name="prenom" onChange={handelPrenomChange} />
        </div>
        </div>

        <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel fs-3 ">Email   </label>
        </div>
        <div class="col-md-2 ">
        <input type="email" class="form-control"  name="email" onChange={handelEmailChange} />
        </div>
        </div>

        <div class="row paddingTop">
      <div class="col-md-6 ">
        <label class="form-label rightLabel fs-3 ">Service  </label>
        </div>
        <div class="col-md-3 ">
        <select name="service" class="form-select"  onChange={handelServiceChange}>
          <option>Sélectionnez votre Service </option>
          <option >admin</option>
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
        <label class="form-label rightLabel fs-3 " >Mot de passe   </label>
        </div>
        <div class="col-md-2 ">
        <input type="password"  class="form-control" name="password" onChange={handelPasswordChange} />
        </div>
        </div>


        

        <div class="row paddingTop">
      <div class="col-md-6 ">
         <label class="form-label rightLabel fs-3 ">Photo </label>
         </div>
         <div class="col-md-3 ">
         <input type="file"  class="form-control" onChange={handelFileChange}/>
         </div>
         </div>

         <div class="row paddingTop paddingBtn">
         <div class="col-md-7">
        <button type='submit' class="btn btn-primary rightLabel">Valider</button>
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

export default Inscription

