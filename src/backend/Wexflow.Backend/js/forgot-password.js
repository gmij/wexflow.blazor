﻿function ForgotPassword() {
    "use strict";

    let updateLanguage = function (language) {
        document.getElementById("help").innerHTML = language.get("help");
        document.getElementById("about").innerHTML = language.get("about");
        document.getElementById("lbl-username").innerHTML = language.get("username");
        document.getElementById("btn-submit").value = language.get("submit");
    };

    let language = new Language("lang", updateLanguage);
    language.init();

    let uri = Common.trimEnd(Settings.Uri, "/");
    let txtUsername = document.getElementById("txt-username");
    let btnSubmit = document.getElementById("btn-submit");

    btnSubmit.onclick = function () {
        sendEmail();
    };

    txtUsername.onkeyup = function (e) {
        e.preventDefault();
        if (e.keyCode === 13) {
            sendEmail();
        }
    };

    function sendEmail() {
        btnSubmit.disabled = true;

        let username = txtUsername.value;

        if (username === "") {
            Common.toastInfo(language.get("enter-username"));
            btnSubmit.disabled = false;
            return;
        }

        Common.post(uri + "/resetPassword?u=" + encodeURIComponent(username), function (val) {
            if (val === true) {
                Common.toastSuccess(language.get("fp-success") + username);
                setTimeout(function () {
                    Common.redirectToLoginPage();
                }, 5000);
            } else {
                Common.toastError(language.get("fp-error"));
                btnSubmit.disabled = false;
            }
        });
    }

}