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
    nextItem.total = nextItem.price.toFixed(2) * nextItem.quantity;

    cartTable += `<tr id="${nextItem.id}">`;
    cartTable += `
                    <td> ${articleNumber} </td>
                    <td>${nextItem.name}</td>
	                  <td> ${nextItem.type} </td>
	                  <td>$${nextItem.price.toFixed(2)}</td>
                    <td class="item-quantity">
                    <button id="-" class="decrease-quantity"> - </button>
                    ${nextItem.quantity} 
                    <button id="+" class="increase-quantity"> + </button>
                    </td>
                    <td> $${nextItem.total}</td>
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

  return SHOPPING_CART_HEADER + cartTable;
}

export function generateCheckout(shoppingCart) {
  const ORDER_TOTAL = shoppingCart.orderTotal.toFixed(2);
  return `
        <div style="margin-top: 30px" id="checkout">
           <p> <b> Total: </b> <span class="money-font-color" style="font-size:1.5em;">$${ORDER_TOTAL}</span></p>
          <button class="button"> Checkout </button>   
        </div>
      `;
}
