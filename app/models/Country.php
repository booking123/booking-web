<?php


class Country extends \Phalcon\Mvc\Model
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
    public $Currency;
     
    /**
     *
     * @var string
     */
    public $Language;


	/**
	 *
	 * @var int
	 */
    public $PhoneCode;

    /**
     *
     * @var string
     */
    public $version;
     
    /**
     * Forse set table name for model
     */
    public function initialize()
    {
		$this->setSource('country');
    }

    /**
     * Independent Column Mapping.
     */
    public function columnMap() {
        return array(
            'ID' => 'ID', 
            'Name' => 'Name', 
            'Currency' => 'Currency', 
            'Language' => 'Language',
	        'PhoneCode' => 'PhoneCode',
            'version' => 'version'
        );
    }

}
