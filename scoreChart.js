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

    // ✅ Create gradient fill for a softer look
    function createGradient(color1, color2) {
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    }

    let mathGradient = createGradient("rgba(0, 0, 255, 0.4)", "rgba(0, 0, 255, 0.1)");
    let readingGradient = createGradient("rgba(0, 255, 0, 0.4)", "rgba(0, 255, 0, 0.1)");
    let totalGradient = createGradient("rgba(255, 0, 0, 0.4)", "rgba(255, 0, 0, 0.1)");

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
                    fill: true, // ✅ Allows soft shading effect
                    borderWidth: 2.5, // ✅ Thicker lines
                    tension: 0.4 // ✅ Smooth curves
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
                    grid: { display: false },
                    border: { color: "black", width: 2 }
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
                    grid: { display: false },
                    border: { color: "black", width: 2 }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: "bottom", // ✅ Moves legend below chart
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