document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("donutChartACT");

    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        console.error("Failed to get 2D context for canvas!");
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
    const gradientMath = createGradient(ctx, "#3498db", "#1f77d0");  // Math (Blue)
    const gradientEnglish = createGradient(ctx, "#f39c12", "#e67e22");  // English (Orange)
    const gradientReading = createGradient(ctx, "#2ecc71", "#23a859");  // Reading (Green)
    const gradientScience = createGradient(ctx, "#9b59b6", "#8e44ad");  // Science (Purple)
    const gradientUnfilled = createGradient(ctx, "#d3d3d3", "#bfbfbf");  // Unfilled (Gray)

    // ACT Section Scores
    const mathScore = 32;
    const englishScore = 28;
    const readingScore = 31;
    const scienceScore = 29;
    const maxScore = 36 * 4; // Max ACT score per section * 4 sections
    const unfilledScore = maxScore - (mathScore + englishScore + readingScore + scienceScore); // Remaining portion

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Math", "English", "Reading", "Science", "Missed"],
            datasets: [{
                data: [mathScore, englishScore, readingScore, scienceScore, unfilledScore], // Unfilled fills the rest
                backgroundColor: [gradientMath, gradientEnglish, gradientReading, gradientScience, gradientUnfilled],
                borderWidth: 0
            }]
        },
        options: {
            cutout: "75%", // Creates the hole in the middle
            rotation: 180, // Ensures Math starts at the bottom center
            circumference: 360, // Full donut is drawn
            plugins: {
                legend: { display: false }, // Hide default legend
                datalabels: {
                    color: "white",
                    font: { size: 14, weight: "bold" },
                    formatter: (value) => value // Display the actual number (score)
                }
            }
        }
    });

    // Update the score in the center dynamically
    document.getElementById("actScore").innerText = Math.round(
        (mathScore + englishScore + readingScore + scienceScore) / 4
    );
});
