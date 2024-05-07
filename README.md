Hi, everyone!
Here we have a restaurant ordering website that works with react and node-js
On the website we need registration and login in order to make purchases from the restaurant.
After selecting the products, we will go to the order section and there we will receive a list of all the products we have selected, in addition we will be shown the quantities of each product, its price per unit and the total price of that product and also the total price of the entire order.
After that we will go to the page of the buyer's details where we will have to enter all the required details and then we will go to the summary of the order.
After the order summary we will be connected to a billing page that works with the Strip library
And then we will complete the purchase after which the buyer will be able to track the status of the order.
In addition, I created an admin page that can control the status of the orders and the list of products.

If you want the code to work, you must create an .env file on the server side and it must contain the following fields:

JWT_SECRET - it will contain the password for encrypting the users' passwords during registration.

SRTIP_SECRET_KEY- In order to use Stripe's library for billing, you must go to the website https://stripe.com/ register and create a key which you need to enter here.

STRING_DB - the identifier of your database must be entered and it only works with mongoDB
