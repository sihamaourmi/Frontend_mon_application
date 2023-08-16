import React, {useEffect, useReducer} from 'react'
import axios from 'axios'
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import Navbar from '../NavBar/NavBar';


//pour les dates 
import moment from 'moment/moment';
import 'moment/locale/fr'


moment().local('fr')



function AllDemande() {

  const initialestate ={
    loading : true,
    error : '',
  demandes : {}
}

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          loading: false, 
         demandes: action.payload.data, 
          error: '', 
          service:action.payload.service
        };
      case 'FETCH_ERROR':
        return {
          loading: false, 
         demandes: {}, 
          error: 'Something went wrong!!!!!', 
        };
      default:
        return state;
    }
  };
  const [state, dispatch] =useReducer(reducer,initialestate)

  useEffect(()=>{
    //{withCredentials:true}:Pour authentification
    axios.get('http://localhost:5000/alldemande',{withCredentials:true})
    .then(response=>{
    
        console.log(response);
            dispatch({type: 'FETCH_SUCCESS' , payload: response.data});
    
        }).catch(error=>{  
             dispatch({type: 'FETCH_ERROR'});});
}, [])



// try/catch : pour l'authentification 

try{



var authentif=state.demandes.map((demande,index) => (
    <Table.Body >
      <Table.Row key={index}>
        <Table.Cell>{demande.num_demande}  </Table.Cell>
        <Table.Cell>{demande.client}</Table.Cell>
        <Table.Cell>{demande.service}</Table.Cell>
        <Table.Cell>{demande.num_ligne}</Table.Cell>
        <Table.Cell>{demande.nom_machine}</Table.Cell>
        <Table.Cell>{demande.zone}</Table.Cell>
        <Table.Cell>{demande.degre_urgence}</Table.Cell>
        <Table.Cell>{demande.description}</Table.Cell>
        {/* pour les dates on ajoute la format qu'on souhaites on se basent sur le sites 'momentjs.com ' la format qu'on a choisi maintenat c'est LL */}
        <Table.Cell>{moment (demande.date_creation).format('LLL')}</Table.Cell>
        <Table.Cell>{moment (demande.date_prevue).format('LL')}</Table.Cell>
        <Table.Cell>{moment (demande.date_realisation).format('LL')}</Table.Cell>
        <Table.Cell>{demande.statut}</Table.Cell>
        <Table.Cell>{demande.date_validation}</Table.Cell>
          

        <Table.Cell>
        {demande.image?
        <a href={`http://localhost:5000/${demande.image}`} target="_blank">
          <img src={`http://localhost:5000/${demande.image}`} width={'150px'}/>
          </a>
          :
          ""
          
        }
          </Table.Cell>

        <Table.Cell>
          { demande.imageAssemblage?
            <a href={`http://localhost:5000/${demande.imageAssemblage}`} target="_blank">
                    <img src={`http://localhost:5000/${demande.imageAssemblage}`} width={'150px'}/>
                    </a>

                    :
                    ""

          }
          
          
          </Table.Cell>

        
        <Table.Cell>

        {(state.service==='Qualite'  ||
        state.service==='Production'  ||
        state.service==='Maitenance'  ||
        state.service==='Methode' ) && demande.statut==='Pre-validation'
        ? 
        <Button primary   as='a' href={`/traitement/${demande._id}`}>Valider</Button>
          :''
  
        }
    
        {(state.service==='Qualite'  ||
        state.service==='Production'  ||
        state.service==='Maitenance'  ||
        state.service==='Methode' ) && demande.statut==='A traiter'
        ? 
          <Button primary   as='a' href={`/demande/${demande._id}`}>Modifier</Button>
          :''
  
        }

{(state.service==='Qualite'  ||
        state.service==='Production'  ||
        state.service==='Maitenance'  ||
        state.service==='Methode' ) && demande.statut==='A traiter'
        
        ? 
          <form action={`http://localhost:5000/demande/delete/${demande._id}?_method=DELETE`} method="post">
          <input type="hidden" name="_method" value="DELETE"/>
             <Button  positive>Supprimer</Button>
             </form>
          :''
  
        }

    
        {/* button conception pour recuperer l'id de la demande pour qu'il s'affiche sur la new-tache */}
        {(state.service==='Conception') && demande.statut==='Accepter'
        ? 
       <Button primary marginBtn   as='a' href={`/alltache/${demande.num_demande}`}>Traiter la conception</Button>
       :""}



         {(state.service==='Fabrication') && demande.indiceFabri >0
        ? 
       <Button primary   as='a' href={`/alltache/${demande.num_demande}`}>Traiter la fabrication</Button>
       :""}


      {(state.service==='Automatisation') && demande.statut==='Accepter'
        ? 
       <Button primary   as='a' href={`/alltache/${demande.num_demande}`}>Traiter l'automatisation</Button>
       :""}

      {(state.service==='Assemblage') && demande.statut  ==='Accepter' && demande.indiceAssemblage===1
        ? 
       <Button primary   as='a' href={`/traitement/${demande._id}`}>Traiter l'assemblage</Button>
       :""}
         {/* button traiter pour le responsable indus */}

         {(state.service==='admin') && demande.statut==='A traiter'
        ?  
       <Button primary   as='a' href={`/traitement/${demande._id}`}>Traiter</Button>
       :""}

{(state.service==='admin') && demande.statut==='Terminer'
        ?  
       <Button primary   as='a'  href={`/traitement/${demande._id}`}>Pré-valider</Button>
       :""}
{(
  !(state.service==='Qualite'  ||
  state.service==='Production'  ||
  state.service==='Maitenance'  ||
  state.service==='Methode' ) 
  && demande.statut!=='A traiter')
        ?  <div>
       <Button primary   as='a' href={`/alltache/${demande.num_demande}`}>Consulter les taches</Button>
       </div>
       :""}
        
     
  
  
       </Table.Cell> 
      </Table.Row>

      </Table.Body>
  
      
  
   ) )
  }

  
catch(error){
  console.log(error)
  console.log("tilisateur non connecter ")
}
  /*   <Button primary   as='a' href={`http://localhost:3000/new-tache`}>Conception</Button>
      <Button primary   as='a' href={`http://localhost:3000/new-tache`}>Automatisation</Button>
      <Button primary   as='a' href={`http://localhost:3000/alltache`}>Auassemblage</Button>
      <Button primary   as='a' href={`http://localhost:3000/alltache`}>Fabrication</Button>*/

  return (
    <React.Fragment> 
      <Navbar  role={state.service}/>
      <Table striped>
       <Table.Header>
         <Table.Row>
           <Table.HeaderCell>Num Demande</Table.HeaderCell>
           <Table.HeaderCell>Client </Table.HeaderCell>
           <Table.HeaderCell>Servive</Table.HeaderCell>
           <Table.HeaderCell>Num Ligne</Table.HeaderCell>
           <Table.HeaderCell>Nom machine</Table.HeaderCell>
           <Table.HeaderCell>Zone</Table.HeaderCell>
           <Table.HeaderCell>Degre d'urgence</Table.HeaderCell>
           <Table.HeaderCell> Description</Table.HeaderCell>
           <Table.HeaderCell>Date Creation</Table.HeaderCell>
           <Table.HeaderCell>Date Prevue </Table.HeaderCell>
           <Table.HeaderCell>Date Realisation</Table.HeaderCell>
           <Table.HeaderCell>Statut</Table.HeaderCell>
           <Table.HeaderCell>Date Validation</Table.HeaderCell>
           <Table.HeaderCell>Fichier de la demande</Table.HeaderCell>
           <Table.HeaderCell>Fichier de l'Assemblage</Table.HeaderCell>
           
           <Table.HeaderCell>Actions</Table.HeaderCell>
         </Table.Row>
       </Table.Header>

           {authentif }
      
       </Table>

  
       
     </React.Fragment> 
     )}
     

export default AllDemande