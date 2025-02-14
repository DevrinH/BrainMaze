document.addEventListener("DOMContentLoaded", function () {
    let level1Score = localStorage.getItem("level1Score");
    let level2Unlocked = localStorage.getItem("level2Unlocked");

    console.log("Level 1 Score:", level1Score); // Debugging

    if (level2Unlocked === "true" || (level1Score !== null && parseInt(level1Score) >= 75)) {
        let level2Button = document.getElementById("level-2");
        if (level2Button) {
            level2Button.disabled = false;
            localStorage.setItem("level2Unlocked", "true");
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let level2Score = localStorage.getItem("level2Score");
    let level3Unlocked = localStorage.getItem("level3Unlocked");

    console.log("Level 2 Score:", level2Score); // Debugging

    if (level3Unlocked === "true" || (level2Score !== null && parseInt(level2Score) >= 75)) {
        let level3Button = document.getElementById("level-3");
        if (level3Button) {
            level3Button.disabled = false;
            localStorage.setItem("level3Unlocked", "true");
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let level3Score = localStorage.getItem("level3Score");
    let level4Unlocked = localStorage.getItem("level4Unlocked");

    console.log("Level 3 Score:", level3Score); // Debugging

    if (level4Unlocked === "true" || (level3Score !== null && parseInt(level3Score) >= 75)) {
        let level4Button = document.getElementById("level-4");
        if (level4Button) {
            level4Button.disabled = false;
            localStorage.setItem("level4Unlocked", "true");
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let level3Score = localStorage.getItem("level3Score");
    let level4Unlocked = localStorage.getItem("level4Unlocked");

    console.log("Level 3 Score:", level3Score); // Debugging

    if (level4Unlocked === "true" || (level3Score !== null && parseInt(level3Score) >= 75)) {
        let level4Button = document.getElementById("level-4");
        if (level4Button) {
            level4Button.disabled = false;
            localStorage.setItem("level4Unlocked", "true");
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let level3Score = localStorage.getItem("level3Score");
    let level4Unlocked = localStorage.getItem("level4Unlocked");

    console.log("Level 3 Score:", level3Score); // Debugging

    if (level4Unlocked === "true" || (level3Score !== null && parseInt(level3Score) >= 75)) {
        let level4Button = document.getElementById("level-4");
        if (level4Button) {
            level4Button.disabled = false;
            localStorage.setItem("level4Unlocked", "true");
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let level3Score = localStorage.getItem("level3Score");
    let level4Unlocked = localStorage.getItem("level4Unlocked");

    console.log("Level 3 Score:", level3Score); // Debugging

    if (level4Unlocked === "true" || (level3Score !== null && parseInt(level3Score) >= 75)) {
        let level4Button = document.getElementById("level-4");
        if (level4Button) {
            level4Button.disabled = false;
            localStorage.setItem("level4Unlocked", "true");
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let level3Score = localStorage.getItem("level3Score");
    let level4Unlocked = localStorage.getItem("level4Unlocked");

    console.log("Level 3 Score:", level3Score); // Debugging

    if (level4Unlocked === "true" || (level3Score !== null && parseInt(level3Score) >= 75)) {
        let level4Button = document.getElementById("level-4");
        if (level4Button) {
            level4Button.disabled = false;
            localStorage.setItem("level4Unlocked", "true");
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let level3Score = localStorage.getItem("level3Score");
    let level4Unlocked = localStorage.getItem("level4Unlocked");

    console.log("Level 3 Score:", level3Score); // Debugging

    if (level4Unlocked === "true" || (level3Score !== null && parseInt(level3Score) >= 75)) {
        let level4Button = document.getElementById("level-4");
        if (level4Button) {
            level4Button.disabled = false;
            localStorage.setItem("level4Unlocked", "true");
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let level3Score = localStorage.getItem("level3Score");
    let level4Unlocked = localStorage.getItem("level4Unlocked");

    console.log("Level 3 Score:", level3Score); // Debugging

    if (level4Unlocked === "true" || (level3Score !== null && parseInt(level3Score) >= 75)) {
        let level4Button = document.getElementById("level-4");
        if (level4Button) {
            level4Button.disabled = false;
            localStorage.setItem("level4Unlocked", "true");
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let level3Score = localStorage.getItem("level3Score");
    let level4Unlocked = localStorage.getItem("level4Unlocked");

    console.log("Level 3 Score:", level3Score); // Debugging

    if (level4Unlocked === "true" || (level3Score !== null && parseInt(level3Score) >= 75)) {
        let level4Button = document.getElementById("level-4");
        if (level4Button) {
            level4Button.disabled = false;
            localStorage.setItem("level4Unlocked", "true");
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let level3Score = localStorage.getItem("level3Score");
    let level4Unlocked = localStorage.getItem("level4Unlocked");

    console.log("Level 3 Score:", level3Score); // Debugging

    if (level4Unlocked === "true" || (level3Score !== null && parseInt(level3Score) >= 75)) {
        let level4Button = document.getElementById("level-4");
        if (level4Button) {
            level4Button.disabled = false;
            localStorage.setItem("level4Unlocked", "true");
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    function unlockLevel(level, requiredScore) {
        let score = localStorage.getItem(`level${level - 1}Score`);
        let unlocked = localStorage.getItem(`level${level}Unlocked`);

        if (unlocked === "true" || (score !== null && parseInt(score) >= requiredScore)) {
            let button = document.getElementById(`level-${level}`);
            if (button) {
                button.disabled = false;
                localStorage.setItem(`level${level}Unlocked`, "true");
            }
        }
    }

    // Unlock levels based on scores
    unlockLevel(2, 75);
    unlockLevel(3, 75);
    unlockLevel(4, 75);
    unlockLevel(5, 75);
    unlockLevel(6, 75);
    unlockLevel(7, 75);

    // Reset Progress Button
    document.getElementById("restart-progress").addEventListener("click", function () {
        if (confirm("Are you sure you want to reset all progress?")) {
            localStorage.clear(); // Clear all stored progress
            location.reload(); // Reload the page to reset buttons
        }
    });
});