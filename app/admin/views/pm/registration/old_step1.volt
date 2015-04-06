<div class="step1 page-content-width">
	<h1 class="step-title">Enter All the Countries Where Your Properties<br/>are Located</h1>
	<h4 class="step-title-info">Separate with commas or space</h4>

	<div class="step-content container">
		<div class="row">
			<div class="step-content-wrapper col-md-12 search">
				<label for="countries"></label>

				<div class="search-box">
					<p ng-repeat="location in myLocations">[[ location.label ]] <a href=""  ng-click="delLocation($index)"></a></p>
					<input type="text" autocomplete="off" id="countries" data-toggle="dropdown"  ng-keyup="searchLocation($event)" ng-modal="s"/>

					<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
						<li ng-repeat="location in locationList | filter : countriesFiltered($index)"><a href="" ng-click="setLocation(location)">[[ location.label ]]</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
