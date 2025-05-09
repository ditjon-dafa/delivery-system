# Delivery-System

Delivery-System is a Front-End Web Development project based on Vanilla JavaScript.
The order of operations is as follows:

1. The client place an order
2. The receptionist receive the client order
3. The receptionist proceed the order to the chef
4. The chef prepare the order
5. A delivery man get the prepared order and deliver it to the client

## The client

The order of operations from client data registration to sending client order to the receptionist is as follows:

1. The client register the data
2. A menu of items is displayed to the client
3. The client chooses interested item(s)
4. The item(s) can be modified (add quantity/decrease quantity/remove item) in the cart
5. Then the client send the order to the receptionist.

The client can track the status of the order(s) placed.
The client can remove the finished order(s)(BURNED OUT, DELIVERED, REJECTED).
At the end of the session, the client can log out.

## The receptionist

1. The receptionist proceed all orders from client(s), following a queue or proceed a single high priority order.
2. Then what the receptionist proceed is passed to the chef who prepare the order(s).

## The chef

The chef features:

- The chef prepare the actual order.
- The chef has the possiblility to see the next order(s), if there are any.
- The chef PACKAGE or BURN OUT the actual order and the result is displayed on the chef dashboard, updating the number of PACKAGED orders or BURNED OUT orders.
- If the order is BURNED OUT, that order is reflected also as a receptionist failed order.
- If an order is PACKAGED, it is eligible to be DELIVERED to the appropriate client.

## The delivery men

There is a list of undefined delivery men.
A PACKAGED order/Some PACKAGED orders can be DELIVERED by the first READY delivery man.

If there is more than one PACKAGED order to be DELIVERED, there are two possiblilities:

- All the available orders are DELIVERED
- Some SELECTED orders are DELIVERED

Once the delivery man arrive at the client location, there are two possibilities:

- The client accept the order, and the status of the order is DELIVERED
- The client refuse the order, and the status of the order is REJECTED

If the client accepts the order from the delivery man, then the DELIVERED order is reflected on the delivery man dashboard (updating the number of successful delivered orders, delivery man tips and delivery man income status). Also, the DELIVERED order is reflected on the receptionist dashboard (updating the number of successfully processed orders and cash desk status).
If the client refuse the order from the delivery man, the REJECTED order is reflected on the delivery man dashboard (updating the number of rejected orders). Also, the REJECTED order is reflected on the receptionist dashboard (updating the number of failed orders).

## Responsive Web Design

This project does not have the Responsive Web Design feature.
