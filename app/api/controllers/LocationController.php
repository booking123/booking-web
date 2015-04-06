<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 4/8/14
 * Time: 10:14 AM
 */

namespace Razor\Api\Controllers;

class LocationController extends ControllerBase{

    public function getlocationsAction(){
        $location = $this->request->get('term');
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
                    l.Name like "' . addslashes( utf8_decode( $location ) ) . '%" AND
                    l.State = "Created" AND
                    l.LocationType = "locality"
                ORDER BY
                    l.ActiveProducts DESC,
                    l.Name ASC
                LIMIT
                    8
            ');

        $tmp_result = array();
        foreach ( $tmp AS $v ){
            $tmp_result[] = array('ID' => $v->ID,  'label' => utf8_encode( $v->Name . ", " . $v->StateName . $v->CountryName ));
        }
        echo json_encode( $tmp_result );
    }

    public function getInfoAction(){
        $result = array('error' => false, 'error_message' => '', 'data' => array());
        $full_location = $this->request->get('location');
        $location = explode(',', $full_location);
        $location = $location[0];

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
                    l.Name like "' . addslashes( utf8_decode($location) ) . '" AND
                    l.State = "Created" AND
                    l.LocationType = "locality"
                order by
                    l.ActiveProducts DESC
            ');

        if ( count($tmp) > 0 ){
            $bConsider = false;
            foreach( $tmp AS $k => $v ){
                if ( $v->Name . ", " . $v->StateName . $v->CountryName == $full_location ){
                    $bConsider = true;
                    $result['data']['ID'] = $v->ID;
                    break;
                }
            }

            if ( !$bConsider ){
                $result['data']['ID'] = $tmp[0]->ID;
            }
        } else {
            $result['error'] = true;
            $result['error_message'] = "Location not found";
        }

        echo json_encode( $result );
    }

}