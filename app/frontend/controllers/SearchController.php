<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/21/14
 * Time: 12:06 PM
 */
namespace Razor\Frontend\Controllers;

use User;

class SearchController extends FrontendBaseController
{
	public function indexAction(){
        $this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_LAYOUT);
        $this->view->setLayout('search');

        // Get request params
        $pos = $this->request->get('pos', 'string', $this->config->search->pos );
        $location = $this->request->get('location', 'string', '-1' );
        $full_location = $location;

        if ($location != -1){
            $location = explode(',', $location);
            $location = $location[0];
        }

        $check_in = $this->request->get('checkin', 'string', '' );
        $period = $this->request->get('period', 'string', '' );

        if ( $check_in == '' && $period == '' ){
            $check_in = date('m/d/Y', strtotime('next Saturday'));
            //$period = 7;
        } elseif ( $check_in == '' || date('Y-m-d', strtotime($check_in)) != $check_in ){
            $check_in  = date('m/d/Y', strtotime(date('m/d/Y'). ' + 1 day'));
        } else {
            $check_in = date('m/d/Y', strtotime($check_in));
        }

        if ( $period == -1 || $period == '' ){
            $period = 7;
        }

        $check_out = '-1';
        $guests = $this->request->get('adults', 'string', '2' );
        $currency = $this->request->get('currency', 'string', 'USD' );

        $show_commission = $this->request->get('commission', 'string', 'false');
        if ( $show_commission != 'true' ){
            $show_commission = 'false';
        }

        // https://uat.mybookingpal.com/search/?checkin=2014-10-30&period=7&location=paris&currency=USD&adults=1&product_id=94651#/product
        $product_id = $this->request->get('product_id', 'string', '0');
        $this->view->product_id = $product_id;

        // calculste need fields
        if ( $check_in != -1 && $period != -1 ){
            $check_out = date('m/d/Y', strtotime($check_in. ' + '.$period.' day'));
        }

        // Initialize logo
//        $logo = $this->request->get('logo', 'string', $this->config->application->apiUri . 'img/logo.png' );
//        $this->view->logo = $logo;
//        $this->view->js_logo = "";
//        if ( $logo != $this->config->application->apiUri . 'img/logo.png' ){
//            $this->view->js_logo = $logo;
//        }

        // Display inquire only
        $display_inquire_only = ( $this->request->get('display_inquire_only', 'string', 'false' ) == 'false' ) ? 'false' : 'true';

        // set default view variables
        $this->view->pos = $pos;
        $this->view->location = $location;
        $this->view->location_id = 0;
        $this->view->check_in = $check_in;
        $this->view->check_out = $check_out;
        $this->view->guests = $guests;
        $this->view->period = $period;
        $this->view->currency = $currency;
        $this->view->show_commission = $show_commission;
		$this->view->property_type = $this->request->getQuery('property_type');
		$this->view->num_bed = $this->request->getQuery('num_bed', 'int');
		$this->view->num_bath = $this->request->getQuery('num_bath', 'int');
		$this->view->min = $this->request->getQuery('min', 'int');
		$this->view->max = $this->request->getQuery('max', 'int');
		$this->view->options = $this->request->getQuery('options');
		$this->view->ammenities = $this->request->getQuery('ammenities');
		$this->view->property = $this->request->getQuery('property');
        $this->view->display_inquire = $display_inquire_only;

        if ( $product_id != 0  ){
            $tmp = $this->modelsManager->executeQuery('
                select
                    l.ParentID
                from
                    \Product as p
                    inner join \Location as l ON (p.LocationID = l.ID)
                where
                    p.ID = ' . $product_id . '
                ORDER BY
                    l.Name ASC
            ');

            $tmp = $this->modelsManager->executeQuery('
                select
                    l.ID,
                    l.Name,
                    c.Name as CountryName,
                    if( l.Country = "US", concat(l.Region, ", ") , "" ) as StateName
                from
                    Location as l
					inner join \Country as c ON (l.Country = c.ID)
                where
                    l.ID = ' . $tmp[0]->ParentID . '
                ORDER BY
                    l.Name ASC
            ');

            if ( count( $tmp) > 0 ){
                $this->view->location = utf8_encode( $tmp[0]->Name . ", " . $tmp[0]->StateName . $tmp[0]->CountryName );
                $this->view->location_id = $tmp[0]->ID;
            }
            $this->view->product_id = $product_id;
        }

        if ( $location != -1 && $location != '' ){
            $where = "";
            if ( isset($this->config->locations->$location) ){
                $where = 'l.ID = ' . $this->config->locations->$location;
            } else {
                $where = '
                    l.ActiveProducts > 0 AND
                    l.Name like "' . addslashes( utf8_decode( $location ) ) . '%" AND
                    l.State = "Created" AND
                    l.LocationType = "locality" AND
                    l.ID = l.ParentID
                ';
            }

            $tmp = $this->modelsManager->executeQuery('
                select
                    l.ID,
                    l.Name,
                    c.Name as CountryName,
                    if( l.Country = "US", concat(l.Region, ", ") , "" ) as StateName
                from
                    \Location as l
					inner join \Country as c ON (l.Country = c.ID)
                where
                    ' . $where . '
                ORDER BY
                    l.Name ASC
            ');

            if ( count( $tmp ) > 0 ){
                $bConsider = false;
                foreach( $tmp AS $k => $v ){
                    if ( $v->Name . ", " . $v->StateName . $v->CountryName == $full_location ){
                        $bConsider = true;
                        $this->view->location = utf8_encode( $v->Name . ", " . $v->StateName . $v->CountryName );
                        $this->view->location_id = $v->ID;
                        break;
                    }
                }

                if ( !$bConsider ){
                    $this->view->location = utf8_encode( $tmp[0]->Name . ", " . $tmp[0]->StateName . $tmp[0]->CountryName );
                    $this->view->location_id = $tmp[0]->ID;
                }
            } else {
                $this->view->location_id = -1;
            }
        }

        if ( $this->view->location == -1 ) {
            $this->view->location = "";
        }

        $logo_params = "";
        if ($this->view->unique_logo != $this->view->default_logo ){
            $logo_params .= ( $logo_params == "" ) ? '?' : '';
            $logo_params .= "logo=".$this->view->unique_logo;
        }
        if ( $pos != $this->config->search->pos ){
            $logo_params .= ( $logo_params == "" ) ? '?' : '&';
            $logo_params .= "pos=".$pos;
        }
        $this->view->logo_params = $logo_params;
	}
}