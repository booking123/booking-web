<div class="content-wrapper">
	<div class="container login-content">
		<h1>Get Started in Seconds! </h1>
		<p class="booking-info hidden-xs">
			BookingPal is a global leisure rentals distribution partner connecting
			<a href="#">property managers and owners</a> with
			<a href="#">online travel websites, travel agencies and real estate websites</a>
			to create more vacation rental revenue industry wide. Please
			complete the form on this page to get
			started with BookingPal, learn more about how things work, or get answers to questions and a representative
			will contact you soon.
		</p>
		<p class="booking-info visible-xs">
			Please complete the form below to get started with BookingPal.
			A representative will contact you soon to assist you.
		</p>
	</div>

	<form id="Registration" class="login-form" name="register" method="post">
		<div class="container login-block" id="blockForAll">
			<div class="login-wrapper">
				<div class="login-heading">
					<span>Existing user ?</span><a href="{{ url('login/') }}"><span></span>Log In</a>
					<span class="or-divider">OR</span>
				</div>

				<h4>Register</h4>


				<div class="alert" id="errorMessage"></div>

				<div class="form-group">
					<div class="input-group">
						<label for="userType">Which option describes you best?</label>
						<select class="form-control" id="userType">
							<option value=""></option>
							<option value="pm">Property Manager</option>
							<option value="cp">Travel Agent</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="firstname">First name</label>
					<input type="text" class="form-control" id="firstname" name="firstname"/>
				</div>
				<div class="form-group">
					<label for="lastname">Last name</label>
					<input type="text" class="form-control" id="lastname" name="lastname"/>
				</div>
				<div class="form-group">
					<label for="email">E-mail</label>
					<input type="text" class="form-control" id="email" name="email" data-type="email"/>
				</div>
				<div class="form-group">
					<label for="telephone">Telephone number</label>
					<input type="text" class="form-control" id="telephone" name="telephone"/>
				</div>
				<div class="form-group">
					<label for="password">Password </label>
					<input type="password" class="form-control" id="password" name="password" data-type="password"/>
				</div>
				<div class="form-group">
					<label for="repassword">Repeat password</label>
					<input type="password" class="form-control" id="repassword" name="repassword" data-type="repassword"/>
				</div>
			</div>
		</div>

		<div class="container login-block" id="blockForPM">
			<div class="login-wrapper">
				<h4 class="pm-reg-heading">Please provide Property Manager details:</h4>

				<div class="form-group">
					<label for="accountid">Account ID</label>
					<input type="text" class="form-control" id="accountid" name="accountid"/>
				</div>
				{% if (pos) %}
					<input type="hidden" name="pos" value="{{ pos }}"/>
					{% else %}
					<div class="form-group">
					<div class="input-group">
						<label for="pmsid">PMS</label>
						<select class="form-control" name="pmsid" id="pmsid">
							<option value=""></option>
							{% for pms in pms_list %}
								<option value="{{ pms.ID }}">{{ pms.Name }}</option>
							{% endfor %}

						</select>
					</div>
				</div>
				{% endif %}
				<div class="form-group">
					<label for="company">Company name</label>
					<input type="text" class="form-control" id="company" name="company"/>
				</div>
				<div class="form-group">
					<label for="address">Address</label>
					<input type="text" class="form-control" id="address" name="address"/>
				</div>
				<div class="form-group">
					<label for="city">City</label>
					<input type="text" class="form-control" id="city" name="city"/>
				</div>
				<div class="form-group">
					<label for="state">State / Province</label>
					<input type="text" class="form-control" id="state" name="state"/>
				</div>
				<div class="form-group">
					<label for="zip">Zip / Postal code</label>
					<input type="text" class="form-control" id="zip" name="zip"/>
				</div>
				<div class="checkbox text-left form-group">
					<label><input type="checkbox" id="agreementpm"/> i have red and agree to the <a href="#">BookingPal Property Manager terms of service</a></label>
				</div>
				<button type="submit" class="btn btn-default log-in-button">Join BookingPal</button>

			</div>
		</div>

		<div class="container login-block" id="blockForCP">
			<div class="login-wrapper">
				<h4 class="pm-reg-heading">Please provide Travel Agent details:</h4>

				<div class="form-group">
					<label for="channelname">Travel agency name</label>
					<input type="text" class="form-control" id="channelname" name="channelname" data-user="cp"/>
				</div>

				<div class="form-group">
					<label for="channelnumber">IATA number</label>
					<label class="checkbox-none"><input type="checkbox" name="none" /> None</label>
					<input type="text" class="form-control" id="channelnumber" name="channelnumber" data-user="cp"/>
				</div>

				<div class="form-group checkbox text-left">
					<label><input type="checkbox" id="agreementcp"/> i have red and agree to the <a href="#">BookingPal Property Manager terms of service</a> </label>
				</div>

				<button type="submit" class="btn btn-default log-in-button">Join BookingPal</button>
			</div>
		</div>
	</form>

	<div class="container login-block reg-complete" id="blockConfirm">
		<h2>Registration Complete!</h2>
		<p>A confirmation email has been sent to: <span>Your@email.com</span> Please confirm your account.</p>
	</div>
</div>