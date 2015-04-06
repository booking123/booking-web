<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/21/14
 * Time: 12:06 PM
 */
namespace Razor\Frontend\Controllers;

use \User;

class SearcholdController extends FrontendBaseController{

    public function initialize(){
        $this->view->setRenderLevel( \Phalcon\Mvc\View::LEVEL_LAYOUT );
        $this->view->setLayout('searchold');
    }

    public function indexAction(){
        // Init pos variable for iframing
        $pos = $this->request->get('pos', 'string', $this->config->search->pos );
        $this->view->pos = $pos;

        // additional params for init search
        $checkin = $this->request->get('checkin', 'string', '-1' );
        $period = $this->request->get('period', 'string', '-1' );
        $currency = $this->request->get('currency', 'string', '-1' );
        $adults = $this->request->get('adults', 'string', '-1' );
        $location = $this->request->get('location', 'string', '-1' );
        $commission = $this->request->get('commission', 'string', '-1' );
        $page = $this->request->get('page', 'string', '1');
        $perpage = $this->request->get('perpage', 'string', '30' );
        $display_inquire_only = ( $this->request->get('display_inquire_only', 'string', 'false' ) == 'false' ) ? 'false' : 'true';


        $this->view->page = $page;
        $this->view->perpage = $perpage;
        $this->view->display_inquire = $display_inquire_only;

        // Receive logo
        $logo = $this->request->get('logo', 'string', $this->config->application->apiUri . 'img/logo.png' );
        $this->view->logo = $logo;

        // Data for product detail
        $product_id = $this->request->get('product_id', 'string', '-1' );

        $this->view->checkin = "";
        $this->view->period = "";
        $this->view->location = "";
        $this->view->location_id = "";
        $this->view->currency = "";
        $this->view->adults = "";
        $this->view->product_id = "";

        if ( $checkin != -1 && $period != -1 && $adults != -1 ){
            //die('all ok');
            // Validation
            if ( strtotime($checkin . ' 00:00:00') < strtotime(date('m/d/Y 00:00:00')) ){die( '"checkin" param must be >= ' . date('m/d/Y') );}
            if ( $period < 1 ){ die('"period" param must be > 0');}
            if ( $adults < 1 ) { $adults = 1; }
            if ( $adults > 10 ) { $adults = 10; }

            // Array of length of stay
            $aLoS = array(1, 2, 3, 4, 5, 7, 14, 21);
            $this->view->checkin = date('m/d/Y', strtotime($checkin) );
            if ( in_array($period, $aLoS) ){
                $this->view->period = $period;
            } else {
                $this->view->period = $aLoS[count($aLoS) - 1];
                for ( $i = 0; $i < count($aLoS) - 1; $i++ ){
                    if ( $period > $aLoS[$i] &&  $period <= $aLoS[$i+1] ){
                        $this->view->period = $aLoS[$i+1];
                        break;
                    }
                }
            }
            $this->view->adults = $adults;
        }

        if ( $currency != -1 ){
            $this->view->currency = $currency;
        }

        if ( $currency != -1 && $product_id != -1  ){
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
                $this->view->location = utf8_encode( $tmp[0]->Name . ", " . $tmp[0]->StateName . $tmp[0]->CountryName );
                $this->view->location_id = $tmp[0]->ID;
            }

            $this->view->checkin = ( $checkin != "-1" ) ? date('m/d/Y', strtotime($checkin)) : date('m/d/Y', strtotime("+ 1 day"));
            $this->view->period = 7;
            $this->view->adults = 2;
        }

        $bIframe = false;
        if ( $this->request->get('size') == "yes" ){
            $bIframe = true;
        }
        $this->view->iframe = $bIframe;

        $this->view->data = "";
        $this->view->success = "";
        $this->view->error = "";

        $this->view->url_params = ( $bIframe ) ? '&size=yes' : '';
        $this->view->url_params .= ( $logo != $this->config->application->apiUri . 'img/logo.png' ) ? '&logo=' . $logo : '';
        $this->view->url_params .= ( $pos != $this->config->search->pos ) ? '&pos=' . $pos : '';
        $this->view->url_params .= ( $currency != -1 && $currency != "USD" ) ? '&currency=' . $currency : '';
        $this->view->url_params .= ( $commission != -1 && $commission == 'true' ) ? '&commission=true' : '';
        $this->view->url_params .= ( $perpage != -1 ) ? '&perpage=' . (int) $perpage : '';
        $this->view->url_params .= ( $page != 1 ) ? '&page=' . (int) $page : '';
        $this->view->url_params .= ( $display_inquire_only == 0 ) ? '&display_inquire_only=' . $display_inquire_only : '';


    }

    public function ajaxgetlocationAction(){
        $term = $this->request->get('term');
        $this->view->disable();

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
                    l.ActiveProducts > 0 AND
                    l.Name like "' . addslashes( utf8_decode( $term ) ) . '%" AND
                    l.State = "Created" AND
                    l.LocationType = "locality"
                ORDER BY
                    l.Name ASC
            ');

	    $tmp_result = array();
	    foreach ( $tmp AS $v ){
		    $tmp_result[] = array('ID' => $v->ID,  'label' => utf8_encode( $v->Name . ", " . $v->StateName . $v->CountryName ));
	    }

	    echo json_encode( $tmp_result );
    }

    protected function _getLocationDbInfo( $location ){
        return $this->modelsManager->executeQuery('
                select
                    l.ID
                from
                    \Location as l
					inner join \Country as c ON (l.Country = c.ID)
                where
                    l.ActiveProducts > 0 AND
                    l.Name like "' . addslashes( $location ) . '" AND
                    l.State = "Created" AND
                    l.LocationType = "locality"
                order by
                    l.ActiveProducts DESC
            ');
    }

    public function ajaxgetlocationinfoAction(){
        $result = array('error' => false, 'error_message' => '', 'data' => array());
        $location = explode(',', $this->request->get('location'));
        $location = $location[0];

        $this->view->disable();

        //
        $tmp = $this->_getLocationDbInfo( $location );

        if ( count($tmp) > 0 ){
            $result['data']['ID'] = $tmp[0]->ID;
        } else {
            $result['is_error'] = true;
            $result['message'] = "Location not found";
        }

        echo json_encode( $result );
    }

    public function ajaxpropertydetailAction(){
        $this->view->disable();
        $result = array();
        echo json_encode( $result );
    }
}