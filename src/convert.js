// var coindata = require('fs').readFileSync('chart_data.json', 'utf8');
 //const logger = require ('./logger')

const ctx = document.getElementById('myChart').getContext('2d');
// jquery library function 
$.getJSON('chart_data.json', function(data) {

   const priceData = data.map((coin)=>coin.current_price)
   const coinName = data.map((coin)=>coin.name)

const myChart = new Chart(ctx, {
    type:'bar',
    data: {
        labels: coinName ,        
        datasets: [{
            label: '# of Coin Data',
            
            data: priceData ,//[12, 19, 3, 5, 6, 3,7,9,15,10,15,17],                 
            backgroundColor: ["red", "green","blue","orange","brown","yellow","purple","black","lightpink","grey","red","black"],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
   },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
});

