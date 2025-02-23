




  // Load charts after the window is fully loaded
window.onload = function () {
    // ======== SAT DONUT CHART ========
    createDonutChart("donutChartSAT", "satScore", 720, 780, 1600);

    // ======== GED DONUT CHART ========
    createDonutChart("donutChartGED", "gedScore", 165, 175, 155, 160, 800);
};

// Function to Create Donut Chart
function createDonutChart(canvasId, scoreId, ...scores) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return console.error(`Canvas ${canvasId} not found!`);

    const ctx = canvas.getContext("2d");
    if (!ctx) return console.error(`Failed to get 2D context for ${canvasId}!`);

    // Register Chart.js plugin
    Chart.register(ChartDataLabels);

    // Create Gradient Colors
    function createGradient(ctx, color1, color2) {
        let gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    }

    // Define Gradients
    const gradients = {
        math: createGradient(ctx, "#3498db", "#1f77d0"),
        reading: createGradient(ctx, "#2ecc71", "#23a859"),
        science: createGradient(ctx, "#f39c12", "#e67e22"),
        social: createGradient(ctx, "#9b59b6", "#8e44ad"),
        unfilled: createGradient(ctx, "#d3d3d3", "#bfbfbf"),
    };

    // Determine Max Score
    const maxScore = scores.pop();
    const filledScore = scores.reduce((a, b) => a + b, 0);
    const unfilledScore = maxScore - filledScore;

    // Labels & Colors
    let labels, backgroundColors;
    if (scores.length === 2) {
        labels = ["Math", "Reading/Writing", "Missed"];
        backgroundColors = [gradients.math, gradients.reading, gradients.unfilled];
    } else {
        labels = ["Math", "Language", "Science", "Social Studies", "Missed"];
        backgroundColors = [gradients.math, gradients.reading, gradients.science, gradients.social, gradients.unfilled];
    }

    // Update Score in Center
    document.getElementById(scoreId).innerText = filledScore;

    // Create Chart
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [{
                data: [...scores, unfilledScore],
                backgroundColor: backgroundColors,
                borderWidth: 0
            }]
        },
        options: {
            cutout: "75%", // Creates the hole in the middle
            rotation: 17.5, // Start at the bottom center
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
}