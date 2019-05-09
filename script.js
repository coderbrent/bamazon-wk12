const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '*********',
  database : 'bamazon_db'
});
 
connection.connect();

function productList() {
connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  for(i = 0; i < results.length; i ++) {
    console.log('id: ' + results[i].item_id + '\nproduct: ' + results[i].product_name + '\ndepartment: ' + results[i].department_name + '\nin stock: ' + results[i].stock_quantity + '\n---------------------\n');
  }
  console.log('Welcome to Bamazon - A digital storefront that for some reason can only be accessed via your CLI!\n');
  initializeStore();
});

};

function initializeStore() {
inquirer.prompt([
  {
    name: 'buySelection',
    type: 'input',
    message: 'Using the product sheet, choose an item to purchase by selecting its unique ID number'
  },
  {
    name: 'quantitySelection',
    type: 'input',
    message: 'Great choice! How many of them would you like?'
  }
]).then(function(answer) {
  let chosenProductID = parseInt(answer.buySelection);
  let chosenQty = parseInt(answer.quantitySelection);
  let sqlSel = 'SELECT * FROM products WHERE item_id = ' + connection.escape(chosenProductID);
  switch(chosenProductID) {
    case chosenProductID:
      connection.query(sqlSel, function(error, results, fields) {
        if(error) throw error;
        let productCost = parseFloat(chosenQty * results[0].price);
        console.log(results);
        if(results[0].stock_quantity < chosenQty) {
          console.log('We are sorry - there are only ' + results[0].stock_quantity + ' of your chosen item available');
          connection.end();
        } else {
          console.log('You purchased ' + chosenQty + ' ' + results[0].product_name + 's');
          console.log('The total cost of your purchase is $' + productCost + ' USD!');
          let newQty = results[0].stock_quantity - chosenQty;
          let sqlUpd = 'UPDATE products SET stock_quantity = ' + newQty + ' WHERE item_id = ' + connection.escape(chosenProductID);
          connection.query(sqlUpd, function(error, results, fields) { //this line updates the product quantity
            if(error) throw error;
          })
          inquirer.prompt([
            {
              name: 'postPurchase',
              type: 'list',
              message: 'Would you like to make another purchase?',
              choices: ['yes', 'no']
            }
          ]).then(function(answer) {
            if(answer.postPurchase === 'yes') {
              initializeStore();
            } else {
              console.log('Thank you for shopping at Bamazon!');
              connection.end();
            }
          })
        }
      })
    }
  })
}

productList();

