<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/21/14
 * Time: 12:06 PM
 */
namespace Razor\Frontend\Controllers;

use User;

class RegisterController extends FrontendBaseController
{
	public function initialize()
	{
		$this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_LAYOUT);
		$this->view->setLayout('login');
	}

	public function indexAction()
	{
		$this->assets->addJs('scripts/frontend/register.js');
		$res = \Party::find(array(
			"UserType='PMS'",
			'order' => 'Name',
			'limit' => '10'
		));
		$this->view->setVar('pms_list', $res);
		$this->view->setVar('pos', $this->request->getQuery('pos'));
		$this->view->setVar('current_page','register');
	}
}