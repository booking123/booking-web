<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/17/14
 * Time: 1:23 PM
 */

namespace User;

use Phalcon\Exception;

class UserAbstract
{

	public $ID;
	public $type;
	public $username;

	public function __construct($ID)
	{
		if (($info = \Party::findFirst("ID = " . $ID)) === false) {
			throw new \Exception('Could not find user with ID = ' . $ID);
		}

		$this->ID = $ID;
		$this->type = $info->UserType;
		$this->username = $info->ExtraName;
		$this->company = $info->Name;
	}

	static function login($username, $password)
	{
		if ( $username == "" || $password == "" ){
			throw new \Exception("username or password empty!");
		}

		try {
			$ID = (int) \StaticServiceApi::checkUser($username, $password);
		} catch (\Exception $e) {
			throw new \Exception("Server doesn't work. Please, try again later.");
		}

		if ( !$ID ) {
			throw new \Exception('Authorization error');
		}

		// Process authorization into Vova's rest api
		// Get data from db
		$tmp_data = \Party::findFirst($ID);
		if ( !$tmp_data ){
			throw new \Exception('Authorization error');
		}

		switch ($tmp_data->UserType) {
			case USER_TYPE_ADMIN:
				return new \User\Admin($ID);

			case USER_TYPE_PM:
				return new \User\PM($ID);

			case USER_TYPE_PMS:
				return new \User\PM($ID);

			case USER_TYPE_AGENT:
				return new \User\PM($ID);
		}

		throw new \Exception('User type could not initialized type: ' . $tmp_data->UserType . ', ID: ' . $ID);
	}

	public function get_prefix()
	{
		switch ($this->type) {
			case USER_TYPE_ADMIN:
				return 'root';

			case USER_TYPE_PM:
				return 'pm';

			case USER_TYPE_PMS:
				return 'pm';

			case USER_TYPE_AGENT:
				return 'channel';

			case USER_TYPE_OLD:
				return 'old';
		}
		throw new \Exception('Wrong user type');
	}
}