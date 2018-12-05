<?php
/**
 * Created by PhpStorm.
 * User: Raj
 * Date: 04-12-2018
 * Time: 11:41
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends MY_Controller {

    protected $bCrumb = array();
    protected $mbase = 'auth/';

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Auth_model');
    }

    public function index()
    {

        $this->form_validation->set_rules('username', 'Username', 'required');
        $this->form_validation->set_rules('password', 'Password', 'required',
            array('required' => 'You must provide a %s.')
        );

        if(user_is_login())
        {
//            $this->load->view('./dashboard',$this->data);
            return redirect('dashboard');
        }else{
//            $this->load->view('./auth/login',$this->data);
            return redirect('auth/login');
        }

    }

    public function login()
    {
        if(user_is_login())
        {
            return redirect('dashboard');
        }else{
            $this->load->view('./auth/login');
        }

    }

    public function loginUser()
    {
        $this->form_validation->set_rules('username', 'Username', 'required');
        $this->form_validation->set_rules('password', 'Password', 'required');

        if(isset($_POST['btnSubmit']))
        {
            if($this->form_validation->run() == false)
            {
                $this->load->view('./auth/login',$this->data);
            }else{
                $username = $this->input->post('username');
                $password = $this->input->post('password');
                $params = array('UserName' => $username,'Password' =>($password));
                $res = $this->Auth_model->loginUser($params);
                if(!empty($res))
                {
//				    pr($res);die;
                    $sessionData = array(
                        'user_name' => $res->admin_name,
                        'role' => 'Admin',
                        'user_id'  => $res->id,
                        'user_login_status' => true
                    );
                    $this->session->set_userdata($sessionData);

                    redirect('dashboard',$this->data);
                }else{
                    $errors = array('message'=>'Please Enter Correct User Name & Password!');
                    $this->load->view('./auth/login',$errors);
                }
            }
        }else{
            $this->load->view('./auth/login');
        }
    }

    public function logout()
    {
        $this->session->sess_destroy();
        $url = base_url().'auth';
        redirect($url);
    }





}
