<div class="step2 ">
	<div id="scrollChannels" class="channel-partners-wrapper">
		<h1 class="step-title">Select your channel partners</h1>

		<div class="channel-partners-list container">
			<div class="checkbox">
				<label><input checked="checked" type="checkbox" ng-model="selectAll" ng-checked="selectAll" ng-click="toggleSelectAll(selectAll)"> Select All</label>
			</div>

			<div class="row">
				<div class="col-lg-3 col-sm-6" ng-repeat="channel in channelsList" >
					<div class="select-box sb-small sb-channel" ng-class="{selected: channel.selected}" >
						<a class="ch-logo"><img alt="[[ channel.channel_name ]]" ng-src="[[ channel.logo_url ]]"/></a>
						<a class="ch-more" href="#" data-toggle="modal" data-target="#ChannelMoreInfo">MORE INFO<span></span></a>
						<div class="separate-line" ></div>
						<div class="channel-percent" ng-bind="channel.channel_name"></div>
						<div class="box-select-btn">
							<button class="btn btn-success" ng-click="selectAnyChanel(channel)">
								<span class="glyphicon glyphicon-ok"></span> [[ channel.selected ? 'Selected' : 'Select' ]]
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="clearfix"></div>
		</div>
	</div>
</div>
