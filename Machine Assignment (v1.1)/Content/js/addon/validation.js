
var Result = false;
var ErrorCount = 0;
var SuccessCount = 0;

function fn_FormValidation(CID) {

    ErrorCount = 0;
    SuccessCount = 0;

    var password;
    var ConfirmPassowrd;
    var obj = {};
    obj = $('.' + CID);
    var ID = null;
    $.each(obj, function () {
        $(this).children().filter(function () {

            if ($(this).data('type')) {

                ID = $(this)

                if ($(ID).attr('data-type') == 'text') {
                    if ($(ID).val() == "") {

                        errorProvider($(ID))

                    } else {

                        successProvider($(ID))
                    }

                } else if ($(ID).attr('data-type') == 'email') {

                    if ($(ID).val() == "" || !validateEmail($(ID).val())) {

                        errorProvider($(ID))
                    } else {

                        successProvider($(ID))
                    }

                } else if ($(ID).attr('data-type') == 'password' || $(ID).attr('data-type') == 'confirmPassword') {

                    validatePassword($(ID));
                    matchPassword($(ID));

                } else if ($(ID).attr('data-type') == 'number') {

                    validateNumber($(ID));

                } else if ($(ID).attr('data-type') == 'amount') {

                    validateAmount($(ID));

                } else if ($(ID).attr('data-type') == 'phone') {

                    phoneValidation($(ID));

                } else if ($(ID).attr('data-type') == 'dropdown') {

                    validateDropdown($(ID).prop('selectedIndex'), $(ID))

                } else if ($(ID).attr('data-type') == 'radio') {

                    validateRadio($(ID).attr('data-name'), $(ID))

                } else if ($(ID).attr('data-type') == 'file') {

                    if ($(ID).val() != '')
                        successProvider($(ID));
                    else
                        errorProvider($(ID));

                } else if ($(ID).attr('data-type') == 'photo') {

                    validatePhoto($(ID));

                } else if ($(ID).attr('data-type') == 'photoRequired') {

                    validatePhotoRequired($(ID));

                }
            }
            else {
                if ($(this).find('[data-type="dropdown"]').length > 0) {

                    ID = $(this).find('[data-type="dropdown"]');

                    validateDropdown($(ID).prop('selectedIndex'), $(ID))
                }

                if ($(this).find('[data-type="radio"]').length > 0) {
                    debugger

                    ID = $(this).find('[data-type="radio"]');

                    validateRadio($(ID).attr('data-name'), $(ID))
                }
            }
        });
    });

    if (ErrorCount > 0)
        Result = false;
    else if (ErrorCount < SuccessCount)
            Result = true;

    return Result;
}

function errorProvider(ID) {
    $(ID).parent().find('span[data-type="alert"]').remove();
    $(ID).parent().append('<span data-type="alert"></span>');
    $(ID).siblings("span[data-type='alert']").addClass('error-alert');
    $(ID).siblings("span[data-type='alert']").empty().html($(ID).attr('data-msg'));
    ErrorCount = ErrorCount + 1;
}

function successProvider(ID) {
    $(ID).parent().find('span[data-type="alert"]').remove();
    SuccessCount = SuccessCount + 1;
}

function validateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}

function validatePassword(ID) {
    if ($(ID).val() == "") {
        errorProvider(ID)
    }
    else if ($(ID).val().match(/^(?=.*[!@#$%^&*-])(?=.*[0-9])(?=.*[A-Z]).{8,20}$/)) {
        successProvider(ID);
    }
    else {
        $(this).attr('data-msg', 'Password should have min 8 characters, 1 uppercase character, 1 number & 1 special character (!@#$%^&*-)');
        errorProvider(this);
    }
}

function validatePhoto(ID) {
    if ($(ID).val() != '') {
        var file = $(ID).val();
        var ext = file.substr(file.lastIndexOf('.') + 1).toLowerCase();
        if (ext == "jpg" || ext == "jpeg" || ext == "png") {
            successProvider(ID);
        }
        else {
            $(this).attr('data-msg', 'Upload Only (jpg/jpeg/png File)');
            errorProvider(ID);
        }
    } else {
        successProvider(ID);
    }
}

function validatePhotoRequired(ID) {
    if ($(ID).val() != '') {
        var file = $(ID).val();
        var ext = file.substr(file.lastIndexOf('.') + 1).toLowerCase();
        if (ext == "jpg" || ext == "jpeg" || ext == "png") {
            successProvider(ID);
        }
        else {
            $(this).attr('data-msg', 'Upload Only (jpg/jpeg/png File)');
            errorProvider(ID);
        }
    } else {
        errorProvider(ID);
    }
}

function countLength(ID) {

    if (ID.val().length < parseInt($(ID).attr('data-minlength')) || ID.val().length > parseInt($(ID).attr('data-maxlength'))) {

        errorProvider(ID);
    }
    else {
        successProvider(ID);
    }
}

function validateAmount(ID) {

    if (ID.val() < parseInt($(ID).attr('data-minvalue')) || ID.val() > parseInt($(ID).attr('data-maxvalue'))) {

        errorProvider(ID);
    }
    else {
        successProvider(ID);
    }
}

function phoneValidation(ID) {

    if (ID.val().length >= parseInt($(ID).attr('data-minlength')) && ID.val().length <= parseInt($(ID).attr('data-maxlength'))) {
        successProvider(ID);
    }
    else {
        $(ID).attr('data-msg', 'Please enter a valid mobile no. ')
        errorProvider(ID);
    }
}

function matchPassword(ID) {
    if ($(ID).attr('data-type') == 'password')
        password = ID;
    else if ($(ID).attr('data-type') == 'confirmPassword') {
        ConfirmPassowrd = ID;
        if ($(password).val() != $(ConfirmPassowrd).val() && $(password).val() != '' && $(ConfirmPassowrd).val() != '') {
            $(ID).attr('data-msg', 'Password Must Be Same');
            errorProvider(ConfirmPassowrd);
        }
        else if ($(password).val() == $(ConfirmPassowrd).val() && $(password).val() != '' && $(ConfirmPassowrd).val() != '') {
            successProvider(ConfirmPassowrd);
        }
    }

}

function validateNumber(ID) {

    if ($(ID).val() == '') {
        errorProvider(ID);
    }
    else
        if (!$.isNumeric($(ID).val())) {
            $(ID).attr('data-msg', 'Please provide only numeric value');

            errorProvider(ID);

        } else if ($.isNumeric($(ID).val()) && $(ID).val() != '') {
            successProvider(ID);

        }
}

function validateDropdown(no, ID) {
    if (no <= 0) {
        errorProvider(ID)
    }
    else {
        successProvider(ID)
    }
}

function validateRadio(name, ID) {

    if ($('input[type=radio][name=' + name + ']:checked').length == 0) {
        errorProvider(ID)
    }
    else {
        successProvider(ID)
    }
}

function fn_ClearFormFields(ID) {

    var obj = {};
    obj = $(ID);

    var obj1 = {};
    obj1 = $($(ID).children());

    $.each(obj, function () {
        var ID = $(this).children();
        successProvider(ID);
    });

    if (obj1 != null && typeof (obj1) != 'undefined') {
        $.each(obj1, function () {
            var ID = $(this).children();
            successProvider(ID);
        });
    }
}

$(function () {
    $('input[data-type="number"]').on('blur', function () {

        if ($(this).val() == '') {
            $(this).attr('data-msg', 'Please provide value!');
            errorProvider(this);
        } else if (!$.isNumeric($(this).val())) {
            $(this).attr('data-msg', 'Please provide only numeric value!');
            $(this).val('');
        } else {
            successProvider(this);
        }
    });

    $('input[data-type="amount"]').on('blur', function () {

        if ($(this).val() == '') {
            $(this).attr('data-msg', 'Please provide value!');
            errorProvider(this);
        } else if (!$.isNumeric($(this).val())) {
            $(this).attr('data-msg', 'Please provide only numeric value!');
            $(this).val('');
        } else {
            if ($(this).val() < parseInt($(this).attr('data-minvalue')) || $(this).val() > parseInt($(this).attr('data-maxvalue'))) {

                $($(this)).attr('data-msg', 'Please enter between ' + $(this).attr('data-minvalue') +
                    ' and ' + $(this).attr('data-maxvalue') + '.');
                $(this).val('');
                errorProvider($(this));
            }
            else {
                successProvider($(this));
            }
        }
    });

    $('input[data-type="phone"]').on('blur', function () {

        if ($(this).val() == '') {
            $(this).attr('data-msg', 'Please provide value!');
            errorProvider(this);
        } else
            if (!$.isNumeric($(this).val())) {
                $(this).attr('data-msg', 'Please provide only numeric value!');
                $(this).val('');
            } else {
                successProvider(this);
            }
    });

    $('input[data-type="text"]').on('blur', function () {

        if ($(this).val() == '') {
            $(this).attr('data-msg', 'Please provide value!');
            errorProvider(this);
        } else {
            successProvider(this);
        }
    });

    $('input[data-type="email"]').on('blur', function () {

        if ($(this).val() == '') {
            $(this).attr('data-msg', 'Please provide value!');
            errorProvider(this);
        } else {
            successProvider(this);
        }
    });

    //$('select').find('[data-type="dropdown"]').on('change', function () {
    //    debugger
    //    if ($(this).val() == '' || $(this).val() == 0) {
    //        $(this).attr('data-msg', 'Please select any option!');
    //        errorProvider(this);
    //    } else {
    //        successProvider(this);
    //    }
    //});

    //$('input[data-type="photo"]').on('change', function () {
    //    if ($(this).val() != '') {
    //        var file = $(this).val();
    //        var ext = file.substr(file.lastIndexOf('.') + 1).toLowerCase();
    //        if (ext == "jpg" || ext == "jpeg" || ext == "png") {
    //            successProvider(this);
    //        }
    //        else {
    //            $(this).attr('data-msg', 'Upload Only (jpg/jpeg/png File)');
    //            errorProvider(this);
    //        }
    //    } else {
    //        successProvider(this);
    //    }
    //});

    $('input[data-type="password"]').prop('type', 'password');
    $('input[data-type="password"]').on('blur', function () {

        if ($(this).val() == '') {
            $(this).attr('data-msg', 'Please provide value!');
            errorProvider(this);
        } else if ($(this).val().match(/^(?=.*[!@#$%^&*-])(?=.*[0-9])(?=.*[A-Z]).{8,20}$/)) {
            successProvider(this);
        } else {
            $(this).attr('data-msg', 'Password should have min 8 characters, 1 uppercase character, 1 number & 1 special character (!@#$%^&*-)');
            errorProvider(this);
        }
    });

    $('input[data-type="confirmPassword"]').prop('type', 'password');
    $('input[data-type="confirmPassword"]').on('blur', function () {

        if ($(this).val() == '') {
            $(this).attr('data-msg', 'Please provide value!');
            errorProvider(this);
        } else {
            successProvider(this);
        }
    });
})
