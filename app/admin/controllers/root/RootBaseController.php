<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/27/14
 * Time: 12:29 PM
 */

namespace Razor\Admin\Controllers\root;

use \Phalcon\Mvc\Controller;

class RootBaseController extends Controller
{

	protected $_result = array(
		'error' => false,
		'error_message' => "",
		'data' => array()
	);

	public function initialize(){
		$oUser = $this->session->get('user');
		if (is_null($oUser) || $oUser->type != USER_TYPE_ADMIN) {
            return $this->response->redirect('login/');
        }

		// Set prefix
		$this->view->user_prefix = $oUser->get_prefix();
		$this->view->user_name = $oUser->username;

        // Set layout
        $this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_LAYOUT);
        $this->view->setLayout('root');
	}

	public function afterExecuteRoute()
	{
		$this->view->error = $this->_result['error'];
		$this->view->error_message = $this->_result['error_message'];
		foreach ($this->_result['data'] AS $k => $v) {
			$this->view->$k = $v;
		}
        $this->view->setViewsDir( $this->view->getViewsDir() . 'root/');
    }

	public function getOrderValue(&$filter, $thead_names = array(), $sort_val = null)
	{
		if (!$sort_val && !$filter->sort_name) {
			return null;
		}

		if ($sort_val) {
			$val = null;
			for ($i = 0; $i < count($thead_names); $i++) {
				if (isset($thead_names[$i][1]) && $thead_names[$i][1] == $sort_val) {
					$val = $thead_names[$i][1];
					break;
				}
			}

			if ($val) {
				$filter->sort_desc = ($val == $filter->sort_name && !$filter->sort_desc);
				$filter->sort_name = $val;
			}
		}

		if (!$filter->sort_name) {
			return null;
		}

		$val = $filter->sort_name;

		if ($filter->sort_desc) {
			$val .= ' DESC';
		}

		return $val;
	}

	public function getCsv ($report_name, $array, $arr_header) {
		$out = fopen('php://output', 'w');

		$response = new \Phalcon\Http\Response();

		$response->setHeader("Content-Type", "application/csv");
		$response->setHeader("Content-Disposition", 'attachment; filename="' . $report_name . '_' . time() . '.csv"');

		$header = array();
		for ($i = 0; $i < count($arr_header); $i++) {
			$header[] = $arr_header[$i][0];
		}

		fputcsv($out, (array)$header, ',');
		foreach ($array as $row) {
			fputcsv($out, (array)$row, ',');
		}

		$response->send();

		fclose($out);
	}

	protected function isSortName($sort_arr, $sort_name)
	{
		for ($i = 0; $i < count($sort_arr); $i++) {
			if (isset($sort_arr[$i][1]) && $sort_arr[$i][1] == $sort_name) {
				return true;
			}
		}
		return false;
	}

	protected function convertPriceForCSV($float)
	{
		return number_format($float, 2, '.', '');
	}

	protected function convertPriceForReport($float)
	{
		return number_format($float, 2, '.', ' ');
	}

}