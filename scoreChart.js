function updateScoreChart() {
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};

    let dates = Object.keys(scoreHistory).sort();
    let mathScores = dates.map(date => scoreHistory[date]?.math ?? NaN);
    let readingScores = dates.map(date => scoreHistory[date]?.reading ?? NaN);
    let totalScores = dates.map(date => scoreHistory[date]?.total ?? NaN);

    let ctx = document.getElementById("scoreChart").getContext("2d");

    // ✅ Destroy previous chart if it exists
    if (window.scoreChart && typeof window.scoreChart.destroy === "function") {
        window.scoreChart.destroy();
    }

    // ✅ Handle case with no data
    if (dates.length === 0) {
        dates = ["No Data"];
        mathScores = [NaN];
        readingScores = [NaN];
        totalScores = [NaN];
    }

    // ✅ Ensure Chart.js DataLabels is registered
    Chart.register(ChartDataLabels);

    // ✅ Create smooth fading gradient fill
    function createFadingGradient(color) {
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color.replace("1)", "0.5)")); // Darker near line
        gradient.addColorStop(0.6, color.replace("1)", "0.15)")); // Medium fade
        gradient.addColorStop(1, color.replace("1)", "0)")); // Fully transparent at bottom
        return gradient;
    }

    let mathGradient = createFadingGradient("rgba(0, 0, 255, 1)"); // Blue
    let readingGradient = createFadingGradient("rgba(0, 255, 0, 1)"); // Green
    let totalGradient = createFadingGradient("rgba(255, 0, 0, 1)"); // Red

    window.scoreChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Math",
                    data: mathScores,
                    borderColor: "blue",
                    backgroundColor: mathGradient,
                    fill: true,
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Reading & Writing",
                    data: readingScores,
                    borderColor: "green",
                    backgroundColor: readingGradient,
                    fill: true,
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Total",
                    data: totalScores,
                    borderColor: "red",
                    backgroundColor: totalGradient,
                    fill: true,
                    borderWidth: 2.5,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Date",
                        color: "black",
                        font: { size: 16, weight: "bold" }
                    },
                    ticks: {
                        color: "black",
                        font: { size: 14, weight: "bold" }
                    },
                    grid: {
                        drawTicks: true, // ✅ Show tick marks (small lines)
                        tickLength: 6, // ✅ Tick length (adjust size)
                        color: "black", // ✅ Tick color
                        display: false // Hide full grid lines
                    },
                    border: { display: false } // ✅ Remove x-axis line
                },
                y: {
                    title: {
                        display: true,
                        text: "SAT Score",
                        color: "black",
                        font: { size: 16, weight: "bold" }
                    },
                    ticks: {
                        color: "black",
                        font: { size: 14, weight: "bold" }
                    },
                    max: 1600,
                    grid: {
                        drawTicks: true, // ✅ Show tick marks (small lines)
                        tickLength: 6, // ✅ Tick length (adjust size)
                        color: "black", // ✅ Tick color
                        display: false // Hide full grid lines
                    },
                    border: { display: false } // ✅ Remove y-axis line
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        color: "black",
                        font: { size: 14, weight: "bold" }
                    }
                },
                datalabels: {
                    align: "top",
                    anchor: "end",
                    color: "black",
                    font: { size: 12, weight: "bold" },
                    formatter: (value) => (isNaN(value) ? "" : value)
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

// ✅ Ensure script runs after page loads
document.addEventListener("DOMContentLoaded", updateScoreChart);