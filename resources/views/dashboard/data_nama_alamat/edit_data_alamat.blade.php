@extends('dashboard.base')

@section('content')
<div class="container-fluid">
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="card">
                    <div class="card-header" style="background-color: #e9ecef">
                      <button onclick="window.print()">Print this page</button>
                    </div>
                    <div class="card-body">
                    <form id="kt_modal_jadwal_form" class="form" action="{{ route('web.update-data-alamat') }}" method="POST">
                            {{ csrf_field() }}
                            <div class="container">
                                <div class="row">
                                  <div class="col-sm">
                                    <!--begin::Label-->
                                    <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                                        <span class="required">Nama</span>  
                                        <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                                        <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
                                    <!--end::Label-->
                                    <!--begin::Input-->
                                    <input type="text" class="form-control form-control-lg form-control-solid" name="name" placeholder="" value="{{ $checkstatus->name }}">
                                    <!--end::Input-->
                                  </div>
                                  <div class="col-sm">
                                     <!--begin::Label-->
                                     <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                                        <span class="required">Provinsi</span>  
                                        <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                                        <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
                                    <!--end::Label-->
                                    <!--begin::Input-->
                                    <input type="text" class="form-control form-control-lg form-control-solid" name="provinsi" placeholder="" value="{{ $checkstatus->provinsi }}">
                                    <!--end::Input-->
                                  </div>
                                  <div class="col-sm">
                                     <!--begin::Label-->
                                     <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                                        <span class="required">Kabupaten</span>  
                                        <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                                        <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
                                    <!--end::Label-->
                                    <!--begin::Input-->
                                    <input type="text" class="form-control form-control-lg form-control-solid" name="kabupaten" placeholder="" value="{{ $checkstatus->kabupaten }}">
                                    <!--end::Input-->
                                  </div>
                                </div>
                              </div>
                              <div class="container">
                                <div class="row">
                                  <div class="col-sm">
                                    <!--begin::Label-->
                                    <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                                        <span class="required">Daerah</span>  
                                        <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                                        <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
                                    <!--end::Label-->
                                    <!--begin::Input-->
                                    <input type="text" class="form-control form-control-lg form-control-solid" name="daerah" placeholder="" value="{{ $checkstatus->daerah }}">
                                    <!--end::Input-->
                                  </div>
                                  <div class="col-sm">
                                    <!--begin::Label-->
                                    <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                                        <span class="required">No Hp</span>  
                                        <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                                        <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
                                    <!--end::Label-->
                                    <!--begin::Input-->
                                    <input type="text" class="form-control form-control-lg form-control-solid" name="no_hp" placeholder="" value="{{ $checkstatus->no_hp }}">
                                    <!--end::Input-->
                                  </div>    
                                </div>
                              </div>
                              <div class="container">
                                <div class="row">
                                    <div class="col-sm">
                                        <!--begin::Label-->
                                        <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                                            <span class="required">Email</span>  
                                            <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                                            <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
                                        <!--end::Label-->
                                        <!--begin::Input-->
                                        <input type="text" class="form-control form-control-lg form-control-solid" name="email" placeholder="" value="{{ $checkstatus->email }}">
                                        <!--end::Input-->
                                      </div>
                                      <div class="col-sm">
                                       <!--begin::Label-->
                                        <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                                            <span class="required">No Telepon</span>  
                                            <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                                            <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
                                        <!--end::Label-->
                                        <!--begin::Input-->
                                        <input type="text" class="form-control form-control-lg form-control-solid" name="no_telepon" placeholder="" value="{{ $checkstatus->no_telepon }}">
                                        <!--end::Input-->
                                      </div>
                                </div>
                              </div>
                            <input type="hidden" name="id_data" value="{{ $checkstatus->id }}">
                    
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-flex btn-primary ms-5" type="submit">Update</button>
                    </div>
                </form>
                 </div>
            </div>
        </div>
    </div>
</div>

@endsection


@section('javascript')

@endsection