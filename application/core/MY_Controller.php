<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller {

    protected $ip;

    public function __construct()
    {
        parent::__construct();
        $this->ip = $this->input->ip_address();


    }


    function isLoggedIn() {
        $isLoggedIn = $this->session->userdata ('user_login_status');

        if (!isset( $isLoggedIn )) {
            redirect ( 'auth/login' );
        }
        else
        {
            return true;
        }
    }

    public function index()
    {

    }



    public function redirectLogin()
    {
        $url = base_url().midUrl().'auth/login';

        echo "<script>";
        echo "window.location.href = '$url'";
        echo "</script>";
    }



    /********** Encription Methos *********/
    public function enc($str)
    {
        $key="RAJ-VERMA";
        $key=base64_encode($key);
        $key=base64_encode($key);

        $par=$str;
        $par=base64_encode($par);
        $par=base64_encode($par);

        $myKey=$key.$par;

        $myKey=base64_encode($myKey);
        $myKey=base64_encode($myKey);
        return $myKey;
    }

    public function dec($str)
    {
        $rv=base64_decode($str);
        $rv=base64_decode($rv);

        $key="RAJ-VERMA";
        $key=base64_encode($key);
        $key=base64_encode($key);

        $mystr=str_replace($key,"",$rv);

        $final=base64_decode($mystr);
        $final=base64_decode($final);

        return $final;
    }

    /********** Encryption Password Methos *********/
    public function encPass($pass)
    {
        return md5($pass);
    }

    /******************* Upload File **********************/
    function do_upload($name,$config = array())
    {
        if(empty($config['upload_path']))
        {
            $config['upload_path'] = '../uploads/';
        }

        if(empty($config['allowed_types']))
        {
            $config['allowed_types'] = 'gif|jpg|png|jpeg|pdf|JPG|JPEG'; //'gif|jpg|png'
        }

        if(empty($config['max_size']))
        {
            // $config['max_size']	= '1000';
//            $config['max_width']  = '1024';
//            $config['max_height']  = '768';
        }


        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload($name))
        {
            $error = array('error' => $this->upload->display_errors());
            $error['completed'] = false;
            return $error;
        }
        else
        {
            $data = array('upload_data' => $this->upload->data());
            $data['completed'] = true;
            return $data;
        }
    }

    public function loadViews($viewName = "", $headerInfo = NULL, $pageInfo = NULL, $footerInfo = NULL){

        $this->load->view('includes/header', $headerInfo);
        $this->load->view($viewName, $pageInfo);
        $this->load->view('includes/footer', $footerInfo);
    }


}
