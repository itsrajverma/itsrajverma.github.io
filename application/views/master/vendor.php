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
                            <li class="breadcrumb-item active">Vendor</li>
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
                        <h4>Vendor</h4>
                    </div>
                    <div class="widget-body">
                        <div class="table-responsive">
                            <table id="export-table" class="table mb-0">
                                <thead>
                                <tr>
                                    <th># ID</th>
                                    <th>Vendor Detail</th>
                                    <th>Bank Detail</th>
                                    <th>Opening Detail</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                if (!empty($employee)):
                                    $sr = 1;
                                    foreach ($employee as $emp):
                                        ?>
                                        <td><?= $sr; ?></td>
                                        <td><?php
                                            echo 'Vendor Name: ' . $emp->UserName . '<br>';
                                            echo 'Email: ' . $emp->Email . '<br>';
                                            echo 'Contact: ' . $emp->ContactNo . '<br>';
                                            echo 'Address: ' . $emp->Address . '<br>';
                                            echo 'Contact Person: ' . $emp->ContactPerson;
                                            ?>
                                        </td>
                                        <td><?php
                                            echo 'Bank Name: ' . $emp->BankName . '<br>';
                                            echo 'Branch: ' . $emp->BankBranch . '<br>';
                                            echo 'Account No: ' . $emp->AccountNo . '<br>';
                                            echo 'IFSC Code: ' . $emp->IFSC;
                                            ?>
                                        </td>
                                        <td><?php
                                            echo 'Opening Balance: ' . $emp->OpeningBalance . '<br>';
                                            echo 'Balance Date: ' . $emp->OpeningBalanceDate . '<br>';
                                            echo 'Balance Type: ' . $emp->BalanceType;
                                            ?>
                                        </td>
                                        <td class="td-actions">
                                            <a href="<?= base_url('master/editvendor/') . enc($emp->Id); ?>"><i
                                                        class="la la-edit edit"></i></a>
                                        </td>

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