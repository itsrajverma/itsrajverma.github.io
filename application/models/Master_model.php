<?php
/**
 * Created by PhpStorm.
 * User: Raj
 * Date: 04-12-2018
 * Time: 12:42
 */
class Master_model extends CI_Model {

    public function allEmployee()
    {
        try{

            $this->db->select('*');
            $this->db->where('UserType',1);
            $this->db->from('tblAccountUser');
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

    public function InsertEmployee($data)
    {
        $res=$this->db->insert('tblAccountUser',$data);
        if($res):
            return $this->db->insert_id();
        else:
            return false;
        endif;
    }

    public function Insertladger($data)
    {
        $res=$this->db->insert('tblLedger',$data);
        if($res):
            return $this->db->insert_id();
        else:
            return false;
        endif;
    }

    public function getEmployeeById($id)
    {
        $this->db->select('*');
        $this->db->from('tblAccountUser');
        $this->db->where('Id',$id);
        $res = $this->db->get()->result();
        if(!empty($res))
        {
            return $res[0];
        }else{
            return false;
        }
    }


    public function UpdateEmployee($data,$id)
    {
        $this->db->where('Id',$id);
        $res=$this->db->update('tblAccountUser',$data);
        if($res):
            return true;
        else:
            return false;
        endif;
    }


    public function allvendor()
    {
        $this->db->select('*');
        $this->db->where('UserType',2);
        $this->db->from('tblAccountUser');
        $res = $this->db->get()->result();
        if(!empty($res))
        {
            return $res;
        }else{
            return false;
        }
    }

    public function Insertvendor($data)
    {
        $res=$this->db->insert('tblAccountUser',$data);
        if($res):
            return $this->db->insert_id();
        else:
            return false;
        endif;
    }

    public function allcustomer()
    {
        $this->db->select('*');
        $this->db->where('UserType',3);
        $this->db->from('tblAccountUser');
        $res = $this->db->get()->result();
        if(!empty($res))
        {
            return $res;
        }else{
            return false;
        }
    }


}
