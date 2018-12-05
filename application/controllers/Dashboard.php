<?php
/**
 * Created by PhpStorm.
 * User: Raj
 * Date: 04-12-2018
 * Time: 12:03
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends MY_Controller {


    public function __construct()
    {
        parent::__construct();

    }

    public function index()
    {
        $this->loadViews('Dashboard',Null,Null,Null);
    }

}