<?php




class Partner extends \Phalcon\Mvc\Model
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
    public $OrganizationID;
     
    /**
     *
     * @var integer
     */
    public $PartyID;
     
    /**
     *
     * @var string
     */
    public $PartyName;
     
    /**
     *
     * @var string
     */
    public $State;
     
    /**
     *
     * @var string
     */
    public $BookEmailAddress;
     
    /**
     *
     * @var string
     */
    public $BookWebAddress;
     
    /**
     *
     * @var string
     */
    public $ApiKey;
     
    /**
     *
     * @var string
     */
    public $Currency;
     
    /**
     *
     * @var string
     */
    public $DateFormat;
     
    /**
     *
     * @var string
     */
    public $WebAddress;
     
    /**
     *
     * @var string
     */
    public $AlertCron;
     
    /**
     *
     * @var string
     */
    public $PriceCron;
     
    /**
     *
     * @var string
     */
    public $ProductCron;
     
    /**
     *
     * @var string
     */
    public $ScheduleCron;
     
    /**
     *
     * @var integer
     */
    public $AlertWait;
     
    /**
     *
     * @var integer
     */
    public $PriceWait;
     
    /**
     *
     * @var integer
     */
    public $ProductWait;
     
    /**
     *
     * @var integer
     */
    public $ScheduleWait;
     
    /**
     *
     * @var integer
     */
    public $SpecialWait;
     
    /**
     *
     * @var string
     */
    public $SpecialCron;
     
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
    public $Subscription;
     
    /**
     *
     * @var string
     */
    public $Transaction;
     
    /**
     *
     * @var string
     */
    public $BookOffline;
     
    /**
     *
     * @var integer
     */
    public $SupportsCreditCard;
     
    /**
     *
     * @var integer
     */
    public $SendConfirmationEmails;
     
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
            'OrganizationID' => 'OrganizationID', 
            'PartyID' => 'PartyID', 
            'PartyName' => 'PartyName', 
            'State' => 'State', 
            'BookEmailAddress' => 'BookEmailAddress', 
            'BookWebAddress' => 'BookWebAddress', 
            'ApiKey' => 'ApiKey', 
            'Currency' => 'Currency', 
            'DateFormat' => 'DateFormat', 
            'WebAddress' => 'WebAddress', 
            'AlertCron' => 'AlertCron', 
            'PriceCron' => 'PriceCron', 
            'ProductCron' => 'ProductCron', 
            'ScheduleCron' => 'ScheduleCron', 
            'AlertWait' => 'AlertWait', 
            'PriceWait' => 'PriceWait', 
            'ProductWait' => 'ProductWait', 
            'ScheduleWait' => 'ScheduleWait', 
            'SpecialWait' => 'SpecialWait', 
            'SpecialCron' => 'SpecialCron', 
            'Commission' => 'Commission', 
            'Discount' => 'Discount', 
            'Subscription' => 'Subscription', 
            'Transaction' => 'Transaction', 
            'BookOffline' => 'BookOffline', 
            'SupportsCreditCard' => 'SupportsCreditCard', 
            'SendConfirmationEmails' => 'SendConfirmationEmails', 
            'version' => 'version'
        );
    }

}
