<?php
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 01.04.14
 * Time: 19:14
 */

namespace Razor\Frontend\Controllers;

use User;


class SubFinanceController extends NewFrontendController
{
	public function indexAction()
	{
		$this->assets
			->addCss('css/frontend/sub-finance.css');
	}
} 