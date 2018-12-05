<!-- End Content -->
</div>
</div>
<!-- Begin Success Modal -->
<div id="delay-modal" class="modal fade">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body text-center">
                <div class="sa-icon sa-success animate" style="display: block;">
                    <span class="sa-line sa-tip animateSuccessTip"></span>
                    <span class="sa-line sa-long animateSuccessLong"></span>
                    <div class="sa-placeholder"></div>
                    <div class="sa-fix"></div>
                </div>
                <div class="section-title mt-5 mb-5">
                    <h2 class="text-dark">Meeting successfully created</h2>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Success Modal -->
<!-- Begin Modal -->
<div id="modal-view-event" class="modal modal-top fade calendar-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title event-title"></h4>
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">close</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="media">
                    <div class="media-left align-self-center mr-3">
                        <div class="event-icon"></div>
                    </div>
                    <div class="media-body align-self-center mt-3 mb-3">
                        <div class="event-body"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- Begin Vendor Js -->
<script src="<?= base_url('assets/'); ?>vendors/js/base/jquery.min.js"></script>
<script src="<?= base_url('assets/'); ?>vendors/js/base/core.min.js"></script>
<!-- End Modal -->
<script src="<?= base_url('assets/'); ?>vendors/js/datatables/datatables.min.js"></script>
<script src="<?= base_url('assets/'); ?>vendors/js/datatables/dataTables.buttons.min.js"></script>
<script src="<?= base_url('assets/'); ?>vendors/js/datatables/jszip.min.js"></script>
<script src="<?= base_url('assets/'); ?>vendors/js/datatables/buttons.html5.min.js"></script>
<script src="<?= base_url('assets/'); ?>vendors/js/datatables/pdfmake.min.js"></script>
<script src="<?= base_url('assets/'); ?>vendors/js/datatables/vfs_fonts.js"></script>
<script src="<?= base_url('assets/'); ?>vendors/js/datatables/buttons.print.min.js"></script>
<script src="<?= base_url('assets/'); ?>vendors/js/nicescroll/nicescroll.min.js"></script>
<script src="<?= base_url('assets/'); ?>vendors/js/app/app.min.js"></script>
<script src="<?= base_url('assets/'); ?>vendors/js/datepicker/moment.min.js"></script>
<script src="<?= base_url('assets/'); ?>vendors/js/datepicker/daterangepicker.js"></script>
<!-- End Page Vendor Js -->
<!-- Begin Page Snippets -->
<script src="<?= base_url('assets/'); ?>js/components/datepicker/datepicker.js"></script>
<script src="<?= base_url('assets/'); ?>js/components/tables/tables.js"></script>
</body>
</html>