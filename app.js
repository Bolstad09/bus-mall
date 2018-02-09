'use strict';
//array to store the objects
Product.allProducts = [];

//make my constructor function
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  Product.allProducts.push(this);
}

//use my constructor function to create new Goat instances
new Product('bag','img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'water-can.jpg');
new Product('wine-glass', 'wine-glass.jpg');


//listener, something to be clicked...events!!!
var imgEl = document.getElementById('product-pic');


imgEl.addEventListener('click', randomProduct);

//randomly display one of the pictures
function randomProduct() {
  var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
  imgEl.src = Product.allProducts[randomIndex].filepath;
}
randomProduct();

// var imgEl = document.getElementById('product-pic1');
// imgEl.addEventListener('click', randomProduct);
// function randomProduct() {
//   var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
//   imgEl.src = Product.allProducts[randomIndex].filepath;
// }
// randomProduct();

// var imgEl = document.getElementById('product-pic2');
// imgEl.addEventListener('click', randomProduct);
// function randomProduct() {
//   var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
//   imgEl.src = Product.allProducts[randomIndex].filepath;
// }
// randomProduct();