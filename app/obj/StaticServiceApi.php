<?php

class StaticServiceApi
{
	public static function getPosById($id) {
		$url = API_URL . 'xml/services/json/party/posorid?id=' . $id;

		return self::goRequest($url);
	}

	public static function getIdByPos($str) {
		$url = API_URL . 'xml/services/json/party/posorid?pos=' . $str;

		return self::goRequest($url);
	}

	public static function checkUser($username, $password) {
		$url = API_URL . 'xml/services/json/registration/usercheck/?user=' . $username . '&password=' . $password;

		return self::goRequest($url);
	}

	private static function goRequest($url) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_REFERER, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$result = curl_exec($ch);

		$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

		if ($http_status != 200) {
			throw new \Exception('Server return error code is ' . $http_status);
		}

		curl_close($ch);

		return $result;
	}
}

