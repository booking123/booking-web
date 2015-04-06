<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/21/14
 * Time: 12:06 PM
 */
namespace Razor\Frontend\Controllers;

use User;

class HomeController extends FrontendBaseController
{
	public function indexAction() {
		$this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_LAYOUT);
		$this->view->setLayout('home');

		$version = $this->request->getQuery("version");
        $tomorrow = date('Y-m-d', strtotime("+ 1 day"));

        // Initialize logo
//        $logo = $this->request->get('logo', 'string', $this->config->application->apiUri . 'img/logo.png' );
        // Initialize POS param
        $pos = $this->request->get('pos', 'string', $this->config->search->pos ); 
        $this->view->pos = $pos;

//        $this->view->logo = $logo;
//        $this->view->js_logo = "";
//        if ( $logo != $this->config->application->apiUri . 'img/logo.png' ){
//            $this->view->js_logo = $logo;
//        }
        $url_params = "";
        if ($this->view->unique_logo != $this->view->default_logo ){
            $url_params .= "logo=".$this->view->unique_logo."&";
        }
        if ( $pos != $this->config->search->pos ){
            $url_params .= "pos=".$pos."&";
        }


		$location_settings = array(
			'class' => 'us',
			'logo' => 'img/logo.png',
			'title' => ' Homes Across America',
			'cities' => array(
				array(
					'name' => 'Lake Tahoe',
					'link' => 'search/?'.$url_params.'location=Lake Tahoe, CA, United States&check_in=' . $tomorrow . '&period=7&guests=2#/search',
					'image' => 'img/frontend/temp/list1.jpg'
				),
				array(
					'name' => 'Myrtle Beach',
					'link' => 'search/?'.$url_params.'location=Myrtle Beach&check_in=' . $tomorrow . '&period=7&guests=2#/search',
					'image' => 'img/frontend/temp/list2.jpg'
				),
				array(
					'name' => 'Destin',
					'link' => 'search/?'.$url_params.'location=Destin&check_in=' . $tomorrow . '&period=7&guests=2#/search',
					'image' => 'img/frontend/temp/list3.jpg'
				),
				array(
					'name' => 'Cape Cod',
					'link' => 'search/?'.$url_params.'location=Cape Cod, MA, United States&check_in=' . $tomorrow . '&period=7&guests=2#/search',
					'image' => 'img/frontend/temp/list4.jpg'
				),
				array(
					'name' => 'The Hamptons',
					'link' => 'search/?'.$url_params.'location=Hamptons, NY, United States&check_in=' . $tomorrow . '&period=7&guests=2#/search',
					'image' => 'img/frontend/temp/list5.jpg'
				),
				array(
					'name' => 'San Diego',
					'link' => 'search/?'.$url_params.'location=San Diego&check_in=' . $tomorrow . '&period=7&guests=2#/search',
					'image' => 'img/frontend/temp/list6.jpg'
				),
				array(
					'name' => 'Park City',
					'link' => 'search/?'.$url_params.'location=Park City&check_in=' . $tomorrow . '&period=7&guests=2#/search',
					'image' => 'img/frontend/temp/list7.jpg'
				),
				array(
					'name' => 'Breckenridge',
					'link' => 'search/?'.$url_params.'location=Breckenridge, CO, United States&check_in=' . $tomorrow . '&period=7&guests=2#/search',
					'image' => 'img/frontend/temp/list8.jpg'
				),
				array(
					'name' => 'Miami Beach',
					'link' => 'search/?'.$url_params.'location=Miami Beach, FL, United States&check_in=' . $tomorrow . '&period=7&guests=2#/search',
					'image' => 'img/frontend/temp/list9.jpg'
				),
			)
		);

		if ($version == 'eu') {
			$location_settings['class'] = 'eu';
			$location_settings['logo'] = 'img/frontend/logo.png';
			$location_settings['title'] = 'Homes all over the world';
			$location_settings['cities'][4] = array(
				'name' => 'London',
				'link' => 'search/?'.$url_params.'location=London&check_in=' . $tomorrow . '&period=7&guests=2#/search',
				'image' => 'img/frontend/temp/list5-eu.jpg'
			);
			$location_settings['cities'][6] = array(
				'name' => 'Barcelona',
				'link' => 'search/?'.$url_params.'location=Barcelona&check_in=' . $tomorrow . '&period=7&guests=2#/search',
				'image' => 'img/frontend/temp/list7-eu.jpg'
			);
			$location_settings['cities'][8] = array(
				'name' => 'Rome',
				'link' => 'search/?'.$url_params.'location=Rome&check_in=' . $tomorrow . '&period=7&guests=2#/search',
				'image' => 'img/frontend/temp/list9-eu.jpg'
			);
		}

		$this->view->setVar('location_settings', $location_settings);
	}
}