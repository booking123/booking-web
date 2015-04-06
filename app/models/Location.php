<?php


class Location extends \Phalcon\Mvc\Model
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
    public $Code;
     
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
    public $Country;
     
    /**
     *
     * @var string
     */
    public $Region;
     
    /**
     *
     * @var string
     */
    public $Status;
     
    /**
     *
     * @var string
     */
    public $Type;
     
    /**
     *
     * @var string
     */
    public $IATA;
     
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
    public $Notes;
     
    /**
     *
     * @var string
     */
    public $version;

    /**
     *
     * @var integer
     */
    public $ActiveProducts;

    /**
     * @var string
     */
    public $LocationType;

    /**
     * @var integer
     */
    public $ParentID;


    /**
     * Forse set table name for model
     */
    public function initialize(){
        $this->setSource('location');
    }

    /**
     * Independent Column Mapping.
     */
    public function columnMap() {
        return array(
            'ID' => 'ID', 
            'Code' => 'Code', 
            'Name' => 'Name', 
            'State' => 'State', 
            'Country' => 'Country', 
            'Region' => 'Region', 
            'Status' => 'Status', 
            'Type' => 'Type', 
            'IATA' => 'IATA', 
            'Latitude' => 'Latitude', 
            'Longitude' => 'Longitude', 
            'Altitude' => 'Altitude', 
            'Notes' => 'Notes', 
            'version' => 'version',
            'ActiveProducts' => 'ActiveProducts',
            'LocationType' => 'LocationType',
            'ParentID' => 'ParentID'
        );
    }
}
