
import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
function Login() {
  /*<Grid.Column verticalAlign='middle'>
  <Button content='Sign up' icon='signup' size='big' as='a' href="/new-utilisateur" />
</Grid.Column>
<Divider vertical>Or</Divider>
*/
  return (
    <React.Fragment> 
      
    <Segment placeholder>
    
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column >

        <Form action="http://localhost:5000/api/login" method="post">
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Nom'
            placeholder='Nom'
            name="nom" 
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Mot de passe'
            type='password'
            name="password"
          />          <Button content='Login' primary />
        </Form>
      </Grid.Column>   
      
    </Grid>    
  </Segment>

    </React.Fragment>
    
  )
}

export default Login