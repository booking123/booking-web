<?php
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 14.07.14
 * Time: 14:41
 */
namespace Razor\Admin\Controllers\channel;
use \Phalcon\Mvc\Controller;

class ReportsController extends ChannelBaseController  {
	public function indexAction(){

	}

	public function pmcontactsAction() {
		$propertyManages = $this->modelsManager->createBuilder()
			->columns('ID, Name, ExtraName, DayPhone')
			->from('Party')
			->innerJoin('ManagerToChannel', 'Party.ID = mtc.property_manager_id', 'mtc')
			->innerJoin('ChannelPartner', 'mtc.channel_partner_id =  cp.id', 'cp')
			->where('cp.party_id = ' . $this->view->user_id)
			->getQuery()
			->execute();

		$this->view->propertyManagers = $propertyManages;
	}
} 