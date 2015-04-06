<div ng-controller="CancelationController" class="cancellation">
    <header>
        <img src="{{ unique_logo }}" class="secure_payment_logo" alt="" />
    </header>

    <div ng-hide="productCanceled">
        <h2>Cancel your booking</h2>
        <div class="border-block">
            Cancelation policy
            <ul class="features-list">
                <!--
                <li>
                    <span class="val">FREE</span>
                    <span class="lbl">1 x Standard Room with Balcomy</span>
                    <div class="clear"></div>
                </li>
                <li>
                    <span class="val">FREE</span>
                    <span class="lbl">1 x Standard Room with Balcomy</span>
                    <div class="clear"></div>
                </li>
                <li class="total">
                    <span class="val">Free</span>
                    <span class="lbl">Total</span>
                    <div class="clear"></div>
                </li>
                -->
                <li>
                    <p><b>Please tell us your reason for cancelling so that we may improve our services:</b></p>
                    <ul class="reason">
                        <li><label><input type="radio" name="reason[]" value="1" />I found a better place to stay on BookingPal.com</label></li>
                        <li><label><input type="radio" name="reason[]" value="2" />I found a better place to stay on a different website</label></li>
                        <li><label><input type="radio" name="reason[]" value="3" />I need to change the details of my reservation</label></li>
                        <li><label><input type="radio" name="reason[]" value="4" />I am no longer visiting the destination</label></li>
                        <li><label><input type="radio" name="reason[]" value="5" checked="checked" />For personal reasons</label></li>
                    </ul>
                </li>
            </ul>
            <div class="button-block">
                <a href="javascript:void(0);" ng-click="noCancel = true; productCanceled = true;">No, I don't want to cancel</a>
                <a href="javascript:void(0);" class="ok" ng-click="checkCode('{{ code }}')">Yes, cancel this entire Booking</a>
            </div>

            <p>
                Property Name: {{ info.reservation_response.propertyName }}<br />
                Property Address: {{ info.reservation_response.propertyAddress }}<br />
                Reserved From: {{ info.reservation_response.fromdate }} to {{ info.reservation_response.todate }}<br />
            </p>
            <p>
                Property Manager Name: {{ info.reservation_response.propertyManagerName }}<br />
                Property Manager Phone Number: {{ info.reservation_response.propertyManagerPhone }}<br />
                Property Manager Email address: {{ info.reservation_response.propertyManagerEmail }}<br />
            </p>
            <p>
                Total Charge: {{ info.reservation_response.reservation.currency ~ " " ~ info.reservation_response.totalCharge }}<br />
                Down payment: {{ info.reservation_response.reservation.currency ~ " " ~ info.reservation_response.downPayment }}<br />
            </p>
            <p>
                {% if info.reservation_response.cancellationItem.cancellationAmount < 0 %}
                    After cancel you will get the refund {{ info.reservation_response.reservation.currency ~ " " ~ info.reservation_response.cancellationItem.cancellationAmount * -1 }}
                {% elseif info.reservation_response.cancellationItem.cancellationAmount > 0  %}
                    After cancel you will be charged on {{ info.reservation_response.reservation.currency ~ " " ~ info.reservation_response.cancellationItem.cancellationAmount }}
                {% else %}
                    {% if info.reservation_response.secondPayment != '' %}
                        After cancel you will be charged on {{ info.reservation_response.reservation.currency ~ " " ~ info.reservation_response.secondPayment }}
                    {% endif %}
                {% endif  %}
            </p>
        </div>
    </div>
    <div ng-show="yesCancel">
        Your booking was canceled.
    </div>
    <div ng-show="noCancel">
        Your booking was not cancelled.
    </div>
    <div ng-show="cancelError">
        It will take up to 24 hours to process your cancellation.
    </div>
</div>

{{ javascript_include('scripts/frontend/cancellation.js') }}
{{ stylesheet_link('css/frontend/cancellation.css') }}