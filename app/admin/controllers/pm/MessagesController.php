<?php
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 01.04.14
 * Time: 19:14
 */

namespace Razor\Admin\Controllers\pm;


class MessagesController extends PmBaseController{

	public function indexAction() {
		$this->assets
			->addCss('css/admin/pm/messages.css')
			->addCss('css/admin/pm/main.css');
		$this->view->setVar('main_menu_active', 'messages');
	}
} 