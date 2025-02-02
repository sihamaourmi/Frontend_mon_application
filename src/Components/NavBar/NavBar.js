import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'


 class Navbar extends Component {
    state = { activeItem: 'accueil' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render(){
      const { activeItem } = this.state

      console.log(this.props.role);
      //
  
      var ifClient=this.props.role =="Qualite" ||
      this.props.role =="Production" ||
      this.props.role =="Maitenance" ||
      this.props.role =="Methode" ;//Production
    
    
    
      return this.props.role =="admin"?(
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
         as='' href="/allutilisateur"
          name=' utilissateur'
          active={activeItem === ' Utilissateur'}
          onClick={this.handleItemClick}
        />
    
    <Menu.Menu position='right'>

         <Menu.Item
         as='' href="http://localhost:5000/deconnecter"
          name='Se deconnecter'
          active={activeItem === 'Se deconnecter'}
          onClick={this.handleItemClick}
        />
            <Menu.Item>
          <img alt="logo" src={`http://localhost:5000/${this.props.image}`} />
        </Menu.Item>
           <Menu.Item
         as='' href=""
          name={this.props.nom}
          active={activeItem === this.props.nom}
          onClick={this.handleItemClick}
        />
                  </Menu.Menu>

      </Menu>
      ):ifClient?
      (
        <Menu inverted>
        <Menu.Item
        as='' href="/alldemande"
          name='demande'
          active={activeItem === 'Demande'}
          onClick={this.handleItemClick}
        />

        <Menu.Item
         as='' href="/new-demande"
          name='nouvelle demande'
          active={activeItem === 'Nouvelle Demande'}
          onClick={this.handleItemClick}
        />
    
    <Menu.Menu position='right'>

<Menu.Item
as='' href="http://localhost:5000/deconnecter"
 name='Se deconnecter'
 active={activeItem === 'Se deconnecter'}
 onClick={this.handleItemClick}
/>
   <Menu.Item>
   <img alt="logo" src={`http://localhost:5000/${this.props.image}`} />
</Menu.Item>
  <Menu.Item
as='' href=""
name={this.props.nom}
active={activeItem ===this.props.nom}
 onClick={this.handleItemClick}
/>
         </Menu.Menu>

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

    
<Menu.Menu position='right'>

<Menu.Item
as='' href="http://localhost:5000/deconnecter"
 name='Se deconnecter'
 active={activeItem === 'Se deconnecter'}
 onClick={this.handleItemClick}
/>
   <Menu.Item>
   <img alt="logo" src={`http://localhost:5000/${this.props.image}`} />
</Menu.Item>
  <Menu.Item
as='' href=""
name={this.props.nom}
active={activeItem === this.props.nom}
 onClick={this.handleItemClick}
/>
         </Menu.Menu>

      </Menu>
      )
      }
      
}


export default Navbar