document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("donutChartGED");
    
    if (!canvas) {
        console.error("Canvas element not found for GED chart!");
        return;
    }
    
    const ctx = canvas.getContext("2d");
    
    if (!ctx) {
        console.error("Failed to get 2D context for GED chart!");
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
    
    // Define gradient colors for GED
    const gradientMath = createGradient(ctx, "#3498db", "#1f77d0");
    const gradientLanguage = createGradient(ctx, "#2ecc71", "#23a859");
    const gradientScience = createGradient(ctx, "#f39c12", "#e67e22");
    const gradientSocial = createGradient(ctx, "#9b59b6", "#8e44ad");
    const gradientUnfilled = createGradient(ctx, "#d3d3d3", "#bfbfbf");
    
    // GED Scores
    const mathScore = 165;
    const languageScore = 175;
    const scienceScore = 155;
    const socialScore = 160;
    const maxScore = 800;
    const filledScore = mathScore + languageScore + scienceScore + socialScore;
    const unfilledScore = maxScore - filledScore;
    
    // Update center text
    document.getElementById("gedScore").innerText = filledScore;
    
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Math", "Language", "Science", "Social Studies", "Missed"],
            datasets: [{
                data: [mathScore, languageScore, scienceScore, socialScore, unfilledScore],
                backgroundColor: [gradientMath, gradientLanguage, gradientScience, gradientSocial, gradientUnfilled],
                borderWidth: 0
            }]
        },
        options: {
            cutout: "75%", // Creates the hole in the middle
            rotation: 180, // Start at the bottom center
            circumference: 360, // Full donut
            plugins: {
                legend: { display: false }, // Hide default legend
                datalabels: {
                    color: "white",
                    font: { size: 14, weight: "bold" },
                    formatter: (value) => value
                }
            }
        }
    });
});
