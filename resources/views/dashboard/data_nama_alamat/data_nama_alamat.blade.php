@extends('dashboard.base')

@section('content')

        <div class="container-fluid">
          <div class="animated fadeIn">
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="card">
                    <div class="card-header">
                      <i class="fa fa-align-justify"></i>notes</div>
                    <div class="card-body">
                        <div class="card-toolbar" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="" data-bs-original-title="Click to add a user">
                          <a  data-lookup="JADWAL" data-url="{{ route("web.add-data-alamat") }}" class=" btn btn-sm btn-light btn-active-primary">
                              <span class="svg-icon svg-icon-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor"></rect>
                                      <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor"></rect>
                                  </svg>
                              </span>
                              Tambah Jadwal
                          </a>
                      </div>
                        <br>
                        <table class="table table-responsive-sm table-striped">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Provinsi</th>
                            <th>Kabupaten</th>
                            <th>Daerah</th>
                            <th>No HP</th>
                            <th>Email</th>
                            <th>No telepon</th>
                            <th class="w-100px">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <?php $no = 1; ?>
                          @foreach($data as $datas)
                            <tr>
                              <td>{{ $no++ }}</td>
                              <td><strong>{{ $datas->name }}</strong></td>
                              <td><strong>{{ $datas->provinsi }}</strong></td>
                              <td>{{ $datas->kabupaten }}</td>
                              <td>{{ $datas->daerah }}</td>
                              <td>{{ $datas->no_hp }}</td>
                              <td><strong>{{ $datas->email }}</strong></td>
                              <td>{{ $datas->no_telepon }}</td>
                              <td>
                                <a href="{{ route('web.edit-data-alamat', $datas->id) }}" class=" btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                  <!--begin::Svg Icon | path: icons/duotune/art/art005.svg-->
                                  <span class="svg-icon svg-icon-3 svg-icon-primary">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                          <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="currentColor"></path>
                                          <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="currentColor"></path>
                                      </svg>
                                  </span>
                                  <!--end::Svg Icon-->
                              </a>
                              <a  data-remove="JADWAL" data-url="{{ route('web.delete-data-alamat') }}" data-id="{{ $datas->id }}" class=" btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                                <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg-->
                                <span class="svg-icon svg-icon-3 svg-icon-danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"></path>
                                        <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"></path>
                                        <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"></path>
                                    </svg>
                                </span>
                                <!--end::Svg Icon-->
                            </a>
                              </td>  
                            </tr>
                          @endforeach
                        </tbody>
                      </table>
                      {{ $data->links() }}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="kt_modal_form" tabindex="-1" aria-hidden="true">
          <!--begin::Modal dialog-->
          <div class="modal-dialog modal-dialog-centered mw-700px modal-dialog-scrollable">
              <!--begin::Modal content-->
              <div class="modal-content rounded">
                  <!--begin::Modal header-->
                  <div class="modal-header pb-0 border-0 justify-content-end">
                      <!--begin::Close-->
                      <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                          <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                          <span class="svg-icon svg-icon-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
                                  <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
                              </svg>
                          </span>
                          <!--end::Svg Icon-->
                      </div>
                      <!--end::Close-->
                  </div>
                  <!--begin::Modal header-->
                  <!--begin::Modal body-->
                  <div id="kt_modal_form_editor" class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
      
                  </div>
                  <!--end::Modal body-->
      
                  <div class="modal-footer">
                      <button type="reset" id="kt_modal_jadwal_cancel" data-bs-dismiss="modal" class="btn btn-light me-3">Cancel</button>
                      <button type="button" data-submit="JADWAL" id="kt_modal_jadwal_submit" class="btn btn-primary">
                          <span class="indicator-label">Submit</span>
                      </button>
                  </div>
      
              </div>
              <!--end::Modal content-->
          </div>
          <!--end::Modal dialog-->
      </div>

<script type="text/javascript">



var blockUI = new KTBlockUI(document.querySelector("#kt_app_main"));


console.log('blockUI = '+blockUI);

    $('body').on('click', '.btn_delete', function() {
        // console.log(this.value);
        $('#id_jadwal_delete').val(this.value);
    });

    $('[data-lookup="JADWAL"]').click(function() {
        $('#kt_modal_form').modal('show');
        var uri = $(this).data('url');
        $("#kt_modal_form_editor").load(uri);
        setTimeout(() => {
            $("#due_date_range").daterangepicker({
                drops: 'up'
            });
        }, 1000);
    });

    $('body').on("click", '[data-submit="JADWAL"]', function(e) {
      e.preventDefault();
      var formSubmitButton = $(this);
      // Disable button to avoid multiple click 
      $(formSubmitButton).attr('disabled', '');
      // Show loading indication
      $(formSubmitButton).attr('data-kt-indicator', 'on');
      var form = $('#kt_modal_jadwal_form');
      var dataForm = $(form).serializeArray();
      // console.log(dataForm);
        $.ajax({
            url: $(form).attr('action'),
            method: "POST",
            dataType: "JSON",
            data: dataForm,
            success: function(response) {
                console.log('running success');
                console.log(response);

                Swal.fire({
                    text: response.message,
                    icon: response.success ? "success" : "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, Mengerti!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then(function() {
                    if (response.success) {
                      console.log("masuk ke hide");
                       
                        window.location.reload();
                        $('#kt_modal_form').modal('hide');
                    }
                });
            },
            error: function(request, status, error) {
                console.log('running error');
                console.log(request);
                console.log(error);
                Swal.fire({
                    text: ("Maaf, sepertinya ada beberapa kesalahan yang terdeteksi, silakan coba lagi."),
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "OK, Mengerti!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then(function() {

                });
            },
            complete: function() {
                // Simulate form submission
                setTimeout(function() {
                    // Hide loading indication
                    $(formSubmitButton).removeAttr('data-kt-indicator');
                    // Enable button
                    $(formSubmitButton).removeAttr('disabled');
                }, 2000);
            },
        });
      });

      $('[data-remove="JADWAL"]').click(function() {

        var dataForm = {
            id: $(this).data('id')
        }
        var uri = $(this).data('url');

        Swal.fire({
            text: "Apakah anda yakin akan menghapus jadwal ini ??",
            icon: "warning",
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            customClass: {
                confirmButton: "btn btn-danger",
                cancelButton: "btn btn-secondary",
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(dataForm);
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                $.ajax({
                    url: uri,
                    method: "POST",
                    dataType: "JSON",
                    data: {
                      "_token": "{{ csrf_token() }}",
                      "dataForm": dataForm,
                      "id": $(this).data('id')
                      },
                    success: function(response) {
                        console.log('running success');
                        console.log(response);

                        Swal.fire({
                            text: response.message,
                            icon: response.success ? "success" : "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, Mengerti!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function() {
                            if (response.success) {
                                
                                window.location.reload();
                            }
                        });
                    },
                    error: function(request, status, error) {
                        console.log('running error');
                        console.log(request);
                        console.log(error);
                        Swal.fire({
                            text: (response.message ? response.message : "Maaf, sepertinya ada beberapa kesalahan yang terdeteksi, silakan coba lagi."),
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "OK, Mengerti!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function() {
                            
                        });
                    },
                    complete: function() {
                    
                    },
                });
            }
        })


        });

 //button create post event
 $('body').on('click', '#btn-edit-post', function () {
    let post_id = $(this).data('id');
    //fetch detail post with ajax
    $.ajax({
        url: `/mantul`,
        type: "GET",
        cache: false,
        success:function(response){
          alert(response);
        }
    });
    });
</script>
@endsection


@section('javascript')

@endsection



