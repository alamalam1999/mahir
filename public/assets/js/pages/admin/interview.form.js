

"use strict";

// Class definition
var KTCInterview = function () {
    // Elements
    var modal;
    // Variables
    var stepperObj;

    var blockUI;

    var fileBinding = function(){
        var file_uploads = $('.interview-file-upload');

        var file_check = $('.initest');

        var file_myButtonDelete = $('#myButtonDelete');


        for (let index = 0; index < file_uploads.length; index++) {
            var file_upload = file_uploads[index];
            var file_checking = file_check[index];
            var file_myButtonDeletes = file_myButtonDelete[index];
            var file_hidden = $(file_upload).data('target');
            var file_hidden_value = $('input[name="' + file_hidden + '"]').val();

            if(file_hidden_value != ''){
                var file_object = JSON.parse(file_hidden_value);
                var objResult = $(file_upload).parent();

                var objChecking = $(file_checking).parent();

                var objButtonDeletes = $(file_myButtonDeletes).parent();

                $(file_upload).addClass('d-none');

                $(objResult).find('.interview_file_result').removeClass('d-none');
                $(objResult).find('input[type="text"]').val(file_object.file_name);
                $(objResult).find('a').attr('href', hostBaseUrl + file_object.file_path);


                $(objChecking).find('.interview_file_result').removeClass('d-none');
                $(objChecking).find('input[type="text"]').val(file_object.file_name);
                $(objChecking).find('a').attr('href', hostBaseUrl + file_object.file_path);

                $(objButtonDeletes).click(function(){ 
                    $(objChecking).removeAttr("href");
                    
                  });             
            }
        }
    }


    var formControl = function () {

        $('.interview-file-upload').change(function () {

            var controlId = $(this).attr('id');

            let formData = new FormData();
            formData.append('image', $(this)[0].files[0]);
            // if (!blockUI.isBlocked()) blockUI.block();

            $(this).attr('disabled', 'disabled');

            $.ajax({
                type: 'POST',
                url: URI_UPLOAD_IMAGE,
                data: formData,
                contentType: false,
                processData: false,
                success: (response) => {
                    console.log(response);

                    if (response.is_success) {
                        var objResult = $('#' + controlId).parent();
                        $('#' + controlId).addClass('d-none');

                        var targetControl = $('#' + controlId).data('target');
                        $('input[name="' + targetControl + '"]').val(JSON.stringify(response.file));
                        $(objResult).find('.interview_file_result').removeClass('d-none');
                        $(objResult).find('input[type="text"]').val(response.file.file_name);
                        $(objResult).find('a').attr('href', hostBaseUrl + response.file.file_path);                           

                    } else {
                        Swal.fire({
                            text: response.message,
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "OK, Mengerti!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            KTUtil.scrollTop();
                        });
                    }

                    // if (blockUI.isBlocked()) blockUI.release();
                    $('#' + controlId).removeAttr('disabled');
                },
                error: function (response) {
                    // if (blockUI.isBlocked()) blockUI.release();
                    $('#' + controlId).removeAttr('disabled');
                    Swal.fire({
                        text: (response.message ? response.message : "Maaf, sepertinya ada beberapa kesalahan yang terdeteksi, silakan coba lagi."),
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "OK, Mengerti!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    }).then(function () {
                        KTUtil.scrollTop();
                    });
                }
            });

        })


        $('.btn-remove-file').click(function () {
            $(this).parent().parent().addClass('d-none');
            $(this).parent().parent().parent().find('input[type="file"]').removeAttr('disabled');
            $(this).parent().parent().parent().find('input[type="file"]').val('');
            $(this).parent().parent().parent().find('input[type="file"]').removeClass('d-none');
            $(this).parent().parent().parent().find('input[type="hidden"]').val('');
        })

        $('.check-result').change(function () {
            var controlName = $(this).attr('name');
            var controlLabel = controlName.replace('result', 'value_label');
            $('textarea[name="' + controlName + '_note"]').val('');

            if ($(this).val() == 3 || $(this).val() == '3') {
                $('textarea[name="' + controlName + '_note"]').removeAttr('readonly');
                $('textarea[name="' + controlName + '_note"]').removeClass('form-control-solid');
            } else {
                $('textarea[name="' + controlName + '_note"]').attr('readonly', 'readonly');
                $('textarea[name="' + controlName + '_note"]').addClass('form-control-solid');
            }


            switch (parseInt($(this).val())) {
                case 1: $('#' + controlLabel).html('<div style="text-align: center;"  class="mt-3 fw-bold fs-5"><span class="badge badge-success">Direkomendasikan</span></div>');
                    break;

                case 2: $('#' + controlLabel).html('<div class="mt-3 fw-bold fs-5"><span class="badge badge-danger">Tidak Direkomendasikan</span></div>');
                    break;

                case 3: $('#' + controlLabel).html('<div class="mt-3 fw-bold fs-5"><span class="badge badge-warning">Dipertimbangkan dengan cacatan</span></div>');
                    break;

                case 4: $('#' + controlLabel).html('<div style="text-align: center;"  class="mt-3 fw-bold fs-5"><span class="badge badge-success">Siap Sekolah</span></div>');
                    break;

                case 5: $('#' + controlLabel).html('<div class="mt-3 fw-bold fs-5"><span class="badge badge-danger">Tidak Direkomendasikan</span></div>');
                    break;

                case 6: $('#' + controlLabel).html('<div class="mt-3 fw-bold fs-5"><span class="badge badge-warning">Dipertimbangkan dengan cacatan</span></div>');
                    break;

                default: $('#' + controlLabel).html('');
                    break;
            }
            
        })

        $('.check-result-value').change(function(){
            var targetControl = $(this).attr('name');
            var resultValue = $(this).val();

            $('#' + targetControl + '_result').val(resultValue);
        });
        
    }


    var handleForm = function () {
        $('#form-confirmation').change(function(){
            if($(this).prop('checked')){
                $('#btn-submit').removeAttr('disabled');
            } else {
                $('#btn-submit').attr('disabled', '');
            }            
        });

        $(".btn-save").click(function (event) {
            var formSerializeArray = $('#interview-form').serializeArray();
            var btnSubmit = $(this).data('save');
            var isSubmit = false;
            if (btnSubmit != null) {
                console.log('isSubmit');
                isSubmit = true;
            }

            var formData = objectifyForm(formSerializeArray);
            console.log(objectifyForm(formData));
            formData.is_submit = isSubmit;



            if(isSubmit){
                if(parseInt(formData.interview_result) > 1 && (formData.interview_result_note == null || formData.interview_result_note == '')){
                    Swal.fire({
                        text: "Note harus di isi",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                    return;
                }
            } else {
                delete formData.interview_result;
            }

            if (!blockUI.isBlocked()) blockUI.block();
            $('#interview-message').html('');

            $.ajax({
                type: 'POST',
                url: URI_INTERVIEW_STORE,
                data: formData,
                dataType: "JSON",
                success: (response) => {
                    console.log(response);

                    if(!response.is_success){

                        var htmlError = [];
                        htmlError.push('<div class="list-group">');
                        for (let index = 0; index < response.message.length; index++) {
                            const msgError = response.message[index];
                            htmlError.push(' <a href="#" class="fs-7 list-group-item list-group-item-action list-group-item-danger">' + msgError + '</a>');
                        }
                        htmlError.push('</div>');

                        Swal.fire({
                            title: "Ada Beberapa Inputan yang harus diinputkan sebelum dikirim",
                            html: htmlError.join(''),  
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, Mengerti!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });

                        return;
                    }

                    if (isSubmit && formData.is_submit) {
                        Swal.fire({
                            text: "Form Interview berhasil disimpan!",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            window.location.href = URI_INTERVIEW_LIST;
                        });
                    } else {
                        var messageTemplate = $('#interview-message-template').html();
                        $('#interview-message').html(messageTemplate);
                        KTUtil.scrollTop();
                        if (blockUI.isBlocked()) blockUI.release();
                    }
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
                },
                complete: function(){
                    if (blockUI.isBlocked()) blockUI.release();
                }
            });


        });


        $('#form-confirmation-submit').change(function(){
            if($(this).prop('checked')){
                $('#btn-submit-confirmation').removeAttr('disabled');
            } else {
                $('#btn-submit-confirmation').attr('disabled', '');
            }            
        });


        $("#btn-submit-confirmation").click(function (event) {
            var formSerializeArray = $('#interview-form').serializeArray();
            var formData = objectifyForm(formSerializeArray);
            console.log(objectifyForm(formData));

            if (!blockUI.isBlocked()) blockUI.block();
            $('#interview-message').html('');

            $.ajax({
                type: 'POST',
                url: URI_INTERVIEW_SUBMIT,
                data: formData,
                dataType: "JSON",
                success: (response) => {
                    console.log(response);

                    if(response.is_success){
                        Swal.fire({
                            text: "Form Interview berhasil disimpan!",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            window.location.href = URI_INTERVIEW_LIST;
                        });
                    } else {
                        var htmlError = [];
                        htmlError.push('<div class="list-group">');
                        for (let index = 0; index < response.message.length; index++) {
                            const msgError = response.message[index];
                            htmlError.push(' <a href="#" class="fs-7 list-group-item list-group-item-action list-group-item-danger">' + msgError + '</a>');
                        }
                        htmlError.push('</div>');

                        Swal.fire({
                            title: "Ada Beberapa Inputan yang harus diinputkan sebelum dikirim",
                            html: htmlError.join(''),  
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, Mengerti!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });

                        return;
                    }
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
                },
                complete: function(){
                    if (blockUI.isBlocked()) blockUI.release();
                }
            });


        });


    }


    return {
        // Public Functions
        init: function () {
            // Elements

            blockUI = new KTBlockUI(document.querySelector("#interview-form"), {
                message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
            });

            $($('#nav-interview .nav-link')[0]).addClass('active');
            $($('#tab-interview .tab-pane')[0]).addClass('show');
            $($('#tab-interview .tab-pane')[0]).addClass('active');

            formControl();
            handleForm();
            fileBinding();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTCInterview.init();
});











// $('#interview-form"');


