const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Zsw0wers!',
  database : 'bamazon_db'
});
 
connection.connect();

function productList() {
connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  console.log('Welcome to Bamazon - A digital storefront that can only be accessed through the CLI so you feel super 31337 when using it!\n');
  console.log('Here is whats for sale today...\n');
  for(i = 0; i < results.length; i ++) {
    console.log('id: ' + results[i].item_id + '\nproduct: ' + results[i].product_name + '\ndepartment: ' + results[i].department_name + '\nin stock: ' + results[i].stock_quantity + '\n---------------------\n');
  }
});

};

function intializeStore() {
productList();
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
  let chosenProductID = answer.buySelection;
  let chosenQty = answer.quantitySelection;
  switch(chosenProductID) {
    case 1:
      connection.query('SELECT * FROM products WHERE item_id = ?'), [chosenProductID],function(error, results, fields) {
        console.log(results);
        if(results[0].stock_quantity < chosenQty) {
          console.log('We are sorry - there are only ' + results[0].stock_quantity + ' of your chosen item available');
        } else {
          console.log('you purchased ' + chosenQty + ' ' + chosenProductID + 's');
        }break;
      }
  }
})
}

intializeStore();
  
  function intializeStore2() {
  productList();
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
    let chosenProduct = answer.buySelection;
    let chosenQuantity = answer.quantitySelection;
    if(chosenProduct === 1) {
      connection.query('SELECT * FROM products WHERE item_id =' + chosenProduct), function (error, results, fields) {
        console.log(results);
        console.log(fields);
      }
    }
  })
  }
  
  // intializeStore2();