
$(document).ready(function () {
    fn_UnBlockUI()
    clearForm()

    var employeeId = sessionStorage.getItem("EmployeeId");
    if (employeeId != undefined && employeeId != 0) {
        GetEmployeeById(employeeId)
    } else {
        employeeId = 0;
        GetCountryList();
        $("#txtDOB").datepicker({ maxDate: new Date(), changeMonth: true, changeYear: true });
        $("#txtDOJ").datepicker({ maxDate: new Date(), changeMonth: true, changeYear: true });
    }

    $('#ddlCountry').change(function () {
        var countryId = $('#ddlCountry').val();
        if (countryId > 0) {
            GetStateList(countryId);
        }
    })

    $('#ddlState').change(function () {
        var stateId = $('#ddlState').val();
        if (stateId > 0) {
            GetCityList(stateId);
        }
    })

    $("#btnSubmit").click(function () {
        var isValid = fn_FormValidation(['req']);
        if (isValid) {
            fn_DisableButton('#btnSubmit', 'Please Wait....');
            AddUpdateEmployee(employeeId)
        }
    })

});

function readURL(input) {
    var file = $(input).val();
    var ext = file.substr(file.lastIndexOf('.') + 1).toLowerCase();
    if (ext == "jpg" || ext == "jpeg" || ext == "png") {

        if (input.files && input.files[0]) {
            var size = input.files[0].size;
            if (size <= 200000) {

                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#imgProfile').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
                successProvider("#fileProfile");
            }
            else {
                $("#fileProfile").attr('data-msg', 'File size is greater than 200kb');
                errorProvider("#fileProfile");
                $("#fileProfile").val('');
            }
        }
    }
    else {
        $("#fileProfile").attr('data-msg', 'Upload Only (jpg/jpeg/png File)');
        errorProvider("#fileProfile");
        $("#fileProfile").val('');
    }
}

function VerifyPan() {
    var pan = $('#txtPAN').val();
    var lastName = $('#txtLastName').val();

    if (pan != '' && lastName != '') {

        var firstLetterOfLastName = lastName.substring(0, 1).toUpperCase();
        var fifthLetterOfPAN = pan.substring(4, 5).toUpperCase();

        if (firstLetterOfLastName != fifthLetterOfPAN) {
            Swal.fire("Warning!", " Invalid Pan !, Please Provide Valid Data", "warning");
            $('#txtPAN').val('')
        }

        if (pan.length != 10) {
            Swal.fire("Warning!", " Invalid Pan !, Please Provide Valid Data", "warning");
            $('#txtPAN').val('')
        }
    }
}

function GetCountryList() {

    var selector = $('#ddlCountry');
    var defaulttext = '--Select Country--';
    var option = '<option value="0">' + defaulttext + '</option>';

    fn_BlockUI()
    try {
        $.ajax({
            method: "GET",
            url: "/Home/GetCountryList",
            async: false,
            success: function (result) {
                if (result != undefined && result != '') {
                    $.each(result, function () {
                        option += '<option value="' + this.ID + '">' + this.Value + '</option>';
                    });

                    $(selector).empty().append(option);
                    $(selector).val();
                }
                else {
                    $(selector).empty().append(option);
                    $(selector).val();
                }
                $(selector).select2();
                fn_UnBlockUI()
            },
            error: function (xhr, textStatus, errorThrown) {
                fn_UnBlockUI()
                Swal.fire("Error!", "Please try again", "error")
            }
        })
    }
    catch (c) {
        fn_UnBlockUI()
        Swal.fire("Error!", "Please try again !", "warning")
    }
}

function GetStateList(countryId) {
    var selector = $('#ddlState');
    var defaulttext = '--Select Country--';
    var option = '<option value="0">' + defaulttext + '</option>';

    fn_BlockUI()
    try {
        $.ajax({
            method: "GET",
            url: "/Home/GetStateList?CountryId=" + countryId,
            async: false,
            success: function (result) {
                if (result != undefined && result != '') {
                    $.each(result, function () {
                        option += '<option value="' + this.ID + '">' + this.Value + '</option>';
                    });

                    $(selector).empty().append(option);
                    $(selector).val();
                }
                else {
                    $(selector).empty().append(option);
                    $(selector).val();
                }
                $(selector).select2();
                fn_UnBlockUI()
            },
            error: function (xhr, textStatus, errorThrown) {
                fn_UnBlockUI()
                Swal.fire("Error!", "Please try again", "error")
            }
        })
    }
    catch (c) {
        fn_UnBlockUI()
        Swal.fire("Error!", "Please try again !", "warning")
    }
}

function GetCityList(stateId) {
    var selector = $('#ddlCity');
    var defaulttext = '--Select Country--';
    var option = '<option value="0">' + defaulttext + '</option>';

    fn_BlockUI()
    try {
        $.ajax({
            method: "GET",
            url: "/Home/GetCityList?StateId=" + stateId,
            async: false,
            success: function (result) {
                if (result != undefined && result != '') {
                    $.each(result, function () {
                        option += '<option value="' + this.ID + '">' + this.Value + '</option>';
                    });

                    $(selector).empty().append(option);
                    $(selector).val();
                }
                else {
                    $(selector).empty().append(option);
                    $(selector).val();
                }
                $(selector).select2();
                fn_UnBlockUI()
            },
            error: function (xhr, textStatus, errorThrown) {
                fn_UnBlockUI()
                Swal.fire("Error!", "Please try again", "error")
            }
        })
    }
    catch (c) {
        fn_UnBlockUI()
        Swal.fire("Error!", "Please try again !", "warning")
    }
}

function GetEmployeeById(employeeId) {

    fn_BlockUI()
    try {
        $.ajax({
            method: "GET",
            url: "/Home/GetEmployeeById?EmployeeId=" + employeeId,
            async: false,
            success: function (result) {
                fn_UnBlockUI()
                if (result != undefined && result != '') {

                    $('#txtFirstName').val(result.FirstName);
                    $('#txtLastName').val(result.LastName);
                    $('#txtEmail').val(result.EmailAddress);
                    $('#txtMobile').val(result.MobileNumber);
                    $('#txtPan').val(result.PanNumber);
                    $('#txtPassport').val(result.PassportNumber);

                    var DOB = new Date(parseInt(result.DateOfBirth.match(/\d+/)[0]));
                    var formattedDOB = (DOB.getMonth() + 1) + '/' + DOB.getDate() + '/' + DOB.getFullYear();
                    $('#txtDOB').val(formattedDOB);
                    $('#txtDOB').datepicker({ maxDate: new Date(), changeMonth: true, changeYear: true, setDate: formattedDOB });

                    var DOJ = new Date(parseInt(result.DateOfJoinee.match(/\d+/)[0]));
                    var formattedDOJ = (DOJ.getMonth() + 1) + '/' + DOJ.getDate() + '/' + DOJ.getFullYear();
                    $('#txtDOJ').val(formattedDOJ);
                    $('#txtDOJ').datepicker({ maxDate: new Date(), changeMonth: true, changeYear: true, setDate: formattedDOJ });

                    GetCountryList();
                    $("#ddlCountry option[value=" + result.CountryId + "]").prop("selected", true);
                    $('#ddlCountry').val(result.CountryId); 
                    $('#ddlCountry').trigger('change'); 

                    GetStateList(result.CountryId);
                    $("#ddlState option[value=" + result.StateId + "]").prop("selected", true);
                    $('#ddlState').val(result.StateId); 
                    $('#ddlState').trigger('change'); 

                    GetCityList(result.StateId);
                    $("#ddlCity option[value=" + result.CityId + "]").prop("selected", true);
                    $('#ddlCity').val(result.CityId); 
                    $('#ddlCity').trigger('change'); 

                    $('#imgProfile').attr('src', result.ProfileImage);
                    $('input[name=gender][value=' + result.Gender + ']').attr('checked', true);
                    $('#chkActive').attr('checked', result.IsActive);

                    $('#input_file').removeClass('req');
                }
                else {
                    Swal.fire("Error!", "No Record Found", "error")
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                fn_UnBlockUI()
                Swal.fire("Error!", "Please try again", "error")
            }
        })
    }
    catch (c) {
        fn_UnBlockUI()
        Swal.fire("Error!", "Please try again !", "warning")
    }
}

function AddUpdateEmployee(employeeId) {
    var formReq = {
        Row_Id: employeeId,
        FirstName: $('#txtFirstName').val().trim(),
        LastName: $('#txtLastName').val().trim(),
        EmailAddress: $('#txtEmail').val().trim(),
        MobileNumber: $('#txtMobile').val().trim(),
        PanNumber: $('#txtPan').val().trim().toUpperCase(),
        PassportNumber: $('#txtPassport').val().trim().toUpperCase(),
        ProfileImage: $('#imgProfile').attr('src'),
        CountryId: $('#ddlCountry').val().trim(),
        StateId: $('#ddlState').val().trim(),
        CityId: $('#ddlCity').val().trim(),
        Gender: $('input[name="gender"]:checked').val().trim(),
        IsActive: $('#chkActive').is(":checked"),
        DateOfBirth: $('#txtDOB').val().trim(),
        DateOfJoinee: $('#txtDOJ').val().trim(),
    }
    fn_BlockUI()
    try {
        $.ajax({
            method: "POST",
            url: "/Home/AddUpdateEmployee",
            data: formReq,
            async: false,
            success: function (result) {
                fn_UnBlockUI()
                fn_EnableButton('#btnSubmit', 'Submit');
                if (result != undefined && result != '') {

                    if (result.Response_Status == 1) {
                        Swal.fire("Done !", result.Message + " !", "success")
                        clearForm();
                        if (employeeId != undefined && employeeId != 0) {
                            GetEmployeeById(employeeId)
                        }
                    }
                    else {
                        Swal.fire("Warning!", result.Message + " !", "warning")
                    }
                }
                else {
                    Swal.fire("Error!", "No Record Found", "error")
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                fn_UnBlockUI()
                fn_EnableButton('#btnSubmit', 'Submit');
                Swal.fire("Error!", "Please try again", "error")
            }
        })
    }
    catch (c) {
        fn_UnBlockUI()
        fn_EnableButton('#btnSubmit', 'Submit');
        Swal.fire("Error!", "Please try again !", "warning")
    }
}

function clearForm() {
    $('#txtFirstName').val('');
    $('#txtLastName').val('');
    $('#txtEmail').val('');
    $('#txtMobile').val('');
    $('#txtPan').val('');
    $('#txtPassport').val('');
    $('#txtDOB').val('');
    $('#txtDOJ').val('');
    $('#txtDOB').datepicker({ maxDate: new Date(), changeMonth: true, changeYear: true });
    $('#txtDOJ').datepicker({ maxDate: new Date(), changeMonth: true, changeYear: true });

    $('#imgProfile').attr('src', '/Uploads/Employee/default.png');
    $('#fileProfile').val('');
    $('input[name=gender][value=1]').attr('checked', false);
    $('input[name=gender][value=2]').attr('checked', false);
    $('#chkActive').attr('checked', false);
}