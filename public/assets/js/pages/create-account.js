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
	var areaAction;

	// Variables
	var stepperObj;
	var validations = [];

	var targetUploadBlock;
	var blockUI;


	var formControl = function () {

		targetUploadBlock = document.querySelector("#ppdb-register-container");
		blockUI = new KTBlockUI(targetUploadBlock, {
			message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
		});

		// blockUI.block();

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
			$('#school-stage-default').remove();
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

				var is_disabled = '';
				var css_bg = '';
				var option_label = classItem.enum_label;
				if(classItem.disabled > 0) {
					is_disabled = ' disabled';
					css_bg = 'bg-secondary'
					if(classItem.disabled == 1) option_label = option_label + ' (Not Open for Register)';
					if(classItem.disabled == 2) option_label = option_label + ' (Quota is Full)';
				}

				var htmlOption = `<option class="` + css_bg +`" value="` + classItem.enum_label + `" ` + is_disabled +`>` + option_label + `</option>`;

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

		var dataURLToBlob = function(dataURL) {
			var BASE64_MARKER = ';base64,';
			if (dataURL.indexOf(BASE64_MARKER) == -1) {
				var parts = dataURL.split(',');
				var contentType = parts[0].split(':')[1];
				var raw = parts[1];
	  
				return new Blob([raw], {type: contentType});
			}
	  
			var parts = dataURL.split(BASE64_MARKER);
			var contentType = parts[0].split(':')[1];
			var raw = window.atob(parts[1]);
			var rawLength = raw.length;
	  
			var uInt8Array = new Uint8Array(rawLength);
	  
			for (var i = 0; i < rawLength; ++i) {
				uInt8Array[i] = raw.charCodeAt(i);
			}
	  
			return new Blob([uInt8Array], {type: contentType});
		}

		$('.form-control-file').change(function () {
			// console.log($(this).val());
			// console.log($(this).data('image'));

			var currentInputObj = $(this);

			var file = $(this)[0].files[0];
			const nameOriginal = file.name;
			const lastDot = nameOriginal.lastIndexOf('.');		  
			const fileName = nameOriginal.substring(0, lastDot);


			let formData = new FormData();
			formData.append('type', $(this).data('image'));
			formData.append('image', file);


			// Ensure it's an image
			if(file.type.match(/image.*/)) {
				console.log('An image has been loaded');

				// Load the image
				var reader = new FileReader();
				reader.onload = function (readerEvent) {
					var image = new Image();
					image.onload = function (imageEvent) {

						// Resize the image
						var canvas = document.createElement('canvas'),
							max_size = 1024,// TODO : pull max size from a site config
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
						canvas.getContext('2d').drawImage(image, 0, 0, width, height);
						var dataUrl = canvas.toDataURL('image/jpeg');
						var resizedImage = dataURLToBlob(dataUrl);
						

						formData.append('image', resizedImage, nameOriginal);
						console.log('RESIZE IMAGE');


						if (!blockUI.isBlocked()) {
							blockUI.block();
						}

						$.ajax({
							type: 'POST',
							url: URI_UPLOAD_IMAGE,
							data: formData,
							contentType: false,
							processData: false,
							success: (response) => {
								console.log(response);
								if (response.is_success) {
			
									var input_text = $(currentInputObj).parent().parent().find('input[type="text"]');
									$(input_text).val($(currentInputObj)[0].files[0].name);
			
									var input_hidden = $(currentInputObj).parent().parent().find('input[type="hidden"]');
									$(input_hidden).val(response.file.file_path);
			
									$(currentInputObj).parent().parent().find('.input-group').show();
									$(currentInputObj).parent().parent().find('.dropzone').hide();
			
									$(currentInputObj).val('');
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
								$(this).val('');
								$(this)[0].files = null;
							}
						});

						// $.event.trigger({
						// 	type: "imageResized",
						// 	blob: resizedImage,
						// 	url: dataUrl
						// });
					}
					image.src = readerEvent.target.result;
				}
				reader.readAsDataURL(file);
			} else {
				if (!blockUI.isBlocked()) {
					blockUI.block();
				}
				
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
							$(input_hidden).val(response.file.file_path);
	
							$(this).parent().parent().find('.input-group').show();
							$(this).parent().parent().find('.dropzone').hide();
	
							$(this).val('');
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
						$(this).val('');
						$(this)[0].files = null;
					}
				});
			}

		})

		$('.btn-remove-file').click(function () {
			var group_box = $(this).parent().parent();
			var input_text = $(group_box).find('input[type="text"]');
			$(input_text).val('');

			$(group_box).find('.input-group').hide();
			$(group_box).find('.dropzone').show();
		})

		$('#is-employee-medco').change(function(){
			var isEmployee = $(this).prop("checked");
			
			$('input[name="medco_employee"]').val('');
			$('input[name="medco_employee_file"]').val('');

			if(isEmployee){
				$('#box-employee-medco').removeClass('d-none');
			} else {
				$('#box-employee-medco').addClass('d-none');
			}
		})


	}

	// Private Functions
	var initStepper = function () {
		// Initialize Stepper
		stepperObj = new KTStepper(stepper);

		// Stepper change event
		stepperObj.on('kt.stepper.changed', function (stepper) {
			if (stepperObj.getCurrentStepIndex() === 5) {
				formSubmitButton.classList.remove('d-none');
				formSubmitButton.classList.add('d-inline-block');
				formContinueButton.classList.add('d-none');
			} else if (stepperObj.getCurrentStepIndex() === 6) {
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
							text: "Maaf, sepertinya ada beberapa kesalahan yang terdeteksi, silakan coba lagi.",
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


					var dataForm = $(form).serializeArray();
					console.log(dataForm);

					$.ajax({
						url: $(form).attr('action'),
						method: "POST",
						dataType: "JSON",
						data: dataForm,
						success: function (response) {
							console.log(response);

							// Simulate form submission
							setTimeout(function () {
								// Hide loading indication
								formSubmitButton.removeAttribute('data-kt-indicator');

								// Enable button
								formSubmitButton.disabled = false;
							}, 2000);


							if (response.is_success) {
								stepperObj.goNext();
								//KTUtil.scrollTop();
								$(areaAction).addClass('d-none');
							} else {
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



						},
						error: function (request, status, error) {
							console.log(request);
							console.log(error);
						}
					});



				} else {
					Swal.fire({
						text: "Maaf, sepertinya ada beberapa kesalahan yang terdeteksi, silakan coba lagi.",
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
		});

	}

	// Password input validation
	var validatePassword = function () {
		return (passwordMeter.getScore() >= 60);
	}

	var initValidation = function () {

		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		// Step 1
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					'first_name': {
						validators: {
							notEmpty: {
								message: 'Nama Depan wajib diisi'
							}
						}
					},
					'last_name': {
						validators: {
							notEmpty: {
								message: 'Nama Belakang wajib diisi'
							}
						}
					},
					'phone': {
						validators: {
							notEmpty: {
								message: 'Nomor Handphone wajib diisi'
							}
						}
					},
					'email': {
						validators: {
							notEmpty: {
								message: 'Alamat Email wajib diisi'
							},
							emailAddress: {
								message: 'Masukkan alamat email yang valid'
							}
						}
					},
					'password': {
						validators: {
							notEmpty: {
								message: 'Kata sandi wajib diisi'
							},
							callback: {
								message: 'Silakan masukkan kata sandi yang valid',
								callback: function (input) {
									if (input.value.length > 0) {
										return validatePassword();
									}
								}
							}
						}
					},
					'confirm-password': {
						validators: {
							notEmpty: {
								message: 'Konfirmasi kata sandi diperlukan'
							},
							identical: {
								compare: function () {
									return form.querySelector('[name="password"]').value;
								},
								message: 'Kata sandi dan konfirmasinya tidak sama'
							}
						}
					}
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
					school_site: {
						validators: {
							notEmpty: {
								message: 'Sekolah tujuan harus dipilih'
							}
						}
					},
					stage: {
						validators: {
							notEmpty: {
								message: 'Jenjang sekolah harus dipilih'
							}
						}
					},
					grade: {
						validators: {
							notEmpty: {
								message: 'Jenjang sekolah harus dipilih'
							}
						}
					},
					student_status: {
						validators: {
							notEmpty: {
								message: 'Status siswa harus dipilih'
							}
						}
					},
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
					'fullname': {
						validators: {
							notEmpty: {
								message: 'Nama Calon Siswa tidak boleh kosong'
							}
						}
					},
					'gender': {
						validators: {
							notEmpty: {
								message: 'Jenis Kelamin harus dipilih'
							}
						}
					},
					'place_of_birth': {
						validators: {
							notEmpty: {
								message: 'Tempat lahir tidak boleh kosong'
							}
						}
					},
					'date_of_birth': {
						validators: {
							notEmpty: {
								message: 'Tanggal Lahir  tidak boleh kosong'
							}
						}
					},
					'religion': {
						validators: {
							notEmpty: {
								message: 'Agama harus dipilih'
							}
						}
					},
					'nationality': {
						validators: {
							notEmpty: {
								message: 'Kebangsaan harus dipilih'
							}
						}
					},
					'address': {
						validators: {
							notEmpty: {
								message: 'Alamat tidak boleh kosong'
							}
						}
					},
					// 'home_phone': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Telpon Rumah tidak boleh kosong'
					// 		}
					// 	}
					// },
					'hand_phone': {
						validators: {
							notEmpty: {
								message: 'Nomor Handphone tidak boleh kosong'
							}
						}
					},
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

		//step 4
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					'name_father' : {
						validators: {
							notEmpty: {
								message: 'Nama Ayah Wajib Diisi'
							}
						}
					},
					'name_mother' : {
						validators: {
							notEmpty: {
								message: 'Nama Ibu Wajib Diisi'
							}
						}
					},
					'name_work_father' : {
						validators: {
							notEmpty: {
								message: 'Nama Pekerjaan Ayah Wajib Diisi'
							}
						}
					},
					'name_work_mother' : {
						validators: {
							notEmpty: {
								message: 'Nama Pekerjaan Ibu Wajib Diisi'
							}
						}
					},
					'place_work_father' : {
						validators: {
							notEmpty: {
								message: 'Tempat Pekerjaan Ayah Wajib Diisi'
							}
						}
					},
					'place_work_mother' : {
						validators: {
							notEmpty: {
								message: 'Tempat Pekerjaan Ibu Wajib Diisi'
							}
						}
					},
					'title_work_father' : {
						validators: {
							notEmpty: {
								message: 'Jabatan Ayah Wajib Diisi'
							}
						}
					},
					'title_work_mother' : {
						validators: {
							notEmpty: {
								message: 'jabatan Ibu Wajib Diisi'
							}
						}
					},
					'gaji_tetap_ayah' : {
						validators: {
							notEmpty: {
								message: 'Gaji Ayah Wajib Diisi'
							}
						}
					},
					'gaji_tetap_ibu' : {
						validators: {
							notEmpty: {
								message: 'Gaji Ibu Wajib Diisi'
							}
						}
					},
					'income_work_father' : {
						validators: {
							notEmpty: {
								message: 'Income Ayah Wajib Diisi'
							}
						}
					},
					'income_work_mother' : {
						validators: {
							notEmpty: {
								message: 'Income Ibu Wajib Diisi'
							}
						}
					}
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

		// Step 5
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					'birth_certificate': {
						validators: {
							notEmpty: {
								message: 'Akta Kelahiran dibutuhkan'
							}
						}
					},
					'family_card': {
						validators: {
							notEmpty: {
								message: 'Kartu Keluarga dibutuhkan'
							}
						}
					},
					// 'card_number': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Card member is required'
					// 		},
					// 		creditCard: {
					// 			message: 'Card number is not valid'
					// 		}
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
					'toc': {
						validators: {
							notEmpty: {
								message: 'Anda harus setuju syarat dan ketentuan'
							}
						}
					}
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


	return {
		// Public Functions
		init: function () {
			// Elements
			// modalEl = document.querySelector('#kt_modal_create_account');
			// if (modalEl) {
			// 	modal = new bootstrap.Modal(modalEl);
			// }

			stepper = document.querySelector('#kt_create_account_stepper');
			form = stepper.querySelector('#kt_create_account_form');
			formSubmitButton = stepper.querySelector('[data-kt-stepper-action="submit"]');
			formContinueButton = stepper.querySelector('[data-kt-stepper-action="next"]');
			areaAction = stepper.querySelector('[data-kt-stepper-action="area"]');

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



