$('#academic-year').change(function(){
    var academicYear = parseInt($(this).val());

    var schedules = [];
    for (let index = 0; index < registration_schedules.length; index++) {
        const schedule = registration_schedules[index];
        if(schedule.academic_year_id == academicYear) schedules.push(`<option value="` + schedule.id +`">` + schedule.description +`</option>`);
    }

    
    $('#registration-schedule').html('');

    if(schedules.length > 1){
        $('#registration-schedule').append(`<option value="ALL">ALL</option>`); 
    }
    
    $('#registration-schedule').append(schedules.join(''));  
})


$('#school').change(function(){

    var school = $(this).val();


    $('#stage').html('');
    $('#stage').append(`<option value="ALL">ALL</option>`); 

    if(school !='ALL'){
        var stages = [];
        for (let index = 0; index < site_access.length; index++) {
            const item_access = site_access[index];
            if(item_access.enum_code == 'STAGE'){
                if(item_access.enum_site == school){
                    stages.push(`<option value="` + item_access.enum_value +`">`+ item_access.enum_label +`</option>`);
                }
            }
        }

        if(stages.length == 1){
            $('#stage').html('');
        }

        $('#stage').append(stages.join('')); 
    }  
})



var SetReset = function(){

    if($('#academic-year option').length > 0){
        $("#academic-year").val($("#academic-year option:first").val());
    }

    $('#academic-year').change();
    

    
    if($('#school option').length > 0){
        $("#school").val($("#school option:first").val());
    }
    
    $('#school').change();
}


$('#search-form-reset').click(function(){
    $('#academic-year').change();
    SetReset();
})


SetReset();



var uri_edit = $('input[name="uri_edit"]').val();
var ppdbTable = $('#ppdb-table');

$(document).on('click', '.btn-info-status', function() {
    $('#kt_modal_status').modal('show');
});




FTX.Utils.documentReady(function() {


    var dt = ppdbTable.dataTable({

        processing: false,
        serverSide: true,
        ajax: {
            url: ppdbTable.data('ajax_url'),
            type: 'post',
            data: function (d) {
                d.search_general        = $('#search_general').val(),
                d.academic_year         = $('#academic-year').val(),
                d.registration_schedule = $('#registration-schedule').val(),
                d.school                = $('#school').val(),
                d.stage                 = $('#stage').val(),
                d.search_status         = $('#search_status').val(),
                d.school                = $('#school').val(),
                d.stage                 = $('#stage').val(),
                d.tipe_pembayaran       = $('#tipe_pembayaran').val(),
                d.diskon                = $('#diskon').val(),
                d.status_siswa          = $('#status_siswa').val()
            }
        },
        columns: [{
                data: 'document_no'
            },
            {
                data: 'fullname'
            },
            {
                data: 'school'
            },
            {
                data: null
            },
            {
                data: null
            },

            // {
            //     data: 'document_no',
            //     name: 'document_no'
            // },
            // {
            //     data: 'school',
            //     name: 'school'
            // },
            // {
            //     data: 'created_at',
            //     name: 'created_at'
            // },
            // {
            //     data: 'actions',
            //     name: 'actions',
            //     searchable: false,
            //     sortable: false
            // }
        ],
        columnDefs: [{
            targets: 0,
            orderable: false,
            render: function(data, type, row) {
                $(row).addClass("bg-white");
                return `
                <div>
                    <span class="text-dark fw-bolder text-hover-primary d-block fs-4">` + row.document_no + `</span>
                    <span class="text-muted fw-bold text-muted d-block fs-9">` + row.schedule + `</span>
                </div>`;
            }
        }, {
            targets: 2,
            orderable: false,
            render: function(data, type, row) {
                return `
                    <div>
                        <span class="text-dark fw-bolder text-hover-primary d-block fs-6">` + row.school + `</span>
                    </div>
                `;
            }
        }, {
            targets: 3,
            orderable: false,
            render: function(data, type, row) {
                return `
                    <div>
                        <span class="text-muted fw-bold text-muted d-block fs-7">` + row.stage + ` - ` + row.classes + `</span>
                    </div>
                `;
            }
        },{
            target: 4,
            orderable: false,
            render: function(data, type, row) {
                if(row.status_siswa == 'Siswa Dalam') {
                    return `<div><span class=" badge py-3 px-4 fs-5 badge-light-primary">`+ row.status_siswa + `</span> </div>`; 
                } else {
                    return `<div><span class="text-dark badge py-3 px-4 fs-5 text-hover-primary">`+ row.status_siswa + `</span> </div>`; 
                }
            }
        }, {
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
            render: function(data, type, row) {
                console.log(row);
                return `
                <button type="button" class="btn btn-sm w-100 btn-info-status ` + row.ppdb_status_css + `">
                    ` + row.ppdb_status_label + `
                </button>
                `;
            }
        }, {
            targets: 7,
            orderable: false,
            render: function(data, type, row) {
                var uri_target = uri_edit.replace("::target::", row.id);
                return `
                <a href="` + uri_target + `" class="btn btn-sm btn-light-primary border w-lg-100 w-100">
                Detail
                    <span class="svg-icon icon-size-2x ms-3 me-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z" fill="currentColor"></path>
                            <path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z" fill="currentColor"></path>
                            <path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z" fill="currentColor"></path>
                        </svg>
                    </span>
                </a>
                `;
            }
        }],
        order: [
            [0, "asc"]
        ],
        searchDelay: 500,
        "createdRow": function(row, data, dataIndex) {
            FTX.Utils.dtAnchorToForm(row);
        }
    });

    $('#btn-search').click(function(){
        dt.fnDraw();
    })
});