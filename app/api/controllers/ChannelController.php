<?php
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 23.01.14
 * Time: 18:53
 */

namespace Razor\Api\Controllers;

class ChannelController extends ControllerBase{

	public function indexAction(){}

	public function getAction(){
		$this->view->disable();

		$id = $this->request->getQuery('id', 'int');
		if (!$id) {
			return $this->viewJson(array(), true, 'Don`t have id channel');
		}

		$data = \ChannelPartner::findFirst($id);
		if (!$data) {
			return $this->viewJson(array(), true, "Don't have any channel");
		}

		return $this->viewJson($data);
	}

}