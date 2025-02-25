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

    // Ensure the chart still shows X and Y axes even when empty
    if (dates.length === 0) {
        dates = ["(No Data)"]; // Placeholder label
        scores = [null]; // Forces Y-axis to render
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
                pointRadius: 3, // Show data points when available
                borderDash: scores.includes(null) ? [5, 5] : [] // Dashed line if empty
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: "Date" },
                    grid: { display: true },
                    ticks: { display: true } // Always show X-axis labels
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
                legend: { display: true }, // Keep legend for "SAT Score Progress"
                tooltip: { enabled: true } // Show tooltips on hover
            }
        }
    });
}
