<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/21/14
 * Time: 12:06 PM
 */
namespace Razor\Frontend\Controllers;

use User;

class ContactUsController extends NewFrontendController
{
	public function indexAction() {
		$this->assets
			->addCss('css/frontend/contact-us.css');

		$this->view->setVar('locations', array(
			'headquater' => array(
				'name' => 'BookingPal Headquater',
				'address' => '1810 Von Karman, Suite 400',
				'city' => 'Irvine, CA 92612',
				'map_address' => urlencode('1810 Von Karman, Suite 400, Irvine, CA 92612'),
			),
			'virginia' => array(
				'name' => 'Virginia Office',
				'address' => '999 Waterside Drive',
				'city' => 'Norfolk, Virginia 23510',
				'map_address' => urlencode('999 Waterside Drive Norfolk, Virginia 23510'),
			)
		));
	}
}