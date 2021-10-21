$(document).ready(function () {
    $("#user_outer_layer_id").mouseover(function() { $("#overlay_id").css('visibility','visible'); });

    $("#user_outer_layer_id").mouseout(function() { $("#overlay_id").css('visibility','hidden'); });

    $("#overlay_id").mouseover(function() { $("#overlay_id").css('visibility','visible'); });

    $("#overlay_id").mouseout(function() { $("#overlay_id").css('visibility','hidden'); });
  });



function list_all_cleaning() {
    const $cleaning_whole = $(".cleaning_prod");
    
    getDataFromAjax('http://localhost:3000/products').done(function (response) {
        console.log(response)
        for (let i = 4; i <= 7; i++) {
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


function list_all_utensils() {
    const $utensils_whole = $(".utensils_prod");
    
    getDataFromAjax('http://localhost:3000/products').done(function (response) {
        console.log(response)
        for (let i = 8; i <= 11; i++) {
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
            $utensils_whole.append($html);
        }
    })
    
}

function list_all_pet_foods() {
    const $petfoods_whole = $(".pet_food");
    
    getDataFromAjax('http://localhost:3000/products').done(function (response) {
        console.log(response)
        for (let i = 12; i <= 16; i++) {
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
            $petfoods_whole.append($html);
        }
    })
    
}


list_all_cleaning()
list_all_utensils()
list_all_pet_foods()

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


