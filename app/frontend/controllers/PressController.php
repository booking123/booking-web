<?php
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 01.04.14
 * Time: 19:14
 */

namespace Razor\Frontend\Controllers;

use User;


class PressController extends NewFrontendController
{
	public function indexAction()
	{
		$this->assets
			->addCss('css/frontend/press.css');
	}

	public function series_B_fundingAction() {
		$this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_ACTION_VIEW);
	}
	public function new_partnership_with_homeaway_softwareAction() {
		$this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_ACTION_VIEW);
	}
	public function new_partnership_with_streamlineAction() {
		$this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_ACTION_VIEW);
	}
	public function bookingpal_strengthens_management_teamAction() {
		$this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_ACTION_VIEW);
	}
} 