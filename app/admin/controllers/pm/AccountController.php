<?php
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 01.04.14
 * Time: 19:14
 */

namespace Razor\Admin\Controllers\pm;


class AccountController extends PmBaseController{

	public function indexAction() {
		$pm = \Party::findFirst(array(
			'columns' => 'AltPartyID,
			Name,
			ExtraName,
			PostalAddress,
			PostalCode,
			Country,
			DayPhone,
			EmailAddress,
			Currency,
			FormatDate',
			'conditions' => 'ID = ' . $this->view->user_id
		));
		$name = explode(' ', $pm->ExtraName);
		$address = explode(',', $pm->PostalAddress);

		$pm->FirstName = $name[0];
		$pm->LastName = isset($name[1]) ? trim($name[1]) : '';
		$pm->Address = $address[0];
		$pm->City = isset($address[1]) ? trim($address[1]) : '';
		$pm->State = isset($address[2]) ? trim($address[2]) : '';


		//SELECT party.FormatDate FROM party WHERE party. GROUP BY party.FormatDate
		#TODO: Correct types FormatDate
		$DateFormats = \Party::find(array(
			'columns' => 'FormatDate',
			'conditions' => 'FormatDate IS NOT NULL',
			'group' => 'FormatDate'
		));


		$Currencies = \Currency::find(array(
			'columns' => 'ID, Name',
			'conditions' => "State = 'Created'"
		));


		$Countries = \Country::query()
			->columns('ID, Name, PhoneCode')
			->notInWhere('ID', array('ZZ'))
			->andWhere("Name != ''")
			->orderBy('Name')
			->execute();


		$this->view->setVar('pm', $pm);
		$this->view->setVar('countries', $Countries);
		$this->view->setVar('currencies', $Currencies);
		$this->view->setVar('date_formats', $DateFormats);
		$this->view->setVar('main_menu_active', 'account');
	}

	public function saveAction() {
		$res = array(
			'error' => false,
			'messages' => array()
		);
//		$company = $this->request->getQuery("currency");

		$first_name = $this->request->getQuery('first_name');
		$last_name = $this->request->getQuery('last_name');
		$address = $this->request->getQuery('address');
		$city = $this->request->getQuery('city');
		$state = $this->request->getQuery('state');
		$zip = $this->request->getQuery('zip');
		$country = $this->request->getQuery('country');
		$tel = $this->request->getQuery('tel');
		$currency = $this->request->getQuery('currency');
		$email = $this->request->getQuery('email');
		$date_format = $this->request->getQuery('date_format');

		$password = $this->request->getQuery('password');


		if (!$first_name || !$last_name) {
			$res['messages'][] = 'Please enter your name.';
		}
		if (!$address || !$city) {
			$res['messages'][] = 'Please enter your address.';
		}
		if (!$zip) {
			$res['messages'][] = 'Please correct enter your post code.';
		}
		if (!$tel) {
			$res['messages'][] = 'Please correct enter your phone number.';
		}

		$Manager = \Party::findFirst(array(
			'columns' => 'ID',
			'conditions' => "EmailAddress = '" . $email . "'"
		));


		$pm = \Party::findFirst($this->view->user_id);

		if ($Manager && $Manager->ID != $this->view->user_id) {
			$res['messages'][] = 'This email exist. Please enter other email.';
		} else if (!$Manager) {
			$pm->EmailAddress = $email;
		}

		$res['error'] = !!count($res['messages']);

		if (!$res['error']) {
			$pm->ExtraName = $first_name . ' ' . $last_name;
			$pm->PostalAddress = $address . ', ' . $city . ', ' . $state . ',';
			$pm->PostalCode = $zip;
			$pm->DayPhone = $tel;
			$pm->Currency = $currency;
			$pm->Country = $country;
			$pm->FormatDate = $date_format;

			$pm->save();

			if ($password) {
				#TODO: This code for JAVA API - change password
			}
		}

		$this->view->disable();
		echo json_encode($res);
	}
}