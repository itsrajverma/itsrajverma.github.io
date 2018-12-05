<?php
/**
 * Created by PhpStorm.
 * User: Raj
 * Date: 04-12-2018
 * Time: 12:42
 */
class Dsc_model extends CI_Model {

    public function allDscCompany()
    {
        try{

            $this->db->select('*');
            $this->db->from('tblDscCompany');
            $res = $this->db->get()->result();
            if(!empty($res))
            {
                return $res;
            }else{
                return false;
            }
        }
        catch(exception $e)
        {
            return $e;
        }

    }

    public function InsertDSCCom($data)
    {
        $res=$this->db->insert('tblDscCompany',$data);
        if($res):
            return true;
        else:
            return false;
        endif;
    }

    public function UpdateDSCCom($data,$id)
    {
        $this->db->where('CompanyId',$id);
        $res=$this->db->update('tblDscCompany',$data);
        if($res):
            return true;
        else:
            return false;
        endif;
    }

    public function blockDSCCom($id)
    {
        $data=array('Status'=>0);
        $this->db->where('CompanyId',$id);
        $res=$this->db->update('tblDscCompany',$data);
        if($res):
            return true;
        else:
            return false;
        endif;
    }

    public function ActiveDSCCom($id)
    {
        $data=array('Status'=>1);
        $this->db->where('CompanyId',$id);
        $res=$this->db->update('tblDscCompany',$data);
        if($res):
            return true;
        else:
            return false;
        endif;
    }

    public function getDscCompanyById($id)
    {
        $this->db->select('*');
        $this->db->from('tblDscCompany');
        $this->db->where('CompanyId',$id);
        $res = $this->db->get()->result();
        if(!empty($res))
        {
            return $res[0];
        }else{
            return false;
        }
    }



    public function allDscType()
    {
        $query=$this->db->query('SELECT a.Id, b.CompanyName, a.DscTypeName, a.Type from tblDscCompany b join tblDscType a on a.CompanyId = b.CompanyId');
        $result=$query->result();
        if(!empty($result))
            return $result;
        else
            return false;
    }


    public function InsertDSCTypeCom($data)
    {
        $res=$this->db->insert('tblDscType',$data);
        if($res):
            return true;
        else:
            return false;
        endif;
    }

    public function getDscTypeById($id)
    {
        $this->db->select('*');
        $this->db->from('tblDscType');
        $this->db->where('Id',$id);
        $res = $this->db->get()->result();
        if(!empty($res))
        {
            return $res[0];
        }else{
            return false;
        }
    }

    public function UpdateDSCTypeCom($data,$id)
    {
        $this->db->where('Id',$id);
        $res=$this->db->update('tblDscType',$data);
        if($res):
            return true;
        else:
            return false;
        endif;
    }


}
