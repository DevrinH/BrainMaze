function updateScoreChart() {
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};

    // Ensure dates are sorted properly and use local timezone
    let rawDates = Object.keys(scoreHistory).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    if (rawDates.length === 0) {
        rawDates = ["No Data"];
    }

    let totalCount = rawDates.length;
    let selectedDates = [];
    let selectedMathScores = [];
    let selectedReadingScores = [];
    let selectedTotalScores = [];

    if (totalCount <= 10) {
        // If 10 or fewer scores exist, use them all
        selectedDates = rawDates;
    } else {
        // Always include first and last date
        selectedDates.push(rawDates[0]);

        // Pick evenly spaced dates (excluding first and last)
        let interval = Math.floor((totalCount - 2) / 8); // 8 more points needed
        for (let i = 1; i <= 8; i++) {
            selectedDates.push(rawDates[i * interval]);
        }

        // Include the last date
        selectedDates.push(rawDates[totalCount - 1]);
    }

    // Convert selected dates to proper format
    let dates = selectedDates.map(date => {
        let d = new Date(date + "T00:00:00");
        return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    });

    // Get corresponding scores
    selectedMathScores = selectedDates.map(date => scoreHistory[date]?.math ?? NaN);
    selectedReadingScores = selectedDates.map(date => scoreHistory[date]?.reading ?? NaN);
    selectedTotalScores = selectedDates.map(date => scoreHistory[date]?.total ?? NaN);

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
                    data: selectedTotalScores,
                    borderColor: "rgb(132, 0, 255)",
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
            scales: {
                x: {
                    ticks: {
                        color: "black",
                        font: { size: 14, weight: "bold" },
                        maxRotation: 45,
                        minRotation: 30,
                        autoSkip: true,
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
                        pointStyle: "circle"
                    }
                },
                datalabels: {
                    color: "black",
                    font: { size: 12, weight: "bold" },
                    formatter: (value) => (isNaN(value) ? "" : value),
                    align: function (context) {
                        let index = context.dataIndex;
                        let datasetIndex = context.datasetIndex;
                        let mathValue = selectedMathScores[index];
                        let readingValue = selectedReadingScores[index];

                        if (datasetIndex === 1 && readingValue < mathValue) return "bottom";
                        if (datasetIndex === 2 && mathValue < readingValue) return "bottom";
                        return "top";
                    },
                    anchor: function (context) {
                        let index = context.dataIndex;
                        let datasetIndex = context.datasetIndex;
                        let mathValue = selectedMathScores[index];
                        let readingValue = selectedReadingScores[index];

                        if (datasetIndex === 1 && readingValue < mathValue) return "start";
                        if (datasetIndex === 2 && mathValue < readingValue) return "start";
                        return "end";
                    },
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
