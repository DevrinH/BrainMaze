function updateGEDScoreChart() {
    // Read from gedScoreHistory
    let scoreHistory = JSON.parse(localStorage.getItem("gedScoreHistory")) || {};

    // Filter dates where all four subject scores are present (full test)
    let fullTestDates = Object.keys(scoreHistory).filter(date => {
        return (
            scoreHistory[date].math !== undefined &&
            scoreHistory[date].rla !== undefined &&
            scoreHistory[date].science !== undefined &&
            scoreHistory[date].socialStudies !== undefined
        );
    }).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    if (fullTestDates.length === 0) {
        fullTestDates = ["No Data"];
    }

    let totalCount = fullTestDates.length;
    let selectedDates = [];
    let selectedMathScores = [];
    let selectedRLAScores = [];
    let selectedSocialStudiesScores = [];
    let selectedScienceScores = [];
    let selectedTotalScores = [];

    // Select up to 10 dates for display
    if (totalCount <= 10) {
        selectedDates = fullTestDates;
    } else {
        selectedDates.push(fullTestDates[0]);
        let interval = Math.floor((totalCount - 2) / 8);
        for (let i = 1; i <= 8; i++) {
            selectedDates.push(fullTestDates[i * interval]);
        }
        selectedDates.push(fullTestDates[totalCount - 1]);
    }

    // Format dates with local date only
    let dates = selectedDates.map(date => {
        if (date === "No Data") return date;
        let d = new Date(date + "T00:00:00");
        return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    });

    // Log chart update details
    console.log(`Updating GED score chart on local date: ${new Date().toLocaleDateString()}`);
    console.log("Y-axis tick values set to: [100, 145, 165, 200] for subjects, [400, 580, 660, 800] for total");

    // Get corresponding scores for full test dates
    selectedMathScores = selectedDates.map(date => scoreHistory[date]?.math ?? NaN);
    selectedRLAScores = selectedDates.map(date => scoreHistory[date]?.rla ?? NaN);
    selectedSocialStudiesScores = selectedDates.map(date => scoreHistory[date]?.socialStudies ?? NaN);
    selectedScienceScores = selectedDates.map(date => scoreHistory[date]?.science ?? NaN);
    // Calculate total score as sum of subject scores
    selectedTotalScores = selectedDates.map(date => {
        if (date === "No Data") return NaN;
        let math = scoreHistory[date]?.math ?? 0;
        let rla = scoreHistory[date]?.rla ?? 0;
        let science = scoreHistory[date]?.science ?? 0;
        let socialStudies = scoreHistory[date]?.socialStudies ?? 0;
        return math + rla + science + socialStudies;
    });

    let ctx = document.getElementById("gedScoreChart").getContext("2d");

    if (!ctx) {
        console.error("Canvas element with ID 'gedScoreChart' not found.");
        return;
    }

    if (window.gedScoreChart && typeof window.gedScoreChart.destroy === "function") {
        window.gedScoreChart.destroy();
    }

    if (dates.length === 0) {
        dates = ["No Data"];
        selectedMathScores = [NaN];
        selectedRLAScores = [NaN];
        selectedSocialStudiesScores = [NaN];
        selectedScienceScores = [NaN];
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
    console.log(`GED Chart: Current theme: ${currentTheme}, Text color: ${textColor}`);

    window.gedScoreChart = new Chart(ctx, {
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
                    label: "Math",
                    data: selectedMathScores,
                    borderColor: "rgb(0, 222, 230)",
                    backgroundColor: "rgb(0, 222, 230)",
                    fill: false,
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Reasoning Through Language Arts",
                    data: selectedRLAScores,
                    borderColor: "rgb(205, 120, 255)",
                    backgroundColor: "rgb(205, 120, 255)",
                    fill: false,
                    borderWidth: 2.5,
                    tension: 0.4
                },
                {
                    label: "Social Studies",
                    data: selectedSocialStudiesScores,
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
                        font: {
                            size: window.innerWidth <= 768 ? 12 : 14,
                            weight: "bold"
                        },
                        maxRotation: window.innerWidth <= 768 ? 0 : 45,
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
                            size: window.innerWidth <= 768 ? 12 : 14,
                            weight: "bold"
                        },
                        callback: function (value) {
                            const isTotalVisible = this.chart.data.datasets[0].hidden !== true;
                            if (isTotalVisible) {
                                if ([400, 580, 660, 800].includes(value)) {
                                    return value;
                                }
                            } else {
                                if ([100, 145, 165, 200].includes(value)) {
                                    return value;
                                }
                            }
                            return '';
                        }
                    },
                    min: 80,
                    max: 800,
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
                            size: window.innerWidth <= 768 ? 12 : 14,
                            weight: "bold"
                        },
                        usePointStyle: true,
                        pointStyle: "circle"
                    }
                },
                datalabels: {
                    color: textColor,
                    font: {
                        size: window.innerWidth <= 768 ? 10 : 12,
                        weight: "bold"
                    },
                    formatter: (value) => (isNaN(value) ? "" : value),
                    align: function (context) {
                        let value = context.dataset.data[context.dataIndex];
                        if (context.dataset.label === "Total Score" && value >= 780) return "bottom";
                        else if (value >= 195) return "bottom";
                        return "top";
                    },
                    anchor: function (context) {
                        let value = context.dataset.data[context.dataIndex];
                        if (context.dataset.label === "Total Score" && value >= 780) return "start";
                        else if (value >= 195) return "start";
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
    updateGEDScoreChart();
    const toggleButton = document.querySelector(".theme-toggle");
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            console.log("Theme toggle clicked, updating GED chart...");
            setTimeout(updateGEDScoreChart, 100);
        });
    }
});

// Listen for theme changes dynamically
document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        console.log("data-theme attribute changed, updating GED chart...");
        updateGEDScoreChart();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
});