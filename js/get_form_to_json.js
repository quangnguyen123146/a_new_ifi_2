

$(document).ready(function() {
    $("#submit_button").click(function(){
        $.post("http://localhost:3000/user", {
            name: $("#fname").val(),
            mobile: $("#mobile_num").val(),
            landmark : $("#LandMark_id").val(),
            town: $("#town_id").val(),
            country: $("#country").val()
        })
    });
});
