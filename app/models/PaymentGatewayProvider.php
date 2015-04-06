<?php




class PaymentGatewayProvider extends \Phalcon\Mvc\Model
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
    public $name;
     
    /**
     *
     * @var string
     */
    public $create_date;
     
    /**
     *
     * @var integer
     */
    public $fee;
     
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
            'name' => 'name', 
            'create_date' => 'create_date', 
            'fee' => 'fee', 
            'autopay' => 'autopay'
        );
    }

}
