<div class="content-inner">
    <div class="container-fluid">
        <!-- Begin Page Header-->
        <div class="row">
            <div class="page-header">
                <div class="d-flex align-items-center">
                    <h2 class="page-header-title">Vendor</h2>
                    <div>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="<?= base_url('dashboard'); ?>"><i
                                            class="ti ti-home"></i></a></li>
                            <li class="breadcrumb-item active">Add Vendor</li>
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
                        <h4>Add Vendor</h4>
                    </div>
                    <div class="widget-body">
                        <form class="form-horizontal" method="post" action="<?= base_url('master/InsertVendor') ?>">
                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Vendor Name</label>
                                <div class="col-lg-9">
                                    <input type="text" name="UserName" placeholder="Enter Vendor Name" required="true"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Contact No </label>
                                <div class="col-lg-9">
                                    <input type="text" name="ContactNo" placeholder="Enter Contact No" required="true"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Vendor Email</label>
                                <div class="col-lg-9">
                                    <input type="email" name="Email" placeholder="Enter Vendor Email" required="true"
                                           class="form-control">
                                </div>
                            </div>


                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Address </label>
                                <div class="col-lg-9">
                                    <input type="text" name="Address" placeholder="Enter Address" required="true"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Contact Person </label>
                                <div class="col-lg-9">
                                    <input type="text" name="ContactPerson" placeholder="Enter Contact Person"
                                           required="true" class="form-control">
                                </div>
                            </div>

                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">GST No. </label>
                                <div class="col-lg-9">
                                    <input type="text" name="GstNo" placeholder="Enter GST No." required="true"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Bank Name </label>
                                <div class="col-lg-9">
                                    <input type="text" name="BankName" placeholder="Enter Bank Name" required="true"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Branch </label>
                                <div class="col-lg-9">
                                    <input type="text" name="BankBranch" placeholder="Enter Branch" required="true"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Account No.</label>
                                <div class="col-lg-9">
                                    <input type="text" name="AccountNo" placeholder="Enter Account No" required="true"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">IFSC Code</label>
                                <div class="col-lg-9">
                                    <input type="text" name="IFSC" placeholder="Enter IFSC Code" required="true"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Opening Balance </label>
                                <div class="col-lg-9">
                                    <input type="text" name="OpeningBalance" value="0"
                                           placeholder="Enter Opening Balance" required="true" class="form-control">
                                </div>
                            </div>

                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Opening Balance Date</label>
                                <div class="col-lg-9">
                                    <div class="form-group">
                                        <div class="input-group">
                                                            <span class="input-group-addon">
                                                                <i class="la la-calendar"></i>
                                                            </span>
                                            <input name="OpeningBalanceDate" type="text" class="form-control" id="date"
                                                   placeholder="Select Opening Balance Date">
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="form-group row d-flex align-items-center mb-5">
                                <label class="col-lg-3 form-control-label">Opening Balance Type</label>
                                <div class="col-lg-9">
                                    <select required="required" class="form-control" name="BalanceType">
                                        <option value="">--Select--</option>
                                        <option value="Credit">Credit</option>
                                        <option value="Debit">Debit</option>
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