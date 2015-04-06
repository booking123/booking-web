<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/27/14
 * Time: 12:29 PM
 */

namespace Razor\Admin\Controllers\channel;

use \Phalcon\Mvc\Controller;

class ChannelBaseController extends Controller
{

	protected $_result = array(
		'error' => false,
		'error_message' => "",
		'data' => array()
	);

	public function initialize()
	{
		$oUser = $this->session->get('user');
		if (is_null($oUser)) {
			return $this->response->redirect('login/');
		}

		// Set prefix
		$this->view->user_prefix = $oUser->get_prefix();
		$this->view->user_name = $oUser->username;
		$this->view->company_name = $oUser->company;
		$this->view->user_id = $oUser->ID;

		// Set layout
		$this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_LAYOUT);
		$this->view->setLayout('channel');

		$this->view->setVar('main_menu', array(
			'dashboard' => 'Dashboard',
			'reservations' => 'Reservations'
		));
		$this->view->setVar('main_menu_active', '');
	}

	public function afterExecuteRoute()
	{
		$this->view->setViewsDir($this->view->getViewsDir() . 'channel/');
	}
}