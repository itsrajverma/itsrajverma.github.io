<?php
/**
 * Created by PhpStorm.
 * User: Raj
 * Date: 04-12-2018
 * Time: 12:26
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class Master extends MY_Controller
{


    public function __construct()
    {
        parent::__construct();
        $this->load->model('Master_model');

    }

    public function index()
    {

    }

    public function employee()
    {
        $data["employee"]=$this->Master_model->allEmployee();
        $this->loadViews('./master/employee',NULL,$data,NULL);
    }

    public function addemployee()
    {
        $this->loadViews('./master/addemployee');
    }

    public function InsertEmployee()
    {
        $pData=$this->input->post();
        $pData['OpeningBalanceDate']=date("Y-m-d", strtotime($pData['OpeningBalanceDate']));
        $BalaceDate=date("Y-m-d", strtotime($pData['OpeningBalanceDate']));
        $pData['UserType']=1;
        $result=$this->Master_model->InsertEmployee($pData);
        if($result):
            $ladgerInsert=array('UserId'=>$result,'TransAmount'=>$pData['OpeningBalance'],'TransType'=>$pData['BalanceType'],'TransDate'=>$BalaceDate);
            $result=$this->Master_model->Insertladger($ladgerInsert);
            $this->session->set_flashdata('success', 'Created successfully');
            redirect('master/addemployee');
        else:
            $this->session->set_flashdata('error', 'Error While Process');
            redirect('master/addemployee');
        endif;
    }

    public function editemployee($id)
    {
        $id=$this->dec($id);
        $employee=$this->Master_model->getEmployeeById($id);
        $data['employee']=$employee;
        $data['dataid']=$id;
        $this->loadViews('./master/editemployee', Null, $data, Null);
    }

    public function UpdateEmployee()
    {
        $pData=$this->input->post();
        $id=$pData['dataid'];
        unset($pData['dataid']);
        $decid=$this->enc($id);
        $result = $this->Master_model->UpdateEmployee($pData,$id);
        if ($result):
            $this->session->set_flashdata('success', 'Updated successfully');
            redirect('master/editemployee/'.$decid);
        else:
            $this->session->set_flashdata('error', 'Error While Process');
            redirect('master/editemployee/'.$decid);
        endif;
    }

    public function vendor()
    {
        $data["employee"]=$this->Master_model->allvendor();
        $this->loadViews('./master/vendor',NULL,$data,NULL);
    }

    public function addvendor()
    {
        $this->loadViews('./master/addvendor');
    }

    public function Insertvendor()
    {
        $pData=$this->input->post();
        $pData['OpeningBalanceDate']=date("Y-m-d", strtotime($pData['OpeningBalanceDate']));
        $BalaceDate=date("Y-m-d", strtotime($pData['OpeningBalanceDate']));
        $pData['UserType']=2;
        $result=$this->Master_model->Insertvendor($pData);
        if($result):
            $ladgerInsert=array('UserId'=>$result,'TransAmount'=>$pData['OpeningBalance'],'TransType'=>$pData['BalanceType'],'TransDate'=>$BalaceDate);
            $result=$this->Master_model->Insertladger($ladgerInsert);
            $this->session->set_flashdata('success', 'Created successfully');
            redirect('master/addvendor');
        else:
            $this->session->set_flashdata('error', 'Error While Process');
            redirect('master/addvendor');
        endif;
    }

    public function editvendor($id)
    {
        $id=$this->dec($id);
        $employee=$this->Master_model->getEmployeeById($id);
        $data['vendor']=$employee;
        $data['dataid']=$id;
        $this->loadViews('./master/editvendor', Null, $data, Null);
    }

    public function UpdateVendor()
    {
        $pData=$this->input->post();
        $id=$pData['dataid'];
        unset($pData['dataid']);
        $decid=$this->enc($id);
        $result = $this->Master_model->UpdateEmployee($pData,$id);
        if ($result):
            $this->session->set_flashdata('success', 'Updated successfully');
            redirect('master/editvendor/'.$decid);
        else:
            $this->session->set_flashdata('error', 'Error While Process');
            redirect('master/editvendor/'.$decid);
        endif;
    }




    public function customer()
    {
        $data["employee"]=$this->Master_model->allcustomer();
        $this->loadViews('./master/customer',NULL,$data,NULL);
    }


    public function addcustomer()
    {
        $this->loadViews('./master/addcustomer');
    }

    public function InsertCustomer()
    {
        $pData=$this->input->post();
        $pData['OpeningBalanceDate']=date("Y-m-d", strtotime($pData['OpeningBalanceDate']));
        $BalaceDate=date("Y-m-d", strtotime($pData['OpeningBalanceDate']));
        $pData['UserType']=3;
        $result=$this->Master_model->Insertvendor($pData);
        if($result):
            $ladgerInsert=array('UserId'=>$result,'TransAmount'=>$pData['OpeningBalance'],'TransType'=>$pData['BalanceType'],'TransDate'=>$BalaceDate);
            $result=$this->Master_model->Insertladger($ladgerInsert);
            $this->session->set_flashdata('success', 'Created successfully');
            redirect('master/addcustomer');
        else:
            $this->session->set_flashdata('error', 'Error While Process');
            redirect('master/addcustomer');
        endif;
    }

    public function editcustomer($id)
    {
        $id=$this->dec($id);
        $employee=$this->Master_model->getEmployeeById($id);
        $data['Customer']=$employee;
        $data['dataid']=$id;
        $this->loadViews('./master/editcustomer', Null, $data, Null);
    }

    public function UpdateCustomer()
    {
        $pData=$this->input->post();
        $id=$pData['dataid'];
        unset($pData['dataid']);
        $decid=$this->enc($id);
        $result = $this->Master_model->UpdateEmployee($pData,$id);
        if ($result):
            $this->session->set_flashdata('success', 'Updated successfully');
            redirect('master/editcustomer/'.$decid);
        else:
            $this->session->set_flashdata('error', 'Error While Process');
            redirect('master/editcustomer/'.$decid);
        endif;
    }


}