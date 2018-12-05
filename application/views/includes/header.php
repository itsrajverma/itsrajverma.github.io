<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Elisyam - Dashboard</title>
    <meta name="description" content="Elisyam is a Web App and Elisyam Dashboard Template built with Bootstrap 4">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Google Fonts -->
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
    <script>
        WebFont.load({
            google: {"families":["Montserrat:400,500,600,700","Noto+Sans:400,700"]},
            active: function() {
                sessionStorage.fonts = true;
            }
        });
    </script>
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="<?= base_url('assets/'); ?>img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= base_url('assets/'); ?>img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= base_url('assets/'); ?>img/favicon-16x16.png">
    <!-- Stylesheet -->
    <link rel="stylesheet" href="<?= base_url('assets/'); ?>vendors/css/base/bootstrap.min.css">
    <link rel="stylesheet" href="<?= base_url('assets/'); ?>vendors/css/base/Elisyam-1.5.min.css">

    <link rel="stylesheet" href="<?= base_url('assets/'); ?>/css/datatables/datatables.min.css">
    <!-- Tweaks for older IEs--><!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]-->
</head>
<body id="page-top">
<!-- Begin Preloader -->
<div id="preloader">
    <div class="canvas">
        <img src="<?= base_url('assets/'); ?>img/logo.png" alt="logo" class="loader-logo">
        <div class="spinner"></div>
    </div>
</div>
<!-- End Preloader -->
<div class="page">
    <!-- Begin Header -->
    <header class="header">
        <nav class="navbar fixed-top">
            <!-- Begin Search Box-->
            <div class="search-box">
                <button class="dismiss"><i class="ion-close-round"></i></button>
                <form id="searchForm" action="#" role="search">
                    <input type="search" placeholder="Search something ..." class="form-control">
                </form>
            </div>
            <!-- End Search Box-->
            <!-- Begin Topbar -->
            <div class="navbar-holder d-flex align-items-center align-middle justify-content-between">
                <!-- Begin Logo -->
                <div class="navbar-header">
                    <a href="<?= base_url('dashboard') ?>" class="navbar-brand">
                        <div class="brand-image brand-big">
                            <img src="<?= base_url('assets/'); ?>img/logo-big.png" alt="logo" class="logo-big">
                        </div>
                        <div class="brand-image brand-small">
                            <img src="<?= base_url('assets/'); ?>img/logo.png" alt="logo" class="logo-small">
                        </div>
                    </a>
                    <!-- Toggle Button -->
                    <a id="toggle-btn" href="#" class="menu-btn active">
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                    <!-- End Toggle -->
                </div>
                <!-- End Logo -->
                <!-- Begin Navbar Menu -->
                <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center pull-right">


                    <!-- User -->
                    <li class="nav-item dropdown"><a id="user" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link"><img src="<?= base_url('assets/'); ?>img/avatar/avatar-01.jpg" alt="..." class="avatar rounded-circle"></a>
                        <ul aria-labelledby="user" class="user-size dropdown-menu">
                            <li class="welcome">
                                <a href="#" class="edit-profil"><i class="la la-gear"></i></a>
                                <img src="<?= base_url('assets/'); ?>img/avatar/avatar-01.jpg" alt="..." class="rounded-circle">
                            </li>
                            <li><a rel="nofollow" href="<?= base_url('Auth/logout') ?>" class="dropdown-item logout text-center"><i class="ti-power-off"></i></a></li>
                        </ul>
                    </li>
                    <!-- End User -->
                    <!-- Begin Quick Actions -->

                </ul>
                <!-- End Navbar Menu -->
            </div>
            <!-- End Topbar -->
        </nav>
    </header>
    <!-- End Header -->
    <!-- Begin Page Content -->

    <!-- End Page Content -->
    <div class="page-content d-flex align-items-stretch">
        <div class="default-sidebar">
            <!-- Begin Side Navbar -->
            <nav class="side-navbar box-scroll sidebar-scroll">
                <!-- Begin Main Navigation -->

                <ul class="list-unstyled">
                    <li><a href="<?= base_url('dashboard') ?>"><i class="la la-spinner"></i><span>Home</span></a></li>
                    <li><a href="#dropdown-db" aria-expanded="true" data-toggle="collapse"><i class="la la-columns"></i><span>DSC</span></a>
                        <ul id="dropdown-db" class="collapse list-unstyled  pt-0">
                            <li><a href="<?= base_url('dsc'); ?>">DSC Company List</a></li>
                            <li><a href="<?= base_url('dsc/addCompany'); ?>">Add DSC Company</a></li>
                            <li><a href="<?= base_url('dsc/dscType'); ?>">DSC Type List</a></li>
                            <li><a href="<?= base_url('dsc/addDscType'); ?>">Add DSC Type</a></li>
                        </ul>
                    </li>

                    <li><a href="#dropdown-db1" aria-expanded="true" data-toggle="collapse"><i class="la la-columns"></i><span>Master</span></a>
                        <ul id="dropdown-db1" class="collapse list-unstyled  pt-0">
                            <li><a href="<?= base_url('master/employee'); ?>">Employee List</a></li>
                            <li><a href="<?= base_url('master/addemployee'); ?>">Add Employee</a></li>
                            <li><a href="<?= base_url('master/vendor'); ?>">Vendor</a></li>
                            <li><a href="<?= base_url('master/addvendor'); ?>">Add Vendor</a></li>
                            <li><a href="<?= base_url('master/customer'); ?>">Customer</a></li>
                            <li><a href="<?= base_url('master/addcustomer'); ?>">Add Customer</a></li>
                        </ul>
                    </li>

                </ul>

                <!-- End Main Navigation -->
            </nav>
            <!-- End Side Navbar -->
        </div>
        <!-- End Left Sidebar -->

