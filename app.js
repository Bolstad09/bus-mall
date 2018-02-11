'use strict';
//array to store the objects
var divEl = document.getElementById('imgs');
var prodEl1 = document.getElementById('product1');
var prodEl2 = document.getElementById('product2');
var prodEl3 = document.getElementById('product3');
var products = [];
var productsName = [];
var votes = [];
var randomNums = [];
var numOfClicks = 0;

if (localStorage.getItem('products')) {
    retrieveLs();
    console.log('it exists');
} else {
console.log('it doesn\'t exists!');
new Product('bag','img/bag.jpg'),
new Product('banana', 'img/banana.jpg'),
new Product('bathroom', 'img/bathroom.jpg'),
new Product('boots', 'img/boots.jpg'),
new Product('breakfast', 'img/breakfast.jpg'),
new Product('bubblegum', 'img/bubblegum.jpg'),
new Product('chair', 'img/chair.jpg'),
new Product('cthulhu', 'img/cthulhu.jpg'),
new Product('dog-duck', 'img/dog-duck.jpg'),
new Product('dragon', 'img/dragon.jpg'),
new Product('pen', 'img/pen.jpg'),
new Product('pet-sweep', 'img/pet-sweep.jpg'),
new Product('tauntaun', 'img/tauntaun.jpg'),
new Product('unicorn', 'img/unicorn.jpg'),
new Product('usb', 'img/usb.gif'),
new Product('water-can', 'water-can.jpg'),
new Product('wine-glass', 'wine-glass.jpg'),
}
function makeLs(){
  localStorage.setItem('products', JSON.stringify(products));
  console.log('makeList');
}
function retrieveLs(){
  var parsedData = JSON.parse(localStorage.getItem('products'));
  console.log('retrieveLs');
  for (var i = 0; i < parsedData.length; i++) {
    var currentProduct = parsedData[i];
    new Product(currentProduct.name, currentProduct.path, currentProduct.numTimeShown, currentProduct.numTimeClick);
  }
}
var list = document.getElementById('draw-list');
list.style.display = 'none';

function Product(name, path, numTimeShown, numTimeClick) {
  this.name = name;
  this.path = path;
  this.numTimeShown = numTimeShown || 0;
  this.numTimeClick = numTimeClick || 0;
  products.push(this);
}

function randomNum() {
  return Math.floor(Math.random() * (19 + 1));
}

function render() {
  imgEl1.setAttribute('src', products[randomNums[0]].path);
  imgEl2.setAttribute('src', products[randomNums[1]].path);
  imgEl3.setAttribute('src', products[randomNums[2]].path);
}

function noDup() {
  console.log(randomNums, 'beggining of no dup');
  randomNums.push(randomNum());

  while(randomNums[0] === oldImgNum[0] || randomNums[0] === oldImgNum[1] || randomNums[0] === oldImgNum[2]) {
    console.log(randomNums, 'Duplicate with first num, fixed');
    randomNums[0] = randomNum();
  }

  randomNums.push(randomNum());

  while (randomNums[1] === randomNums[0] || randomNums[1] === oldImgNum[0] || randomNums[1] === oldImgNum[1] || randomNums[1] === oldImgNum[2]) {
    console.log(randomNums, 'Duplicate with second number, fixed');
    randomNums[1] = randomNum();
  }
  randomNums.push(randomNum());

  while (randomNums[2] === randomNums[0] || randomNums[2] === randomNums[1] || randomNums[2] === oldImgNum[0] || randomNums[2] === oldImgNum[1] || randomNums[2] === oldImgNum[2]) {
    console.log(randomNums, 'Duplicate with third number, fixed');
    randomNums[2] = randomNum();
  }

  console.log(randomNums, 'end of no dup');
}
function checkImg() {
  ++numOfClicks;
  console.log(event.srcElement.attributes[1].nodeValue);
  var hit = event.srcElement.attributes[1].nodeValue;
  for (var i = 0; i < products.length; i++) {
    if (products[i].path === hit) {
      products[i].numTimeClick++;
    }
  }
  var clickedItem = event.target.id;
  console.log('Clicked on ' + clickedItem);
  oldImgNum = randomNums;
  for (var j = 0; j < randomNums.length; j++) {
    var objNum = randomNums[j];
    products[objNum].numTimeShown++;
  }
  randomNums = [];
  noDup();
  render();

  function displayList() {
    var ulEl = document.createElement('ul');
    for (var i = 0; i < products.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = products[i].numTimeClick + ' votes for the ' + products[i].name + '. Shown: ' + products[i].numTimeShown + ' times';
      ulEl.appendChild(liEl);
    }
    document.body.appendChild(ulEl);
  }
  
  var oldImgNum = [];
  noDup();
  render();
  
  function updateChartArrays() {
    for (var i = 0; i < products.length; i++) {
      productsName[i] = products[i].name;
      votes[i] = products[i].numTimeClick;
    }
  }
  
  function clickHandler(event) {
    console.log('called event');
    if (event.target !== event.currentTarget) {
      if (numOfClicks === 25) {
        console.log('25 clicks');
        numOfClicks = 0;
        updateChartArrays();
        divEl.removeEventListener('click', clickHandler);
        list.style.display = 'block';
        makeLs();
      } else {
        checkImg();
      }
    } else {
      console.log('Clicked On Div');
    }
    event.stopPropagation();
  }