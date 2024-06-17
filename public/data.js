const koChartCanvas= document.querySelector(".ko-canvas")

fetch("http://localhost:3000/ko-stats")
.then((response)=>{
return response.json()

})
.then((koStats)=>{
    console.log(koStats)
    createChart(koStats)
});


function createChart(koStats) {
    const names = [];
    const kos = [];

    for (let i = 0; i < koStats.length; i++) {
       names.push(koStats[i].name);
       kos.push(koStats[i].ko);
    }

    new Chart(koChartCanvas, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [
                {
                    label: "Aantal ko's per zwaargewicht vechter",
                    data: kos,
                    borderWidth: 1
                },
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

