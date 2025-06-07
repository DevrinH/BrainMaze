function updateACTScoreChart() {
    // Read from actScoreHistory
    let scoreHistory = JSON.parse(localStorage.getItem("actScoreHistory")) || {};

    // Sort dates
    let rawDates = Object.keys(scoreHistory).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    if (rawDates.length === 0) {
        rawDates = ["No Data"];
    }

    let totalCount = rawDates.length;
    let selectedDates = [];
    let selectedEnglishScores = [];
    let selectedMathScores = [];
    let selectedReadingScores = [];
    let selectedScienceScores = [];
    let selectedCompositeScores = [];

    // Select up to 10 dates for display
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
        return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    });

    // Log chart update details
    console.log(`Updating ACT score chart on local date: ${new Date().toLocaleDateString()}`);
    console.log("Y-axis tick values set to: [0, 12, 24, 36]");

    // Get corresponding scores
    selectedEnglishScores = selectedDates.map(date => scoreHistory[date]?.english ?? NaN);
    selectedMathScores = selectedDates.map(date => scoreHistory[date]?.math ?? NaN);
    selectedReadingScores = selectedDates.map(date => scoreHistory[date]?.reading ?? NaN);
    selectedScienceScores = selectedDates.map(date => scoreHistory[date]?.science ?? NaN);
    selectedCompositeScores = selectedDates.map(date => scoreHistory[date]?.composite ?? NaN);

    let ctx = document.getElementById("actScoreChart").getContext("2d");

    if (!ctx) {
        console.error("Canvas element with ID 'actScoreChart' not found.");
        return;
    }

    if (window.actScoreChart && typeof window.actScoreChart.destroy === "function") {
        window.actScoreChart.destroy();
    }

    if (dates.length === 0) {
        dates = ["No Data"];
        selectedEnglishScores = [NaN];
        selectedMathScores = [NaN];
        selectedReadingScores = [NaN];
        selectedScienceScores = [NaN];
        selectedCompositeScores = [NaN];
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
    console.log(`ACT Chart: Current theme: ${currentTheme}, Text color: ${textColor}`);

    window.actScoreChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Total Score",
                    data: selectedCompositeScores,
                    borderColor: "rgb(89, 0, 255)",
                    backgroundColor: totalGradient,
                    fill: true,
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "English",
                    data: selectedEnglishScores,
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
                },
                {
                    label: "Reading",
                    data: selectedReadingScores,
                    borderColor: "rgb(255, 165, 0)",
                    backgroundColor: "rgb(255, 165, 0)",
                    fill: false,
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Science",
                    data: selectedScienceScores,
                    borderColor: "rgb(50, 205, 50)",
                    backgroundColor: "rgb(50, 205, 50)",
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
                    left: 40,  // Match SAT chart padding
                    right: 40,
                    top: 40,   // Ensure top label (36) is visible
                    bottom: 20
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor,
                        font: {
                            size: window.innerWidth <= 768 ? 12 : 14, // Match mobile adjustments
                            weight: "bold"
                        },
                        maxRotation: window.innerWidth <= 768 ? 0 : 45, // Match mobile adjustments
                        minRotation: window.innerWidth <= 768 ? 0 : 30,
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
                        font: {
                            size: window.innerWidth <= 768 ? 12 : 14, // Match mobile adjustments
                            weight: "bold"
                        },
                        callback: function (value) {
                            if ([0, 12, 24, 36].includes(value)) {
                                return value;
                            }
                            return '';
                        }
                    },
                    min: 0,   // Minimum for breathing room
                    max: 36,  // Hard limit at 36
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
                        font: {
                            size: window.innerWidth <= 768 ? 12 : 14, // Match mobile adjustments
                            weight: "bold"
                        },
                        usePointStyle: true,
                        pointStyle: "circle"
                    }
                },
                datalabels: {
                    color: textColor,
                    font: {
                        size: window.innerWidth <= 768 ? 10 : 12, // Match mobile adjustments
                        weight: "bold"
                    },
                    formatter: (value) => (isNaN(value) ? "" : value),
                    align: function (context) {
                        let value = context.dataset.data[context.dataIndex];
                        if (value >= 35) return "bottom"; // Move label below for high scores
                        return "top";
                    },
                    anchor: function (context) {
                        let value = context.dataset.data[context.dataIndex];
                        if (value >= 35) return "start";
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

// Ensure chart updates on DOM load
document.addEventListener("DOMContentLoaded", () => {
    updateACTScoreChart();
    const toggleButton = document.querySelector(".theme-toggle");
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            console.log("Theme toggle clicked, updating ACT chart...");
            setTimeout(updateACTScoreChart, 100);
        });
    }
});

// Listen for theme changes dynamically
document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        console.log("data-theme attribute changed, updating ACT chart...");
        updateACTScoreChart();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
});