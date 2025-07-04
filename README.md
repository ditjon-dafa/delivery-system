# Delivery-System

Delivery-System is a Front-End Web App based on Vanilla JavaScript.
The order of operations is as follows:

1. The client places an order
2. The receptionist receives the client order
3. The receptionist proceeds the order to the chef
4. The chef prepares the order
5. A delivery man gets the prepared order and delivers it to the client

## The client

The order of operations from client data registration to sending client order to the receptionist is as follows:

1. The client registers the data
2. A menu of items is displayed to the client
3. The client chooses interested item(s)
4. The item(s) can be modified (add quantity/decrease quantity/remove item) in the cart
5. Then the client sends the order to the receptionist.

The client can track the status of the order(s) placed.
The client can remove the finished order(s)(BURNED OUT, DELIVERED, REJECTED).
At the end of the session, the client can log out.

## The receptionist

1. The receptionist proceeds all orders from client(s), following a queue or proceeds a single high priority order.
2. Then what the receptionist proceeds is passed to the chef who prepares the order(s).

## The chef

The chef features:

- The chef prepares the actual order.
- The chef has the possibility to see the next order(s), if there are any.
- The chef PACKAGE or BURN OUT the actual order and the result is displayed on the chef dashboard, updating the number of PACKAGED orders or BURNED OUT orders.
- If the order is BURNED OUT, that order is reflected also as a receptionist failed order.
- If an order is PACKAGED, it is eligible to be DELIVERED to the appropriate client.

## The delivery men

There is a list of undefined delivery men.
A PACKAGED order/Some PACKAGED orders can be DELIVERED by the first READY delivery man.

If there are more than one PACKAGED order to be DELIVERED, there are two possibilities:

- All the available orders are DELIVERED
- Some SELECTED orders are DELIVERED

Once the delivery man arrives at the client location, there are two possibilities:

- The client accepts the order, and the status of the order is DELIVERED
- The client refuses the order, and the status of the order is REJECTED

If the client accepts the order from the delivery man, then the DELIVERED order is reflected on the delivery man dashboard (updating the number of successful delivered orders, delivery man tips and delivery man income status). Also, the DELIVERED order is reflected on the receptionist dashboard (updating the number of successfully processed orders and cash desk status).
If the client refuses the order from the delivery man, the REJECTED order is reflected on the delivery man dashboard (updating the number of rejected orders). Also, the REJECTED order is reflected on the receptionist dashboard (updating the number of failed orders).

## Responsive Web Design

This project does not have the Responsive Web Design feature.
