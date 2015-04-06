<?php


class Region extends \Phalcon\Mvc\Model
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
    public $Country;
     
    /**
     *
     * @var string
     */
    public $Name;

    /**
     *
     * @var string
     */
    public $version;

    /**
     * Forse set table name for model
     */
    public function initialize(){
        $this->setSource('region');
    }

    /**
     * Independent Column Mapping.
     */
    public function columnMap() {
        return array(
            'ID' => 'ID', 
            'Country' => 'Country', 
            'Name' => 'Name', 
            'version' => 'version'
        );
    }

}
