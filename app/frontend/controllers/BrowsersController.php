<?php
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 12.11.14
 * Time: 14:27
 */
namespace Razor\Frontend\Controllers;

use User;

class BrowsersController extends FrontendBaseController
{
	public function indexAction()
	{
		$this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_LAYOUT);
		$this->view->setLayout('browsers');
	}



}