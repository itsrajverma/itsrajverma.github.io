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
                            <li class="breadcrumb-item active">DSC Companies</li>
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
                        <h4>DSC</h4>
                    </div>
                    <div class="widget-body">
                        <div class="table-responsive">
                            <table id="export-table" class="table mb-0">
                                <thead>
                                <tr>
                                    <th># ID</th>
                                    <th>Company Name</th>
                                    <th><span style="width:100px;">Status</span></th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                if(!empty($dscCompany)):
                                $sr=1;
                                foreach ($dscCompany as $dsc):
                                ?>
                                <tr>
                                    <td><span class="text-primary"><?= $sr; ?></span></td>
                                    <td><?= $dsc->CompanyName; ?></td>
                                    <td><span style="width:100px;"><span class="badge-text badge-text-small info"><?= !empty($dsc->Status) && $dsc->Status=='1'  ? 'Active' : 'Block'; ?></span></span></td>
                                    <td class="td-actions">
                                        <a href="<?= base_url('dsc/editCompany/').enc($dsc->CompanyId); ?>"><i class="la la-edit edit"></i></a>
                                        <?php
                                        if($dsc->Status =='1'):
                                        ?>
                                        <a href="<?= base_url('dsc/blockDSCCom/').enc($dsc->CompanyId); ?>"><i class="la la-eye-slash Block"></i></a>
                                        <?php
                                        elseif ($dsc->Status == 0):
                                        ?>
                                        <a href="<?= base_url('dsc/ActiveDSCCom/').enc($dsc->CompanyId); ?>"><i class="la la-eye Active"></i></a>
                                        <?php
                                        endif;
                                        ?>
                                    </td>
                                </tr>
                                <?php
                                $sr++;
                                endforeach;
                                endif;
                                ?>
                                </tbody>
                            </table>
                        </div>
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