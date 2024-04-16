var LoggedinUser = '';
var origin = window.location.origin;
var baseUrl = origin + "/Home"

function fn_QueryStringToJSON(url) {

    if (url === '') {
        return '';
    }
    var temp = url.toString().split('?');
    if (temp.length > 0) {
        var pairs = (temp[1] || location.search).slice(0).split('&');
        var result = {};
        for (var idx in pairs) {
            var pair = pairs[idx].toString().split('=');
            if (!!pair[0])
                result[pair[0].toLowerCase()] = decodeURIComponent(pair[1] || '');
        }
    }
    else {
        return '';
    }
    return result;
};

function fn_BlockUI() {
    $("body").delay(10).fadeIn(10, 0, function () {
        $(this).removeClass('loaded')
    });
}

function fn_UnBlockUI() {
    $("body").delay(10).fadeIn(10, 0, function () {
        $(this).addClass('loaded')
    });
}

function fn_EnableButton(ID, text) {
    $(ID).prop('disabled', false);
    $(ID).html(text);
}

function fn_DisableButton(ID, text) {
    $(ID).prop('disabled', true);
    $(ID).html(text);
}

function fn_TogglePassword() {
    let temp = document.getElementById("txtPassword");
    if (temp.type === "password") {
        temp.type = "text";
        $('#togglePassword').removeClass('fa-eye-slash').addClass('fa-eye')
    }
    else {
        temp.type = "password";
        $('#togglePassword').removeClass('fa-eye').addClass('fa-eye-slash')
    }
}

function fn_ToggleCnfPassword() {
    let temp = document.getElementById("txtCnfPassword");
    if (temp.type === "password") {
        temp.type = "text";
        $('#toggleCnfPassword').removeClass('fa-eye-slash').addClass('fa-eye')
    }
    else {
        temp.type = "password";
        $('#toggleCnfPassword').removeClass('fa-eye').addClass('fa-eye-slash')
    }
}

function fn_ToggleOldPassword() {
    let temp = document.getElementById("txtOldPassword");
    if (temp.type === "password") {
        temp.type = "text";
        $('#toggleOldPassword').removeClass('fa-eye-slash').addClass('fa-eye')
    }
    else {
        temp.type = "password";
        $('#toggleOldPassword').removeClass('fa-eye').addClass('fa-eye-slash')
    }
}

function ExportToExcel(ID, filename, dl) {
    var elt = document.getElementById(ID);
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, (filename || 'Report') + '.xlsx');
}

function ExportToPDF(ID, filename) {
    var sTable = $(ID).prop('innerHTML');

    var style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    var win = window.open('', '', '');
    win.document.write('<html><head>');
    win.document.write('<title>' + filename + '</title>');
    win.document.write(style);
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write('<table border="1" style="font-size:13px;font-weight:normal !important;">');
    win.document.write(sTable);
    win.document.write('</table>');
    win.document.write('</body></html>');
    win.document.close();
    win.print();
}

function ExportToCSV(ID, filename) {
    var csv = [];
    var rows = document.querySelectorAll(ID + " tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }
    download_csv(csv.join("\n"), filename + '.csv');
}

function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function makeTimer(targetDate) {

    var endTime = new Date(targetDate);
    endTime = (Date.parse(endTime) / 1000);

    var now = new Date();
    now = (Date.parse(now) / 1000);

    var timeLeft = endTime - now;

    if (endTime < now) {
        $('#btnOTP').prop('disabled', false);
        return;
    }

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < "10") { hours = "0" + hours; }
    if (minutes < "10") { minutes = "0" + minutes; }
    if (seconds < "10") { seconds = "0" + seconds; }

    $(".days").html(days);
    $(".hours").html(hours);
    $(".minutes").html(minutes);
    $(".seconds").html(seconds);
}

function addMinutes(date, minutes) {
    date.setMinutes(date.getMinutes() + minutes);

    return date;
}