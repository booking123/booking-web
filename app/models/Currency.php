<?php




class Currency extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var string
     */
    public $ID;
     
    /**
     *
     * @var string
     */
    public $Name;
     
    /**
     *
     * @var string
     */
    public $Number;
     
    /**
     *
     * @var integer
     */
    public $Decimals;
     
    /**
     *
     * @var integer
     */
    public $Convertible;
     
    /**
     *
     * @var integer
     */
    public $Paypal;
     
    /**
     *
     * @var integer
     */
    public $Jetpay;
     
    /**
     *
     * @var string
     */
    public $State;
     
    /**
     *
     * @var string
     */
    public $version;
     
    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'ID' => 'ID', 
            'Name' => 'Name', 
            'Number' => 'Number', 
            'Decimals' => 'Decimals', 
            'Convertible' => 'Convertible', 
            'Paypal' => 'Paypal', 
            'Jetpay' => 'Jetpay', 
            'State' => 'State', 
            'version' => 'version'
        );
    }

}
