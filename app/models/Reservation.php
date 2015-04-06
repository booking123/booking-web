<?php




class Reservation extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $ID;
     
    /**
     *
     * @var integer
     */
    public $ParentID;
     
    /**
     *
     * @var integer
     */
    public $OrganizationID;
     
    /**
     *
     * @var integer
     */
    public $ActorID;
     
    /**
     *
     * @var integer
     */
    public $AgentID;
     
    /**
     *
     * @var integer
     */
    public $CustomerID;
     
    /**
     *
     * @var integer
     */
    public $ServiceID;
     
    /**
     *
     * @var integer
     */
    public $FinanceID;
     
    /**
     *
     * @var integer
     */
    public $ProductID;
     
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
    public $Flat;
     
    /**
     *
     * @var string
     */
    public $Market;
     
    /**
     *
     * @var string
     */
    public $Outcome;
     
    /**
     *
     * @var string
     */
    public $Unit;
     
    /**
     *
     * @var string
     */
    public $ArrivalTime;
     
    /**
     *
     * @var string
     */
    public $DepartureTime;
     
    /**
     *
     * @var string
     */
    public $ServiceFrom;
     
    /**
     *
     * @var string
     */
    public $ServiceTo;
     
    /**
     *
     * @var string
     */
    public $Date;
     
    /**
     *
     * @var string
     */
    public $FromDate;
     
    /**
     *
     * @var string
     */
    public $ToDate;
     
    /**
     *
     * @var string
     */
    public $DueDate;
     
    /**
     *
     * @var string
     */
    public $DoneDate;
     
    /**
     *
     * @var string
     */
    public $Deposit;
     
    /**
     *
     * @var string
     */
    public $Price;
     
    /**
     *
     * @var string
     */
    public $Extra;
     
    /**
     *
     * @var string
     */
    public $Quote;
     
    /**
     *
     * @var string
     */
    public $Cost;
     
    /**
     *
     * @var string
     */
    public $Currency;
     
    /**
     *
     * @var string
     */
    public $Servicepayer;
     
    /**
     *
     * @var integer
     */
    public $TermsAccepted;
     
    /**
     *
     * @var integer
     */
    public $Adult;
     
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
    public $Quantity;
     
    /**
     *
     * @var string
     */
    public $CardHolder;
     
    /**
     *
     * @var string
     */
    public $CardNumber;
     
    /**
     *
     * @var string
     */
    public $CardMonth;
     
    /**
     *
     * @var string
     */
    public $CardYear;
     
    /**
     *
     * @var string
     */
    public $CardCode;
     
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
    public $ServiceTime;
     
    /**
     *
     * @var string
     */
    public $confirmation_id;

    public $deposit;

    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'ID' => 'ID', 
            'ParentID' => 'ParentID', 
            'OrganizationID' => 'OrganizationID', 
            'ActorID' => 'ActorID', 
            'AgentID' => 'AgentID', 
            'CustomerID' => 'CustomerID', 
            'ServiceID' => 'ServiceID', 
            'FinanceID' => 'FinanceID', 
            'ProductID' => 'ProductID', 
            'AltPartyID' => 'AltPartyID', 
            'AltID' => 'AltID', 
            'Name' => 'Name', 
            'State' => 'State', 
            'Flat' => 'Flat', 
            'Market' => 'Market', 
            'Outcome' => 'Outcome', 
            'Unit' => 'Unit', 
            'ArrivalTime' => 'ArrivalTime', 
            'DepartureTime' => 'DepartureTime', 
            'ServiceFrom' => 'ServiceFrom', 
            'ServiceTo' => 'ServiceTo', 
            'Date' => 'Date', 
            'FromDate' => 'FromDate', 
            'ToDate' => 'ToDate', 
            'DueDate' => 'DueDate', 
            'DoneDate' => 'DoneDate', 
            'Deposit' => 'Deposit', 
            'Price' => 'Price', 
            'Extra' => 'Extra', 
            'Quote' => 'Quote', 
            'Cost' => 'Cost', 
            'Currency' => 'Currency', 
            'Servicepayer' => 'Servicepayer', 
            'TermsAccepted' => 'TermsAccepted', 
            'Adult' => 'Adult', 
            'Child' => 'Child', 
            'Infant' => 'Infant', 
            'Quantity' => 'Quantity', 
            'CardHolder' => 'CardHolder', 
            'CardNumber' => 'CardNumber', 
            'CardMonth' => 'CardMonth', 
            'CardYear' => 'CardYear', 
            'CardCode' => 'CardCode', 
            'Notes' => 'Notes', 
            'version' => 'version', 
            'ServiceTime' => 'ServiceTime', 
            'confirmation_id' => 'confirmation_id',
	        'deposit' => 'deposit'
        );
    }

}
