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
            <p> Product added to cart! </p>
          </div>

        </div>
      `;
}

export function findMenuItem(MENU, ID) {
  return MENU.find((item) => item.id == ID);
}

export function generateMyOrdersButton(isShownMyOrders) {
  if (isShownMyOrders === true) {
    return `
            <button id="client-orders" class="button"> Menu </button>
            `;
  } else {
    return `
            <button id="client-orders" class="button"> My Orders </button>
            `;
  }
}

export function generateCartButton(isShownCart, articlesQuantity) {
  if (isShownCart === true) {
    return `
            <button id="cart-button" class="button">  Menu </button>
          `;
  } else {
    return `
            <button id="cart-button" class="button">  Cart <span id="articles-quantity" >${articlesQuantity}</span></button>
           `;
  }
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
  const SHOPPING_CART_FOOTER = `<p> <b> Total: </b> <span class="blue-font-color">$${ORDER_TOTAL}</span></p>`;

  return SHOPPING_CART_HEADER + cartTable + SHOPPING_CART_FOOTER;
}

export function generateCheckout() {
  return `
          <button id="checkout" class="button"> Checkout </button> 
          <div id="alert-order" class="alert-success hide">
            <p> Order successfully sent! </p>
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
    <div><p>Cash desk status: <span class="blue-font-color"> $ ${cashDeskStatus.toFixed(
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
  <div class="business-staff-order-detail">
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

  const ALERT_ORDER = `
                <div id="receptionist-order-${order.id}-alert" class="alert-pending hide" style="margin: 0 16px;">
                  <p> Order is queued up to be prepared! </p>
                </div>`;

  const ORDER_END = `</div>`;

  return (
    ORDER_BEGIN +
    PRIORITY_ORDER +
    ORDER_DETAILS +
    cartItems +
    ORDER_END +
    ALERT_ORDER
  );
}

export function generateReceptionistOrdersFooter() {
  return `
  <div>
   <button id="proceed-orders" class="button">Proceed all orders </button>
  </div>
  
  <div id="receptionist-orders-alert" class="alert-pending hide" style="margin: 0 16px;">
    <p> Orders are queued up to be prepared! </p>
  </div>
   `;
}

export function generateChefDashboard(packagedOrders, failedOrders) {
  return `
    <div><h3>Chef</h3></div>
    <div><p> Packaged orders: <span style="color:green;"> ${packagedOrders} </span> </p> </div>
    <div><p> Failed orders: <span style="color:red;"> ${failedOrders} </span> </p> </div>
  `;
}

export function generateChefOrder(chefOrders, chefOrderPosition) {
  const BEGINNING_CHEF_ORDER_DIV = `<div class="order">`;

  let chefOrdersBrowsing = ``;

  if (chefOrderPosition == chefOrders.length - 1 && chefOrderPosition == 0) {
    chefOrdersBrowsing = `
      <div id="${chefOrderPosition}">
        <p>  Order id: <b> ${chefOrders[chefOrderPosition].id} </b> </p>
  
        <button class="button" id="current-chef-order" style="text-decoration: underline;"><b> Current</b></button>
        <button class="button" id="next-chef-order" style="background-color: rgb(106, 177, 255);" disabled>  <img src="./images/next-chef-order-disabled.png"/> </button>
        </div>
        `;
  } else if (chefOrderPosition == 0) {
    chefOrdersBrowsing = `
      <div id="${chefOrderPosition}">
        <p>  Order id: <b> ${chefOrders[chefOrderPosition].id} </b> </p>
  
        <button class="button" id="current-chef-order" style="text-decoration: underline;"><b> Current </b> </button>
        <button class="button" id="next-chef-order"><img src="./images/next-chef-order.png"/></button>
        </div>
        `;
  } else if (chefOrderPosition == chefOrders.length - 1) {
    chefOrdersBrowsing = `
      <div id="${chefOrderPosition}">
        <p>  Order id: <b> ${chefOrders[chefOrderPosition].id} </b> </p>
  
        <button class="button" id="current-chef-order">Current</button>
        <button class="button" id="next-chef-order" style="background-color: rgb(106, 177, 255);" disabled>  <img src="./images/next-chef-order-disabled.png"/> </button>
        </div>
        `;
  } else {
    chefOrdersBrowsing = `
      
      <div id="${chefOrderPosition}">
        <p>  Order id: <b> ${chefOrders[chefOrderPosition].id} </b> </p>
  
        <button class="button" id="current-chef-order">Current</button>
        <button class="button" id="next-chef-order"><img src="./images/next-chef-order.png"/></button>
        </div>
      `;
  }

  let chefOrderStatus = ``;
  let color = "";

  if (chefOrders[chefOrderPosition].status == "PREPARING") color = "orange";
  else if (chefOrders[chefOrderPosition].status == "PACKAGED") color = "green";
  else if (chefOrders[chefOrderPosition].status == "BURNED OUT") color = "red";
  else if (chefOrders[chefOrderPosition].status == "PENDING")
    color = "rgb(45, 166, 241)";

  if (chefOrders[chefOrderPosition].status == "PREPARING") {
    chefOrderStatus = ` 
    <div id="${chefOrders[chefOrderPosition].id}">
     <p style="color: ${color};"> ${chefOrders[chefOrderPosition].status} </p>
     <button class="success-button" id="package-chef-order"> Package </button>
     <button class="red-button" id="fail-chef-order"> Burned out </button>
    </div>
    `;
  } else {
    chefOrderStatus = ` 
    <div>
     <p style="color: ${color};"> ${chefOrders[chefOrderPosition].status} </p>
     
    </div>
    `;
  }

  const CHEF_ORDER_ITEMS = generateChefOrderItems(
    chefOrders[chefOrderPosition]
  );

  const ENDING_CHEF_ORDER_DIV = `</div>`;

  return (
    BEGINNING_CHEF_ORDER_DIV +
    chefOrdersBrowsing +
    chefOrderStatus +
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

export function generateDeliveryManDashboard(
  deliveredOrders,
  rejectedOrders,
  deliveryManTips,
  deliveryManIncomeStatus
) {
  return `
      <div> <h3> Delivery man </h3> </div>
      <div> <p> Successfully delivered orders: <span style="color: green;"> ${deliveredOrders} </span> </p> </div>
      <div> <p> Rejected orders: <span style="color: red;"> ${rejectedOrders} </span> </p> </div>
      <div> <p> Tips: <span class="blue-font-color"> $${deliveryManTips.toFixed(
        2
      )} </span> </p> </div>
      <div> <p> Income status: <span class="blue-font-color"> $${deliveryManIncomeStatus.toFixed(
        2
      )} </span> </p> </div>
      `;
}

export function generateDeliveryManOrder(
  deliveryManId,
  order,
  PACKAGED_OR_SELECTED_ORDERS,
  selectedOrders
) {
  let deliveringOrderClass = "";
  if (order.status == "SELECTED") {
    deliveringOrderClass = "order-selected";
  } else {
    deliveringOrderClass = "order-to-deliver";
  }

  const BEGIN_ORDER_DIV = `<div class="order ${deliveringOrderClass}" id="${order.id}">`;

  let selectedOrder = ``;

  if (PACKAGED_OR_SELECTED_ORDERS >= 3 && order.status == "PACKAGED") {
    selectedOrder = `
    <div class="delivery-men-staff-selected-orders" >
      <input
            type="checkbox"
            id="+"
            name="selected-orders"   
            value="${order.id}"           
            />
    </div>`;
  } else if (order.status == "SELECTED") {
    selectedOrder = `
    <div class="delivery-men-staff-selected-orders" >
      <input
            type="checkbox"
            id="x"
            name="selected-orders"   
            value="${order.id}"  
            checked         
            />
      </div>`;
  } else {
    selectedOrder = `<div></div>`;
  }

  const ORDER_DETAILS = `
    
      <div class="business-staff-order-detail">
        <p> <b> Order id: </b> ${order.id} </p>
        <p> <b> Order total: </b> $${order.total.toFixed(2)} </p>
        <p> <b> Client name: </b> ${order.clientName} </p>
        <p> <b> Client tel.: </b> ${order.clientPhoneNumber} </p>
        <p> <b> Client address: </b> ${order.clientLocation.streetName} </p>
        <p> <a href="${order.clientLocation.getExactAddress()}">Client location on Google Maps</a></p>
        <p> <b> Client payment method: </b> ${order.clientPaymentMethod} </p>
      </div>`;

  let color = "";

  if (order.status == "PACKAGED" || order.status == "DELIVERED") {
    color = "green";
  } else if (order.status == "SELECTED") {
    color = "#007bff";
  } else if (order.status == "ON THE WAY") {
    color = "rgb(45, 166, 241)";
  } else if (order.status == "REJECTED") {
    color = "red";
  }

  let deliveryManOrderStatus = ``;

  if (selectedOrders == 0 && order.status == "PACKAGED") {
    deliveryManOrderStatus = `
      <div>
        <p style="color: ${color};"> ${order.status} </p>
        <button class="button deliver-order"> Deliver order </button>
      </div>`;
  } else if (order.status == "ON THE WAY") {
    deliveryManOrderStatus = `
      <div id="${deliveryManId}">
        <p style="color: ${color};"> ${order.status} </p>
        <div style="margin-bottom: 12px;">
          <button class="success-button succeed-delivering-order"> Delivered </button>
        </div>
        <div>
          <button class="red-button fail-delivering-order"> Rejected </button>
        </div>
      </div>`;
  } else {
    deliveryManOrderStatus = `
      <div>
        <p style="color: ${color};"> ${order.status} </p>
      </div>`;
  }

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

  let articleNumber = 1;
  order.shoppingCart.items.forEach((item) => {
    cartItems += generateCartItem(item, articleNumber);
    articleNumber++;
  });

  cartItems += `</tbody>`;

  const DELIVERY_MAN_TIP = order.deliveryManTipTotal.toFixed(2);
  const TRANSPORT_FEE = order.shoppingCart.transportFee;

  cartItems += `<tfoot>
                  <tr>
                    <td colspan="4"> <b> Delivery man tip (7%): </b> $${DELIVERY_MAN_TIP}</td>
                    <td colspan="2"> <b> Transport fee: </b> $${TRANSPORT_FEE} </td>
                  </tr>
                </tfoot>`;

  cartItems += `</table></div>`;

  const END_ORDER_DIV = `</div>`;

  return (
    BEGIN_ORDER_DIV +
    selectedOrder +
    ORDER_DETAILS +
    deliveryManOrderStatus +
    cartItems +
    END_ORDER_DIV
  );
}

function generateCartItem(item, articleNumber) {
  return `
  <tr> 
      <td> ${articleNumber} </td>
      <td> ${item.name} </td> 
      <td> ${item.type} </td>
      <td> $${item.price.toFixed(2)} </td>
      <td class="business-staff-order-item-quantity"> ${item.quantity} </td>
      <td>$${item.total.toFixed(2)}  </td>
  </tr>`;
}

export function generateDeliveryManSelectedOrdersBtn() {
  return `
      <div>
        <button id="deliver-selected-orders" class="red-button">Deliver selected orders </button>
      </div>`;
}

export function generateDeliveryManOrdersBtn() {
  return `
      <div>
        <button id="deliver-orders" class="button">Deliver all orders </button>
      </div>`;
}
