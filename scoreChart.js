function updateScoreChart() {
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};

    // Format dates as "Feb 25" instead of "YYYY-MM-DD"
    let dates = Object.keys(scoreHistory)
        .sort()
        .map(date => {
            let d = new Date(date);
            return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // "Feb 25"
        });

    let mathScores = Object.keys(scoreHistory).sort().map(date => scoreHistory[date]?.math ?? NaN);
    let readingScores = Object.keys(scoreHistory).sort().map(date => scoreHistory[date]?.reading ?? NaN);
    let totalScores = Object.keys(scoreHistory).sort().map(date => scoreHistory[date]?.total ?? NaN);

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
        gradient.addColorStop(0, "rgba(0, 0, 255, 0.8)");
        gradient.addColorStop(0.1, "rgba(0, 0, 255, 0.5)");
        gradient.addColorStop(0.3, "rgba(0, 0, 255, 0.2)");  
        gradient.addColorStop(0.5, "rgba(0, 0, 255, 0)");
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
                    backgroundColor: "rgb(102, 102, 255)",
                    fill: false,
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Math",
                    data: mathScores,
                    borderColor: "rgb(173, 216, 230)",
                    backgroundColor: "rgb(173, 216, 230)",
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
                        pointStyle: "circle"
                    }
                },
                datalabels: {
                    color: "black",
                    font: { size: 12, weight: "bold" },
                    formatter: (value, context) => {
                        if (isNaN(value)) return "";
                        
                        let datasetIndex = context.datasetIndex;
                        let currentIndex = context.dataIndex;
                        
                        let total = totalScores[currentIndex] ?? 0;
                        let reading = readingScores[currentIndex] ?? 0;
                        let math = mathScores[currentIndex] ?? 0;
                        
                        if (datasetIndex === 0) {
                            return total;
                        }

                        let position = "top";
                        if (datasetIndex === 1 && Math.abs(total - reading) < 50) position = "start";
                        if (datasetIndex === 2 && Math.abs(total - math) < 50) position = "end";

                        return value;
                    },
                    align: (context) => {
                        let datasetIndex = context.datasetIndex;
                        return datasetIndex === 0 ? "end" : (datasetIndex === 1 ? "start" : "end");
                    },
                    anchor: "end",
                    offset: 4
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

document.addEventListener("DOMContentLoaded", updateScoreChart);