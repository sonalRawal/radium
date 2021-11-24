# radium
Repository for backend cohort - Radium
TOPIC: Middleware2

- For this assignment you have to create a new branch - assignment/middleware2
- Your user document should look like this
 	{ 
_id: ObjectId("61951bfa4d9fe0d34da86829"),
name: "Sabiha Khan",
	balance:100, // Default balance at user registration is 100
	address:"New delhi",
	age: 90,
 	gender: “female” // Allowed values are - “male”, “female”, “other”
	freeAppUser: false // Default false value
	}
- Your product document should look like this
{
	_id: ObjectId("61951bfa4d9fe0d34da86344"),
	name:"Catcher in the Rye",
	category:"book",
	price:70 //mandatory property
}
Your Order document looks like this.
{
	_id: ObjectId("61951bfa4d9fe0d34da86344"),
userId: “61951bfa4d9fe0d34da86829”,
productId: “61951bfa4d9fe0d34da86344”
amount: 0,
isFreeAppUser: true, 
date: “22/11/2021”
}

NOTE: In some of the below apis a header validation is to be performed (create user and create order). The name of the header is ‘isFreeApp’. Write a header validation that simply checks whether this header is present or not. Please note this validation should only be called in create user and create order apis.
1. Write a POST api to create a product from the product details in request body.
2.  Write a POST api to create a user that takes user details from the request body. If the header isFreeApp is not present terminate the request response cycle with an error message that the request is missing a mandatory header
3. Write a POST api for order purchase that takes a userId and a productId in request body. 
4. Update the logic in middleware to set the isFreeAppUser attribute in req. Use this attribute in the route handler for populating the isFreeAppUser attributes of User and Order collection.
If the header isFreeApp is not present terminate the request response cycle with an error message that the request is missing a mandatory header
If the header is present the control goes to the request handler. Perform the user and product validation. Check if the user exists as well as whether the product exists. Return an error with a suitable error message if either of these validations fail
For every purchase we save an order document in the orders collection. If the isFreeApp header is true then the balance of the user is not deducted and the amount in order is set to 0 as well the flag isFreeAppUser is set to true. If this header has a false value then the product’s price is checked. This value is deducted from the user’s balance and the order amount is set to the product’s price as well as the flag isFreeAppUser is set to false in order document.
