<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/27/14
 * Time: 12:29 PM
 */

namespace Razor\Admin\Controllers\pm;

use \Phalcon\Mvc\Controller;

class PmBaseController extends Controller
{

	protected $_result = array(
		'error' => false,
		'error_message' => "",
		'data' => array()
	);

	public function initialize(){
		$oUser = $this->session->get('user');
		if (is_null($oUser) || !in_array($oUser->type, array(USER_TYPE_PM, USER_TYPE_PMS))) {
            return $this->response->redirect('login/');
        }

		// Set prefix
		$this->view->user_prefix = $oUser->get_prefix();
		$this->view->user_name = $oUser->username;
		$this->view->user_company = $oUser->company;
		$this->view->user_id = $oUser->ID;

        // Set layout
        $this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_LAYOUT);
        $this->view->setLayout('pm');

		$this->view->setVar('main_menu', array(
			'dashboard' => 'Dashboard',
//			'tasks' => 'Tasks',
//			'messages' => 'Messages',
			'listings' => 'Listings',
//			'property_detail' => 'Property Detail',
			'reservations' => 'Reservations',
			'transactions' => 'Transactions',
//			'distribution' => 'Distribution',
//			'customers' => 'Customers',
//			'bookings' => 'Bookings',
//			'account' => 'Account'
		));
		$this->view->setVar('main_menu_active', '');
	}

	public function afterExecuteRoute()
	{
		$this->view->error = $this->_result['error'];
		$this->view->error_message = $this->_result['error_message'];
		foreach ($this->_result['data'] AS $k => $v) {
			$this->view->$k = $v;
		}
        $this->view->setViewsDir( $this->view->getViewsDir() . 'pm/');
    }
}