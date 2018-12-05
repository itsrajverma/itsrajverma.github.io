<div class="content-inner">
    <div class="container-fluid">
        <!-- Begin Page Header-->
        <div class="row">
            <div class="page-header">
                <div class="d-flex align-items-center">
                    <h2 class="page-header-title">DSC Type</h2>
                    <div>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="<?= base_url('dashboard'); ?>"><i class="ti ti-home"></i></a></li>
                            <li class="breadcrumb-item active">DSC Type</li>
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
                        <h4>DSC Type</h4>
                    </div>
                    <div class="widget-body">
                        <form class="form-horizontal" method="post" action="<?= base_url('dsc/InsertDSCTypeCom') ?>">
                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">DSC Company</label>
                                <div class="col-lg-9 select mb-3">
                                    <select name="CompanyId" required="required" class="custom-select form-control">
                                        <option value="">--Select--</option>
                                        <?php
                                        if(!empty($dscCompany)):
                                        foreach ($dscCompany as $dsc):
                                        ?>
                                        <option value="<?= $dsc->CompanyId; ?>"><?= $dsc->CompanyName; ?></option>
                                        <?php
                                        endforeach;
                                        endif;
                                        ?>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">DSC Type Name</label>
                                <div class="col-lg-9">
                                    <input type="text" name="DscTypeName" placeholder="Enter DSC Type Name" required="true" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Type</label>
                                <div class="col-lg-9">
                                    <select name="Type" required="required" class="custom-select form-control">
                                        <option value="Wallet System">Wallet System</option>
                                        <option value="Quantity System">Quantity System</option>
                                    </select>
                                </div>
                            </div>
                            <div class="text-right">
                                <button class="btn btn-gradient-01" type="submit">Save</button>
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