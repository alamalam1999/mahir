<form id="kt_modal_jadwal_form" class="form" action="{{ route('web.tambah-data-alamat') }}" method="POST">
	{{ csrf_field() }}
            <div class="fv-row mb-10 fv-plugins-icon-container">         
            <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                <span class="required">Nama</span>  
                <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
            <!--end::Label-->
            <!--begin::Input-->
            <input type="text" class="form-control form-control-lg form-control-solid" name="name" placeholder="" value="">
            <!--end::Input-->
            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
            
            <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                <span class="required">Provinsi</span>  
                <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
            <!--end::Label-->
            <!--begin::Input-->
            <input type="text" class="form-control form-control-lg form-control-solid" name="provinsi" placeholder="" value="">
            <!--end::Input-->
            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
         
            <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                <span class="required">Kabupaten</span>  
                <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
            <!--end::Label-->
            <!--begin::Input-->
            <input type="text" class="form-control form-control-lg form-control-solid" name="kabupaten" placeholder="" value="">
            <!--end::Input-->
            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>

            <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                <span class="required">Daerah</span>  
                <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
            <!--end::Label-->
            <!--begin::Input-->
            <input type="text" class="form-control form-control-lg form-control-solid" name="daerah" placeholder="" value="">
            <!--end::Input-->
            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>

            <!--begin::Label-->
            <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                <span class="required">No Hp</span>  
                <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
            <!--end::Label-->
            <!--begin::Input-->
            <input type="text" class="form-control form-control-lg form-control-solid" name="no_hp" placeholder="" value="">
            <!--end::Input-->
            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>

            <!--begin::Label-->
            <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                <span class="required">Email</span>  
                <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
            <!--end::Label-->
            <!--begin::Input-->
            <input type="text" class="form-control form-control-lg form-control-solid" name="email" placeholder="" value="">
            <!--end::Input-->
            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>

            <!--begin::Label-->
            <label class="d-flex align-items-center fs-5 fw-semibold mb-2">
                <span class="required">No Telepon</span>  
                <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify your unique app name" data-bs-original-title="Specify your unique app name" data-kt-initialized="1">
                <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>            </label>
            <!--end::Label-->
            <!--begin::Input-->
            <input type="text" class="form-control form-control-lg form-control-solid" name="no_telepon" placeholder="" value="">
            <!--end::Input-->
            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
            </div>

</form>