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

    // If there is no data, create an empty dataset with only the axes
    if (dates.length === 0) {
        dates = [" "];  // Placeholder to show the X-axis
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
                fill: true,
                pointRadius: 0, // Hide points when no data
                borderDash: dates.length === 1 ? [5, 5] : [] // Dashed line if empty
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: "Date" },
                    grid: { display: true }
                },
                y: { 
                    title: { display: true, text: "Score" }, 
                    min: 200, 
                    max: 800,
                    grid: { display: true }
                }
            },
            plugins: {
                legend: { display: false } // Hide legend if no data
            }
        }
    });
}