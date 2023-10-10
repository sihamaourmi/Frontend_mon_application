import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
function LoginV1() {
  
  return (
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img class="formImage" src="bontaz.jpg" alt="IMG"/>
				</div>


				<form class="login100-form validate-form" action="http://localhost:5000/api/login" method="post">
					<span class="login100-form-title">
          Identifiant
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="nom" placeholder="Nom"/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" name="password" placeholder="Mot de passe"/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
							Login
						</button>
					</div>

				</form>
			</div>
		</div>
	</div>



  )
}

export default LoginV1