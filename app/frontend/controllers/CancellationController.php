<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/21/14
 * Time: 12:06 PM
 */
namespace Razor\Frontend\Controllers;

use \User;

class CancellationController extends FrontendBaseController{

    //public function initialize(){
        // $this->view->setRenderLevel( \Phalcon\Mvc\View::LEVEL_LAYOUT );
        // $this->view->setLayout('search');
    //}

    public function indexAction(){
        $code = $this->request->get('code', 'string', '');
        // @Todo: Delete after testing. This is text code.
        // $code = '3a1554d123b082b0';
        if ( $code == "" ){
            die('Param "code" is required!');
        }

        // var_dump($this->config->application->apiUri . 'xml/services/json/reservation/cancellation?reservationPos=' . $code); die();

        $this->view->code = $code;
        $this->view->info = json_decode( file_get_contents( $this->config->application->apiUri . 'xml/services/json/reservation/cancellation?reservationPos=' . $code ) );

        if ( $this->view->info->reservation_response->is_error == true ){
            die('Param "code" is incorrect!');
        }

        // format data
        $this->view->info->reservation_response->fromdate = date('m/d/Y', strtotime($this->view->info->reservation_response->fromDate));
        $this->view->info->reservation_response->todate = date('m/d/Y', strtotime($this->view->info->reservation_response->toDate));
        $this->view->info->reservation_response->secondPayment = ( isset($this->view->info->reservation_response->secondPayment)) ? $this->view->info->reservation_response->secondPayment : '';
    }
}