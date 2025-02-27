document.addEventListener("DOMContentLoaded", function () {
    updateScoreChart();
});

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

    // ✅ Fix: Ensure chart has labels even if no data exists
    if (dates.length === 0) {
        dates = ["No Data"];
        mathScores = [NaN];
        readingScores = [NaN];
        totalScores = [NaN];
    }

    // ✅ Limit x-axis to 10 evenly spaced labels
    function getLimitedLabels(dates, maxLabels) {
        if (dates.length <= maxLabels) return dates;
        let step = Math.ceil(dates.length / maxLabels);
        return dates.filter((_, index) => index % step === 0 || index === dates.length - 1);
    }

    let limitedDates = getLimitedLabels(dates, 10);

    // ✅ Ensure Chart.js DataLabels is registered
    Chart.register(ChartDataLabels);

    window.scoreChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates, // Keep full dataset
            datasets: [
                {
                    label: "Math Score",
                    data: mathScores,
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    fill: false
                },
                {
                    label: "Reading & Writing Score",
                    data: readingScores,
                    borderColor: "green",
                    backgroundColor: "rgba(0, 255, 0, 0.2)",
                    fill: false
                },
                {
                    label: "Total Score",
                    data: totalScores,
                    borderColor: "red",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    fill: false
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
                        font: { size: 14 }
                    },
                    ticks: {
                        color: "black",
                        autoSkip: false,
                        maxTicksLimit: 10,
                        callback: function (value, index, values) {
                            return limitedDates.includes(this.getLabelForValue(value)) ? this.getLabelForValue(value) : "";
                        }
                    },
                    grid: { display: true, color: "lightgray" }
                },
                y: {
                    title: {
                        display: true,
                        text: "SAT Score",
                        color: "black",
                        font: { size: 14 }
                    },
                    ticks: {
                        color: "black",
                        stepSize: 100,
                        beginAtZero: true
                    },
                    max: 1600,
                    grid: { display: true, color: "lightgray" }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: { color: "black" }
                },
                datalabels: { // ✅ Add labels above points
                    align: "top",
                    anchor: "end",
                    color: "black",
                    font: { size: 12, weight: "bold" },
                    formatter: (value) => (isNaN(value) ? "" : value) // Hide NaN values
                }
            }
        },
        plugins: [ChartDataLabels] // ✅ Register the Data Labels plugin
    });
}

// ✅ Ensure script runs after page loads
document.addEventListener("DOMContentLoaded", updateScoreChart);
