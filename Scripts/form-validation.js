(function () {
    createPhoneMask();
    validateForm();
})();

$("#submitButton").click(function () {

    var valid = $("#membershipForm").valid();

    if (valid) {
        addUser();
        $("#form-wrapper").fadeOut(2000);
        $("#registrationstatus").fadeIn(2000);
        $("#user-info").html("<div class=\'showLogged\'> ID: " + user.id_number + " - USER: " + user.first_name + " " + user.last_name + "</div>");
        $("#user-info").addClass("showLogged");
    }

});

function addUser() {

    var randomId = makeid();

    var user = JSON.stringify({
        id_number: randomId,
        first_name: $("#firstname").val(),
        last_name: $("#lastname").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        street: $("#street").val(),
        suburb: $("#suburb").val(),
        postalcode: $("#postalcode")
    });
    localStorage.setItem("tb_user", user);

    return true;
}

function makeid() {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



function createPhoneMask() {
    $("#phone").mask("99 9999-9999");


    $("#phone").on("blur", function () {
        var last = $(this).val().substr($(this).val().indexOf("-") + 1);

        if (last.length == 3) {
            var move = $(this).val().substr($(this).val().indexOf("-") - 1, 1);
            var lastfour = move + last;

            var first = $(this).val().substr(0, 9);

            $(this).val(first + '-' + lastfour);
        }
    });
}


function validateForm() {
    var isValid = $("#membershipForm").validate({
        rules: {

            firstname: "required",
            lastname: "required",
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlength: 2
            },
            street: "required",
            suburb: "required",
            postalcode: {
                required: true
            }
        },
        messages: {
            firstname: "Please Enter your First Name",
            lastname: "Please Enter your Last Name",
            email: {
                required: "E-mail cannot be empty",
                email: "Please inform a valid e-mail address"
            },
            phone: {
                required: "Please inform a telephone number",
                minlength: "Please inform a valid telephone number"
            },
            street: "Please inform a street",
            suburb: "Please inform your suburb",
            postalcode: {
                required: "Please inform a postal code"

            }
        }

    });
    return isValid;
}

