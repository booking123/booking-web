<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/27/14
 * Time: 12:29 PM
 */

namespace Razor\Frontend\Controllers;

class FrontendBaseController extends \Phalcon\Mvc\Controller
{

	public function initialize()
	{
		$default_logo = $this->config->application->baseUri . 'img/logo.png';
		$this->view->js_logo = false;
		switch ($this->config->application->siteName) {

			case SITE_NAME_VHC :
				$unique_class = 'global-vacationhomes';
				$logo = $this->config->application->baseUri . 'img/logo-vhc.png';
                $default_logo = $logo;
				break;

			case SITE_NAME_HVH :
				$unique_class = 'global-holidayvillas';
				$logo = $this->config->application->baseUri . 'img/logo-hvh.png';
                $default_logo = $logo;
				break;

			default:
				$unique_class = 'global-bookingpal';
				$logo = $this->request->get('logo', 'string');

                if ( is_null($logo) ){
                    $logo = $default_logo;
                } else {
                    $this->view->js_logo = $logo;
                }
				break;
		}

		$this->view->setVar('unique_class', $unique_class);
		$this->view->setVar('unique_logo', $logo);
        $this->view->setVar('default_logo', $default_logo);
	}
}