function updateScoreChart() {
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};

    let dates = Object.keys(scoreHistory).sort();
    let mathScores = dates.map(date => scoreHistory[date]?.math || null);
    let readingScores = dates.map(date => scoreHistory[date]?.reading || null);
    let totalScores = dates.map(date => scoreHistory[date]?.total || null);

    let ctx = document.getElementById("scoreChart").getContext("2d");

    if (window.scoreChart) {
        window.scoreChart.destroy(); // Destroy previous chart instance
    }

    // Ensure the chart shows something even if there is no data yet
    if (dates.length === 0) {
        dates = ["Placeholder"]; // Prevent empty labels
        mathScores = [null]; // Empty dataset
        readingScores = [null];
        totalScores = [null];
    }

    window.scoreChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Math Score",
                    data: mathScores,
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    fill: true
                },
                {
                    label: "Reading & Writing Score",
                    data: readingScores,
                    borderColor: "green",
                    backgroundColor: "rgba(0, 255, 0, 0.2)",
                    fill: true
                },
                {
                    label: "Total Score",
                    data: totalScores,
                    borderColor: "red",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    fill: true
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
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        color: "black"
                    },
                    grid: {
                        display: true,
                        color: "lightgray"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "SAT Score",
                        color: "black",
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        color: "black",
                        stepSize: 100
                    },
                    beginAtZero: true,
                    suggestedMax: 1600,
                    grid: {
                        display: true,
                        color: "lightgray"
                    }
                }
            },
            plugins: {
                legend: {
                    display: true, // Ensure legend is always shown
                    labels: {
                        color: "black"
                    }
                }
            }
        }
    });
}

// Ensure the chart updates on page load
document.addEventListener("DOMContentLoaded", updateScoreChart);
