<div class="step1-2 ">
	<h1 class="step-title">Set the hightest rate you are willing to pay a<br/> partner for a booking</h1>



			<div class="channel-percent-list container" ng-class="{'disabled' : $root.percent }">
				<div class="row">
					<div class="col-lg-3 col-sm-6 " ng-repeat="percent in percents.list" >
						<div class="select-box sb-small" ng-class="{'selected' : $root.percent.name == percent.name}">
							<h2 class="price">[[ percent.name ]]</h2>

							<div class="separate-line"></div>

							<div class="count-channels" ><span ng-repeat="channel in percent.channels">[[ channel ]]</span></div>

							<a class="text-center" href="#" ng-click="openListChannels(percent)">View More</a>

							<div class="box-select-btn">
								<button class="btn btn-success" ng-click="percents.select(percent)">[[ $root.percent.name == percent.name ? 'Selected' : 'Select' ]]<span class="glyphicon glyphicon-ok"></span></button>
							</div>
						</div>
					</div>
				</div>
			</div>

</div>

