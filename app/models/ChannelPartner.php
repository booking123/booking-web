<?php


use Phalcon\Mvc\Model\Validator\Email as Email;

class ChannelPartner extends \Phalcon\Mvc\Model
{

	/**
	 *
	 * @var integer
	 */
	public $id;

	/**
	 *
	 * @var string
	 */
	public $channel_name;

	/**
	 *
	 * @var string
	 */
	public $logo_url;

	/**
	 *
	 * @var integer
	 */
	public $channel_type;

	/**
	 *
	 * @var string
	 */
	public $coverage;

	/**
	 *
	 * @var string
	 */
	public $contact_type;

	/**
	 *
	 * @var string
	 */
	public $payment_process;

	/**
	 *
	 * @var string
	 */
	public $payouts;

	/**
	 *
	 * @var string
	 */
	public $damage_coverage;

	/**
	 *
	 * @var string
	 */
	public $traffic;

	/**
	 *
	 * @var string
	 */
	public $commission;

	/**
	 *
	 * @var string
	 */
	public $listing_fees;

	/**
	 *
	 * @var string
	 */
	public $privacy_policy;

	/**
	 *
	 * @var string
	 */
	public $terms_conditions;

	/**
	 *
	 * @var integer
	 */
	public $selected;

	/**
	 *
	 * @var string
	 */
	public $phone;

	/**
	 *
	 * @var string
	 */
	public $email;

	/**
	 *
	 * @var string
	 */
	public $office_address;

	/**
	 *
	 * @var string
	 */
	public $description;

	/**
	 *
	 * @var integer
	 */
	public $party_id;

	public $state;

	public $order;

	public $website_url;

	/**
	 *
	 * @var integer
	 */
	public $generate_xml;

	/**
	 *
	 * @var string
	 */
	public $ftp_password;

	/**
	 *
	 * @var integer
	 */
	public $send_failure_email;

	/**
	 *
	 * @var integer
	 */
	public $send_confirmation_email;

	/**
	 *
	 * @var integer
	 */
	public $funds_holder;

	/**
	 *
	 * @var float
	 */
	public $bp_commission;

	/**
	 * Validations and business logic
	 */
	public function validation()
	{


//        $this->validate(
//            new Email(
//                array(
//                    "field"    => "email",
//                    "required" => true,
//                )
//            )
//        );
//        if ($this->validationHasFailed() == true) {
//            return false;
//        }

	}

	/**
	 * Independent Column Mapping.
	 */
	public function columnMap()
	{
		return array(
			'id' => 'id',
			'channel_name' => 'channel_name',
			'logo_url' => 'logo_url',
			'channel_type' => 'channel_type',
			'coverage' => 'coverage',
			'contact_type' => 'contact_type',
			'payment_process' => 'payment_process',
			'payouts' => 'payouts',
			'damage_coverage' => 'damage_coverage',
			'traffic' => 'traffic',
			'commission' => 'commission',
			'listing_fees' => 'listing_fees',
			'privacy_policy' => 'privacy_policy',
			'terms_conditions' => 'terms_conditions',
			'selected' => 'selected',
			'phone' => 'phone',
			'email' => 'email',
			'office_address' => 'office_address',
			'description' => 'description',
			'party_id' => 'party_id',
			'state' => 'state',
			'order' => 'order',
			'website_url' => 'website_url',
			'generate_xml' => 'generate_xml',
			'ftp_password' => 'ftp_password',
			'send_failure_email' => 'send_failure_email',
			'send_confirmation_email' => 'send_confirmation_email',
			'bp_commission' => 'bp_commission',
			'funds_holder' => 'funds_holder'
		);
	}


}
