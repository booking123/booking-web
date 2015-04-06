<?php




class Relation extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $Index;
     
    /**
     *
     * @var string
     */
    public $Link;
     
    /**
     *
     * @var string
     */
    public $HeadID;
     
    /**
     *
     * @var string
     */
    public $LineID;
     
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
            'Index' => 'Index', 
            'Link' => 'Link', 
            'HeadID' => 'HeadID', 
            'LineID' => 'LineID', 
            'version' => 'version'
        );
    }

}
