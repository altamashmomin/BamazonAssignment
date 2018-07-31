var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "virtue247297E3",
    database:"bamazondb",
    port: 3306
});

connection.connect(function(err){
    if (err) throw err;
    products();
});


function order(inventory) {
    inquirer.prompt([
        {
        type: "input",
        name: "choice",
        message: "Select the item you wish to purchase by the id number. Press 'q' to exit.",
        validate: function(value) {
            return !isNaN(value) || value.toLowerCase () === "q";
        }
    }])
    .then(function(value){
        userResponse(value.choice);
        let id = parseInt(value.choice);
        let product = itemQuantity(id, inventory);

        if (product){
            customerQuantity(product);            
        }
        else {
            console.log("Sorry, this item isn't in stock");
            products();
        }
    });
}


function products() {
    connection.query("SELECT * FROM products",
    function(err, res){
        if (err) throw err;
        console.log(res);
        order(res);
    })
};

function customerQuantity(product) {
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How much would you like to buy of this item?",
            validate: function(value) {
                return value > 0 || value.toLowerCase() === "q";
            }
        }
    ])
    .then(function(value) {
        userResponse(value.quantity);
        var quantity = parseInt(value.quantity);

        if (quantity > product.stock_quantity) {
            console.log("Not enough of the item available, consider purchasing less than " + product.stock_quantity);
            products();
        } else {
            placeOrder(product, quantity);
        }
    });
}

function placeOrder(product, quantity) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity, product.item_id],
    function(err, res){
        console.log("Purchased item of quantity: " + quantity + " " + product.product_name);
        products();
    });
}

function itemQuantity(id, inventory) {
    for (var i = 0; i , inventory.length; i++){
        if (inventory[i].item_id === id) {
            return inventory[i];
        }
    }
    return null;
}

function userResponse(choice) {
    if (choice.toLowerCase() === "q") {
        console.log("Thank you, have a nice day");
        process.end(0);
    }
}