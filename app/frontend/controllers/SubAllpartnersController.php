<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/21/14
 * Time: 12:06 PM
 */
namespace Razor\Frontend\Controllers;

use User;

class SubAllpartnersController extends NewFrontendController
{
	public function indexAction() {
		$this->assets
			->addCss('css/frontend/sub-allpartners.css');
	}
}