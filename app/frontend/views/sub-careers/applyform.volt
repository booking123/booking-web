<div class="container apply-main">
	<div class="apply-header">

		<h1 class="bold apply-main-heading pull-left">Appply for this job</h1>
		<p class="pull-right"><span class="required-point">*</span>  Required</p>
		<div class="clearfix"></div>
	</div>

	<div class="clearfix"></div>
	<form class="form-horizontal text-left" enctype="multipart/form-data" id="apply-form" action="getdata" method="post" >
		<div class="form-main-block">
		<div class="form-group">
			<label for="FName" class=" col-sm-2 control-label">First Name  <span class="required-point">*</span></label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="FName"  name="FName" required>
			</div>
		</div>
		<div class="form-group">
			<label for="LName" class=" col-sm-2 control-label">Last Name  <span class="required-point">*</span></label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="LName"  name="LName" required>
			</div>
		</div>
		<div class="form-group">
			<label for="Email" class=" col-sm-2 control-label">Email  <span class="required-point">*</span></label>
			<div class="col-sm-10">
				<input type="email" class="form-control" id="Email"  name="Email" required>
			</div>
		</div>
		<div class="form-group">
			<label for="Phone" class=" col-sm-2 control-label">Phone  <span class="required-point">*</span></label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="Phone"  name="Phone" required>

			</div>
		</div>
		<div class="form-group">
			<p class=" col-sm-2 bold control-label">Resume/CV  <span class="required-point">*</span></p>
			<div class="col-sm-10">

				<a class="attach-cv-link attach-link" href="#">Attach</a>
				<input type="file" class="form-control file-input"  id="cv-file"  name="cv-file" />
				{#<li><a href="#">Dropbox,</a></li>#}
				{#<li><a href="#">Paste,</a></li>#}


			</div>
		</div>
		<div class="form-group">
			<p class=" col-sm-2 bold control-label">Cover Letter</p>
			<div class="col-sm-10">

				<a class="attach-letter-link attach-link" href="#">Attach</a>
				<input type="file" class="form-control file-input"  id="letter-file"  name="letter-file" />
			{#<ul class="form-list ">#}
				{#<li><a href="#">Attach,</a></li>#}
				{##}
				{##}
			{#</ul>#}
				</div>
		</div>
			</div>
		<div class="form-bottom-block">
			<input class="hidden" name="id" value="{{ id }}">
			<div class="form-group">
				<label for="LinkedInProfile" class=" col-sm-12 control-label">LinkedIn Profile</label>
				<div class="col-sm-12">
					<input type="text" class="form-control" id="LinkedInProfile"  name="LinkedInProfile">
				</div>
			</div>
			<div class="form-group">
				<label for="Website" class=" col-sm-12 control-label">Website</label>
				<div class="col-sm-12">
					<input type="text" class="form-control" id="Website"  name="Website">
				</div>
			</div>
			<div class="form-group">
				<label for="AboutJob" class=" col-sm-12 control-label">How did you hear about this job? <span class="required-point">*</span></label>
				<div class="col-sm-12">
					<input type="text" class="form-control" id="AboutJob"  name="AboutJob" required>
				</div>
			</div>
			<div class="form-group text-center">
				<button type="submit" class=" btn btn-apply-submit">SUBMIT APPLICATION</button>
			</div>
		</div>



	</form>
</div>