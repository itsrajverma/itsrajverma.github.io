<div class="content-inner">
    <div class="container-fluid">
        <!-- Begin Page Header-->
        <div class="row">
            <div class="page-header">
                <div class="d-flex align-items-center">
                    <h2 class="page-header-title">Employee</h2>
                    <div>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="<?= base_url('dashboard'); ?>"><i class="ti ti-home"></i></a></li>
                            <li class="breadcrumb-item active">Update Employee</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Page Header -->
        <div class="row">
            <div class="col-xl-12">
                <!-- Export -->
                <div class="widget has-shadow">
                    <div class="widget-header bordered no-actions d-flex align-items-center">
                        <h4>Update Employee</h4>
                    </div>
                    <div class="widget-body">
                        <form class="form-horizontal" method="post" action="<?= base_url('master/UpdateEmployee') ?>">
                            <input type="hidden" value="<?= $dataid; ?>" name="dataid">
                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Employee Name</label>
                                <div class="col-lg-9">
                                    <input type="text" name="UserName" value="<?= $employee->UserName; ?>" placeholder="Enter Employee Name" required="true" class="form-control">
                                </div>
                            </div>

                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Contact No </label>
                                <div class="col-lg-9">
                                    <input type="text" name="ContactNo" value="<?= $employee->ContactNo; ?>" placeholder="Enter Contact No" required="true" class="form-control">
                                </div>
                            </div>

                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Employee Email</label>
                                <div class="col-lg-9">
                                    <input type="email" name="Email" value="<?= $employee->Email; ?>" placeholder="Enter Employee Email" required="true" class="form-control">
                                </div>
                            </div>


                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Address </label>
                                <div class="col-lg-9">
                                    <input type="text" name="Address" value="<?= $employee->Address; ?>" placeholder="Enter Address" required="true" class="form-control">
                                </div>
                            </div>
                            <div class="text-right">
                                <button class="btn btn-gradient-01" type="submit">Update</button>
                                <button class="btn btn-shadow" type="reset">Reset</button>
                            </div>
                        </form>

                        <?php
                        $this->load->view('./includes/Error');
                        ?>
                    </div>
                </div>
                <!-- End Export -->
            </div>
        </div>
        <!-- End Row -->
    </div>
    <!-- End Container -->
    <!-- Begin Page Footer-->

    <!-- End Page Footer -->

    <!-- Offcanvas Sidebar -->
    <!-- End Offcanvas Sidebar -->
</div>