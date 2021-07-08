(function () {
    validateSurvey();
})();
$("#spinval").text($("#rating").val());

$("#rating").change(function () {
    $("#spinval").text($("#rating").val());
});

$("#cancelButton").click(function () {
    window.location.href = "Home.html";
});


$("#submitButton").click(function () {
    var valid = $("#surveyForm").valid();

    if (valid) {
        addSummary();
        $("#surveyForm").fadeOut(2000);
        $("#answerdata").fadeIn(2000, function () {
            retrieveSurvey();
        });
        
    }
});



jQuery.validator.addMethod("valueNotEquals", function (value, element, arg) {
    return arg != value;
}, "Value must not equal arg.");

function validateSurvey() {
    $("#surveyForm").validate({
        rules: {
            userage: "required",
            bookcategory: { valueNotEquals: "default" }
        },
        messages: {
            userage: "Please inform how old are you!",
            bookcategory: { valueNotEquals: "Please select an item!" }
        }
    });

}


function addSummary() {
    var surveyData = JSON.stringify({
        age: $("#userage").val(),
        gender: $('label[for="' + $('input:radio[name="gender"]:checked').attr("id") + '"]').html(),
        category: $("#bookcategory option:selected").text(),
        rating: $("#rating").val()
    });

    localStorage.setItem("tb_survey", surveyData);
    return true;
}

function retrieveSurvey() {
    var tb_survey = localStorage.getItem("tb_survey");
    var surveyData = JSON.parse(tb_survey);
    $("#answerdata").append("<h2>Survey Summary</h2>");
    $("#answerdata").append("<div class=\"summaryData\">Age: " + surveyData.age + "</div>");
    $("#answerdata").append("<div class=\"summaryData\">Gender: " + surveyData.gender + "</div>");
    $("#answerdata").append("<div class=\"summaryData\">Favorite Category: " + surveyData.category + "</div>")
    $("#answerdata").append("<div class=\"summaryData\">Rating: " + surveyData.rating + "</div>");

}