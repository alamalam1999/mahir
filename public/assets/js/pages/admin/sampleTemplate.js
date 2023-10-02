

"use strict";

// Class definition
var KTCreateAccount = function () {
	// Elements
	var modal;
	// Variables
	var stepperObj;

	var blockUI;


	var formControl = function () {

	}


	var handleForm = function () {

    }


	return {
		// Public Functions
		init: function () {
			// Elements


			formControl();
			handleForm();
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
	KTCreateAccount.init();
});







var blockUI;


$( ".btn-save" ).click(function( event ) {
    var formSerializeArray = $( '#interview-form' ).serializeArray();

    console.log( formSerializeArray ); 
    console.log( objectifyForm(formSerializeArray) );
});

// $('#interview-form"');



$('.interview-file-upload').change(function(){

    let formData = new FormData();
    formData.append('file', $(this)[0].files[0]);

    $.ajax({
        type: 'POST',
        url: URI_UPLOAD_IMAGE,
        data: formData,
        contentType: false,
        processData: false,
        success: (response) => {
            console.log(response);


            if (blockUI.isBlocked()) {
                blockUI.release();
            }
        },
        error: function (response) {
            if (blockUI.isBlocked()) {
                blockUI.release();
            }
        }
    });

})