<?php

class Product extends \Phalcon\Mvc\Model
{

	public function initialize()
	{
        /*
		self::setup([
			'notNullValidations' => false
        ]);
        */
	}

    /**
     *
     * @var integer
     */
    public $ID;
     
    /**
     *
     * @var integer
     */
    public $PartofID;
     
    /**
     *
     * @var integer
     */
    public $OwnerID;
     
    /**
     *
     * @var integer
     */
    public $LocationID;
     
    /**
     *
     * @var integer
     */
    public $SupplierID;
     
    /**
     *
     * @var integer
     */
    public $AltPartyID;
     
    /**
     *
     * @var string
     */
    public $AltID;
     
    /**
     *
     * @var string
     */
    public $AltSupplierID;
     
    /**
     *
     * @var string
     */
    public $Name;
     
    /**
     *
     * @var string
     */
    public $State;
     
    /**
     *
     * @var string
     */
    public $Options;
     
    /**
     *
     * @var string
     */
    public $Type;
     
    /**
     *
     * @var string
     */
    public $WebAddress;
     
    /**
     *
     * @var string
     */
    public $Tax;
     
    /**
     *
     * @var string
     */
    public $Code;
     
    /**
     *
     * @var string
     */
    public $Unspsc;
     
    /**
     *
     * @var string
     */
    public $Servicedays;
     
    /**
     *
     * @var string
     */
    public $Currency;
     
    /**
     *
     * @var string
     */
    public $Unit;
     
    /**
     *
     * @var integer
     */
    public $Room;
     
    /**
     *
     * @var integer
     */
    public $Bathroom;
     
    /**
     *
     * @var integer
     */
    public $Toilet;
     
    /**
     *
     * @var integer
     */
    public $Quantity;
     
    /**
     *
     * @var integer
     */
    public $Person;
     
    /**
     *
     * @var integer
     */
    public $Child;
     
    /**
     *
     * @var integer
     */
    public $Infant;
     
    /**
     *
     * @var integer
     */
    public $Baby;
     
    /**
     *
     * @var integer
     */
    public $Linenchange;
     
    /**
     *
     * @var integer
     */
    public $Rating;
     
    /**
     *
     * @var integer
     */
    public $Refresh;
     
    /**
     *
     * @var string
     */
    public $Commission;
     
    /**
     *
     * @var string
     */
    public $Discount;
     
    /**
     *
     * @var string
     */
    public $OwnerDiscount;
     
    /**
     *
     * @var string
     */
    public $Rank;
     
    /**
     *
     * @var integer
     */
    public $DynamicPricingEnabled;
     
    /**
     *
     * @var string
     */
    public $Latitude;
     
    /**
     *
     * @var string
     */
    public $Longitude;
     
    /**
     *
     * @var string
     */
    public $Altitude;
     
    /**
     *
     * @var string
     */
    public $version;
     
    /**
     *
     * @var string
     */
    public $Physicaladdress;
     
    /**
     *
     * @var integer
     */
    public $AssignedtoManager;
     
    /**
     *
     * @var string
     */
    public $CleaningFee;
     
    /**
     *
     * @var string
     */
    public $SecurityDeposit;

	public $UseOnePriceRow;

    public $inquire_state;

	/**
	 *
	 * @var integer
	 */
	public $DisplayAddress;



	/**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'ID' => 'ID', 
            'PartofID' => 'PartofID', 
            'OwnerID' => 'OwnerID', 
            'LocationID' => 'LocationID', 
            'SupplierID' => 'SupplierID', 
            'AltPartyID' => 'AltPartyID', 
            'AltID' => 'AltID', 
            'AltSupplierID' => 'AltSupplierID', 
            'Name' => 'Name', 
            'State' => 'State', 
            'Options' => 'Options', 
            'Type' => 'Type', 
            'WebAddress' => 'WebAddress', 
            'Tax' => 'Tax', 
            'Code' => 'Code', 
            'Unspsc' => 'Unspsc', 
            'Servicedays' => 'Servicedays', 
            'Currency' => 'Currency', 
            'Unit' => 'Unit', 
            'Room' => 'Room', 
            'Bathroom' => 'Bathroom', 
            'Toilet' => 'Toilet', 
            'Quantity' => 'Quantity', 
            'Person' => 'Person', 
            'Child' => 'Child', 
            'Infant' => 'Infant', 
            'Baby' => 'Baby', 
            'Linenchange' => 'Linenchange', 
            'Rating' => 'Rating', 
            'Refresh' => 'Refresh', 
            'Commission' => 'Commission', 
            'Discount' => 'Discount', 
            'OwnerDiscount' => 'OwnerDiscount', 
            'Rank' => 'Rank', 
            'DynamicPricingEnabled' => 'DynamicPricingEnabled', 
            'Latitude' => 'Latitude', 
            'Longitude' => 'Longitude', 
            'Altitude' => 'Altitude', 
            'version' => 'version', 
            'Physicaladdress' => 'Physicaladdress', 
            'AssignedtoManager' => 'AssignedtoManager', 
            'CleaningFee' => 'CleaningFee', 
            'SecurityDeposit' => 'SecurityDeposit',
	        'UseOnePriceRow' => 'UseOnePriceRow',
	        'inquire_state' => 'inquire_state',
	        'DisplayAddress' => 'DisplayAddress'
        );
    }

}
