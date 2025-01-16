export function generateMenuHeader() {
  return `
            <div>
              <h1>Menu</h1>
            </div>
          `;
}

export function generateMenuItem(item) {
  return `
        <div class="menu-item" id="${item.id}">
          <h2>${item.name}</h2>
          <p>Type: ${item.type}</p>
          <p>Price: $${item.price.toFixed(2)}</p>
          <button class="button order-now"> Order Now </button>
  
        </div>
      `;
}
