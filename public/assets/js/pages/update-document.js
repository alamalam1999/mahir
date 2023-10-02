"use strict";

// Class definition
var KTUpdateDocument = (function () {
    // Elements
    var modal;
    var modalEl;

    var stepper;
    var form;
    var formSubmitButton;

    var targetUploadBlock;
    var blockUI;

    var formControl = function () {
        targetUploadBlock = document.querySelector("#form-upload-document");
        blockUI = new KTBlockUI(targetUploadBlock, {
            message:
                '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
        });

        // blockUI.block();

        $("#btn-kartu-keluarga").click(function () {
            $('input[name="file-upload-input"]').click();
        });

        $('input[name="file-upload-input"]').change(function () {
            console.log("UPLOAD FILE");
        });

        $(".btn-upload-file").click(function () {
            var input_file = $(this).parent().find('input[type="file"]');
            $(input_file).click();
        });

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

        var dataURLToBlob = function (dataURL) {
            var BASE64_MARKER = ";base64,";
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                var parts = dataURL.split(",");
                var contentType = parts[0].split(":")[1];
                var raw = parts[1];

                return new Blob([raw], { type: contentType });
            }

            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(":")[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], { type: contentType });
        };

        $(".form-control-file").change(function () {
            // console.log($(this).val());
            // console.log($(this).data('image'));

            var currentInputObj = $(this);

            var file = $(this)[0].files[0];
            const nameOriginal = file.name;
            const lastDot = nameOriginal.lastIndexOf(".");
            const fileName = nameOriginal.substring(0, lastDot);

            let formData = new FormData();
            formData.append("type", $(this).data("image"));
            formData.append("image", file);

            // Ensure it's an image
            if (file.type.match(/image.*/)) {
                console.log("An image has been loaded");

                // Load the image
                var reader = new FileReader();
                reader.onload = function (readerEvent) {
                    var image = new Image();
                    image.onload = function (imageEvent) {
                        // Resize the image
                        var canvas = document.createElement("canvas"),
                            max_size = 1024, // TODO : pull max size from a site config
                            width = image.width,
                            height = image.height;
                        if (width > height) {
                            if (width > max_size) {
                                height *= max_size / width;
                                width = max_size;
                            }
                        } else {
                            if (height > max_size) {
                                width *= max_size / height;
                                height = max_size;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        canvas
                            .getContext("2d")
                            .drawImage(image, 0, 0, width, height);
                        var dataUrl = canvas.toDataURL("image/jpeg");
                        var resizedImage = dataURLToBlob(dataUrl);

                        formData.append("image", resizedImage, nameOriginal);
                        console.log("RESIZE IMAGE");

                        if (!blockUI.isBlocked()) {
                            blockUI.block();
                        }

                        $.ajax({
                            type: "POST",
                            url: URI_UPLOAD_IMAGE,
                            data: formData,
                            contentType: false,
                            processData: false,
                            success: (response) => {
                                console.log(response);
                                if (response.is_success) {
                                    var input_text = $(currentInputObj)
                                        .parent()
                                        .parent()
                                        .find('input[type="text"]');
                                    $(input_text).val(
                                        $(currentInputObj)[0].files[0].name
                                    );

                                    var input_hidden = $(currentInputObj)
                                        .parent()
                                        .parent()
                                        .find('input[type="hidden"]');
                                    $(input_hidden).val(
                                        response.file.file_path
                                    );

                                    $(currentInputObj)
                                        .parent()
                                        .parent()
                                        .find(".input-group")
                                        .show();
                                    $(currentInputObj)
                                        .parent()
                                        .parent()
                                        .find(".dropzone")
                                        .hide();

                                    $(currentInputObj).val("");
                                    $(currentInputObj)[0].files = null;
                                }

                                if (blockUI.isBlocked()) {
                                    blockUI.release();
                                }
                            },
                            error: function (response) {
                                if (blockUI.isBlocked()) {
                                    blockUI.release();
                                }
                                console.log(response);
                                $(this).val("");
                                $(this)[0].files = null;
                            },
                        });

                        // $.event.trigger({
                        // 	type: "imageResized",
                        // 	blob: resizedImage,
                        // 	url: dataUrl
                        // });
                    };
                    image.src = readerEvent.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                if (!blockUI.isBlocked()) {
                    blockUI.block();
                }

                $.ajax({
                    type: "POST",
                    url: URI_UPLOAD_IMAGE,
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: (response) => {
                        console.log(response);
                        if (response.is_success) {
                            var input_text = $(this)
                                .parent()
                                .parent()
                                .find('input[type="text"]');
                            $(input_text).val($(this)[0].files[0].name);

                            var input_hidden = $(this)
                                .parent()
                                .parent()
                                .find('input[type="hidden"]');
                            $(input_hidden).val(response.file.file_path);

                            $(this)
                                .parent()
                                .parent()
                                .find(".input-group")
                                .show();
                            $(this).parent().parent().find(".dropzone").hide();

                            $(this).val("");
                            $(this)[0].files = null;
                        }

                        if (blockUI.isBlocked()) {
                            blockUI.release();
                        }
                    },
                    error: function (response) {
                        if (blockUI.isBlocked()) {
                            blockUI.release();
                        }

                        console.log(response);
                        $(this).val("");
                        $(this)[0].files = null;
                    },
                });
            }
        });

        $(".btn-remove-file").click(function () {
            var group_box = $(this).parent().parent();
            var input_text = $(group_box).find('input[type="text"]');
            var input_hidden = $(group_box).find('input[type="hidden"]');
            $(input_text).val("");
            $(input_hidden).val("");

            $(group_box).find(".input-group").hide();
            $(group_box).find(".dropzone").show();
        });
    };

    var handleForm = function () {

        $(formSubmitButton).click(function () {

            // Disable button to avoid multiple click
            formSubmitButton.disabled = true;

            // Show loading indication
            formSubmitButton.setAttribute("data-kt-indicator", "on");

            var dataForm = $(form).serializeArray();
            console.log(dataForm);

            
            if (!blockUI.isBlocked()) blockUI.block();

            $.ajax({
                url: $(form).attr("action"),
                method: "POST",
                dataType: "JSON",
                data: dataForm,
                success: function (response) {
                    console.log(response);

                    // Simulate form submission
                    setTimeout(function () {
                        // Hide loading indication
                        formSubmitButton.removeAttribute("data-kt-indicator");

                        // Enable button
                        formSubmitButton.disabled = false;
                    }, 2000);

                    if (response.is_success) {
                        // stepperObj.goNext();
                        //KTUtil.scrollTop();
                        // $(areaAction).addClass("d-none");
                        // URI_DASHBOARD
                        
                        Swal.fire({
                            text: response.message
                                ? response.message
                                : "Berhasil menyimpan dokumen",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "OK, Mengerti!",
                            customClass: {
                                confirmButton: "btn btn-primary",
                            },
                        }).then(function () {
                            window.location = URI_DASHBOARD;
                        });
                    } else {
                        Swal.fire({
                            text: response.message
                                ? response.message
                                : "Maaf, sepertinya ada beberapa kesalahan yang terdeteksi, silakan coba lagi.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "OK, Mengerti!",
                            customClass: {
                                confirmButton: "btn btn-primary",
                            },
                        }).then(function () {
                            if (blockUI.isBlocked()) blockUI.release();
                            KTUtil.scrollTop();
                        });
                    }
                },
                error: function (request, status, error) {
                    if (blockUI.isBlocked()) blockUI.release();
                    console.log(request);
                    console.log(error);
                },
            });
        });
    };

    return {
        // Public Functions
        init: function () {

            form = document.querySelector('#form-upload-document');
			formSubmitButton = document.querySelector('#btn-submit');

            formControl();
            handleForm();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTUpdateDocument.init();
});
