import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'


 class NavbarTache extends Component {
    state = { activeItem: 'accueil' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render(){
      const { activeItem } = this.state
  
      return (
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
         <Menu.Item
         as='' href="/allutilisateur"
          name=' utilissateur'
          active={activeItem === ' Utilissateur'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
         as='' href="/new-demande"
          name='nouvelle demande'
          active={activeItem === 'Nouvelle Demande'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
         as='' href="/new-tache/:id"
          name='nouvelle tache'
          active={activeItem === 'Nouvelle Tache'}
          onClick={this.handleItemClick}
        />
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


export default NavbarTache