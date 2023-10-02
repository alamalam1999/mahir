$('#academic-year').change(function () {
    var academicYear = parseInt($(this).val());

    var schedules = [];
    for (let index = 0; index < registration_schedules.length; index++) {
        const schedule = registration_schedules[index];
        if (schedule.academic_year_id == academicYear) schedules.push(`<option value="` + schedule.id + `">` + schedule.description + `</option>`);
    }


    $('#registration-schedule').html('');

    if (schedules.length > 1) {
        $('#registration-schedule').append(`<option value="ALL">ALL</option>`);
    }

    $('#registration-schedule').append(schedules.join(''));
})


$('#school').change(function () {

    var school = $(this).val();


    $('#stage').html('');
    $('#stage').append(`<option value="ALL">ALL</option>`);

    if (school != 'ALL') {
        var stages = [];
        for (let index = 0; index < site_access.length; index++) {
            const item_access = site_access[index];
            if (item_access.enum_code == 'STAGE') {
                if (item_access.enum_site == school) {
                    stages.push(`<option value="` + item_access.enum_value + `">` + item_access.enum_label + `</option>`);
                }
            }
        }

        if (stages.length == 1) {
            $('#stage').html('');
        }

        $('#stage').append(stages.join(''));
    }
})



var SetReset = function () {

    if ($('#academic-year option').length > 0) {
        $("#academic-year").val($("#academic-year option:first").val());
    }

    $('#academic-year').change();



    if ($('#school option').length > 0) {
        $("#school").val($("#school option:first").val());
    }

    $('#school').change();
}


$('#search-form-reset').click(function () {
    $('#academic-year').change();
    SetReset();
})


SetReset();



var admin_payment_edit = $('input[name="admin_payment_edit"]').val();
var admin_ppdb_edit = $('input[name="admin_ppdb_edit"]').val();
var ppdbTable = $('#payment-table');

var blockPage;
var blockUI;

var paymentDetail = function (payment_id) {
    var URI_AJAX_DETAIL = $('input[name="uri_payment_detail"]').val();
    URI_AJAX_DETAIL = URI_AJAX_DETAIL.replace('::target::', payment_id);

    if (!blockUI) {
        blockUI = new KTBlockUI(document.querySelector("#kt_modal_payment_formulir_body"), {
            message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
        });
    }

    if (!blockUI.isBlocked()) {
        blockUI.block();
    }


    $('#payment-detail').html('');

    var fieldsInfo = [
        'payment_total',
        'ppdb_documentno',
        'ppdb_school',
        'ppdb_fullname',
        'payment_id',
        'payment_bank_code',
        'payment_account_number',
        'payment_bank_owner_name',
        'payment_cost',
    ];

    for (let index = 0; index < fieldsInfo.length; index++) {
        const element = fieldsInfo[index];
        $('#' + fieldsInfo[index]).text('');
    }

    $('input[name="action"]').prop('checked', false);
    $('#payment-image_confirmation').attr('src', '');
    $('#payment-image_confirmation').parent().attr('href', '#');
    // payment-image_confirmation

    $.ajax({
        type: 'GET',
        url: URI_AJAX_DETAIL,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response);

            $('#payment-image_confirmation').attr('src', hostBaseUrl + response.payment_image);
            $('#payment-image_confirmation').parent().attr('href', hostBaseUrl + response.payment_image);
            $('#bukti_upload_transfer').find('a').attr('href', hostBaseUrl + response.payment_image).attr('target','_blank');
            $('#payment_id').val(response.payment_id);

            for (var arrayIndex in response) {
                $('#' + arrayIndex).text(response[arrayIndex]);
            }

            var paymentItems = [];
            var payment_total = 0;

            if(response.payment_detail.length == 3) {
                var takelenght = 1;
            }else {
                var takelenght = 0;
            }
            for (let index = takelenght; index < response.payment_detail.length; index++) {
                const paymentItem = response.payment_detail[index];


                var paymentUPSPP = ``;

                if(paymentItem.payment_type == 'FEE_FORMULIR') {
                    paymentUPSPP = `<span class="text-gray-400 fw-semibold d-block fs-7">(Pembayaran Formulir)</span>`;
                } else if (paymentItem.payment_type != 'FEE_FORMULIR' && response.payment_detail.length <= 3) {
                    var labelPayment = '';
                    switch (paymentItem.payment_code) {
                        case "FEE_UP_LUNAS":
                            labelPayment = 'Lunas';
                            break;

                        case "FEE_UP":
                            labelPayment = 'Cicilan';
                            break;

                        case "FEE_SPP_12":
                            labelPayment = 'SPP 12 Bulan';
                            break;

                        case "FEE_SPP":
                            labelPayment = 'SPP Bulan Pertama';
                            break;

                        case "FEE_PENGAJUAN":
                            labelPayment = 'Diskon Pengajuan';
                            break;

                        case "FEE_CICILAN":
                            labelPayment = 'UP Cicilan';
                            break;
                    }
                    paymentUPSPP = `<span class="text-gray-400 fw-semibold d-block fs-7">(` + labelPayment + `)</span>`;
                } else {
                    var labelPayment = '';
                    switch (paymentItem.payment_type) {
                        case "FEE_UP_LUNAS":
                            labelPayment = 'Lunas';
                            break;

                        case "FEE_UP":
                            if(paymentItem.payment_code == '0')
                            {
                                labelPayment = 'Tidak Ada';
                            } else {
                                labelPayment = 'Cicilan';
                            }

                            break;

                        case "FEE_SPP_12":
                            labelPayment = 'SPP 12 Bulan';
                            break;

                        case "FEE_SPP":
                            if(paymentItem.payment_code == 'FEE_SPP_12')
                            {
                                labelPayment = 'SPP 12 Bulan';
                            } else {
                                labelPayment = 'SPP Bulan Pertama';
                            }
                            break;

                        case "FEE_PENGAJUAN":
                            labelPayment = 'Diskon Pengajuan';
                            break;

                        case "FEE_UP DILUAR NOMINAL":
                            labelPayment = 'Pembayaran UP diluar Nominal';
                            break;
                    }
                    paymentUPSPP = `<span class="text-gray-400 fw-semibold d-block fs-7">(` + labelPayment + `)</span>`;
                }

                var paymentHtml = `
                <tr class="fw-bold text-muted text-gray-600 fs-6">
                    <td class="d-flex align-items-center py-2">
                        <div class="d-flex justify-content-start flex-column">
                            <span class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">`+ paymentItem.payment_type.replace("FEE_", "") + `</span>
                            ` + paymentUPSPP + `
                        </div>
                    </td>
                    <td class="pt-6 text-dark fw-bold text-end">` + formatRupiah(paymentItem.cost.toString(), 'Rp. ') + `</td>
                </tr>
                `;

                paymentHtmloke = '';
                if (index == 2 && response.payment_detail.length == 3) {
                    var paymentHtmloke = `
                    <tr class="fw-bold text-muted text-gray-600 fs-6">
                        <td class="d-flex align-items-center py-2">
                            <div class="d-flex justify-content-start flex-column">
                                <span class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">Pengajuan</span>
                                <span class="text-gray-400 fw-semibold d-block fs-7">(Diskon Pengajuan)</span>
                            </div>
                        </td>
                        <td class="pt-6 text-dark fw-bold text-end">`+ formatRupiah(response.payment_detail[0].cost.toString(), 'Rp. ')+`</td>
                    </tr>
                    `;
                }


                if (index == 2 && response.payment_detail.length == 3 && response.payment_detail[0].payment_type == 'FEE_UP DILUAR NOMINAL') {
                    var paymentHtmloke = `
                    <tr class="fw-bold text-muted text-gray-600 fs-6">
                        <td class="d-flex align-items-center py-2">
                            <div class="d-flex justify-content-start flex-column">
                                <span class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">UP DILUAR NOMINAL</span>
                                <span class="text-gray-400 fw-semibold d-block fs-7">(Pembayaran UP diluar Nominal)</span>
                            </div>
                        </td>
                        <td class="pt-6 text-dark fw-bold text-end">`+ formatRupiah(response.payment_detail[0].cost.toString(), 'Rp. ')+`</td>
                    </tr>
                    `;
                }

                payment_total = payment_total + paymentItem.cost;
                paymentItems.push(paymentHtml+paymentHtmloke);
            }     
                  

            if(response.payment_detail.length == 3) {
                payment_total -= response.payment_detail[0].cost;
                $('#display2').css({ display: "block" });
                $('#payment-image_confirmation_pengajuan').attr('src', '');
                $('#payment-image_confirmation_pengajuan').parent().attr('href', '#');
                $('#payment-image_confirmation_pengajuan').attr('src', hostBaseUrl + response.payment_detail[0].image_confirmation);
                $('#payment-image_confirmation_pengajuan').parent().attr('href', hostBaseUrl + response.payment_detail[0].image_confirmation);  
                $('#bukti_upload_surat_pengajuan_diskon').find('a').attr('href', hostBaseUrl + response.payment_detail[0].image_confirmation).attr('target','_blank'); 

                console.log(response.payment_detail[0].image_confirmation);
            }

            if(response.payment_detail.length == 3 && response.payment_detail[0].payment_type == 'FEE_UP DILUAR NOMINAL') {
                payment_total = response.payment_detail[0].cost + response.payment_detail[2].cost;
                $('#display2').css({ display: "block" });
                $('#payment-image_confirmation_cicilan').attr('src', '');
                $('#payment-image_confirmation_cicilan').parent().attr('href', '#');
                $('#payment-image_confirmation_cicilan').attr('src', hostBaseUrl + response.payment_detail[0].image_confirmation);
                $('#payment-image_confirmation_cicilan').parent().attr('href', hostBaseUrl + response.payment_detail[0].image_confirmation);  
                $('#bukti_upload_surat_pengajuan_cicilan').find('a').attr('href', hostBaseUrl + response.payment_detail[0].image_confirmation).attr('target','_blank'); 

                console.log(response.payment_detail[0].image_confirmation);
            }

            if(response.payment_detail.length == 4) {
                payment_total = response.payment_detail[0].cost - response.payment_detail[1].cost + response.payment_detail[3].cost;
                $('#display2').css({ display: "block" });
                $('#payment-image_confirmation_pengajuan').attr('src', '');
                $('#payment-image_confirmation_pengajuan').parent().attr('href', '#');
                $('#payment-image_confirmation_pengajuan').attr('src', hostBaseUrl + response.payment_detail[1].image_confirmation);
                $('#payment-image_confirmation_pengajuan').parent().attr('href', hostBaseUrl + response.payment_detail[1].image_confirmation);  
                $('#bukti_upload_surat_pengajuan_diskon').find('a').attr('href', hostBaseUrl + response.payment_detail[1].image_confirmation).attr('target','_blank'); 
                $('#bukti_upload_surat_pengajuan_cicilan').find('a').attr('href', hostBaseUrl + response.payment_detail[0].image_confirmation).attr('target','_blank');
                console.log(response.payment_detail[0].image_confirmation);

                payment_total = response.payment_detail[0].cost - response.payment_detail[1].cost + response.payment_detail[3].cost;
                $('#display3').css({ display: "block" });
                $('#payment-image_confirmation_cicilan').attr('src', '');
                $('#payment-image_confirmation_cicilan').parent().attr('href', '#');
                $('#payment-image_confirmation_cicilan').attr('src', hostBaseUrl + response.payment_detail[0].image_confirmation);
                $('#payment-image_confirmation_cicilan').parent().attr('href', hostBaseUrl + response.payment_detail[0].image_confirmation);  
                $('#bukti_upload_surat_pengajuan_diskon').find('a').attr('href', hostBaseUrl + response.payment_detail[0].image_confirmation).attr('target','_blank'); 
            }

            $('#payment_total').text(formatRupiah(payment_total.toString(), 'Rp. '));

            $('#payment-detail').html(paymentItems.join(''));
            $('#payment-total').text(formatRupiah(response.payment_cost.toString(), 'Rp. '));
            $('#payment_cost').text(formatRupiah(response.payment_cost.toString(), 'Rp. '));
            

            if (blockUI.isBlocked()) {
                blockUI.release();
            }
        },
        error: function (err) {
            if (blockUI.isBlocked()) {
                blockUI.release();
            }
            console.log(err);
        }
    })

}


$(document).on('click', '.btn-payment-modal', function () {
    var payment_type = $(this).data('payment_type');
    var payment_id = $(this).data('payment_id');

    $('#kt_modal_payment_formulir').modal('show');
    setTimeout(() => {
        paymentDetail(payment_id);
    }, 1000);
});






FTX.Utils.documentReady(function () {

    function formatPaymentLabel(payment_type) {
        switch (payment_type) {
            case "FEE_FORMULIR":
                return `
                <div class="input-group input-group-sm">
                    <span class="input-group-text bg-primary">
                        <i class="las la-money-bill fs-1 text-white"></i>
                    </span>
                    <input type="text" class="form-control bg-primary text-white" value="FORMULIR" aria-describedby="basic-addon3" readonly="">
                </div>
                `;
                break;
            case "FEE_TOTAL":
                return `
                <div class="input-group input-group-sm">
                    <span class="input-group-text" style="background: #0078AA;">
                        <i class="las la-wallet fs-1 text-white"></i>
                    </span>
                    <input type="text" class="form-control text-white" value="UP & SPP" aria-describedby="basic-addon3" readonly=""  style="background: #0078AA;">
                </div>
                `;
                break;
            default:
                return "";
                break;
        }
    }

    var uri_edit = $('input[name="uri_edit"]').val();

    function formatPaymentStatus(confirmation_status) {
        switch (confirmation_status) {
            case 0:
                return `
                    <span class="badge py-3 px-4 fs-7 badge-light-dark">New</span>
                `;
                break;
            case 1:
                return `
                <span class="badge py-3 px-4 fs-7 badge-light-success">Completed</span>
                `;
                break;
            case 2:
                return `
                <span class="badge py-3 px-4 fs-7 badge-light-danger">Reject</span>
                `;
                break;
            default:
                return "";
                break;
        }
    }

    if (!blockPage) {
        blockPage = new KTBlockUI(document.querySelector("#page-formulir"), {
            message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
        });
    }

    if (!blockPage.isBlocked()) {
        blockPage.block();
    }

    var dt = ppdbTable.dataTable({

        processing: false,
        serverSide: true,
        ajax: {
            url: ppdbTable.data('ajax_url'),
            type: 'post',
            data: function (d) {
                d.search_general        = $('#search_general').val(),
                d.search_status         = $('#search_status').val(),
                d.academic_year         = $('#academic-year').val(),
                d.registration_schedule = $('#registration-schedule').val(),
                d.school                = $('#school').val(),
                d.stage                 = $('#stage').val(),
                d.tipe_pembayaran       = $('#tipe_pembayaran').val(),
                d.diskon                = $('#diskon').val(),
                d.status_siswa          = $('#status_siswa').val()
            }
        },
        columns: [
            {
                data: 'document_no'
            },
            {
                data: null
            },
            {
                data: null
            },
            {
                data: null
            },
            {
                data: null
            },
            {
                data: null
            },
        ],
        columnDefs: [{
            targets: 0,
            orderable: false,
            render: function (data, type, row) {
                $(row).addClass("bg-white");
                var uri_target = admin_ppdb_edit.replace("::target::", row.ppdb_id);
                return `
                <div>
                    <a href="` + uri_target + `" class="text-dark fw-bolder text-hover-primary d-block fs-4">` + row.document_no + `</a>
                    <span class="text-muted fw-bold text-muted d-block fs-9">` + row.schedule + `</span>
                </div>`;
            }
        }, {
            targets: 1,
            orderable: false,
            render: function (data, type, row) {
                return formatPaymentLabel(row.payment_type);
            }
        }, {
            targets: 2,
            orderable: false,
            render: function (data, type, row) {
                return `
                <div class="input-group input-group-sm">
                    <span class="input-group-text">
                        <i class="las la-wallet fs-1"></i>
                    </span>
                    <input type="text" class="form-control bg-light" value="` + row.date_send + `" aria-describedby="basic-addon3" readonly="">
                </div>
                `;
            }
        }, {
            targets: 3,
            orderable: false,
            render: function (data, type, row) {
                return `
                <div>
                    <span class="text-dark fw-bold text-hover-primary d-block fs-5">` + row.fullname + `</span>
                    <span class="text-muted fw-bold text-muted d-block fs-9">` + row.school + ` (` + row.stage + ` - ` + row.classes + `)</span>
                </div>
                `;
            }
        },{
            target:4,
            orderable: false,
            render: function (data, type, row) {
                if(row.status_siswa == 'Siswa Dalam') {
                    return `<div><span class=" badge py-3 px-4 fs-5 badge-light-primary">`+ row.status_siswa + `</span> </div>`; 
                } else {
                    return `<div><span class="text-dark badge py-3 px-4 fs-5 text-hover-primary">`+ row.status_siswa + `</span> </div>`; 
                }
            }
        },{
            target:5,
            orderable:false,
            render:function (data, type, row) {
                var uri_target = uri_edit.replace("::target::", row.id);
                var medco_file = '';
                var bl = '';
                 if (row.medco_employee_file){
                    if(row.ppdb_discount == '' || row.ppdb_discount == null) {
                        medco_file = "Belum Validasi";
                        bl = 'danger';
                    } else {
                        medco_file = "Sudah Validasi";
                        bl = 'primary';
                    }
                 } else {
                    medco_file = "";
                 }

                return `<div>
                <a href="` + uri_target + `">
                <span class="badge py-3 px-4 fs-7 badge-light-`+bl+`">` +medco_file+`</span>
                </a>
                </div>`;
            }
        }, {
            targets: 6,
            orderable: false,
            render: function (data, type, row) {
                return formatPaymentStatus(row.confirmation_status);
            }
        }, {
            targets: 7,
            orderable: false,
            render: function (data, type, row) {
                if (row.confirmation_status != 0) return '';

                return `
                <button type="button" data-payment_id="` + row.payment_id + `" data-payment_type="` + row.payment_type + `" class="btn-payment-modal btn btn-sm btn-light-primary border w-lg-100 w-100">
                Detail
                    <span class="svg-icon icon-size-2x ms-3 me-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z" fill="currentColor"></path>
                            <path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z" fill="currentColor"></path>
                            <path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z" fill="currentColor"></path>
                        </svg>
                    </span>
                </button>
                `;
            }
        }],
        order: [
            [0, "asc"]
        ],
        searchDelay: 500,
        "createdRow": function (row, data, dataIndex) {
            FTX.Utils.dtAnchorToForm(row);
            if (blockPage.isBlocked()) blockPage.release();
        },
        "initComplete": function( settings, json ) {
            if (blockPage.isBlocked()) blockPage.release();
        }
    });

    $('#btn-search').click(function () {
        if (!blockPage.isBlocked()) {
            blockPage.block();
        }
        
        dt.fnDraw();
    })

    $("body").on("click", "#btn-payment-action", function () {

        var formData = {
            id: $('input[name="payment_id"]').val(),
            action: $('input[name="action"]:checked').val(),
        }
    
        if (!blockUI) {
            blockUI = new KTBlockUI(document.querySelector("#kt_modal_payment_formulir_body"), {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
            });
        }

    
        console.log(formData);
    
        if (!formData.action) {
            Swal.fire({
                text: "Status pembayaran harus dipilih",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                    confirmButton: "btn btn-primary"
                }
            });
        } else {
    
            if (!blockUI.isBlocked()) {
                blockUI.block();
            }
            
            $.ajax({
                type: 'POST',
                url: $('[name="uri_payment_action"]').val(),
                data: formData,
                dataType: "JSON",
                success: (response) => {
                    console.log(response);
                    if (!blockPage.isBlocked()) {
                        blockPage.block();
                    }

                    dt.fnDraw();

                    Swal.fire({
                        text: "Pembayaran telah berhasil " + ((formData.action == 'APPROVE') ? "disetujui" : "ditolak"),
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    }).then((result) => {
                        $('#kt_modal_payment_formulir').modal('hide');    
                    })
    
                    if (blockUI.isBlocked()) blockUI.release();
                },
                error: function (error) {
                    console.log(error);
                    if (blockUI.isBlocked()) blockUI.release();
                    Swal.fire({
                        text: (error.response) ? error.response.data : "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                }
            });
        }
    });
    
});