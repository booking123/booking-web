<?php




class PendingTransaction extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;
     
    /**
     *
     * @var string
     */
    public $entry_date_time;
     
    /**
     *
     * @var integer
     */
    public $booking_id;
     
    /**
     *
     * @var integer
     */
    public $pms_confirmation_id;
     
    /**
     *
     * @var integer
     */
    public $payment_gateway_id;
     
    /**
     *
     * @var integer
     */
    public $funds_holder;
     
    /**
     *
     * @var integer
     */
    public $partial_iin;
     
    /**
     *
     * @var string
     */
    public $first_name;
     
    /**
     *
     * @var string
     */
    public $last_name;
     
    /**
     *
     * @var string
     */
    public $phone_number;
     
    /**
     *
     * @var integer
     */
    public $partner_id;
     
    /**
     *
     * @var integer
     */
    public $supplier_id;
     
    /**
     *
     * @var string
     */
    public $charge_date;
     
    /**
     *
     * @var string
     */
    public $charge_amount;
     
    /**
     *
     * @var string
     */
    public $currency;
     
    /**
     *
     * @var string
     */
    public $commission;
     
    /**
     *
     * @var string
     */
    public $partner_payment;
     
    /**
     *
     * @var string
     */
    public $bookingpal_payment;
     
    /**
     *
     * @var string
     */
    public $gateway_transaction_id;
     
    /**
     *
     * @var string
     */
    public $status;
     
    /**
     *
     * @var integer
     */
    public $autopay;

    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'entry_date_time' => 'entry_date_time', 
            'booking_id' => 'booking_id', 
            'pms_confirmation_id' => 'pms_confirmation_id', 
            'payment_gateway_id' => 'payment_gateway_id', 
            'funds_holder' => 'funds_holder', 
            'partial_iin' => 'partial_iin', 
            'first_name' => 'first_name', 
            'last_name' => 'last_name', 
            'phone_number' => 'phone_number', 
            'partner_id' => 'partner_id', 
            'supplier_id' => 'supplier_id', 
            'charge_date' => 'charge_date', 
            'charge_amount' => 'charge_amount', 
            'currency' => 'currency', 
            'commission' => 'commission', 
            'partner_payment' => 'partner_payment', 
            'bookingpal_payment' => 'bookingpal_payment', 
            'gateway_transaction_id' => 'gateway_transaction_id', 
            'status' => 'status', 
            'autopay' => 'autopay'
        );
    }

}
