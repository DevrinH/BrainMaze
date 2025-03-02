function updateScoreChart() {
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};

    // Ensure dates are sorted properly and use local timezone
    let rawDates = Object.keys(scoreHistory).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    let dates = rawDates.map(date => {
        let d = new Date(date + "T00:00:00"); // Force local timezone interpretation
        return d.toLocaleDateString(undefined, { month: "short", day: "numeric" }); // "Feb 25"
    });

    let mathScores = rawDates.map(date => scoreHistory[date]?.math ?? NaN);
    let readingScores = rawDates.map(date => scoreHistory[date]?.reading ?? NaN);
    let totalScores = rawDates.map(date => scoreHistory[date]?.total ?? NaN);

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

    // **Create fading gradient for the total score fill**
    function createFadingGradient() {
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0.2, "rgba(0, 0, 255, 0.8)"); // Darkest near the line
        gradient.addColorStop(0.4, "rgba(0, 0, 255, 0.5)"); // Quick fade
        gradient.addColorStop(0.6, "rgba(0, 0, 255, 0.2)");  
        gradient.addColorStop(0.8, "rgba(0, 0, 255, 0)"); // Fully transparent near the middle
        return gradient;
    }

    let totalGradient = createFadingGradient();

    window.scoreChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Total Score",
                    data: totalScores,
                    borderColor: "rgb(0, 0, 255)", // Solid blue line
                    backgroundColor: totalGradient, // **Gradient Fill**
                    fill: true, // **Enable fill for total score only**
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Reading & Writing",
                    data: readingScores,
                    borderColor: "rgb(205, 120, 255)", 
                    backgroundColor: "rgb(102, 102, 255)", // **Solid legend circle**
                    fill: false, // No fill for reading
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Math",
                    data: mathScores,
                    borderColor: "rgb(48, 233, 240)", 
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
                        font: { size: 14, weight: "bold" },
                        maxRotation: 45,  // Rotate labels to avoid overlap
                        minRotation: 30,
                        autoSkip: true,    // Automatically hide labels if they overlap
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
                    color: "black",
                    font: { size: 12, weight: "bold" },
                    formatter: (value) => (isNaN(value) ? "" : value),
                    align: function (context) {
                        let index = context.dataIndex;
                        let datasetIndex = context.datasetIndex;
                        let mathValue = mathScores[index];
                        let readingValue = readingScores[index];

                        if (datasetIndex === 1 && readingValue < mathValue) return "bottom";
                        if (datasetIndex === 2 && mathValue < readingValue) return "bottom";
                        return "top"; // Default position
                    },
                    anchor: function (context) {
                        let index = context.dataIndex;
                        let datasetIndex = context.datasetIndex;
                        let mathValue = mathScores[index];
                        let readingValue = readingScores[index];

                        if (datasetIndex === 1 && readingValue < mathValue) return "start";
                        if (datasetIndex === 2 && mathValue < readingValue) return "start";
                        return "end"; // Default position
                    },
                    xAdjust: function (context) {
                        // Offset first data point to the right if too close to the y-axis
                        return context.dataIndex === 0 ? 15 : 0;
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

document.addEventListener("DOMContentLoaded", updateScoreChart);
