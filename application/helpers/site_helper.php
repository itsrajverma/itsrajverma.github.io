<?php
/**
 * Created by PhpStorm.
 * User: Raj
 * Date: 04-12-2018
 * Time: 11:49
 */
if(!function_exists('pr'))
{
    function pr($arry)
    {
        echo "<pre>";
        print_r($arry);
        echo "</pre>";
    }
}


if(!function_exists('user_is_login'))
{
    function user_is_login()
    {
        $CI =& get_instance();
        $res = false;
        if($CI->session->userdata('user_login_status'))
        {
            $res = true;
        }
        return $res;
    }
}

if(!function_exists('enc'))
{
    function enc($str)
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
}

if(!function_exists('dec'))
{
    function dec($str)
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
}