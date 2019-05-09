# Bamazon - a (very) basic CLI based marketplace!
wk 12 hw assignment - bamazon
Approximate Time To Develop (thus far): 9.5 hours


##Overview 

I followed the assignment's instructions which were to create an Amazon-like storefront in the CLI using
Inquirer for input prompts from the user and the MySQL npm package to interface with Node for the stores inventory management.

###Functionality

Upon loading, my Bamazon marketplace provides you with a pre-populated sql generated list of a stores inventory. The inventory is classified by:

- Product ID
- Department 
- Product Name 
- Pricing
- Stock Count

By using the unique product id, the user can select an item to purchase. Once the item has been selected, they are prompted to choose a quantity. Once a quantity has been selected, the software decreases the stock count (by the user selected quantity), multiplies the quantity by the products price (to determine a grand total) and presents this information via a console.log to the user. If the user requests more items than what is in inventory it will prompt the user that there is not enough stock and the connection closes out.

--- 

###Issues/Bugs:

* The first (and only) issue I came across was the SQL query for selecting a specific item based on it's ID. What appeared to be totally correct SQL code was yielding syntax errors. Ultimately, reading the mySQL npm documentation, I was able to discover that the reason I could not easily pass user input (via inquirer) through to my connection.query function argument was due to a security measure built into the module. Therefore, I needed to use a `connection.escape()` function on the input first before passing it to manipulate the DB.

The reason this took so much time to solve was because I googled the issue before FIRST thoroughly reading the docs. In the future, I will always spend more time referring to documentation vs combing through stackoverflow.

Time spent solving: approximately 6 hours
Answer resource: npm mySQL documentation

Interestingly enough that was the only real time consuming issue I came across during development of the storefront aspect of the project.
