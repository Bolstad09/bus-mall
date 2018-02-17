'use strict';

Item.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

Item.all = [];
Item.container = document.getElementById('container');
Item.viewed = [];
Item.voteLabels = [];

Item.products = [document.getElementById('product1'),
  document.getElementById('product2'),
  document.getElementById('product3')];

Item.totals = document.getElementById('totals');
Item.totalClicks = 0;

function Item(name) {
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  Item.all.push(this);
}
for(var i = 0; i < Item.names.length; i++) {
  new Item(Item.names[i]);
}
function makeRandom() {
  return Math.floor(Math.random() * Item.names.length);
}

function renderItems() {
  var showing = [];
  showing[0] = makeRandom();
  while (Item.viewed.indexOf(showing[0]) !== -1) {
    showing[0] = makeRandom();
  }
  showing[1] = makeRandom();
  while(showing[0] === showing[1] || Item.viewed.indexOf(showing[1]) !== -1) {
    showing[1] = makeRandom();
  }
  showing[2] = makeRandom();
  while(showing[0] === showing[2] || showing[1] === showing[2] || Item.viewed.indexOf(showing[2]) !== -1) {
    showing[2] = makeRandom();
  }

  for(var i = 0; i < 3; i++) {
    Item.products[i].src = Item.all[showing[i]].path;
    Item.products[i].id = Item.all[showing[i]].name;
    Item.all[showing[i]].views += 1;
    Item.viewed[i] = showing[i];
  }
}

function handleClick(event) {
  if(Item.totalClicks > 24) {
    Item.container.removeEventListener('click', handleClick);
    makeChart();
  }
  if (event.target.id === 'container') {
    return alert('Please make a selection');
  }
  Item.totalClicks += 1;
  for( var i = 0; i < Item.names.length; i++) {
    if(event.target.id === Item.all[i].name) {
      Item.all[i].votes += 1;
    }
  }
  renderItems();
}

// var liEl = document.createElement('li');
// liEl.textContent = ' ' + Item.all[i].name + ' has ' + Item.all[i].votes + ' votes in ' + Item.all[i].views + ' views. ';
// Item.totals.appendChild(liEl);


function makeChart() {
  var storage = JSON.stringify(Item.all);
  localStorage.setItem('items', storage);
  var ctx = document.getElementById('chart').getContext('2d');
  for(var i = 0; i < Item.names.length; i++) {
    data.push(Item.all[i].votes);
    console.log(data);
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Item.names,
        datasets: [{
          label: 'Number of Votes',
          data: data,
          backgroundColor: labelColors,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Item Types'
            }
          }],
          yAxes: [{
            ticks: {
              max: 10,
              min: 0,
              stepSize: 1,
            }
          }]
        }
      }
    });
  }
}

Item.container.addEventListener('click', handleClick);
renderItems();

var data = [];
var labelColors = ['rgba(54, 162, 235, 0.7)',
  'rgba(255, 206, 86, 0.7)',
  'rgba(75, 192, 192, 0.7)',
  'rgba(153, 102, 255, 0.7)',
  'rgba(255, 159, 64, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 206, 86, 0.7)',
  'rgba(75, 192, 192, 0.7)',
  'rgba(153, 102, 255, 0.7)',
  'rgba(255, 159, 64, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 206, 86, 0.7)',
  'rgba(75, 192, 192, 0.7)',
  'rgba(153, 102, 255, 0.7)',
  'rgba(255, 159, 64, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 206, 86, 0.7)',];
