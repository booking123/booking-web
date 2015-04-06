<?php




class PaymentMethod extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;
     
    /**
     *
     * @var integer
     */
    public $pmid;
     
    /**
     *
     * @var string
     */
    public $type;
     
    /**
     *
     * @var string
     */
    public $payment_info;
     
    /**
     *
     * @var string
     */
    public $entry_date_time;
     
    /**
     *
     * @var double
     */
    public $amount;
     
    /**
     *
     * @var string
     */
    public $verified_date;

    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'pmid' => 'pmid', 
            'type' => 'type', 
            'payment_info' => 'payment_info', 
            'entry_date_time' => 'entry_date_time', 
            'amount' => 'amount', 
            'verified_date' => 'verified_date'
        );
    }

}
