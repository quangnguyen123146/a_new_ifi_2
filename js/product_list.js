

$(document).ready(function () {
    console.log(location)
    let url = new URL(location.href);
    let searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');
    getDataFromAjax('http://localhost:3000/products?id=' + id).done(function (response) {
        init_to_one(response[0])
    })

});

function init_to_one(item) {
  const $one_prod = $(".single_product");
  const html = `<div class="desc_box">
        <div class="name_and_image">
            <h1 class="single_name">${item.name}</h1>
            <img class = "prod_img" src="${item.pic}">
        </div>
        <div class="prod_desc">
            <h1>DESCRIPTION</h1>
            <div class="word_contain">
                <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
            </div>
            <div class="single_item_price_block">
                <h1 class="single_price">
                ${item.price}
                </h1>
                <h1 class = "og_price">
                ${item.og_price}
                </h1>
            </div>
            <div class="button_quantity">
                <button class="add_cart" onclick = "initCartfromsingle(event)">ADD TO CART</button>
                <input onchange = "plus_minus(event)" class = "plus_minus" type="number"
                value = "0">                        
            </div>
        </div>
      </div>`
      const $html = $(html);
      $html.find(".single_name").text(item.name);
      $html.find(".og_price").text(item.og_price);
      $html.find(".single_price").text(item.price);
      $one_prod.append($html);
}

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


function initCartfromsingle(event) {
    document.getElementById("none_empty_shopping_cart_id").style.display =
      "block";
    document.getElementsByClassName("desc_box")[0].style.display =
    "block";
    const $item = $(event.target).closest(".desc_box");
    const count = 1;
    const price = parseFloat(
      $item.find(".single_price").text()
    );
    const id = $item.attr("id");
    const title = $item.find(".single_name").text();
    const discount = $item.find(".og_price").text();
    const pic = $item.find(".prod_img").attr("src");
    const newItem = {
      image: pic,
      id: id,
      name: title,
      price: price,
      count: count,
      discount: discount,
    };
    if (!localStorage.getItem("cart"))
      localStorage.setItem("cart", JSON.stringify({}));
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart[id]) {
      cart[id].count += count;
    } else {
      cart[id] = newItem;
      
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  
    initCartFromStorage();
}

function initCartFromStorage() {
    document.querySelectorAll(".shopping").forEach((e) => e.remove());
    const cart = JSON.parse(localStorage.getItem("cart"));
    var i = 1;
    if (cart) {
      const $cart = $(".cart_shop_purchase");
      for (let key in cart) {
        const item = cart[key];
        const html = `<div class = "shopping" id = "${item.id}">
              <div class = "item_element">
              <span class = "item_name">
                ${item.name}  
              </span>
          </div>
          <input class = "item_count" type="number" min = "1"
          max = "100" value = 1 onchange = "plus_and_minus(event)">
          <span class = "price_tag">${item.price}</span>
          <span class = "discount"> discount ${item.discount}</span>
          <div class="x-container" onclick = "removeCartItem(event)">X</div>
          </div>`;
        i++;
        const $html = $(html);
        $html.find(".item_name").text(item.name);
        $html.find(".item_count").val(item.count);
        $html.find(".price_tag").text(item.price);
        $html.find(".discount").text(item.discount);
        $cart.append($html);
      }
      updateCart();
    }
}

function updateCart() {
    var cartItemContainer = document.getElementsByClassName(
      "none_empty_shopping_cart"
    )[0];
    var cartRows = cartItemContainer.getElementsByClassName("shopping");
    var total = 0;
  
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var priceElement = cartRow.getElementsByClassName("price_tag")[0];
      var item_count = cartRow.getElementsByClassName("item_count")[0];
      var price = parseFloat(priceElement.innerText);
      var item = item_count.value;
      total += price * item;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total_price")[0].innerText = "$" + total;
    if (total == 0) {
      document.getElementById("empty_cart").innerHTML = "this cart is empty";
    } else {
      document.getElementById("empty_cart").innerHTML = "";
    }
}
function plus_minus(event) {
    if(event.target.value < 1) {
        document.getElementsByClassName('plus_minus')[0].style.display = "none";
    }else {
        var cart = JSON.parse(localStorage.getItem("cart"));
        const $item = $(event.target).closest(".desc_box");
        const idz = $item.attr("id");
        if (isNaN(event.target.value) || event.target.value <= 0) {
            return;
        }
        console.log(event.target.value);
        event.value = Number(event.target.value);
        if (cart[idz]) {
            cart[idz].count += 1;
        }
    }
}

