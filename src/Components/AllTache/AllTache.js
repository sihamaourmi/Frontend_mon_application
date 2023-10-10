
import React, {useEffect, useReducer} from 'react'
import axios from 'axios'
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import NvTest from '../NavBar/NvTest';

import { useParams } from 'react-router-dom'



//pour les dates 
import moment from 'moment/moment';
import 'moment/locale/fr'


moment().local('fr')



function AllTache() {
  const params = useParams();

  const initialestate ={
    loading : true,
    error : '',
  taches : {}
}

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          loading: false, 
         taches: action.payload.data, 
         service:action.payload.service,
         nom:action.payload.nom +" "+action.payload.prenom,
         image:action.payload.image,
          error: '', 
        };
      case 'FETCH_ERROR':
        return {
          loading: false, 
         taches: {}, 
          error: 'Something went wrong!!!!!', 
        };
      default:
        return state;
    }
  };
  const [state, dispatch] =useReducer(reducer,initialestate)

  useEffect(()=>{
    console.log("===============>"+params.num_demande);
    
    //{withCredentials:true}:Pour authentification
    axios.get(`http://localhost:5000/alltache/${params.num_demande}`,{withCredentials:true})
    .then(response=>{
        console.log(response.data);
            dispatch({type: 'FETCH_SUCCESS' , payload: response.data});
    
        }).catch(error=>{  
             dispatch({type: 'FETCH_ERROR'});});
}, [])
try{
  var authtache= state.taches.map((tache,index) => (
    <Table.Body >
      <Table.Row key={index} verticalAlign='middle'>
        <Table.Cell>{tache.num_demande}</Table.Cell>
        <Table.Cell>{tache.employe}</Table.Cell>
        <Table.Cell>{tache.num_tache}</Table.Cell>
        <Table.Cell>{tache.description_tache}</Table.Cell>
        {/* pour les dates on ajoute la format qu'on souhaites on se basent sur le sites 'momentjs.com ' la format qu'on a choisi maintenat c'est LL */}
        <Table.Cell>{moment (tache.date_creation).format('LLL')}</Table.Cell>
        <Table.Cell>{moment (tache.date_prevue).format('LL')}</Table.Cell>
        <Table.Cell>{moment (tache.date_realisation).format('LL')}</Table.Cell>
      
      
        {(state.service==='admin' ||state.service==='Conception'||
        state.service==='Fabrication'||state.service==='Assemblage') ?
        <Table.Cell>{tache.statut}</Table.Cell>
        :
          ''
          }



          {(state.service==='admin' ||state.service==='Fabrication') ?
          <Table.Cell>{tache.date_prevue_F==null?"":moment (tache.date_prevue_F).format('LL')}</Table.Cell>
          :
          ''
          }


          {(state.service==='admin' ||state.service==='Fabrication') ?
        <Table.Cell>{tache.date_realisation_F==null?"":moment (tache.date_realisation_F).format('LL')}</Table.Cell>
        :
          ''
          }
        {(state.service==='admin' ||state.service==='Fabrication') ||
        state.service==='Assemblage'?
        <Table.Cell>{tache.statutFabrication}</Table.Cell>
        :
          ''
          }



        {(state.service==='admin' ||state.service==='Automatisation') ||
        state.service==='Assemblage'?
        <Table.Cell>{tache.statutAutomatisation}</Table.Cell>
        :
          ''
          }
      
      
          
        {(state.service==='admin' ||state.service==='Conception'||
        state.service==='Fabrication'||state.service==='Assemblage') ?
        <Table.Cell>
          {tache.photo?
          tache.photo.indexOf(".png")!==-1 ||tache.photo.indexOf(".jpg")!==-1 ||tache.photo.indexOf(".PNG")!==-1 ||tache.photo.indexOf(".JPG")!==-1 ||tache.photo.indexOf(".webp")!==-1 ||tache.photo.indexOf(".jpeg")!==-1 ?
            <a href={`http://localhost:5000/${tache.photo}`} target="_blank">
          <img src={`http://localhost:5000/${tache.photo}`} width={'150px'}/>
          </a>
          :
          <a href={`http://localhost:5000/${tache.photo}`} target="_blank">
        <img  src="docIcon.png" width={'80px'} />
        </a>
          :
          ""

}
          
          </Table.Cell>
        
        :
          ''
          }

        {(state.service==='admin' ||state.service==='Fabrication'||
        state.service==='Assemblage') ?
        <Table.Cell>
          {tache.photoFabrication?
          tache.photoFabrication.indexOf(".png")!==-1 ||tache.photoFabrication.indexOf(".jpg")!==-1||tache.photoFabrication.indexOf(".PNG")!==-1 ||tache.photoFabrication.indexOf(".JPG")!==-1 ||tache.photoFabrication.indexOf(".webp")!==-1 ||tache.photoFabrication.indexOf(".jpeg")!==-1 ?
                      <a href={`http://localhost:5000/${tache.photoFabrication}`} target="_blank">

          <img src={`http://localhost:5000/${tache.photoFabrication}`} width={'150px'}/>
          </a>
            :
            <a href={`http://localhost:5000/${tache.photoFabrication}`} target="_blank">
          <img  src="docIcon.png" width={'80px'} />
          </a>
          :
          ""
}
          
          </Table.Cell>
        :
          ''
          }

        {(state.service==='admin' ||state.service==='Automatisation'||
        state.service==='Assemblage') ?
        <Table.Cell>
          {tache.photoAutomatisation?
          tache.photoAutomatisation.indexOf(".png")!==-1 ||tache.photoAutomatisation.indexOf(".jpg")!==-1 ||tache.photoAutomatisation.indexOf(".PNG")!==-1 ||tache.photoAutomatisation.indexOf(".JPG")!==-1 ||tache.photoAutomatisation.indexOf(".webp")!==-1 ||tache.photoAutomatisation.indexOf(".jpeg")!==-1 ?
          <a href={`http://localhost:5000/${tache.photoAutomatisation}`} target="_blank">
          <img src={`http://localhost:5000/${tache.photoAutomatisation}`} width={'150px'}/>
          </a>
            :
            <a href={`http://localhost:5000/${tache.photoAutomatisation}`} target="_blank">
          <img  src="docIcon.png" width={'80px'} />
          </a>
          :
          ""
}
          </Table.Cell>
        :
          ''
          }

         


      
         <Table.Cell>
         {(tache.statut==="Terminer" && state.service==="Conception") ||
         (tache.statutFabrication==="Terminer" && state.service==="Fabrication") || 
         (tache.statutAutomatisation==="Terminer" && state.service==="Automatisation") ||
         state.service==="Assemblage" ||
         state.service==="admin"
         ?
         '':
         <Button primary   as='a' href={`/tache/${tache._id}`}>Modifier</Button>
         }
          </Table.Cell>
        
        
       <Table.Cell> 

       {(tache.statut==="Terminer" && state.service==="Conception") ||
         (tache.statutFabrication==="Terminer" && state.service==="Fabrication") || 
         (tache.statutAutomatisation==="Terminer" && state.service==="Automatisation")||
         state.service==="Assemblage" ||
         state.service==="admin"?
         '':
         <form action={`http://localhost:5000/tache/delete/${tache._id}?_method=DELETE`} method="post">
              <input type="hidden" name="_method" value="DELETE"/>
          

        <Button  positive>Supprimer</Button>
            </form>
              }
       </Table.Cell> 
      </Table.Row>
  
      </Table.Body>
  
   ) )
  }


catch(error){
  console.log(error)
  console.log("utilisateur non connectr ")
}
  return (
    <React.Fragment> 
      <NvTest  newTask={params.num_demande} role={state.service} nom={state.nom} image ={state.image}
      />
      <Table color='purple' key='purple' inverted>
       <Table.Header>
         <Table.Row verticalAlign='middle' >
           <Table.HeaderCell >Num Demande</Table.HeaderCell>
           <Table.HeaderCell>Employe </Table.HeaderCell>
           <Table.HeaderCell>Num de la tache</Table.HeaderCell>
           <Table.HeaderCell>Description de la tache</Table.HeaderCell>
           <Table.HeaderCell>Date Creation </Table.HeaderCell>
           <Table.HeaderCell>Date Prevue </Table.HeaderCell>
           <Table.HeaderCell>Date Realisation</Table.HeaderCell>


           {(state.service==='admin' ||state.service==='Conception' ||
           state.service==='Fabrication'||state.service==='Assemblage') ?
           <Table.HeaderCell>Statut Conception</Table.HeaderCell>
           :
          ''
          }

           {(state.service==='admin' ||state.service==='Fabrication') ?
           <Table.HeaderCell>Date Prevue F </Table.HeaderCell>
           :
           ''
           }
           {(state.service==='admin' ||state.service==='Fabrication') ?
           <Table.HeaderCell>Date Realisation F </Table.HeaderCell>
           :
           ''
           }



          {(state.service==='admin' ||state.service==='Fabrication'||
          state.service==='Assemblage') ?
           <Table.HeaderCell>Statut Fabrication</Table.HeaderCell>
           :
          ''
          }


          {(state.service==='admin' ||state.service==='Automatisation'||
          state.service==='Assemblage') ?
           <Table.HeaderCell>Statut Automatisation</Table.HeaderCell>
           :
          ''
          }


           
           {(state.service==='admin' ||state.service==='Conception' 
           ||state.service==='Fabrication'||state.service==='Assemblage') ?
          <Table.HeaderCell>Fichier Conception</Table.HeaderCell>
        
          :
          ''
          }

{(state.service==='admin' ||state.service==='Fabrication'||state.service==='Assemblage') ?
          <Table.HeaderCell>Fichier Fabrication </Table.HeaderCell>
          :
          ''
          }


        {(state.service==='admin' ||state.service==='Automatisation' ||state.service==='Assemblage' ) ?
          <Table.HeaderCell>Fichier Automatisation</Table.HeaderCell>
          :
          ''
          }



        

          
           

           <Table.HeaderCell>Modifier</Table.HeaderCell>
           <Table.HeaderCell>Supprimer</Table.HeaderCell>
         </Table.Row>
       </Table.Header>

   
   {authtache}
     </Table>
     </React.Fragment>
     )}
    

export default AllTache