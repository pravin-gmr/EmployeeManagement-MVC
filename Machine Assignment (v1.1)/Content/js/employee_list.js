
$(document).ready(function () {
    fn_UnBlockUI()
    GetEmployeeList();

});

function GetEmployeeList() {

    fn_BlockUI()
    try {
        $.ajax({
            type: "GET",
            url: "/Home/GetAllEmployee",
            async: false,
            timeout: 600000,
            success: function (data) {
                if (data != undefined && data != '') {
                    var btnAction;
                    var i = 1;
                    $("#tbAppender tbody").empty();
                    $("#tbAppender").DataTable(
                        {
                            "destroy": true,
                            "processing": true,
                            "lengthMenu": [[10, 50, 100, -1], [10, 50, 100, "All"]],
                            bFilter: true,
                            bSort: true,
                            bPaginate: true,
                            data: data,
                            columns: [
                                {
                                    "render": function (data, type, full, meta) {
                                        return i++;
                                    }
                                },
                                { 'data': 'EmailAddress' },
                                { 'data': 'CountryName' },
                                { 'data': 'StateName' },
                                { 'data': 'CityName' },
                                { 'data': 'PanNumber' },
                                { 'data': 'PassportNumber' },
                                { 'data': 'GenderName' },
                                { 'data': 'ActiveStatus' },
                                {
                                    "render": function (data, type, full, meta) {
                                        return '<img class="img" src="' + full.ProfileImage + '" height="50" width="50" />';
                                    }
                                },
                                {
                                    "render": function (data, type, full, meta) {

                                        btnAction = '<button onclick="NavigateToEmployeeDetail(' + full.Row_Id + ');" class="btn btn-sm btn-info"><i class="fa fa-edit"></i> Edit</button><br/>' +
                                            '<button onclick="DeleteEmployee(' + full.Row_Id + ', true);" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> Del</button>';
                                        return btnAction;
                                    }
                                }
                            ]
                        });
                }
                else {
                    $("#tbAppender tbody").empty();
                }
                fn_UnBlockUI()
            },
            error: function (xhr, textStatus, errorThrown) {
                fn_UnBlockUI()
                Swal.fire("Error!", "Server error, Please try again !", "warning")
            }
        });
    }
    catch (c) {
        fn_UnBlockUI()
        Swal.fire("Error!", "Server error, Please try again !", "warning")
    }
}

function DeleteEmployee(employeeId, isDeleted) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            var FormReq = {
                EmployeeId: employeeId,
                IsDeleted: isDeleted
            };
            fn_BlockUI();
            try {
                $.ajax({
                    type: "POST",
                    url: "/Home/DeleteEmployee",
                    data: FormReq,
                    async: false,
                    success: function (data) {
                        fn_UnBlockUI();
                        //fn_EnableButton('#btnTopUp', 'Submit')

                        if (data != undefined && data != '') {

                            if (data.Response_Status == 1) {
                                Swal.fire("Done !", data.Message + " !", "success")
                                GetEmployeeList()
                            }
                            else {
                                Swal.fire("Warning!", data.Message + " !", "warning")
                            }
                        }
                        else {
                            Swal.fire("Not Done !", "Faield", "error")
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        fn_UnBlockUI();
                        //fn_EnableButton('#btnTopUp', 'Submit')
                        Swal.fire("Error!", errorThrown + " Please try again !", "error")
                    }
                });
            }
            catch (c) {
                fn_UnBlockUI();
                Swal.fire("Error!", "Please try again !", "warning")
            }
        }
        else {
            //fn_EnableButton('#btnTopUp', 'Submit')
        }
    })
}

function NavigateToEmployeeDetail(employeeId) {
    window.sessionStorage.setItem("EmployeeId", employeeId);
    window.location.href = baseUrl + '/AddUpdateEmployee/'
}
