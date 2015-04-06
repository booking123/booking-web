<?php




class PaymentRegister extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $ID;
     
    /**
     *
     * @var string
     */
    public $entry_date_time;
     
    /**
     *
     * @var integer
     */
    public $reservation_id;
     
    /**
     *
     * @var integer
     */
    public $property_id;
     
    /**
     *
     * @var integer
     */
    public $pm_id;
     
    /**
     *
     * @var integer
     */
    public $partner_id;
     
    /**
     *
     * @var integer
     */
    public $payment_transaction_id;
     
    /**
     *
     * @var integer
     */
    public $type;
     
    /**
     *
     * @var integer
     */
    public $cleared;
     
    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'ID' => 'ID', 
            'entry_date_time' => 'entry_date_time', 
            'reservation_id' => 'reservation_id', 
            'property_id' => 'property_id', 
            'pm_id' => 'pm_id', 
            'partner_id' => 'partner_id', 
            'payment_transaction_id' => 'payment_transaction_id', 
            'type' => 'type', 
            'cleared' => 'cleared'
        );
    }

}
