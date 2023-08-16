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
  if(file){
      const formData = new FormData();
      formData.append('file',file);//ajouter à l'interieur de formdata un element file
          formData.append('nom',nom);
          formData.append('prenom',prenom);
          formData.append('email',email);
          formData.append('service',service);
          formData.append('password',password);
          formData.append('imagename',imagename);
      
      axios.put(`http://localhost:5000/utilisateur/edit/${params.id}`,formData)
      .then(( response )=>{
          console.log(response.data);
          return navigate("/allutilisateur");
      }).catch(( error )=>{
          console.log(error);
      });
}}

  return (
    <React.Fragment>

    <div> 
      <h3> Modifier Utilisateur</h3>
    </div>

    <form  onSubmit={handelSubmit} >

      <label >Nom  </label>
      <input type="text"  name="nom" onChange={handelNomChange} value={nom}/><br/><br/>


      <label >Prénom  </label>
      <input type="text"  name="prenom" onChange={handelPrenomChange} value={prenom}/><br/><br/>

      <label >Email   </label>
      <input type="email"  name="email" onChange={handelEmailChange} value={email}/><br/><br/>
      <label>Service </label>
      <select name="service" onChange={handelServiceChange}>
        <option>Sélectionnez votre Service </option>
        <option >Conception</option>
        <option >Fabrication</option>
        <option >Automatisation</option>
        <option >Assemblage</option>
        <option >Qualite</option>
        <option >Production</option>
        <option >Maitenance</option>
        <option >Methode</option>
       </select><br/><br/>

      <label >Mot de passe   </label>
      <input type="password" name="password" onChange={handelPasswordChange}  value={password} /><br/><br/>


      

      
       <label>Photo </label>
       <input type="file" onChange={handelFileChange}/><br/><br/>
      <button type='submit'>Enregistrer</button>
      
    </form>



  </React.Fragment>
)
}

export default EditUtilisateur