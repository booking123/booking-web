<?php
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 24.03.14
 * Time: 15:32
 */

namespace Razor\Api\Controllers;


class CurrencyController extends ControllerBase
{
	public function indexAction()
	{

	}

	public function listAction()
	{
		$Currencies = \Currency::find(array(
			'columns' => 'ID, Name',
			'conditions' => "State = 'Created'"
		));
		$currencies = array();
		foreach ($Currencies as $Currency) {

			$currencies[] = array(
				'ID' => $Currency->ID,
				'Name' => $Currency->Name
			);
		}

		$this->viewJson($currencies);
	}
} 