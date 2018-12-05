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
                        <h4>List </h4>
                    </div>
                    <div class="widget-body">
                        <div class="table-responsive">
                            <table id="export-table" class="table mb-0">
                                <thead>
                                <tr>
                                    <th># ID</th>
                                    <th>Company Name</th>
                                    <th>DSC Type Name</th>
                                    <th>DSC Type</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                if(!empty($dscType)):
                                    $sr=1;
                                    foreach ($dscType as $dsc):
                                        ?>
                                        <tr>
                                            <td><span class="text-primary"><?= $sr; ?></span></td>
                                            <td><?= $dsc->CompanyName; ?></td>
                                            <td><?= $dsc->DscTypeName; ?></td>
                                            <td><?= $dsc->Type; ?></td>
                                            <td class="td-actions">
                                                <a href="<?= base_url('dsc/editDscType/').enc($dsc->Id); ?>"><i class="la la-edit edit"></i></a>
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