function updateScoreChart() {
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};

    let dates = Object.keys(scoreHistory).sort();
    let mathScores = dates.map(date => scoreHistory[date]?.math ?? NaN);
    let readingScores = dates.map(date => scoreHistory[date]?.reading ?? NaN);
    let totalScores = dates.map(date => scoreHistory[date]?.total ?? NaN);

    let ctx = document.getElementById("scoreChart").getContext("2d");

    if (window.scoreChart && typeof window.scoreChart.destroy === "function") {
        window.scoreChart.destroy();
    }

    if (dates.length === 0) {
        dates = ["No Data"];
        mathScores = [NaN];
        readingScores = [NaN];
        totalScores = [NaN];
    }

    Chart.register(ChartDataLabels);

    // **Create a fading gradient for the total score fill**
    function createFadingGradient(ctx, chartArea) {
        let { top, bottom } = chartArea;
        let height = bottom - top;
        let gradient = ctx.createLinearGradient(0, top, 0, bottom);

        gradient.addColorStop(0, "rgba(0, 0, 255, 0.8)"); // Darkest near the line
        gradient.addColorStop(0.4, "rgba(0, 0, 255, 0.5)"); 
        gradient.addColorStop(0.6, "rgba(0, 0, 255, 0.2)");
        gradient.addColorStop(0.8, "rgba(0, 0, 255, 0.05)");
        gradient.addColorStop(1.0, "rgba(0, 0, 255, 0)"); // Fully transparent at the middle

        return gradient;
    }

    window.scoreChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Total Score",
                    data: totalScores,
                    borderColor: "rgb(52, 2, 133)", // Solid blue line
                    backgroundColor: (context) => {
                        if (!context.chart.chartArea) return "rgba(0, 0, 255, 0)"; // Ensure chart area is ready
                        return createFadingGradient(ctx, context.chart.chartArea);
                    },
                    fill: true, // **Enable gradient fill under total**
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Reading & Writing",
                    data: readingScores,
                    borderColor: "rgb(102, 102, 255)", 
                    backgroundColor: "rgb(102, 102, 255)", // **Solid legend circle**
                    fill: false, // No fill for reading
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Math",
                    data: mathScores,
                    borderColor: "rgb(96, 205, 241)", 
                    backgroundColor: "rgb(173, 216, 230)", // **Solid legend circle**
                    fill: false, // No fill for math
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
                    ticks: {
                        color: "black",
                        font: { size: 14, weight: "bold" }
                    },
                    grid: {
                        drawTicks: true,
                        tickLength: 8,
                        tickWidth: 2,
                        color: "black",
                        drawOnChartArea: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: "black",
                        font: { size: 14, weight: "bold" }
                    },
                    max: 1600,
                    grid: {
                        drawTicks: true,
                        tickLength: 8,
                        tickWidth: 2,
                        color: "black",
                        drawOnChartArea: false,
                        drawBorder: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        color: "black",
                        font: { size: 14, weight: "bold" },
                        usePointStyle: true, 
                        pointStyle: "circle" // **Solid legend circles**
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

document.addEventListener("DOMContentLoaded", updateScoreChart);
