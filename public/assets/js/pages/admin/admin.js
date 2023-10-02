


var usersTable = $('#users-table');
var itemsBG = Array('primary', 'danger', 'success', 'info');

FTX.Utils.documentReady(function() {


    var dt = usersTable.dataTable({
        processing: false,
        serverSide: true,
        ajax: {
            url: usersTable.data('ajax_url'),
            type: 'post',
            data: function (d) {
                d.status = 1,
                d.trashed = false,
                d.search_general = $('#search_general').val(),
                d.is_admin = $('#is_admin').val()
            }
        },
        columns: [

            { data: 'first_name', name: 'first_name' },
            { data: 'roles', name: 'roles', sortable: false },
            { data: 'created_at', name: 'created_at' },
            { data: 'confirmed', name: 'confirmed' },
            { data: 'updated_at', name: 'updated_at' },
            { data: 'actions', name: 'actions', searchable: false, sortable: false }
        ],
        columnDefs: [
            {
            targets: 0,
            orderable: false,
            render: function(data, type, row) {
                var uri = uri_edit_user.replace('::target::', row.id);
                var itemBG = itemsBG[Math.floor(Math.random()*itemsBG.length)];
                return `
                <div class="d-flex align-items-center">
                    <div class="symbol symbol-50px overflow-hidden me-5">
                        <a href="` + uri + `">
                            <div class="symbol-label fs-3 bg-light-` + itemBG +` text-` + itemBG +`">` + getInitials(row.first_name + ' ' + row.last_name) + `</div>
                        </a>
                    </div>
                    <div class="d-flex flex-column">
                        <a href="` + uri + `" class="text-gray-800 text-hover-primary mb-1">` + (row.first_name + ' ' + row.last_name) + `</a>
                        <span>` + row.email + `</span>
                    </div>
                </div>
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




(function () {

    FTX.Users = {
        edit: {
            selectors: {
                getPremissionURL: "",
                getRoleForPermissions: "",
                getAvailabelPermissions: "",
                Role3: "",
                searchButton: "",
            },
            init: function (pageName) {
                this.setSelectors();
                this.addHandlers(pageName);
            },
            setSelectors: function () {
                this.selectors.getRoleForPermissions = document.querySelectorAll(".get-role-for-permissions");
                this.selectors.getAvailabelPermissions = document.querySelector(".get-available-permissions");
                this.selectors.searchButton = document.querySelector(".search-button");
                this.selectors.Role3 = document.getElementById("role-3");
            },
            addHandlers: function (pageName) {

                this.selectors.getRoleForPermissions.forEach(function (element) {
                    element.onclick = function (event) {

                        FTX.Users.edit.selectors.searchButton.value = '';
                        FTX.Utils.addClass(FTX.Users.edit.selectors.searchButton, 'hidden');
                        // FTX.Users.edit.selectors.searchButton.dispatchEvent(new Event('keyup'));

                        FTX.Utils.addClass(document.getElementById("available-permissions"), 'hidden');

                        callback = {
                            success: function (request) {
                                if (request.status >= 200 && request.status < 400) {
                                    // Success!
                                    var response = JSON.parse(request.responseText);
                                    var permissions = response.permissions;
                                    var rolePermissions = response.rolePermissions;
                                    var allPermisssions = response.allPermissions;

                                    FTX.Users.edit.selectors.getAvailabelPermissions.innerHTML = "";
                                    htmlstring = "";
                                    if (permissions.length == 0) {
                                        FTX.Users.edit.selectors.getAvailabelPermissions.innerHTML = '<p>There are no available permissions.</p>';
                                    } else {
                                        for (var key in permissions) {
                                            var addChecked = '';
                                            if (allPermisssions == 1 && rolePermissions.length == 0) {
                                                addChecked = 'checked="checked"';
                                            } else {
                                                if (typeof rolePermissions[key] !== "undefined") {
                                                    addChecked = 'checked="checked"';
                                                }
                                            }

                                            htmlstring += '<div><input type="checkbox" name="permissions[' + key + ']" value="' + key + '" id="perm_' + key + '" ' + addChecked + '/><label for="perm_' + key + '" style="margin-left:10px;">' + permissions[key] + '</label></div>';
                                        }
                                    }
                                    FTX.Users.edit.selectors.getAvailabelPermissions.innerHTML = htmlstring;
                                    FTX.Utils.removeClass(document.getElementById("available-permissions"), 'hidden');
                                    FTX.Utils.removeClass(FTX.Users.edit.selectors.searchButton, 'hidden');

                                } else {
                                    // We reached our target server, but it returned an error
                                    FTX.Users.edit.selectors.getAvailabelPermissions.innerHTML = '<p>There are no available permissions.</p>';
                                }
                            },
                            error: function () {
                                FTX.Users.edit.selectors.getAvailabelPermissions.innerHTML = '<p>There are no available permissions.</p>';
                            }
                        };

                        FTX.Utils.ajaxrequest(FTX.Users.edit.selectors.getPremissionURL, "post", {
                            role_id: event.target.value
                        }, FTX.Utils.csrf, callback);
                    };
                });

                this.selectors.searchButton.addEventListener('keyup', function (e) {

                    var searchTerm = this.value.toLowerCase();

                    FTX.Users.edit.selectors.getAvailabelPermissions.children.forEach(function (el) {

                        var shouldShow = true;

                        searchTerm.split(" ").forEach(function (val) {
                            if (shouldShow && (el.querySelector('label').innerHTML.toLowerCase().indexOf(val) == -1)) {
                                shouldShow = false;
                            }
                        });

                        if (shouldShow) {
                            FTX.Utils.removeClass(el, 'hidden');
                        } else {
                            FTX.Utils.addClass(el, 'hidden');
                        }
                    });
                });

                if (pageName == "create") {
                    FTX.Users.edit.selectors.Role3.click();
                }
            },
        },
    }
})();