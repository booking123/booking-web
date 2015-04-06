<?php




class Image extends \Phalcon\Mvc\Model
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
    public $product_id;
     
    /**
     *
     * @var integer
     */
    public $product_altid;
     
    /**
     *
     * @var string
     */
    public $name;
     
    /**
     *
     * @var string
     */
    public $old_name;
     
    /**
     *
     * @var string
     */
    public $type;
     
    /**
     *
     * @var string
     */
    public $language;
     
    /**
     *
     * @var string
     */
    public $url;
     
    /**
     *
     * @var string
     */
    public $state;
     
    /**
     *
     * @var string
     */
    public $data;
     
    /**
     *
     * @var string
     */
    public $notes;
     
    /**
     *
     * @var string
     */
    public $version;
     
    /**
     *
     * @var integer
     */
    public $standard;
     
    /**
     *
     * @var integer
     */
    public $thumbnail;
     
    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'ID' => 'ID', 
            'product_id' => 'product_id', 
            'product_altid' => 'product_altid', 
            'name' => 'name', 
            'old_name' => 'old_name', 
            'type' => 'type', 
            'language' => 'language', 
            'url' => 'url', 
            'state' => 'state', 
            'data' => 'data', 
            'notes' => 'notes', 
            'version' => 'version', 
            'standard' => 'standard', 
            'thumbnail' => 'thumbnail'
        );
    }

}
