<div class="main-heading-block">

</div>
<div class="container main-info">
	<h1 class="main-black-heading text-center bold">CONTACT US</h1>
		<p>If you are a property manager with questions about your existing account or creating an account,
		please feel free to call us at <span class="green-text">949-333-0724</span> or email us at <span class="green-text">info@mybookingpal.com</span>.</p>
		<p>If you are a channel or PMS interested in a partnership please contact Brian Brown at <span class="green-text">brian@mybookingpal.com</span>.</p>

</div>
<div class="contact-us-placement container">
	<div class="row">
		{#{% for location in locations %}#}
		{#<div class="col-md-6">#}
			{#<div class="popover top">#}
				{#<div class="arrow"></div>#}

				{#<div class="popover-content">#}
					{#<p>{{ location['name'] }}</p>#}
					{#<p>{{ location['address'] }}</p>#}
					{#<p>{{ location['city'] }}</p>#}
				{#</div>#}
			{#</div>#}
			{#<div class="contact-us-map" id="address_1"><img alt="" src="http://maps.googleapis.com/maps/api/staticmap?center={{ location['map_address'] }}&zoom=15&size=300x300&markers=size:mid%7Ccolor:red%7C{{ location['map_address'] }}&sensor=false" /></div>#}
		{#</div>#}
		{#{% endfor %}#}
		<div class="col-md-4">
			<div class="popover top">
				<div class="arrow"></div>

				<div class="popover-content">
					<p>BookingPal Headquater</p>
					<p>18101 Von Karman, Suite 400</p>
					<p>Irvine, CA 92612</p>
					<p>(949) 333-0724</p>
				</div>
			</div>
			<div class="contact-us-map" id="address_3"></div>
		</div>

		<div class="col-md-4">
			<div class="popover top">
				<div class="arrow"></div>

				<div class="popover-content">
					<p>Virginia Address</p>
					<p>142 W York Street Suite 718</p>
					<p>Norfolk VA 23510</p>
				</div>
			</div>
			<div class="contact-us-map" id="address_2"></div>
		</div>

		<div class="col-md-4">
			<div class="popover top">
				<div class="arrow"></div>

				<div class="popover-content">
					<p>South Africa Address</p>
					<p>36 Fir Lane Tokai Cape Town</p>
					<p>7946 South Africa</p>
				</div>
			</div>
			<div class="contact-us-map" id="address_1"></div>
		</div>



	</div>
</div>
<script src="https://maps.googleapis.com/maps/api/js"></script>
<script>
	function initialize() {
		var  mapCanvas1 = document.getElementById('address_1'),
			 mapCanvas2 = document.getElementById('address_2'),
			 mapCanvas3 = document.getElementById('address_3'),
			 location1 =  new google.maps.LatLng(-34.06017,18.4406),
			 location2 =  new google.maps.LatLng(36.8538243,-76.2901238),
			 location3 =  new google.maps.LatLng(33.6799834,-117.853437);
		var mapOptions1 = {
			center: location1,
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map1 = new google.maps.Map(mapCanvas1, mapOptions1);
		new google.maps.Marker({
			position: location1,
			map: map1
		});
		var mapOptions2 = {
			center: location2,
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map2 = new google.maps.Map(mapCanvas2, mapOptions2);
		new google.maps.Marker({
			position: location2,
			map: map2
		});
		var mapOptions3 = {
			center: location3,
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map3 = new google.maps.Map(mapCanvas3, mapOptions3);
		new google.maps.Marker({
			position: location3,
			map: map3
		});



	}
	google.maps.event.addDomListener(window, 'load', initialize);
</script>
