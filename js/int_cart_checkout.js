function initCartFromStorage() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    const $cart = $(".checkout_whole");
    var i = 0;
    for (let key in cart) {
      const item = cart[key];
      const html = `
        <tr class = "content_container" id = "${item.id}">
        <th class = "content_number">
            <p class = "content">${i + 1}</p>
        </th>
        <th class = "content_product_image">
            <img src="${item.image}">
        </th>
        <th class = "content_container_quantity">
            <input class = "quantity" type="number" min = "1" max = "100"
            value = "1" onchange = "plus_and_minus(event)">
        </th>
        <th class = "content_product">
            <p class = "p_name">${item.name}</p>
        </th>
        <th class = "content_price">
            <p class = "price">${item.price}</p>
        </th>
        <th class = "content_remove">
            <img class="remove" src="/images/x_mark.png"
            onclick = "removeCartItem(event)">
        </th>
        </tr>
        `;
      i++;
      const $html = $(html);
      $html.find(".p_name").text(item.name);
      $html.find(".quantity").val(item.count);
      $html.find(".price").text(item.price);
      $html.find(".discount").text(item.discount);
      $cart.append($html);
      document.getElementById("shopping_contains").innerHTML =
        "YOUR SHOPPING CART CONTAINS:" + " " + i + " products";
    }
    updateCart();
    /* updateCart_checkout() */
  }
}

initCartFromStorage();

function removeCartItem(event) {
  const $item = $(event.target).closest(".content_container");
  const id = $item.attr("id");
  const cart = JSON.parse(localStorage.getItem("cart"));
  delete cart[id];
  $item.remove();
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  /* updateCart_checkout() */
  initCartFromStorage2();
  delete_price()
}

function updateCart() {
  var cartItemContainer = document.getElementsByClassName("checkout_whole")[0];
  var cartRows = cartItemContainer.getElementsByClassName("content_container");
  var total = 0;

  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("price")[0];
    var item_count = cartRow.getElementsByClassName("quantity")[0];
    var price = parseFloat(priceElement.innerText);
    var item = item_count.value;
    total += price * item;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("checkout_price")[0].innerText = "$" + total;
  document.getElementById("shopping_contains").innerText =
    "YOUR SHOPPING CART CONTAINS: " + i + " PRODUCTS";
}

function init_price() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    const $cart = $(".basket_prod_con");
    for (let key in cart) {
      const item = cart[key];
      const html = `<div class="basket_prod">
            <h3 class="basket_item_name">
                ${item.name}
            </h3>
            <h3 class="basket_item_price">
                $ ${item.price}
            </h3>
            </div>`;
      const $html = $(html);
      $html.find(".basket_item_name").text(item.name);
      $html.find(".basket_item_price").text(item.price);
      $cart.append($html);
    }
  }
}
var clicked = 0;
function switch_Clicked() {
  if (clicked == 0) {
    document.getElementById("none_empty_shopping_cart_id").style.display =
      "block";
    clicked = 1;
    initCartFromStorage2();
  } else if (clicked == 1) {
    document.getElementById("none_empty_shopping_cart_id").style.display =
      "none";
    clicked = 0;
  }
}

init_price();

function close_shopping_cart() {
  document.getElementById("none_empty_shopping_cart_id").style.display = "none";
  clicked = 0;
}

function plus_and_minus(event) {
  var cart = JSON.parse(localStorage.getItem("cart"));
  const $item = $(event.target).closest(".content_container");
  const id = $item.attr("id");
  if (isNaN(event.target.value) || event.target.value <= 0) {
    return;
  }
  console.log(event.target.value);
  event.value = Number(event.target.value);
  cart[id].count = parseInt(event.value);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  updateCart2();
  initCartFromStorage2();
}



function delete_price() {
  document.querySelectorAll(".basket_prod").forEach((e) => e.remove());
  init_price();
}

///////////////////////////////cart_part////////////////////////////////////////////
///////////////////////////////cart_part////////////////////////////////////////////
///////////////////////////////cart_part////////////////////////////////////////////
///////////////////////////////cart_part////////////////////////////////////////////
///////////////////////////////cart_part////////////////////////////////////////////
///////////////////////////////cart_part////////////////////////////////////////////

function updateCart2() {
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

function initCartFromStorage2() {
  document.querySelectorAll(".shopping").forEach((e) => e.remove());
  const cart = JSON.parse(localStorage.getItem("cart"));
  var total = 0;
  var i = 1;
  if (cart) {
    const $cart = $(".cart_shop_purchase");
    for (let key in cart) {
      const item = cart[key];
      const html = `<div class = "shopping" id = "${"cart_" + item.id}">
              <div class = "item_element">
              <span class = "item_name">
                ${item.name}  
              </span>
          </div>
          <input class = "item_count" type="number" min = "1"
          max = "100" value = 1 onchange = "plus_and_minus2(event)">
          <span class = "price_tag">${item.price}</span>
          <span class = "discount"> discount ${item.discount}</span>
          <div class="x-container" onclick = "removeCartItem2(event)">X</div>
          </div>`;
      i++;

      const $html = $(html);
      $html.find(".item_name").text(item.name);
      $html.find(".item_count").val(item.count);
      $html.find(".price_tag").text(item.price);
      $html.find(".discount").text(item.discount);
      $cart.append($html);
      total += item.price * item.count;
    }
    updateCart2();
  }
}

function removeCartItem2(event) {
  const $item = $(event.target).closest(".shopping");
  const id = $item.attr("id").replace("cart_", "");
  const cart = JSON.parse(localStorage.getItem("cart"));
  delete cart[id];
  $item.remove();
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart2();
  if (cart.length == 0) {
    document.getElementsByClassName("none_empty_shopping_cart")[0].style
      .height == "140px";
  }
  removeCartItem(event);
  document.querySelectorAll(".content_container").forEach((e) => e.remove());
  initCartFromStorage();
  delete_price()
}

function plus_and_minus2(event) {
  var cart = JSON.parse(localStorage.getItem("cart"));
  const $item = $(event.target).closest(".shopping");
  const id = $item.attr("id").replace("cart_", "");
  if (isNaN(event.target.value) || event.target.value <= 0) {
    return;
  }
  console.log(event.target.value);
  event.value = Number(event.target.value);
  cart[id].count = parseInt(event.value);
  updateCart2();
  localStorage.setItem("cart", JSON.stringify(cart));
  const idz = $item.attr("id");
  document.querySelectorAll(".content_container").forEach((e) => e.remove());
  initCartFromStorage();
}


$("#user_outer_layer_id").mouseover(function() { $("#overlay_id").css('visibility','visible'); });

$("#user_outer_layer_id").mouseout(function() { $("#overlay_id").css('visibility','hidden'); });

$("#overlay_id").mouseover(function() { $("#overlay_id").css('visibility','visible'); });

$("#overlay_id").mouseout(function() { $("#overlay_id").css('visibility','hidden'); });

$("#Frozen_id").mouseover(function() { $("#Frozen_dropdown_id").css('display', 'block')});