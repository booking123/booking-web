<?php

class StaticText
{

	protected static $_data = array(
		'registration_step' => array(
			'1' => 'Verify Your information',
			'2' => 'Channel Selection',
			'3' => 'Property Selection',
			'4' => 'Cancelation &amp; Term',
			'5' => 'Online Payment',
			'6' => 'Payouts',
			'7' => 'Payment Verification',
			'8' => 'End Registration'
		),

		'payment_method_type' => array(
			1 => 'Mail',
			2 => 'PayPal',
			3 => 'ACH'
		),

		'funds_holder' => array(
			0 => 'PM',
			1 => 'BookingPal',
			2 => 'Splitted',
			3 => 'Channel Partner'
		),
		'pending_transaction_status' => array(
			1 => 'Active',
			2 => 'Pending',
			3 => 'Cleared',
			4 => 'Failed',
			5 => 'Deleted',
			6 => 'Cancelled',
		),
		'payments_sent_pending' => array(
			1 => 'ACH Transfer',
			2 => 'PayPal transfer',
			3 => 'Mail Check',
			4 => 'Invoice PM',
			5 => 'Auto Distributed',
			6 => 'Invoice Partner'
		)
	);

	public static function get_static_data_list($key) {
		if (isset(self::$_data[$key])) {
			return self::$_data[$key];
		}
		return array();
	}

	public static function get_static_data($key, $id)
	{
		if (!isset(self::$_data[$key])) {
			throw new \Exception('Unknown key');
		}

		if (isset(self::$_data[$key][$id])) {
			return self::$_data[$key][$id];
		}

//		throw new \Exception('Unknown key');
	}

	public static function get_registration_step($key)
	{
		if (isset(self::$_data['registration_step'][$key]))
			return self::$_data['registration_step'][$key];

//		throw new \Exception('Unknown key');
	}

	public static function get_payment_method_type($key)
	{
		if (isset(self::$_data['payment_method_type'][$key]))
			return self::$_data['payment_method_type'][$key];

//		throw new \Exception('Unknown key');
	}

	public static function get_funds_holder($key)
	{
		if (isset(self::$_data['funds_holder'][$key]))
			return self::$_data['funds_holder'][$key];

//		throw new \Exception('Unknown key');
	}

}

