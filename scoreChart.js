function updateScoreGraph() {
    let canvas = document.getElementById("scoreChart");
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    let ctx = canvas.getContext("2d");
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    let dates = Object.keys(scoreHistory).sort();
    let scores = dates.map(date => scoreHistory[date]);

    // If there is no data, show a placeholder chart with a message
    if (dates.length === 0) {
        dates = ["No Data"];
        scores = [null]; // Empty dataset
    }

    if (window.scoreChartInstance) {
        window.scoreChartInstance.destroy();
    }

    window.scoreChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: "SAT Score Progress",
                data: scores,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: "Date" } },
                y: { 
                    title: { display: true, text: "Score" }, 
                    min: 200, 
                    max: 800
                }
            },
            plugins: {
                legend: { display: dates.length > 1 } // Hide legend if no data
            }
        }
    });
}