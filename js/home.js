
$(document).ready(function()
{
    $("#user_outer_layer_id").mouseover(function() { $("#overlay_id").css('visibility','visible'); });

    $("#user_outer_layer_id").mouseout(function() { $("#overlay_id").css('visibility','hidden'); });

    $("#overlay_id").mouseover(function() { $("#overlay_id").css('visibility','visible'); });

    $("#overlay_id").mouseout(function() { $("#overlay_id").css('visibility','hidden'); });

    $("#Frozen_id").mouseover(function() { $("#Frozen_dropdown_id").css('display', 'block')});

    $("#Frozen_id").mouseout(function() { $("#Frozen_dropdown_id").css('display', 'none')});
    
    $("#veg_meat_id").mouseover(function() { $("#veg_meat_dropdown_id").css('display', 'block')});

    $("#veg_meat_id").mouseout(function() { $("#veg_meat_dropdown_id").css('display', 'none')});

    $("#Beverage_id").mouseover(function() { $("#Beverage_dropdown_id").css('display', 'block')});

    $("#Beverage_id").mouseout(function() { $("#Beverage_dropdown_id").css('display', 'none')});

    
});


var clicked = 0;
var btn = document.querySelector(".search_bar_con");
btn.addEventListener('click', function() {
    if (clicked == 0) {
        document.getElementById("product").style.width = "700px";
        clicked = 1;
    }
    else {
        document.getElementById("product").style.width = "0";
        clicked = 0;
    }
});


var pic1 = document.getElementById("slide1");
pic1.style.display = "none"
var pic2 = document.getElementById("slide2");
pic2.style.display = "none";
var pic3 = document.getElementById("slide3");
pic3.style.display = "inline-block";
var dot1 = document.getElementById("dot1");
var dot2 = document.getElementById("dot2");
var dot3 = document.getElementById("dot3");

var p1 = 1;
var p2 = 0;
var p3 = 0;

dot1.addEventListener('click', function slide1() {
    pic1.style.display = "inline-block";
    pic2.style.display = "none";
    pic3.style.display = "none";
})

dot2.addEventListener('click', function slide2() {
    pic2.style.display = "inline-block";
    pic3.style.display = "none";
    pic1.style.display = "none";
})

dot3.addEventListener('click', function slide3() {
    pic3.style.display = "inline-block";
    pic2.style.display = "none";
    pic1.style.display = "none";
})

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 5000); 
}


var menu_click = 0;

var menu_bar = document.getElementById('menu_bar_id');
menu_bar.addEventListener('click', function() {
    var x = document.getElementsByClassName("menu_list_elements_down");
    if (menu_click == 0) {
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = "block";
        }
        menu_click = 1;
    }
    else {
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        menu_click = 0;
    }
});

let add = document.getElementById("discount_adds");
setInterval(function() {
    if (add.style.color == "red") {
        add.style.color = 'black';
    }else {
        add.style.color = 'red';
    }
}, 500)


function list_all_home() {
    const $cleaning_whole = $(".hot_offer_container");
    
    getDataFromAjax('http://localhost:3000/products').done(function (response) {
        console.log(response)
        for (let i = 0; i <= 3; i++) {
            const html = `
            <div class="container" id = "${response[i].id}">
                    <div class="inside_container">
                        <div class = pic_price_img>
                        <div class="image_offer">
                        <a href = "single_products.html?id=${response[i].id}">    
                        <img class = "image_content" src="${response[i].pic}">
                        </a>
                        </div>
                        <div class="price_tag">
                            <h2 class = "offer_element1">${response[i].name}</h2>
                            <div class="offer_element_container">
                                <h1 class = "offer_element2">
                                ${'$' + response[i].price}
                                </h1>
                                <h1 class="offer_element3">
                                    ${'$' + response[i].og_price}
                                </h1>
                            </div>
                        </div>
                        </div>
                        
                        <button 
                        class = "offer_button" value = "7.99" id = "1"
                        onclick = "addToCartClicked(event)">
                            ADD TO CART
                        </button>
                        <param class = "discount_value" value="2.00">
                </div>
            `;
            const $html = $(html);
            $html.find(".offer_element1").text(response[i].name);
            $html.find(".offer_element2").text(response[i].price);
            $html.find(".container").attr("id", response[i].id);
            $html.find(".image_content").attr("src", response[i].pic);
            $cleaning_whole.append($html);
        }
    })
    
}
list_all_home()

function getDataFromAjax(url) {
    return $.ajax({
		url : url,
		type : 'GET',
		async : true,
		contentType: "application/json; charset=utf-8",
		dataType: 'JSON',
		success : function(data) {
            console.log('success');
		},
        error : function() {
            console.error('error');
        }
	});
}