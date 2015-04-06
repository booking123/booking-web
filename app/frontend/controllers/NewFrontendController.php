<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/27/14
 * Time: 12:29 PM
 */

namespace Razor\Frontend\Controllers;

class  NewFrontendController extends \Phalcon\Mvc\Controller
{

	public function initialize()
	{
		$this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_LAYOUT);
		$this->view->setLayout('newfrontend');
	}

}