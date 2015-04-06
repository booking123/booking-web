<?php

class CorrectValues
{
	public static function number_format($val, $type='price') {
		$val = (float) $val;
		switch ($type) {
			default:
				return number_format($val, 0, '', ',');
//				return number_format($val, 2, '.', ',');
		}
	}

	public static function short_currency($val) {
		switch ($val) {
			case 'USD':
				return '&#36;'; break;
			case 'EUR':
				return '&euro;'; break;

			case 'price':
			default:
				return $val . ' ';
		}
	}
}

