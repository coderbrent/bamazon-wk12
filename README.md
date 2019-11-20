# Bamazon - a (very) basic CLI based marketplace!


##Functionality

Upon loading, my Bamazon marketplace provides you with a pre-populated sql generated list of a stores inventory. The inventory is classified by:

- Product ID
- Department 
- Product Name 
- Pricing
- Stock Count

By using the unique product id, the user can select an item to purchase. Once the item has been selected, they are prompted to choose a quantity. Once a quantity has been selected, the software decreases the stock count (by the user selected quantity), multiplies the quantity by the products price (to determine a grand total) and presents this information via a console.log to the user. If the user requests more items than what is in inventory it will prompt the user that there is not enough stock and the connection closes out.

--- 

##Issues/Bugs:

* The SQL query for selecting a specific item based on it's ID. Forgot I needed to sanitize user input with a `connection.escape()` before passing it.
