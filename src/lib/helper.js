export function generateMenuHeader() {
  return `
            <div>
              <h1>Menu</h1>
            </div>
          `;
}

export function generateMenuItem(item) {
  return `
        <div id="${item.id}" class="menu-item">
          <h2>${item.name}</h2>
          <p>Type: ${item.type}</p>
          <p>Price: $${item.price.toFixed(2)}</p>
          <button class="button order-now"> Order Now </button>
          
        <div id="alert-${item.id}" class="alert-success hide">
          Product added to cart!
        </div>

        </div>
      `;
}

export function findMenuItem(MENU, ID) {
  return MENU.find((item) => item.id == ID);
}

export function generateCartButton(isShownCart, articlesQuantity) {
  if (isShownCart === false)
    return `
  <button id="cart-button" class="button">  Cart <span id="articles-quantity" >${articlesQuantity}</span></button>
  `;
  else
    return `
  <button id="cart-button" class="button">  Menu </button>
  `;
}

export function generateShoppingCart(shoppingCart) {
  const SHOPPING_CART_HEADER = `<h3> Shopping cart </h3>`;
  let cartTable = `
    <div class="vertically-directed-center-aligned-content">
    <table>
      <thead>
        <tr> 
            <th> No. </th>
            <th> Name </th> 
            <th>Type</th>
            <th> Unit price </th>
            <th> Quantity </th>
            <th> Total price </th>
            <th></th>
        </tr>
      </thead>
    `;

  const CART_ITEMS = shoppingCart.items;
  let articleNumber = 1;
  cartTable += `<tbody>`;
  CART_ITEMS.forEach((nextItem) => {
    cartTable += `<tr id="${nextItem.id}">`;
    cartTable += `
                    <td> ${articleNumber} </td>
                    <td>${nextItem.name}</td>
	                  <td> ${nextItem.type} </td>
	                  <td>$${nextItem.price.toFixed(2)}</td>
                    <td class="cart-item-quantity">
                    <button id="-" class="decrease-quantity"> - </button>
                    ${nextItem.quantity} 
                    <button id="+" class="increase-quantity"> + </button>
                    </td>
                    <td> $${nextItem.total.toFixed(2)}</td>
                    <td><button id="x" class="remove-item">x</button></td>
                  </tr>`;
    articleNumber++;
  });
  cartTable += `</tbody>`;
  const DELIVERY_MAN_TIP = shoppingCart.deliveryManTipTotal.toFixed(2);
  const TRANSPORT_FEE = shoppingCart.transportFee;
  cartTable += `<tfoot>
                    <tr>
                      <td colspan="4"><b> Delivery man tip (7%): </b> $${DELIVERY_MAN_TIP}</td>
                       <td colspan="3"><b> Transport fee: </b> $${TRANSPORT_FEE}</td>
                    </tr>
                </tfoot>`;
  cartTable += `</table></div>`;

  const ORDER_TOTAL = shoppingCart.orderTotal.toFixed(2);
  const SHOPPING_CART_FOOTER = `<p> <b> Total: </b> <span class="money-font-color">$${ORDER_TOTAL}</span></p>`;

  return SHOPPING_CART_HEADER + cartTable + SHOPPING_CART_FOOTER;
}

export function generateCheckout() {
  return `
          <button id="checkout" class="button"> Checkout </button> 
          <div id="alert-order" class="alert-success hide">
            Order successfully sent!
          </div>  
      `;
}

export function generateReceptionistDashboard(
  successfulOrders,
  failedOrders,
  cashDeskStatus
) {
  return `
    <div><h3>Receptionist</h3></div>
    <div><p>Successfully processed orders: <span style="color: green;"> ${successfulOrders} </span> </p></div>
    <div> <p>Failed  orders: <span style="color: red;" > ${failedOrders} </span> </p></div>
    <div><p>Cash desk status: <span class="money-font-color"> $ ${cashDeskStatus.toFixed(
      2
    )} </span> </p></div>`;
}

export function generateReceptionistOrder(order) {
  const ORDER_BEGIN = `<div id="${order.id}" class="order">`;

  const PRIORITY_ORDER = `
  <div>
    <button class="button high-priority-order" style="background-color:red;"> Proceed now </button>
  </div>
  `;

  const ORDER_DETAILS = `
  <div class="receptionist-order-detail">
    <p>  <b> Order id: </b> ${order.id} </p>
    <p>  <b> Order total:</b> $${order.total.toFixed(2)} </p>
    <p>  <b> Client name:</b> ${order.clientName} </p>
    <p>  <b> Client tel.:</b>   ${order.clientPhoneNumber} </p>
  </div>
  `;

  let cartItems = `
  <div>
  <table>
		<thead>
        <tr> 
            <th> No. </th>
            <th> Name </th> 
            <th>Type</th>
            <th> Unit price </th>
            <th> Quantity </th>
            <th> Total price </th>
        </tr>
      </thead>`;
  cartItems += `<tbody>`;
  let count = 1;
  order.shoppingCart.items.forEach((item) => {
    cartItems += generateCartItem(item, count);
    count++;
  });

  cartItems += `</tbody>`;
  const DELIVERY_MAN_TIP = order.shoppingCart.deliveryManTipTotal.toFixed(2);
  const TRANSPORT_FEE = order.shoppingCart.transportFee;
  cartItems += `<tfoot>
                  <tr>
                    <td colspan="4"> <b> Delivery man tip (7%): </b> $${DELIVERY_MAN_TIP} </td>
                    <td colspan= "2"> <b> Transport fee: </b> $${TRANSPORT_FEE}</td>
                </tfoot> `;
  cartItems += `</table></div>`;

  const ORDER_END = `</div>`;

  return ORDER_BEGIN + PRIORITY_ORDER + ORDER_DETAILS + cartItems + ORDER_END;
}

export function generateReceptionistOrdersFooter() {
  return `
  <div>
   <button id="proceed-orders" class="button">Proceed all orders </button>
   </div>
   `;
}

export function generateChefOrder(chefOrders, currentChefOrder) {
  const BEGINNING_CHEF_ORDER_DIV = `<div class="order">`;

  const CHEF_ORDERS_BROWSING = `
    <div>
       <p>  Order id: <b> ${chefOrders[currentChefOrder].id} </b> </p>
        <button class="button"style="text-decoration: underline;"><b> Current</b></button>
    </div>       
    `;

  const CHEF_ORDER_STATUS = ` 
    <div>
     <p style="color: orange;"> ${chefOrders[currentChefOrder].status} </p>
     <button class="button" style="background-color: green;"> Package </button>
     <button class="button" style="background-color: red;"> Burned out </button>
    </div>
    `;

  const CHEF_ORDER_ITEMS = generateChefOrderItems(chefOrders[currentChefOrder]);

  const ENDING_CHEF_ORDER_DIV = `</div>`;

  return (
    BEGINNING_CHEF_ORDER_DIV +
    CHEF_ORDERS_BROWSING +
    CHEF_ORDER_STATUS +
    CHEF_ORDER_ITEMS +
    ENDING_CHEF_ORDER_DIV
  );
}

function generateChefOrderItems(order) {
  const BEGIN_CHEF_ORDER_ITEMS = `<div>`;
  let orderItems = `
    <table>
		  <thead>
          <tr> 
            <th> No. </th>
            <th> Name </th> 
            <th>Type</th>
            <th> Quantity </th>
          </tr>
      </thead>
      `;

  orderItems += `<tbody class="chef-order-tbody">`;

  let articleNumber = 1;
  order.shoppingCart.items.forEach((item) => {
    orderItems += generateChefOrderItem(item, articleNumber);
    articleNumber++;
  });

  orderItems += `</tbody> </table>`;

  const END_CHEF_ORDER_ITEMS = `</div>`;

  return BEGIN_CHEF_ORDER_ITEMS + orderItems + END_CHEF_ORDER_ITEMS;
}

function generateChefOrderItem(item, articleNumber) {
  return `<tr>
            <td> ${articleNumber} </td>
            <td> ${item.name} </td>
            <td> ${item.type} </td>
            <td class="business-staff-order-item-quantity"> ${item.quantity} </td>
          </tr>`;
}

function generateCartItem(item, count) {
  return `
  <tr> 
      <td> ${count} </td>
      <td> ${item.name} </td> 
      <td> ${item.type} </td>
      <td> $${item.price.toFixed(2)} </td>
      <td class="business-staff-order-item-quantity"> ${item.quantity} </td>
      <td>$${item.total.toFixed(2)}  </td>
  </tr>`;
}
