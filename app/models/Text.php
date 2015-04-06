<?php


class Text extends \Phalcon\Mvc\Model
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
    public $Language;
     
    /**
     *
     * @var string
     */
    public $Value;
     
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
    public $Type;
     
    /**
     *
     * @var string
     */
    public $Data;
     
    /**
     *
     * @var string
     */
    public $Date;
     
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
     * Initialize method for model.
     */
    public function initialize()
    {
		$this->setSource('Text');

    }

    /**
     * Independent Column Mapping.
     */
    public function columnMap() {
        return array(
            'ID' => 'ID', 
            'Language' => 'Language', 
            'Value' => 'Value', 
            'Name' => 'Name', 
            'State' => 'State', 
            'Type' => 'Type', 
            'Data' => 'Data', 
            'Date' => 'Date', 
            'Notes' => 'Notes', 
            'version' => 'version'
        );
    }

}
