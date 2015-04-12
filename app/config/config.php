<?php

//$config = (object) ['application' => (object)[
//  'apiUri' => 'localhost',
//  'baseUri' => '/booking-web/public/',
//  'siteName' => 'booking',
//  'translations' => '/../app/translations'
//]];

$config = (object) array('application' => (object) array(
  'apiUri' => 'localhost',
  'baseUri' => '/booking-web/public/',
  'siteName' => 'booking',
  'translations' => '/../app/translations'
));

return $config;