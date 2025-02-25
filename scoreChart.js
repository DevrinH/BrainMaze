// Function to update the score graph
function updateScoreGraph() {
    let ctx = document.getElementById("scoreChart").getContext("2d");

    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    
    let dates = Object.keys(scoreHistory).sort(); // Get all dates sorted
    let scores = dates.map(date => scoreHistory[date]); // Get scores in order

    // Destroy existing chart instance if it exists
    if (window.scoreChartInstance) {
        window.scoreChartInstance.destroy();
    }

    // Create new chart
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
                y: { title: { display: true, text: "Score" }, beginAtZero: false, min: 200, max: 800 }
            }
        }
    });
}

// Call this when the page loads to show existing data
updateScoreGraph();
