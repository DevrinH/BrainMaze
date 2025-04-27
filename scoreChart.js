function updateScoreChart() {
    // Read from satScoreHistory
    let scoreHistory = JSON.parse(localStorage.getItem("satScoreHistory")) || {};

    // Sort dates
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
        selectedDates = rawDates;
    } else {
        selectedDates.push(rawDates[0]);
        let interval = Math.floor((totalCount - 2) / 8);
        for (let i = 1; i <= 8; i++) {
            selectedDates.push(rawDates[i * interval]);
        }
        selectedDates.push(rawDates[totalCount - 1]);
    }

    // Format dates with local date only
    let dates = selectedDates.map(date => {
        if (date === "No Data") return date;
        let d = new Date(date + "T00:00:00");
        return d.toLocaleDateString(undefined, { 
            month: "short", 
            day: "numeric" 
        });
    });

    // Log local date for chart update
    console.log(`Updating score chart on local date: ${new Date().toLocaleDateString()}`);

    // Get corresponding scores
    selectedMathScores = selectedDates.map(date => scoreHistory[date]?.math ?? NaN);
    selectedReadingScores = selectedDates.map(date => scoreHistory[date]?.readingWriting ?? NaN);
    selectedTotalScores = selectedDates.map(date => scoreHistory[date]?.total ?? NaN);

    // Get canvas element
    const canvas = document.getElementById("scoreChart");
    if (!canvas) {
        console.error("Canvas element with ID 'scoreChart' not found.");
        return;
    }
    let ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Failed to get 2D context for canvas.");
        return;
    }

    // Destroy existing chart if it exists
    if (window.scoreChart && typeof window.scoreChart.destroy === "function") {
        window.scoreChart.destroy();
    }

    // Handle empty data
    if (dates.length === 0) {
        dates = ["No Data"];
        selectedMathScores = [NaN];
        selectedReadingScores = [NaN];
        selectedTotalScores = [NaN];
    }

    // Register ChartDataLabels plugin
    if (typeof ChartDataLabels !== "undefined") {
        Chart.register(ChartDataLabels);
    } else {
        console.warn("ChartDataLabels plugin is not loaded. Data labels will not be displayed.");
    }

    // Create gradient for total score
    function createFadingGradient(ctx) {
        let gradient = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight);
        gradient.addColorStop(0, "rgba(0, 0, 255, 0.8)");
        gradient.addColorStop(0.4, "rgba(0, 0, 255, 0.5)");
        gradient.addColorStop(0.8, "rgba(0, 0, 255, 0)");
        return gradient;
    }

    let totalGradient = createFadingGradient(ctx);

    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const textColor = currentTheme === "dark" ? "white" : "black";

    // Create new chart
    try {
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
                        top: 40, // Increased for data labels at 1600
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
                            font: { size: 14, weight: "bold" },
                            stepSize: 200, // Optional: Ensure readable tick intervals
                            callback: function(value) {
                                return value; // Format y-axis labels as needed
                            }
                        },
                        suggestedMin: 400, // Reasonable minimum for SAT scores
                        suggestedMax: 1650, // Extra space for 1600 scores
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
                            let value = context.dataset.data[context.dataIndex];
                            if (value >= 1600) return "bottom"; // Position below for 1600
                            let datasetIndex = context.datasetIndex;
                            let mathValue = selectedMathScores[context.dataIndex];
                            let readingValue = selectedReadingScores[context.dataIndex];
                            if (datasetIndex === 1 && readingValue < mathValue) return "bottom";
                            if (datasetIndex === 2 && mathValue < readingValue) return "bottom";
                            return "top";
                        },
                        anchor: function (context) {
                            let value = context.dataset.data[context.dataIndex];
                            if (value >= 1600) return "start"; // Anchor below for 1600
                            let datasetIndex = context.datasetIndex;
                            let mathValue = selectedMathScores[context.dataIndex];
                            let readingValue = selectedReadingScores[context.dataIndex];
                            if (datasetIndex === 1 && readingValue < mathValue) return "start";
                            if (datasetIndex === 2 && mathValue < readingValue) return "start";
                            return "end";
                        },
                        offset: 8,
                        xAdjust: function (context) {
                            return context.dataIndex === 0 ? 15 : 0;
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    } catch (error) {
        console.error("Failed to create chart:", error);
    }
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