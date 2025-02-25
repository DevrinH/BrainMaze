window.onload = function () {
    updateScoreGraph();
};

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

    // Ensure the chart is not empty by adding placeholder values
    if (dates.length === 0) {
        dates = ["Example Date"]; // Placeholder label
        scores = [400]; // Default example score to force Y-axis to render
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
                pointRadius: dates[0] === "Example Date" ? 0 : 3, // Hide points for placeholder
                borderDash: dates[0] === "Example Date" ? [5, 5] : [] // Dashed line for placeholder
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: "Date" },
                    grid: { display: true },
                    ticks: { display: true }
                },
                y: {
                    title: { display: true, text: "Score" },
                    min: 200,
                    max: 800,
                    grid: { display: true },
                    ticks: { display: true }
                }
            },
            plugins: {
                legend: { display: true },
                tooltip: { enabled: true }
            }
        }
    });
}