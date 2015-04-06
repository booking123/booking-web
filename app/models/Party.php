<?php

class Party extends \Phalcon\Mvc\Model
{
	public function initialize()
	{
		self::setup([
			'notNullValidations' => false
		]);
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
    public $EmployerID;
     
    /**
     *
     * @var integer
     */
    public $CreatorID;
     
    /**
     *
     * @var integer
     */
    public $LocationID;
     
    /**
     *
     * @var integer
     */
    public $FinanceID;
     
    /**
     *
     * @var integer
     */
    public $JurisdictionID;
     
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
    public $ExtraName;
     
    /**
     *
     * @var string
     */
    public $IdentityNumber;
     
    /**
     *
     * @var string
     */
    public $TaxNumber;
     
    /**
     *
     * @var string
     */
    public $PostalAddress;
     
    /**
     *
     * @var string
     */
    public $PostalCode;
     
    /**
     *
     * @var string
     */
    public $Country;
     
    /**
     *
     * @var string
     */
    public $EmailAddress;
     
    /**
     *
     * @var string
     */
    public $WebAddress;
     
    /**
     *
     * @var string
     */
    public $DayPhone;
     
    /**
     *
     * @var string
     */
    public $NightPhone;
     
    /**
     *
     * @var string
     */
    public $FaxPhone;
     
    /**
     *
     * @var string
     */
    public $MobilePhone;
     
    /**
     *
     * @var string
     */
    public $Password;
     
    /**
     *
     * @var string
     */
    public $Birthdate;
     
    /**
     *
     * @var string
     */
    public $Language;
     
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
     * @var string
     */
    public $FormatDate;
     
    /**
     *
     * @var string
     */
    public $FormatPhone;
     
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
     * @var integer
     */
    public $Rank;

	public $state;
     
    /**
     *
     * @var string
     */
    public $Notes;
     
    /**
     *
     * @var string
     */
    public $version;
     
    /**
     *
     * @var string
     */
    public $UserType;

    /**
     *
     * @var integer
     */
    public $skip_license;
     
    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'ID' => 'ID', 
            'EmployerID' => 'EmployerID', 
            'CreatorID' => 'CreatorID', 
            'LocationID' => 'LocationID', 
            'FinanceID' => 'FinanceID', 
            'JurisdictionID' => 'JurisdictionID', 
            'AltPartyID' => 'AltPartyID', 
            'AltID' => 'AltID', 
            'Name' => 'Name', 
            'State' => 'State', 
            'Options' => 'Options', 
            'ExtraName' => 'ExtraName', 
            'IdentityNumber' => 'IdentityNumber', 
            'TaxNumber' => 'TaxNumber', 
            'PostalAddress' => 'PostalAddress', 
            'PostalCode' => 'PostalCode', 
            'Country' => 'Country', 
            'EmailAddress' => 'EmailAddress', 
            'WebAddress' => 'WebAddress', 
            'DayPhone' => 'DayPhone', 
            'NightPhone' => 'NightPhone', 
            'FaxPhone' => 'FaxPhone', 
            'MobilePhone' => 'MobilePhone', 
            'Password' => 'Password', 
            'Birthdate' => 'Birthdate', 
            'Language' => 'Language', 
            'Currency' => 'Currency', 
            'Unit' => 'Unit', 
            'FormatDate' => 'FormatDate', 
            'FormatPhone' => 'FormatPhone', 
            'Latitude' => 'Latitude', 
            'Longitude' => 'Longitude', 
            'Altitude' => 'Altitude', 
            'Rank' => 'Rank', 
            'Notes' => 'Notes', 
            'version' => 'version', 
            'UserType' => 'UserType',
	        'state' => 'state',
	        'skip_license' => 'skip_license'
        );
    }

}
