document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("donutChart");

    if (!canvas) {
        console.error("SAT Canvas element not found!");
        return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        console.error("Failed to get 2D context for SAT chart!");
        return;
    }

    // Register Chart.js plugin
    Chart.register(ChartDataLabels);

    // Function to create gradient colors
    function createGradient(ctx, color1, color2) {
        let gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    }

    // Define gradient colors
    const gradientMath = createGradient(ctx, "#3498db", "#1f77d0");
    const gradientReading = createGradient(ctx, "#2ecc71", "#23a859");
    const gradientUnfilled = createGradient(ctx, "#d3d3d3", "#bfbfbf");

    // Data values
    const mathScore = 720;
    const readingScore = 780;
    const maxScore = 1600;
    const unfilledScore = maxScore - (mathScore + readingScore); // Remaining portion

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Math", "Reading/Writing", "Missed"],
            datasets: [{
                data: [mathScore, readingScore, unfilledScore], // Unfilled fills the rest
                backgroundColor: [gradientMath, gradientReading, gradientUnfilled],
                borderWidth: 0
            }]
        },
        options: {
            cutout: "75%", // Creates the hole in the middle
            rotation: 17.5, // Ensures Math & Reading/Writing start at the bottom center
            circumference: 360, // Full donut is drawn
            plugins: {
                legend: { display: false }, // Hide default legend
                datalabels: {
                    color: "white",
                    font: { size: 16, weight: "bold" },
                    formatter: (value) => value // Display the actual number (score)
                }
            }
        }
    });
});