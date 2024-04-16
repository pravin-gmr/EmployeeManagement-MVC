
var windowSession = window.sessionStorage;

//----Admin login session----//

AdminLoggedInSession = (function () {
    var instance;
    function init() {
        var sessionIdKey = "AdminLoggedIn";
        return {
            // Public methods and variables.
            set: function (sessionData) {
                window.sessionStorage.setItem(sessionIdKey, JSON.stringify(sessionData));
                return true;
            },
            get: function () {
                var result = null;
                try {
                    result = JSON.parse(window.sessionStorage.getItem(sessionIdKey));
                } catch (e) { }
                return result;
            }
        };
    };
    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
}());

function IsAdminSessionActive() {
    try {
        var session = AdminLoggedInSession.getInstance().get();
        if (session != null) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log(err);
    }
};

function ClearAdminSession() {
    //window.localStorage.clear();
    window.sessionStorage.removeItem("AdminLoggedIn");
    window.location.assign("/Admin/Login");
};

//---end-login session----//


//----User login session----//

UserLoggedInSession = (function () {
    var instance;
    function init() {
        var sessionIdKey = "UserLoggedIn";
        return {
            // Public methods and variables.
            set: function (sessionData) {
                window.sessionStorage.setItem(sessionIdKey, JSON.stringify(sessionData));
                return true;
            },
            get: function () {
                var result = null;
                try {
                    result = JSON.parse(window.sessionStorage.getItem(sessionIdKey));
                } catch (e) { }
                return result;
            }
        };
    };
    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
}());

function IsUserSessionActive() {
    try {
        var session = UserLoggedInSession.getInstance().get();
        if (session != null) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log(err);
    }
};

function ClearUserSession() {
    //window.localStorage.clear();
    window.sessionStorage.removeItem("UserLoggedIn");
    window.location.assign("/Auth/SignIn");
};

//---end-login session----//

function CleareAllSession() {
    window.sessionStorage.clear();
    window.sessionStorage.removeItem("AdminLoggedIn");
    window.sessionStorage.removeItem("UserLoggedIn");
    window.location.assign("/Home/Index");
}

function fn_SetCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function fn_GetCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function fn_CheckCookie() {

    var Email = fn_GetCookie("Email");
    var Password = fn_GetCookie("Password");

    if (Email != "" && Password != "") {
        $('#txtEmail').val(Email);
        $('#txtPassword').val(Password);
    }
}

function fn_MatchCookie(email, password) {

    var tempEmail = fn_GetCookie("Email");
    var tempPassword = fn_GetCookie("Password");

    if (tempEmail != email && tempPassword != password) {
        console.log('cookie dose not Matched!');
        return true;
    }
    else {
        console.log('cookie Matched!');
        return false;
    }
}
