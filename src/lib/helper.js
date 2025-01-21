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
    <table>
      <tr> 
          <th> No. </th>
          <th> Name </th> 
          <th>Type</th>
          <th> Price per unit </th>
          <th> Quantity </th>
          <th> Price </th>
      </tr>
    `;

  const CART_ITEMS = shoppingCart.items;
  let articleNumber = 1;

  CART_ITEMS.forEach((nextItem) => {
    nextItem.total = nextItem.price.toFixed(2) * nextItem.quantity;

    cartTable += `<tr id="${nextItem.id}">`;
    cartTable += `
                    <td> ${articleNumber} </td>
                    <td>${nextItem.name}</td>
	                  <td> ${nextItem.type} </td>
	                  <td>$${nextItem.price.toFixed(2)}</td>
                    <td> ${nextItem.quantity} </td>
                    <td> $${nextItem.total}</td>
                  </tr>`;
    articleNumber++;
  });

  cartTable += `</table>`;

  const DELIVERY_MAN_TIP = shoppingCart.deliveryManTipTotal.toFixed(2);
  const TRANSPORT_FEE = shoppingCart.transportFee;
  const ORDER_TOTAL = shoppingCart.orderTotal.toFixed(2);

  const SHOPPING_CART_FOOTER = `<p><b> Delivery man tip (7%): </b> $${DELIVERY_MAN_TIP} </p>
                                <p><b> Transport fee: </b> $${TRANSPORT_FEE}</p>
                                <p><b> Order total: </b> $${ORDER_TOTAL} </p>`;

  return SHOPPING_CART_HEADER + cartTable + SHOPPING_CART_FOOTER;
}
