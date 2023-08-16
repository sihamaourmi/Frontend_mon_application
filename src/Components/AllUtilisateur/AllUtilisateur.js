import React, {useEffect, useReducer} from 'react'
import axios from 'axios'
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import Navbar from '../NavBar/NavBar'


function AllUtilisateur() {
  const initialestate ={
    loading : true,
    error : '',
  utilisateurs : {}
}

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          loading: false, 
         utilisateurs: action.payload, 
          error: '', 
        };
      case 'FETCH_ERROR':
        return {
          loading: false, 
         utilisateurs: {}, 
          error: 'Something went wrong!!!!!', 
        };
      default:
        return state;
    }
  };
  const [state, dispatch] =useReducer(reducer,initialestate)

  useEffect(()=>{
    //{withCredentials:true}:Pour authentification
    axios.get('http://localhost:5000/allutilisateur',{withCredentials:true})
    .then(response=>{
        console.log(response.data);
            dispatch({type: 'FETCH_SUCCESS' , payload: response.data});
    
        }).catch(error=>{  
             dispatch({type: 'FETCH_ERROR'});});
}, [])

// try/catch : pour l'authentification 
try{
  var authentification =state.utilisateurs.map((utilisateur,index) => (
    <Table.Body >
      <Table.Row key={index}>
        <Table.Cell>{utilisateur.nom}</Table.Cell>
        <Table.Cell>{utilisateur.prenom}</Table.Cell>
        <Table.Cell>{utilisateur.email}</Table.Cell>
        <Table.Cell>{utilisateur.service}</Table.Cell>
       <Table.Cell><img src={`http://localhost:5000/${utilisateur.imagename}`} width={'150px'}/></Table.Cell>
  
  
         
        {utilisateur.admin ? <Table.Cell>
        <Button primary   as='a' href={`/utilisateur/${utilisateur._id}`}>Modifier</Button></Table.Cell>  :
        null
        }
       {utilisateur.admin ? <Table.Cell> 
         <form action={`http://localhost:5000/utilisateur/delete/${utilisateur._id}?_method=DELETE`} method="post">
              <input type="hidden" name="_method" value="DELETE"/>
        <Button  positive>Supprimer</Button>
            </form>
       </Table.Cell>  :
        null
        }
  
      </Table.Row>
  
      </Table.Body>
  
   ) )
}



catch(error){
  console.log(error)
  console.log("tilisateur non connectr ")
}





  return (
    <React.Fragment>
      
    <Navbar/>
      <Table striped>
       <Table.Header>
         <Table.Row>
           <Table.HeaderCell>Nom</Table.HeaderCell>
           <Table.HeaderCell>Prenom</Table.HeaderCell>
           <Table.HeaderCell>E-mail</Table.HeaderCell>
           <Table.HeaderCell>Servive</Table.HeaderCell>
           <Table.HeaderCell>Photos</Table.HeaderCell>
           <Table.HeaderCell>Modifier</Table.HeaderCell>
           <Table.HeaderCell>Supprimer</Table.HeaderCell>
         </Table.Row>
       </Table.Header>
        {authentification}
     </Table>
      </React.Fragment>
     )}

export default AllUtilisateur