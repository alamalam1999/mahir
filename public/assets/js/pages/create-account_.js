"use strict";



// Class definition
var KTCreateAccount = function () {
	// Elements
	var modal;
	var modalEl;

	var stepper;
	var form;
	var formSubmitButton;
	var formContinueButton;
	var passwordMeter;

	// Variables
	var stepperObj;
	var validations = [];


	var formControl = function () {

		var dueDate = $(form.querySelector('[name="date_of_birth"]'));
		dueDate.flatpickr({
			dateFormat: "d, M Y",
		});


		$('#btn-kartu-keluarga').click(function () {
			$('input[name="file-upload-input"]').click();
		});


		$('input[name="file-upload-input"]').change(function () {
			console.log('UPLOAD FILE');
		})

		var bindingControl = function () {
			$('input[name="stage-option"]').change(function () {
				var valueItem = $(this).val();
				$('input[name="stage"]').val(valueItem);
				$('input[name="stage"]').change();

			});

			$('input[name="grade-option"]').change(function () {
				var valueItem = $(this).val();
				$('input[name="grade"]').val(valueItem);
				// $('input[name="grade"]').change();
			});
		}


		$('.box-school').click(function () {
			$('.box-school').removeClass('checked-school');

			var site = $(this).data('site');
			// console.log(site);
			$('input[name="school_site"]').val(site);
			$(this).addClass('checked-school');
			$('input[name="school_site"').change();
		})

		// Change School Site
		$('input[name="school_site"').change(function () {

			// ENUM_DATA 
			var site = $(this).val();
			var stages = ENUM_DATA.filter(function (data) {
				return data.enum_code === "STAGE" && data.enum_site == site;
			});

			console.table(stages);
			$('#school-stage').html('');

			var htmlOptions = [];
			for (let index = 0; index < stages.length; index++) {
				const stage = stages[index];

				var htmlOption = `
				<div class="col">
					<label class="btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4">
						<input type="radio" class="btn-check" name="stage-option" value="` + stage.enum_value + `" />
						<span class="fw-bolder fs-3">` + stage.enum_label + `</span>
					</label>
				</div>
				`;

				htmlOptions.push(htmlOption);
			}

			$('#school-stage').html(htmlOptions.join(''));
			$('#school-stage').show();
			bindingControl();

		});


		$('input[name="stage"]').change(function () {

			var site = $('input[name="school_site"').val();
			var stage = $(this).val();

			var grades = ENUM_DATA.filter(function (data) {
				return data.enum_code === stage && data.enum_site == site;
			});

			$('select[name="grade"]').html('');
			var htmlOptions = [];
			htmlOptions.push(`<option selected value="">Pilih Kelas</option>`);
			for (let index = 0; index < grades.length; index++) {
				const classItem = grades[index];

				var htmlOption = `<option value="` + classItem.enum_label + `">` + classItem.enum_label + `</option>`;

				htmlOptions.push(htmlOption);
			}

			console.table(grades);

			$('select[name="grade"]').html(htmlOptions);
			$('select[name="grade"]').show();
			bindingControl();
		});


		$('.btn-upload-file').click(function () {
			var input_file = $(this).parent().find('input[type="file"]');
			$(input_file).click();
		})


		$('.form-control-file').change(function () {
			// console.log($(this).val());
			// console.log($(this).data('image'));

			let formData = new FormData();
			formData.append('image', $(this)[0].files[0]);
			formData.append('type', $(this).data('image'));

			$.ajax({
				type: 'POST',
				url: URI_UPLOAD_IMAGE,
				data: formData,
				contentType: false,
				processData: false,
				success: (response) => {
					console.log(response);
					if (response.is_success) {

						var input_text = $(this).parent().parent().find('input[type="text"]');
						$(input_text).val($(this)[0].files[0].name);

						var input_hidden = $(this).parent().parent().find('input[type="hidden"]');
						$(input_hidden).val(response.file_path);

						$(this).parent().parent().find('.input-group').show();
						$(this).parent().parent().find('.dropzone').hide();

						$(this).val('');
						$(this)[0].files = null;
					}
				},
				error: function (response) {
					console.log(response);
					$(this).val('');
					$(this)[0].files = null;
				}
			});

		})

		$('.btn-remove-file').click(function () {
			var group_box = $(this).parent().parent();
			var input_text = $(group_box).find('input[type="text"]');
			$(input_text).val('');

			$(group_box).find('.input-group').hide();
			$(group_box).find('.dropzone').show();
		})




	}

	// Private Functions
	var initStepper = function () {
		// Initialize Stepper
		stepperObj = new KTStepper(stepper);

		// Stepper change event
		stepperObj.on('kt.stepper.changed', function (stepper) {
			if (stepperObj.getCurrentStepIndex() === 4) {
				formSubmitButton.classList.remove('d-none');
				formSubmitButton.classList.add('d-inline-block');
				formContinueButton.classList.add('d-none');
			} else if (stepperObj.getCurrentStepIndex() === 5) {
				formSubmitButton.classList.add('d-none');
				formContinueButton.classList.add('d-none');
			} else {
				formSubmitButton.classList.remove('d-inline-block');
				formSubmitButton.classList.remove('d-none');
				formContinueButton.classList.remove('d-none');
			}
		});

		// Validation before going to next page
		stepperObj.on('kt.stepper.next', function (stepper) {
			console.log('stepper.next');

			// Validate form before change stepper step
			var validator = validations[stepper.getCurrentStepIndex() - 1]; // get validator for currnt step

			if (validator) {
				validator.validate().then(function (status) {
					console.log('validated!');

					if (status == 'Valid') {
						stepper.goNext();

						KTUtil.scrollTop();
					} else {
						Swal.fire({
							text: "Sorry, looks like there are some errors detected, please try again.",
							icon: "error",
							buttonsStyling: false,
							confirmButtonText: "Ok, got it!",
							customClass: {
								confirmButton: "btn btn-light"
							}
						}).then(function () {
							KTUtil.scrollTop();
						});
					}
				});
			} else {
				stepper.goNext();

				KTUtil.scrollTop();
			}
		});

		// Prev event
		stepperObj.on('kt.stepper.previous', function (stepper) {
			console.log('stepper.previous');

			stepper.goPrevious();
			KTUtil.scrollTop();
		});
	}

	var handleForm = function () {
		formSubmitButton.addEventListener('click', function (e) {
			// Validate form before change stepper step
			var validator = validations[3]; // get validator for last form

			validator.validate().then(function (status) {
				console.log('validated!');

				if (status == 'Valid') {
					// Prevent default button action
					e.preventDefault();

					// Disable button to avoid multiple click 
					formSubmitButton.disabled = true;

					// Show loading indication
					formSubmitButton.setAttribute('data-kt-indicator', 'on');


					var dataForm = $('#kt_create_account_form').serializeArray();
					console.log(dataForm);

					$.ajax({
						url: URI_REGISTER,
						method: "POST",
						dataType: "JSON",
						data: dataForm,
						success: function (response) {
							console.log(response);

							if (response.is_success) {

							}
						},
						error: function (request, status, error) {
							console.log(request);
							console.log(error);
						}
					});

					// Simulate form submission
					setTimeout(function () {
						// Hide loading indication
						formSubmitButton.removeAttribute('data-kt-indicator');

						// Enable button
						formSubmitButton.disabled = false;

						stepperObj.goNext();
						//KTUtil.scrollTop();

						// form.reset();  // reset form                    
						// passwordMeter.reset();  // reset password meter
					}, 2000);


				} else {
					Swal.fire({
						text: "Sorry, looks like there are some errors detected, please try again.",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-light"
						}
					}).then(function () {
						KTUtil.scrollTop();
					});
				}
			});
		});

		// // Expiry month. For more info, plase visit the official plugin site: https://select2.org/
		// $(form.querySelector('[name="card_expiry_month"]')).on('change', function() {
		//     // Revalidate the field when an option is chosen
		//     validations[3].revalidateField('card_expiry_month');
		// });

		// // Expiry year. For more info, plase visit the official plugin site: https://select2.org/
		// $(form.querySelector('[name="card_expiry_year"]')).on('change', function() {
		//     // Revalidate the field when an option is chosen
		//     validations[3].revalidateField('card_expiry_year');
		// });

		// // Expiry year. For more info, plase visit the official plugin site: https://select2.org/
		// $(form.querySelector('[name="business_type"]')).on('change', function() {
		//     // Revalidate the field when an option is chosen
		//     validations[2].revalidateField('business_type');
		// });
	}

	var initValidation = function () {
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		// Step 1
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					// email: {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Email tidak boleh kosong'
					// 		},
					// 		emailAddress: {
					// 			message: 'Masukan email yang valid'
					// 		}
					// 	}
					// },
					// password: {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Password tidak boleh kosong'
					// 		},
					//         callback: {
					//             message: 'Masukan password yang valid',
					//             callback: function(input) {
					//                 if (input.value.length > 0) {
					//                     return validatePassword();
					//                 }
					//             }
					//         }
					// 	}
					// },
					// confirm_password: {
					// 	validators: {
					//         notEmpty: {
					//             message: 'Konfirmasi password dibutuhkan'
					//         },
					//         identical: {
					//             compare: function() {
					//                 return form.querySelector('[name="password"]').value;
					//             },
					//             message: 'Kata sandi dan konfirmasinya tidak sama'
					//         }
					// 	},
					// },
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
						eleInvalidClass: '',
						eleValidClass: ''
					})
				}
			}
		));

		// Step 2
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					// school_site: {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Sekolah tujuan harus dipilih'
					// 		}
					// 	}
					// },
					// stage: {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Jenjang sekolah harus dipilih'
					// 		}
					// 	}
					// },
					// grade: {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Jenjang sekolah harus dipilih'
					// 		}
					// 	}
					// },
					// student_status: {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Status siswa harus dipilih'
					// 		}
					// 	}
					// },
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
						eleInvalidClass: '',
						eleValidClass: ''
					})
				}
			}
		));

		// Step 3
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					// 'fullname': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Nama Calon Siswa tidak boleh kosong'
					// 		}
					// 	}
					// },
					// 'gender': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Jenis Kelamin harus dipilih'
					// 		}
					// 	}
					// },
					// 'place_of_birth': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Tempat lahir tidak boleh kosong'
					// 		}
					// 	}
					// },
					// 'date_of_birth': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Tanggal Lahir  tidak boleh kosong'
					// 		}
					// 	}
					// },
					// 'religion': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Agama harus dipilih'
					// 		}
					// 	}
					// },
					// 'nationality': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Kebangsaan harus dipilih'
					// 		}
					// 	}
					// },
					// 'address': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Alamat tidak boleh kosong'
					// 		}
					// 	}
					// },
					// // 'home_phone': {
					// // 	validators: {
					// // 		notEmpty: {
					// // 			message: 'Telpon Rumah tidak boleh kosong'
					// // 		}
					// // 	}
					// // },
					// 'hand_phone': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Nomor Handphone tidak boleh kosong'
					// 		}
					// 	}
					// },
					// 'school_origin': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Sekolah asal tidak boleh kosong'
					// 		}
					// 	}
					// }


				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
						eleInvalidClass: '',
						eleValidClass: ''
					})
				}
			}
		));

		// Step 4
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					// 'toc': {
					//     validators: {
					//         notEmpty: {
					//             message: 'You must accept the terms and conditions'
					//         }
					//     }
					// }

					// 'card_name': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Name on card is required'
					// 		}
					// 	}
					// },
					// 'card_number': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Card member is required'
					// 		},
					//         creditCard: {
					//             message: 'Card number is not valid'
					//         }
					// 	}
					// },
					// 'card_expiry_month': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Month is required'
					// 		}
					// 	}
					// },
					// 'card_expiry_year': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Year is required'
					// 		}
					// 	}
					// },
					// 'card_cvv': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'CVV is required'
					// 		},
					// 		digits: {
					// 			message: 'CVV must contain only digits'
					// 		},
					// 		stringLength: {
					// 			min: 3,
					// 			max: 4,
					// 			message: 'CVV must contain 3 to 4 digits only'
					// 		}
					// 	}
					// }
				},

				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
						eleInvalidClass: '',
						eleValidClass: ''
					})
				}
			}
		));
	}

	var handleFormSubmit = function () {

	}

	// Password input validation
	var validatePassword = function () {
		return (passwordMeter.getScore() > 60);
	}

	return {
		// Public Functions
		init: function () {
			// Elements
			modalEl = document.querySelector('#kt_modal_create_account');
			if (modalEl) {
				modal = new bootstrap.Modal(modalEl);
			}

			stepper = document.querySelector('#kt_create_account_stepper');
			form = stepper.querySelector('#kt_create_account_form');
			passwordMeter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'));
			formSubmitButton = stepper.querySelector('[data-kt-stepper-action="submit"]');
			formContinueButton = stepper.querySelector('[data-kt-stepper-action="next"]');

			formControl();
			initStepper();
			initValidation();
			handleForm();
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
	KTCreateAccount.init();
});