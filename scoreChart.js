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

    function createFadingGradient(color) {
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color.replace("1)", "0.5)")); 
        gradient.addColorStop(0.6, color.replace("1)", "0.15)")); 
        gradient.addColorStop(1, color.replace("1)", "0)")); 
        return gradient;
    }

    let totalGradient = createFadingGradient("rgba(0, 0, 255, 1)"); // A-Team (Dark Blue)
    let readingGradient = createFadingGradient("rgba(102, 102, 255, 1)"); // Ghostbusters (Medium Blue)
    let mathGradient = createFadingGradient("rgba(173, 216, 230, 1)"); // Little Rascals (Light Blue)

    window.scoreChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Total Score",
                    data: totalScores,
                    borderColor: "rgb(0, 0, 255)", 
                    backgroundColor: totalGradient,
                    fill: true,
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Reading & Writing",
                    data: readingScores,
                    borderColor: "rgb(102, 102, 255)", 
                    backgroundColor: readingGradient,
                    fill: true,
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Math",
                    data: mathScores,
                    borderColor: "rgb(173, 216, 230)", 
                    backgroundColor: mathGradient,
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

document.addEventListener("DOMContentLoaded", updateScoreChart);