<?php
/**
 * Created by PhpStorm.
 * User: Raj
 * Date: 04-12-2018
 * Time: 12:26
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class DSC extends MY_Controller
{


    public function __construct()
    {
        parent::__construct();
        $this->load->model('Dsc_model');

    }

    public function index()
    {
        $data['dscCompany'] = $this->Dsc_model->allDscCompany();
        $this->loadViews('./dsc/CompanyList', Null, $data, Null);
    }

    public function addCompany()
    {
        $this->loadViews('./dsc/addCompany', Null, Null, Null);
    }

    public function InsertDSCCom()
    {
        $pData = $this->input->post();
        $data = $this->security->xss_clean($pData);
        $result = $this->Dsc_model->InsertDSCCom($data);
        if ($result):
            $this->session->set_flashdata('success', 'Created successfully');
            redirect('dsc/addCompany');
        else:
            $this->session->set_flashdata('error', 'Error While Process');
            redirect('dsc/addCompany');
        endif;
    }

    public function editCompany($id)
    {
        $id=$this->dec($id);
        $data["dsc"]=$this->Dsc_model->getDscCompanyById($id);
        $this->loadViews('./dsc/updateCompany', Null, $data, Null);
    }

    public function UpdateDSCCom()
    {
        $pData = $this->input->post();
        $id=$pData['dataid'];
        $decid=$this->enc($id);
        unset($pData['dataid']);
        $data = $this->security->xss_clean($pData);
        $result = $this->Dsc_model->UpdateDSCCom($data,$id);
        if ($result):
            $this->session->set_flashdata('success', 'Updated successfully');
            redirect('dsc/editCompany/'.$decid);
        else:
            $this->session->set_flashdata('error', 'Error While Process');
            redirect('dsc/editCompany/'.$decid);
        endif;
    }
    public function ActiveDSCCom($id)
    {
        $id=$this->dec($id);
        $res=$this->Dsc_model->ActiveDSCCom($id);
        redirect('dsc');
    }
    public function blockDSCCom($id)
    {
        $id=$this->dec($id);
        $res=$this->Dsc_model->blockDSCCom($id);
        redirect('dsc');
    }

    //DSC Type List Start Here////////

    public function dscType()
    {
        $data['dscType'] = $this->Dsc_model->allDscType();
        $this->loadViews('./dsc/dscTypeList', Null, $data, Null);
    }

    public function addDscType()
    {
        $data['dscCompany'] = $this->Dsc_model->allDscCompany();
        $this->loadViews('./dsc/addDscType', Null, $data, Null);
    }

    public function InsertDSCTypeCom()
    {
        $pData = $this->input->post();
        $data = $this->security->xss_clean($pData);
        $result = $this->Dsc_model->InsertDSCTypeCom($data);
        if ($result):
            $this->session->set_flashdata('success', 'Created successfully');
            redirect('dsc/addDscType');
        else:
            $this->session->set_flashdata('error', 'Error While Process');
            redirect('dsc/addDscType');
        endif;
    }

    public function editDscType($id)
    {
        $id=$this->dec($id);
        $data['dscCompany'] = $this->Dsc_model->allDscCompany();
        $data["dsc"]=$this->Dsc_model->getDscTypeById($id);
        $this->loadViews('./dsc/updateDscType', Null, $data, Null);
    }

    public function UpdateDSCTypeCom()
    {
        $pData = $this->input->post();
        $id=$pData['dataid'];
        $decid=$this->enc($id);
        unset($pData['dataid']);
        $data = $this->security->xss_clean($pData);
        $result = $this->Dsc_model->UpdateDSCTypeCom($data,$id);
        if ($result):
            $this->session->set_flashdata('success', 'Updated successfully');
            redirect('dsc/editDscType/'.$decid);
        else:
            $this->session->set_flashdata('error', 'Error While Process');
            redirect('dsc/editDscType/'.$decid);
        endif;
    }





}