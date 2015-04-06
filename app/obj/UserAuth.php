<?php

class UserAuth
{
	static function checkUser($email, $password) {
		if ($password != 'test') {
			return false;
		}

		return Party::findFirst( array(
			"EmailAddress = '$email'"
		));
	}
}