<div class="content-wrapper">
	<div class="container login-content">
		<h1>Get Started in Seconds! </h1>
		<p class="booking-info hidden-xs">BookingPal is a global leisure rentals distribution partner connecting <a href="#">property managers and owners</a> with <a href="#">online travel websites, travel
				agencies and real estate websites</a> to create more vacation rental revenue industry wide. Please complete the form on this page to get
			started with BookingPal, learn more about how things work, or get answers to questions and a representative will contact you soon.</p>
		<p class="booking-info visible-xs">Please complete the form below to get started with BookingPal. A representative will contact you soon to assist you.</p>
	</div>
	<div class="container login-block">
		<div class="login-wrapper">
			<form id="login" class="login-form" action="{{ url('login/process') }}" method="post" name="loginform">
				<div class="login-heading">
					<span>New user ?</span><a href="{{ url('register/') }}"><span></span>Register</a>
					<span class="or-divider">OR</span>

				</div>
				<h4>Log In</h4>
				<div class="alert" id="errorMessage"></div>
				<div class="form-group">
					<label for="InputName">Username</label>
					<input type="text" class="form-control" id="InputName" name="email" data-type="email" />
				</div>
				<div class="form-group">
					<label for="InputPassword">Password</label>
					<input type="password" class="form-control" id="InputPassword" name="password" />
				</div>
				<a href="#" class="lost-pass" >Forgot password?</a>
				<div class="checkbox"><label><input type="checkbox" name="remember" /> Remember Me</label></div>
				<div class="clearfix"></div>
				<button type="submit" class="btn btn-default log-in-button">Log in</button>
			</form>
		</div>
	</div>
</div>