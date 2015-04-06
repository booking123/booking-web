<?php
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 01.04.14
 * Time: 19:14
 */

namespace Razor\Admin\Controllers\pm;


class ReportsController extends PmBaseController{

	public function indexAction() {
		$this->view->setVar('main_menu_active', 'reports');
	}
} 