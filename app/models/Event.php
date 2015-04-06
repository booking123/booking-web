<?php




class Event extends \Phalcon\Mvc\Model
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
    public $ActorID;
     
    /**
     *
     * @var integer
     */
    public $ParentID;
     
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
    public $Activity;
     
    /**
     *
     * @var string
     */
    public $Process;
     
    /**
     *
     * @var string
     */
    public $Type;
     
    /**
     *
     * @var string
     */
    public $Date;
     
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
     * @var integer
     */
    public $Downloaded;
     
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
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'ID' => 'ID', 
            'OrganizationID' => 'OrganizationID', 
            'ActorID' => 'ActorID', 
            'ParentID' => 'ParentID', 
            'Name' => 'Name', 
            'State' => 'State', 
            'Activity' => 'Activity', 
            'Process' => 'Process', 
            'Type' => 'Type', 
            'Date' => 'Date', 
            'DueDate' => 'DueDate', 
            'DoneDate' => 'DoneDate', 
            'Downloaded' => 'Downloaded', 
            'Notes' => 'Notes', 
            'version' => 'version'
        );
    }

}
