$(document).ready(function () {
  initPage();
});

function initPage() {
  $(".header_el").load("/components/header.html");
  $(".left_side_el").load("/components/left_side_el.html");
  $(".bottom_el").load("/components/bottom_el.html");
}

var menu_click = 0;

function menu_bar(event) {
    var x = document.getElementsByClassName("menu_list_elements_down");
    if (menu_click == 0) {
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = "block";
        }
        menu_click = 1;
        document.getElementsByClassName('deals_for_product')[0].style.top = "19%";
    }
    else {
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        menu_click = 0;
        document.getElementsByClassName('deals_for_product')[0].style.top = "9%";
    }
}