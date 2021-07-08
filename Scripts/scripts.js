
$(document).ready(function () {

    var path = window.location.pathname;
    var page = path.split("/").pop();

    $("#menu ul li a").each(function () {
        var href = $(this).attr("href");
        if (href == page) {
            $(this).parent().addClass("current_page_item");
        }
    });


    
});

(function () {
    var tb_user = localStorage.getItem("tb_user");
    var user = JSON.parse(tb_user);
    if (tb_user != null) {
        $("#user-info").html("<div class=\'showLogged\'> ID: " + user.id_number + " - USER: " + user.first_name + " " + user.last_name + "</div>");
        $("#user-info").addClass("showLogged");
    } else {
        tb_user = [];
    }
    $("#postalcode").numeric();
    $("#userage").numeric();

})();