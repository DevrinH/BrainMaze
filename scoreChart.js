// TEMPORARY MOCK DATA FOR PROMO VIDEO
(function injectMockSATProgression() {
    const today = new Date();
    let mockHistory = {};

    // Start at 1300 and end at 1580 over 6 tests
    const mockTotalScores = [1150, 1260, 1350, 1330, 1440, 1550];

    for (let i = 0; i < 6; i++) {
        const testDate = new Date(today);
        testDate.setDate(today.getDate() - (14 - i * 3)); // Spread tests ~3 days apart within 2 weeks
        const dateStr = testDate.toISOString().split("T")[0];

        const total = mockTotalScores[i];
        const reading = Math.floor(total * 0.48); // Rough split
        const math = total - reading;

        mockHistory[dateStr] = {
            readingWriting: reading,
            math: math,
            total: total
        };
    }

    // Inject into localStorage
    localStorage.setItem("satScoreHistory", JSON.stringify(mockHistory));
})();


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
        return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    });

    // Log local date for chart update
    console.log(`Updating score chart on local date: ${new Date().toLocaleDateString()}`);
    console.log("Y-axis tick values set to: [400, 800, 1200, 1600]");

    // Get corresponding scores
    selectedMathScores = selectedDates.map(date => scoreHistory[date]?.math ?? NaN);
    selectedReadingScores = selectedDates.map(date => scoreHistory[date]?.readingWriting ?? NaN);
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

    // Create gradient as a function to be used dynamically
    function createFadingGradient(ctx, chartArea) {
        // Use chartArea to ensure dimensions are correct
        let gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, "rgba(0, 0, 255, 0.8)");
        gradient.addColorStop(0.4, "rgba(0, 0, 255, 0.5)");
        gradient.addColorStop(0.8, "rgba(0, 0, 255, 0)");
        return gradient;
    }

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
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;
                        if (!chartArea) {
                            // Return a fallback color if chartArea isn't available yet
                            return "rgba(0, 0, 255, 0.5)";
                        }
                        return createFadingGradient(ctx, chartArea);
                    },
                    fill: true,
                    borderWidth: 2.5,
                    tension: 0.4,
                    order: 1 // Lower order: drawn first (below other datasets)
                },
                {
                    label: "Reading & Writing",
                    data: selectedReadingScores,
                    borderColor: "rgb(205, 120, 255)",
                    backgroundColor: "rgb(205, 120, 255)",
                    fill: false,
                    borderWidth: 2.5,
                    tension: 0.4,
                    order: 2 // Higher order: drawn on top
                },
                {
                    label: "Math",
                    data: selectedMathScores,
                    borderColor: "rgb(0, 222, 230)",
                    backgroundColor: "rgb(0, 222, 230)",
                    fill: false,
                    borderWidth: 2.5,
                    tension: 0.4,
                    order: 2 // Higher order: drawn on top
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
                    top: 40,
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
                        color: textColor,
                        font: { size: 14, weight: "bold" },
                        callback: function (value) {
                            return [400, 800, 1200, 1600].includes(value) ? value : '';
                        },
                        stepSize: 400
                    },
                    min: 100,
                    max: 1630,
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
                        if (value >= 1550) return "bottom";
                        return "top";
                    },
                    anchor: function (context) {
                        let value = context.dataset.data[context.dataIndex];
                        if (value >= 1550) return "start";
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

// Ensure the chart updates after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Add a slight delay to ensure canvas dimensions are set
    setTimeout(updateScoreChart, 100);
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".theme-toggle");
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            setTimeout(updateScoreChart, 100);
        });
    }
});