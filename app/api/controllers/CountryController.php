<?php
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 23.01.14
 * Time: 18:53
 */

namespace Razor\Api\Controllers;

class CountryController extends ControllerBase{

	public function indexAction(){}

	public function listAction(){
		$this->view->disable();

		$query = \Country::query()
			->columns('ID, Name, PhoneCode')
			->notInWhere('ID', array('ZZ')) //, 'AS', 'GU', 'MP', 'PR', 'VG', 'VI'
			->andWhere("Name != ''")
			->orderBy('Name')
			->execute();

		$data = $query->toArray();
		if (!count($data)) {
			return $this->viewJson(array(), true, "Don't have any channel");
		}

		return $this->viewJson($data);
	}

}