<div class="step1">
	<h1 class="step-title">Do you want to offer a commission based on rack rate or net rate</h1>
	<div class="slide-buttons">
		<button class="percent-arrow left" ng-click="commissionBased(0)" ng-class="{active: !$root.netRate}">Rack Rates</button>
		<button class="percent-arrow right" ng-click="commissionBased(1)" ng-class="{active: $root.netRate}">Net Rates</button>
	</div>
</div>
