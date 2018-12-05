<div class="content-inner">
    <div class="container-fluid">
        <!-- Begin Page Header-->
        <div class="row">
            <div class="page-header">
                <div class="d-flex align-items-center">
                    <h2 class="page-header-title">DSC Companies</h2>
                    <div>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="<?= base_url('dashboard'); ?>"><i class="ti ti-home"></i></a></li>
                            <li class="breadcrumb-item">DSC Companies</li>
                            <li class="breadcrumb-item active">Update DSC Companies</li>
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
                        <h4> Update DSC Company</h4>
                    </div>
                    <div class="widget-body">
                        <form class="form-horizontal" method="post" action="<?= base_url('dsc/UpdateDSCCom') ?>">
                            <div class="form-group row d-flex align-items-center mb-5">
                                <input type="hidden" name="dataid" value="<?= !empty($dsc->CompanyId) ? $dsc->CompanyId : ''; ?>">
                                <label class="col-lg-3 form-control-label">Name</label>
                                <div class="col-lg-9">
                                    <input type="text" name="CompanyName" value="<?= !empty($dsc->CompanyName) ? $dsc->CompanyName : ''; ?>" placeholder="Enter DSC Company Name" required="true" class="form-control">
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