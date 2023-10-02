

"use strict";

// Class definition
var KTPaymentAdministration = function () {

	var blockUI;

    $('#is-employee-medco').change(function(){
        var isEmployee = $(this).prop("checked");
        
        if(isEmployee){
            $('#box-employee-medco').removeClass('d-none');
        } else {
            $('#box-employee-medco').addClass('d-none');
            $('input[name="medco_employee"]').val('');
            $('input[name="medco_employee_file"]').val('');
            $('input[name="medco_employee_file_label"]').val('');
        }
    })

    $('#is-employee-cicilan').change(function(){
        var isEmployee = $(this).prop("checked");
        let element = document.getElementById("mytable");
        let element2  = document.getElementById("checkcicilan");
       
        if(isEmployee){
            $('#box-employee-cicilan').removeClass('d-none');
            element.setAttribute("hidden", "hidden");
            element2.val(0);
        } else {
            $('#box-employee-cicilan').addClass('d-none'); 
            element.removeAttribute("hidden");
            $('input[name="cicilan_employee"]').val('');
            $('input[name="cicilan_employee_file"]').val('');
            $('input[name="cicilan_employee_file_label"]').val('');
        }
    })

    $('#is-employee-medco').click( function() {
        alert("Pastikan berkas yang di input sesuai dengan ketentuan yang berlaku")    
        if($('#is-employee-medco').prop("checked") != true) {
            location.reload();   
            $('#FEE_UP').prop('checked', false);
            $('#FEE_UP_LUNAS').prop('checked', false);
            $('#FEE_SPP').prop('checked', false);
            $('#FEE_SPP_12').prop('checked', false);              
        }
    })

    $('#is-employee-cicilan').click( function() {    
        if($('#is-employee-cicilan').prop("checked") != true) {
            location.reload();   
            $('#FEE_UP').prop('checked', false);
            $('#FEE_UP_LUNAS').prop('checked', false);
            $('#FEE_SPP').prop('checked', false);
            $('#FEE_SPP_12').prop('checked', false);              
        } else {
            $('#FEE_UP_CHECK').prop('checked', true);
        }
    })
       

    var validationPayment = function(){
        var fee_up_amount = $('input[name="fee_up_amount"]').val();
        var fee_spp_amount = $('input[name="fee_spp_amount"]').val();

        var fee_pengajuan_check   = $('input[name="medco_employee"]').val();
        var fee_pengajuan_cicilan = $('input[name="cicilan_employee"]').val();

        if (fee_pengajuan_check == "") {
            fee_pengajuan_check = 0;
        }

        if (fee_pengajuan_cicilan == "") {
            fee_pengajuan_cicilan = 0;
        }

        if ($('#is-employee-cicilan').prop("checked") == true && $('#is-employee-medco').prop("checked") == true) {
            var fee_total = parseInt(fee_pengajuan_cicilan) + parseInt(fee_spp_amount) - parseInt(fee_pengajuan_check);
            console.log("masuk ke dalam 2 feature");
        } else if($('#is-employee-cicilan').prop("checked") == true && $('#is-employee-medco').prop("checked") == false) {          
            var fee_total = parseInt(fee_spp_amount) + parseInt(fee_pengajuan_cicilan);
            console.log("masuk kedalam cicilan 1");
        } else if($('#is-employee-medco').prop("checked") == true && $('#is-employee-cicilan').prop("checked") == false) {
            var fee_total = parseInt(fee_up_amount) + parseInt(fee_spp_amount) - parseInt(fee_pengajuan_check);
            console.log("masuk kedalam medco 1");
        } else {
            var fee_total = parseInt(fee_up_amount) + parseInt(fee_spp_amount);
            console.log("masuk kedalam 1");
        }

        console.log(fee_pengajuan_cicilan);
        console.log(fee_total);

        var cost = $('input[name="cost"]').val();
        var cost_nominal = parseInt(cost);

        $('#btn-submit-payment').attr('disabled', 'disabled');
        $('#btn-submit-payment').addClass('btn-secondary');
        $('#btn-submit-payment').removeClass('btn-primary');

        console.log('fee_total = '+fee_total);

        if((fee_pengajuan_cicilan != '' && fee_pengajuan_cicilan != null) && (fee_pengajuan_check != '' && fee_pengajuan_check != null) ) {
            if(cost_nominal >= fee_total && cost_nominal <= fee_total){
                console.log("masuk ke dalam 2 feature 2");
                $('#btn-submit-payment').removeAttr('disabled');
                $('#btn-submit-payment').removeClass('btn-secondary');
                $('#btn-submit-payment').addClass('btn-primary');
            }
        }

        if(fee_up_amount > 0 && fee_spp_amount > 0 && cost_nominal > 0){
            if(cost_nominal >= fee_total && cost_nominal <= fee_total){
                $('#btn-submit-payment').removeAttr('disabled');
                $('#btn-submit-payment').removeClass('btn-secondary');
                $('#btn-submit-payment').addClass('btn-primary');
            }
        } else if(fee_pengajuan_cicilan != '' && fee_pengajuan_cicilan != null) {
            if(fee_spp_amount > 0 && cost_nominal > 0){
                if(cost_nominal >= fee_total && cost_nominal <= fee_total){
                    $('#btn-submit-payment').removeAttr('disabled');
                    $('#btn-submit-payment').removeClass('btn-secondary');
                    $('#btn-submit-payment').addClass('btn-primary');
                }
            }
        } 

        
    }

    var feeTotal = function() {
        $('#fee_total_display').text('-');

        var fee_up_amount         = $('input[name="fee_up_amount"]').val();
        var fee_spp_amount        = $('input[name="fee_spp_amount"]').val();
        var fee_pengajuan         = $('input[name="medco_employee"]').val();
        var fee_pengajuan_cicilan = $('input[name="cicilan_employee"]').val();

        console.log("iki keluar ="+fee_up_amount);

        if  (fee_pengajuan == "") {
            fee_pengajuan = 0;
        }

        if (fee_pengajuan_cicilan == "") {
            fee_pengajuan_cicilan = 0;
        }

        console.log("yg pertama"+fee_pengajuan_cicilan);

        if ($('#is-employee-cicilan').prop("checked") == true && $('#is-employee-medco').prop("checked") == true) {
            var fee_total = parseInt(fee_pengajuan_cicilan) + parseInt(fee_spp_amount) - parseInt(fee_pengajuan);
            console.log("masuk ke dalam 2 feature");
        } else if ($('#is-employee-cicilan').prop("checked") == true && $('#is-employee-medco').prop("checked") == false) {          
            var fee_total = parseInt(fee_spp_amount) + parseInt(fee_pengajuan_cicilan);
            console.log("masuk kedalam cicilan 2");
        } else if ($('#is-employee-medco').prop("checked") == true && $('#is-employee-cicilan').prop("checked") == false) {
            var fee_total = parseInt(fee_up_amount) + parseInt(fee_spp_amount) - parseInt(fee_pengajuan);
        } else {
            var fee_total = parseInt(fee_up_amount) + parseInt(fee_spp_amount);
        }

        console.log(fee_pengajuan_cicilan);
        console.log(fee_total);
        $('input[name="fee_total"]').val(fee_total);
        $('#fee_total_display').text(formatRupiah(fee_total.toString(), 'Rp. '));

        validationPayment();
    }

    


	var formControl = function () {
        $('input[name="fee_up"]').change(function() {
             console.log('fee_up_change');

             
                $('input[name="fee_up_type"]').val($(this).attr('id'));
                var test1 =  $('input[name="fee_up_type"]').val($(this).attr('id'));
                $('input[name="fee_up_amount"]').val($(this).val());
                var test2 =  $('input[name="fee_up_amount"]').val($(this).val());
                $('#fee_up_amount_display').text(formatRupiah($(this).val(), 'Rp. '));
                var test3 =  $('#fee_up_amount_display').text(formatRupiah($(this).val(), 'Rp. '));
                console.log("masuk ke ada input =" + test3);
         

            
            feeTotal();
        })

        $('input[name="fee_spp"]').change(function() {
            // console.log('fee_spp_change');

            $('input[name="fee_spp_type"]').val($(this).attr('id'));
            $('input[name="fee_spp_amount"]').val($(this).val());
            $('#fee_spp_amount_display').text(formatRupiah($(this).val(), 'Rp. '));

            feeTotal();
        })

        $('input[name="medco_employee"').change(function() {
            
            $('input[name="medco_employee_type"]').val($(this).attr('id'));
            $('input[name="medco_employee"]').val($(this).val());
            $('#medco_employee_display').text(formatRupiah($(this).val(), 'Rp. '));
            feeTotal();
        })

        $('input[name="cicilan_employee"').change(function() {
            
            $('input[name="cicilan_employee_type"]').val($(this).attr('id'));
            $('input[name="cicilan_employee"]').val($(this).val());
            $('#cicilan_employee_display').text(formatRupiah($(this).val(), 'Rp. '));
            feeTotal();
        })

        $('#payment-cost').keyup(function(){
            validationPayment();
        })
	}


	var handleForm = function () {

        $('#form-payment-administration').submit(function() {
            if (blockUI.isBlocked()) {
                blockUI.release();
            } else {
                blockUI.block();
            }
        })

    }


	return {
		// Public Functions
		init: function () {
			// Elements


            blockUI = new KTBlockUI(document.querySelector("#form-payment-administration"), {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
            });
    


			formControl();
			handleForm();
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
	KTPaymentAdministration.init();
});