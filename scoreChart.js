function updateScoreChart() {
    // ... (previous code for reading scoreHistory, sorting dates, etc., remains unchanged)

    let ctx = document.getElementById("scoreChart").getContext("2d");

    if (window.scoreChart && typeof window.scoreChart.destroy === "function") {
        window.scoreChart.destroy();
    }

    if (dates.length === 0) {
        dates = ["No Data"];
        selectedMathScores = [NaN];
        selectedReadingScores = [NaN];
        selectedTotalScores = [NaN];
    }

    Chart.register(ChartDataLabels);

    function createFadingGradient(ctx) {
        let gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.clientHeight);
        gradient.addColorStop(0, "rgba(0, 0, 255, 0.8)");
        gradient.addColorStop(0.4, "rgba(0, 0, 255, 0.5)");
        gradient.addColorStop(0.8, "rgba(0, 0, 255, 0)");
        return gradient;
    }

    let totalGradient = createFadingGradient(ctx);

    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const textColor = currentTheme === "dark" ? "white" : "black";

    window.scoreChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Total Score",
                    data: selectedTotalScores,
                    borderColor: "rgb(89, 0, 255)",
                    backgroundColor: totalGradient,
                    fill: true,
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Reading & Writing",
                    data: selectedReadingScores,
                    borderColor: "rgb(205, 120, 255)",
                    backgroundColor: "rgb(205, 120, 255)",
                    fill: false,
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Math",
                    data: selectedMathScores,
                    borderColor: "rgb(0, 222, 230)",
                    backgroundColor: "rgb(0, 222, 230)",
                    fill: false,
                    borderWidth: 2.5,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 40,
                    right: 40,
                    top: 40, // Increased top padding to accommodate data labels
                    bottom: 20
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor,
                        font: { size: 14, weight: "bold" },
                        maxRotation: 45,
                        minRotation: 30,
                        autoSkip: true
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
                        color: textColor,
                        font: { size: 14, weight: "bold" }
                    },
                    suggestedMax: 1650, // Set suggestedMax to give extra space for 1600
                    beginAtZero: false, // Optional: Prevent y-axis from starting at 0
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
                        color: textColor,
                        font: { size: 14, weight: "bold" },
                        usePointStyle: true,
                        pointStyle: "circle"
                    }
                },
                datalabels: {
                    color: textColor,
                    font: { size: 12, weight: "bold" },
                    formatter: (value) => (isNaN(value) ? "" : value),
                    align: function (context) {
                        let index = context.dataIndex;
                        let value = context.dataset.data[index];
                        // For values at 1600, position label below to avoid clipping
                        if (value >= 1600) return "bottom";
                        let datasetIndex = context.datasetIndex;
                        let mathValue = selectedMathScores[index];
                        let readingValue = selectedReadingScores[index];

                        if (datasetIndex === 1 && readingValue < mathValue) return "bottom";
                        if (datasetIndex === 2 && mathValue < readingValue) return "bottom";
                        return "top";
                    },
                    anchor: function (context) {
                        let index = context.dataIndex;
                        let value = context.dataset.data[index];
                        // Adjust anchor for 1600 to start below
                        if (value >= 1600) return "start";
                        let datasetIndex = context.datasetIndex;
                        let mathValue = selectedMathScores[index];
                        let readingValue = selectedReadingScores[index];

                        if (datasetIndex === 1 && readingValue < mathValue) return "start";
                        if (datasetIndex === 2 && mathValue < readingValue) return "start";
                        return "end";
                    },
                    offset: 8, // Add offset to ensure labels are not too close to points
                    xAdjust: function (context) {
                        return context.dataIndex === 0 ? 15 : 0;
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

document.addEventListener("DOMContentLoaded", updateScoreChart);

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".theme-toggle");
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            setTimeout(updateScoreChart, 100);
        });
    }
});