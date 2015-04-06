<?php




class PaymentTransaction extends \Phalcon\Mvc\Model
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
    public $create_date;
     
    /**
     *
     * @var integer
     */
    public $server_id;
     
    /**
     *
     * @var integer
     */
    public $reservation_id;
     
    /**
     *
     * @var integer
     */
    public $pms_confirmation_id;
     
    /**
     *
     * @var integer
     */
    public $payment_method;
     
    /**
     *
     * @var string
     */
    public $gateway_transaction_id;
     
    /**
     *
     * @var integer
     */
    public $gateway_id;
     
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
    public $status;
     
    /**
     *
     * @var string
     */
    public $message;
     
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
    public $total_amount;
     
    /**
     *
     * @var string
     */
    public $currency;
     
    /**
     *
     * @var string
     */
    public $total_commission;
     
    /**
     *
     * @var string
     */
    public $partner_payment;
     
    /**
     *
     * @var string
     */
    public $total_bookingpal_payment;
     
    /**
     *
     * @var string
     */
    public $final_amount;
     
    /**
     *
     * @var string
     */
    public $credit_card_fee;
     
    /**
     *
     * @var string
     */
    public $charge_type;

    /**
     *
     * @var string
     */
    public $partner_commission_value;

    /**
     *
     * @var string
     */
    public $net_rate;

    /**
     *
     * @var string
     */
    public $channel_partner_commission;

    /**
     *
     * @var float
     */
    public $pms_payment;
     
    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'create_date' => 'create_date', 
            'server_id' => 'server_id', 
            'reservation_id' => 'reservation_id', 
            'pms_confirmation_id' => 'pms_confirmation_id', 
            'payment_method' => 'payment_method', 
            'gateway_transaction_id' => 'gateway_transaction_id', 
            'gateway_id' => 'gateway_id', 
            'funds_holder' => 'funds_holder', 
            'partial_iin' => 'partial_iin', 
            'status' => 'status', 
            'message' => 'message', 
            'partner_id' => 'partner_id', 
            'supplier_id' => 'supplier_id', 
            'charge_date' => 'charge_date', 
            'total_amount' => 'total_amount', 
            'currency' => 'currency', 
            'total_commission' => 'total_commission', 
            'partner_payment' => 'partner_payment', 
            'total_bookingpal_payment' => 'total_bookingpal_payment', 
            'final_amount' => 'final_amount', 
            'credit_card_fee' => 'credit_card_fee', 
            'charge_type' => 'charge_type',
            'partner_commission_value' => 'partner_commission_value',
            'pm_commission_value' => 'pm_commission_value',
            'net_rate' => 'net_rate',
            'channel_partner_commission' => 'channel_partner_commission',
            'pms_payment' => 'pms_payment',
        );
    }

}
