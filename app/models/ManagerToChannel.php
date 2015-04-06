<?php




class ManagerToChannel extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;
     
    /**
     *
     * @var integer
     */
    public $property_manager_id;
     
    /**
     *
     * @var integer
     */
    public $channel_partner_id;
     
    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'property_manager_id' => 'property_manager_id', 
            'channel_partner_id' => 'channel_partner_id'
        );
    }

}
