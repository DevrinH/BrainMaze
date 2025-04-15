document.addEventListener("DOMContentLoaded", () => {
    function updateScoreChart() {
        let scoreHistory = JSON.parse(localStorage.getItem("actScoreHistory")) || {};

        // Sort dates in chronological order
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

        if (totalCount <= 10) {
            // Use all dates if 10 or fewer
            selectedDates = rawDates;
        } else {
            // Always include first and last date
            selectedDates.push(rawDates[0]);

            // Pick 8 evenly spaced dates (excluding first and last)
            let interval = Math.floor((totalCount - 2) / 8);
            for (let i = 1; i <= 8; i++) {
                selectedDates.push(rawDates[i * interval]);
            }

            // Include the last date
            selectedDates.push(rawDates[totalCount - 1]);
        }

        // Format dates for display
        let dates = selectedDates.map(date => {
            let d = new Date(date + "T00:00:00");
            return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
        });

        // Get corresponding scores
        selectedEnglishScores = selectedDates.map(date => scoreHistory[date]?.english ?? NaN);
        selectedMathScores = selectedDates.map(date => scoreHistory[date]?.math ?? NaN);
        selectedReadingScores = selectedDates.map(date => scoreHistory[date]?.reading ?? NaN);
        selectedScienceScores = selectedDates.map(date => scoreHistory[date]?.science ?? NaN);
        selectedCompositeScores = selectedDates.map(date => scoreHistory[date]?.composite ?? NaN);

        let ctx = document.getElementById("actScoreChart").getContext("2d");

        // Destroy existing chart if it exists
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

        // Register ChartDataLabels plugin (if available)
        if (typeof ChartDataLabels !== "undefined") {
            Chart.register(ChartDataLabels);
        }

        // Create fading gradient for composite score fill
        function createFadingGradient(ctx) {
            let gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.clientHeight);
            gradient.addColorStop(0, "rgba(0, 0, 255, 0.8)");
            gradient.addColorStop(0.4, "rgba(0, 0, 255, 0.5)");
            gradient.addColorStop(0.8, "rgba(0, 0, 255, 0)");
            return gradient;
        }

        let compositeGradient = createFadingGradient(ctx);

        // Determine text color based on theme
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        const textColor = currentTheme === "dark" ? "white" : "black";

        window.actScoreChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: dates,
                datasets: [
                    {
                        label: "Composite Score",
                        data: selectedCompositeScores,
                        borderColor: "rgb(89, 0, 255)",
                        backgroundColor: compositeGradient,
                        fill: true,
                        borderWidth: 2.5,
                        tension: 0.4
                    },
                    {
                        label: "English",
                        data: selectedEnglishScores,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgb(255, 99, 132)",
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
                        borderColor: "rgb(205, 120, 255)",
                        backgroundColor: "rgb(205, 120, 255)",
                        fill: false,
                        borderWidth: 2.5,
                        tension: 0.4
                    },
                    {
                        label: "Science",
                        data: selectedScienceScores,
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "rgb(75, 192, 192)",
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
                        top: 20,
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
                        max: 36,
                        min: 1,
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
                            let datasetIndex = context.datasetIndex;
                            let englishValue = selectedEnglishScores[index] || Infinity;
                            let mathValue = selectedMathScores[index] || Infinity;
                            let readingValue = selectedReadingScores[index] || Infinity;
                            let scienceValue = selectedScienceScores[index] || Infinity;

                            if (datasetIndex === 1 && englishValue < Math.min(mathValue, readingValue, scienceValue)) return "bottom";
                            if (datasetIndex === 2 && mathValue < Math.min(englishValue, readingValue, scienceValue)) return "bottom";
                            if (datasetIndex === 3 && readingValue < Math.min(englishValue, mathValue, scienceValue)) return "bottom";
                            if (datasetIndex === 4 && scienceValue < Math.min(englishValue, mathValue, readingValue)) return "bottom";
                            return "top";
                        },
                        anchor: function (context) {
                            let index = context.dataIndex;
                            let datasetIndex = context.datasetIndex;
                            let englishValue = selectedEnglishScores[index] || Infinity;
                            let mathValue = selectedMathScores[index] || Infinity;
                            let readingValue = selectedReadingScores[index] || Infinity;
                            let scienceValue = selectedScienceScores[index] || Infinity;

                            if (datasetIndex === 1 && englishValue < Math.min(mathValue, readingValue, scienceValue)) return "start";
                            if (datasetIndex === 2 && mathValue < Math.min(englishValue, readingValue, scienceValue)) return "start";
                            if (datasetIndex === 3 && readingValue < Math.min(englishValue, mathValue, scienceValue)) return "start";
                            if (datasetIndex === 4 && scienceValue < Math.min(englishValue, mathValue, readingValue)) return "start";
                            return "end";
                        },
                        xAdjust: function (context) {
                            return context.dataIndex === 0 ? 15 : 0;
                        }
                    }
                }
            },
            plugins: typeof ChartDataLabels !== "undefined" ? [ChartDataLabels] : []
        });
    }

    // Initial chart render
    updateScoreChart();

    // Update chart on theme change
    const toggleButton = document.querySelector(".theme-toggle");
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            setTimeout(updateScoreChart, 100);
        });
    }
});
