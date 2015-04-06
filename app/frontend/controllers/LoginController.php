<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/21/14
 * Time: 12:06 PM
 */
namespace Razor\Frontend\Controllers;

use User;

class LoginController extends FrontendBaseController
{
	public function indexAction()
	{
		$this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_LAYOUT);
		$this->view->setLayout('login');

		$this->assets->addJs('scripts/frontend/login.js');
		$this->view->setVar('current_page','login');
	}

	public function processAction()
	{
		$this->view->disable();
		$email = $this->request->get('email');
		$pass = $this->request->get('password');

		try {
			$user = User\UserAbstract::login($email, $pass);
			$this->session->set('user', $user);

			$subfolder = "";
			if (in_array($user->type, array(USER_TYPE_AGENT, USER_TYPE_PM, USER_TYPE_PMS, USER_TYPE_ADMIN))) {
				$subfolder = $user->get_prefix() . '/';
			}

			echo json_encode(array('error' => false, 'data' => array('url' => 'admin/' . $subfolder)));
		} catch (\Exception $e) {
			echo json_encode(array('error' => true, 'message' => $e->getMessage()));
		}
	}

	public function signoutAction()
	{
		$this->session->remove('user');
		$this->response->redirect('login/');
	}

}