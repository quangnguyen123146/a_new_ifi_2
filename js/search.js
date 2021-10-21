$(document).ready(function () {
    initSearch();
    
});



function initSearch() {
    let url = new URL(location.href);
    let searchParams = new URLSearchParams(url.search);
    const searchText = searchParams.get('search');
    getDataFromAjax('http://localhost:3000/products?name_like=' + searchText);
}


function getDataFromAjax(url) {
    return $.ajax({
		url : url,
		type : 'GET',
		async : true,
		contentType: "application/json; charset=utf-8",
		dataType: 'JSON',
		success : function(data) {
            showData(data);
		},
        error : function() {
            console.error('error');
        }
	});
}

function showData(response) {
    const $box_item = $(".prod_search_list");
    for (let i = 0; i <= response.length; i++) {
        const html = `
        <div class="container" id = "${response[i].id}">
                <div class="inside_container">
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
        $box_item.append($html);
    }
}

