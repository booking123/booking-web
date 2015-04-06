<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/21/14
 * Time: 12:06 PM
 */
namespace Razor\Frontend\Controllers;

use \User;

class PaymentController extends FrontendBaseController{

    public function initialize(){
        // $this->view->setRenderLevel( \Phalcon\Mvc\View::LEVEL_LAYOUT );
        // $this->view->setLayout('search');
    }

    public function indexAction(){
        $code = $this->request->get('code', 'string', '');
        $this->view->code = $code;

        if ( $code == '' ){
            die('Param "code" is required!');
        }
        // echo $this->config->application->apiUri . 'xml/services/json/payment/customer_info?reservationPos=' . $code; die();

        $this->view->info = json_decode( file_get_contents( $this->config->application->apiUri . 'xml/services/json/payment/customer_info?reservationPos=' . $code ) );
        if ( $this->view->info->party->is_error == true ){
            die('Param "code" is incorrect!');
        }

        // @todo: delete after Roma put this param into response
        $this->view->info->party->paymentSupported = true;
    }
}