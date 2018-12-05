<?php
/**
 * Created by PhpStorm.
 * User: Raj
 * Date: 04-12-2018
 * Time: 11:43
 */

class Auth_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        // Your own constructor code
    }

    public function loginUser($params)
    {
        try{

            $this->db->select('*');
            $this->db->from('tblUser');
            $this->db->where($params);
            $res = $this->db->get()->result();
            if(!empty($res))
            {
                return $res[0];
            }else{
                return false;
            }
        }
        catch(exception $e)
        {
            return $e;
        }

    }
}