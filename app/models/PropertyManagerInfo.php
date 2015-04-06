<?php


class PropertyManagerInfo extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;

    public $pms_id;

    /**
     *
     * @var integer
     */
    public $pm_id;
     
    /**
     *
     * @var integer
     */
    public $funds_holder;
     
    /**
     *
     * @var integer
     */
    public $registration_step_id;
     
    /**
     *
     * @var integer
     */
    public $damage_coverage_type;
     
    /**
     *
     * @var string
     */
    public $damage_insurance;
     
    /**
     *
     * @var integer
     */
    public $cancelation_type;
     
    /**
     *
     * @var string
     */
    public $cancelation_time;
     
    /**
     *
     * @var integer
     */
    public $cancelation_refund;

    public $cancelation_date;

    /**
     *
     * @var string
     */
    public $cancelation_transaction_fee;

	public $created_date;

	public $number_of_payments;
	public $payment_amount;
	public $payment_type;
	public $remainder_payment_date;
	public $new_registration;
	public $payment_processing_method;

	/**
	 *
	 * @var
	 */
	public $payment_processing_type;

	/**
	 *
	 * @var
	 */
	public $cancellation_type;

	/**
	 *
	 * @var
	 */
	public $check_in_time;

	/**
	 *
	 * @var
	 */
	public $check_out_time;

	/**
	 *
	 * @var
	 */
	public $terms_link;

	/**
	 *
	 * @var
	 */
	public $inquire_only;

	/**
	 *
	 * @var
	 */
	public $commission;

	/**
	 *
	 * @var
	 */
	public $net_rate;

	/**
	 *
	 * @var
	 */
	public $bp_commission;

	/**
	 *
	 * @var
	 */
	public $pms_markup;

	/**
	 *
	 * @var float (7,2)
	 */
	public $additional_commission;

	/**
	 *
	 * @var int
	 */
	public $configuration_id;

	/**
	 *
	 * @var int (1)
	 */
	public $pm_time;

    /**
     * Independent Column Mapping.
     */
    public function columnMap() {
        return array(
            'id' => 'id', 
            'pm_id' => 'pm_id', 
            'pms_id' => 'pms_id',
            'funds_holder' => 'funds_holder',
            'registration_step_id' => 'registration_step_id', 
            'damage_coverage_type' => 'damage_coverage_type', 
            'damage_insurance' => 'damage_insurance', 
            'cancelation_type' => 'cancelation_type', 
            'cancelation_time' => 'cancelation_time', 
            'cancelation_refund' => 'cancelation_refund', 
            'cancelation_transaction_fee' => 'cancelation_transaction_fee',
	        'created_date' => 'created_date',
	        'number_of_payments' => 'number_of_payments',
	        'payment_amount' => 'payment_amount',
	        'payment_type' => 'payment_type',
	        'remainder_payment_date' => 'remainder_payment_date',
	        'new_registration' => 'new_registration',
	        'payment_processing_method' => 'payment_processing_method',
	        'cancelation_date' => 'cancelation_date',

	        'payment_processing_type' => 'payment_processing_type',
			'cancellation_type' => 'cancellation_type',
			'check_in_time' => 'check_in_time',
			'check_out_time' => 'check_out_time',
			'terms_link' => 'terms_link',
			'inquire_only' => 'inquire_only',
			'commission' => 'commission',
			'net_rate' => 'net_rate',
			'bp_commission' => 'bp_commission',
			'pms_markup' => 'pms_markup',
			'configuration_id' => 'configuration_id',
			'additional_commission' => 'additional_commission',
			'pm_time' => 'pm_time'
        );
    }

}
