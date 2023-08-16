import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

 class NvTest extends Component {


    state = { activeItem: 'accueil' }

    numDemand=0;
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render(){
      const { activeItem } = this.state


      var ifAdmin =this.props.role ==="admin";

      var showNewTask =this.props.role ==="Conception"||this.props.role ==="Automatisation";
    
  
      return ifAdmin?(
        <Menu inverted>
        <Menu.Item
        as='' href="/alldemande"
          name='demande'
          active={activeItem === 'Demande'}
          onClick={this.handleItemClick}
        />
          <Menu.Item
         as='' href="/new-utilisateur"
          name=' nouveau utilissateur'
          active={activeItem === ' Utilissateur'}
          onClick={this.handleItemClick}
        />
    
      
        <Menu.Item
        as='' href="/alltache/:id"
          name='tache'
          active={activeItem === 'Tache'}
          onClick={this.handleItemClick}
        />
         <Menu.Item
         as='' href="/allutilisateur"
          name=' utilissateur'
          active={activeItem === ' Utilissateur'}
          onClick={this.handleItemClick}
        />
    
      
         <Menu.Item
         as='' href="http://localhost:5000/deconnecter"
          name='Se deconnecter'
          active={activeItem === 'Se deconnecter'}
          onClick={this.handleItemClick}
        />
      </Menu>
      ):
      (
        <Menu inverted>
        <Menu.Item
        as='' href="/alldemande"
          name='demande'
          active={activeItem === 'Demande'}
          onClick={this.handleItemClick}
        />
      
        <Menu.Item
        as='' href="/alltache/:id"
          name='tache'
          active={activeItem === 'Tache'}
          onClick={this.handleItemClick}
        />
        
  
        {showNewTask? 
            <Menu.Item
            as='' href= {'/new-tache/'+this.props.newTask}
             name='nouvelle tache'
             active={activeItem === 'Nouvelle Tache'}
             onClick={this.handleItemClick}
           />
      :
      ''  
      }
    
         <Menu.Item
         as='' href="http://localhost:5000/deconnecter"
          name='Se deconnecter'
          active={activeItem === 'Se deconnecter'}
          onClick={this.handleItemClick}
        />
      </Menu>
      )
      }
      
}


export default NvTest