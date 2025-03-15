document.addEventListener("DOMContentLoaded", function () {
    // Select Buttons
    const testButton = document.querySelector(".button-29[onclick='showTests()']");
    const lessonButton = document.querySelector(".button-29[onclick='showLessons()']");
    const algebraButton = document.querySelector(".button-29[onclick='showAlgebraLessons()']");
    const inferenceButton = document.querySelector(".button-29[onclick='showInferenceLessons()']");
    const geometryButton = document.querySelector(".button-29[onclick='showGeometryLessons()']");

    // Select Containers
    const testsContainer = document.getElementById("tests-container");
    const lessonsContainer = document.getElementById("lessons-container");
    const algebraContainer = document.getElementById("lessons-container-algebra");
    const inferenceContainer = document.getElementById("lessons-container-inference");
    const geometryContainer = document.getElementById("lessons-container-geometry");

    // Function to hide all containers
    function hideAllContainers() {
        const allContainers = [testsContainer, lessonsContainer, algebraContainer, inferenceContainer, geometryContainer];
        allContainers.forEach(container => {
            if (container) container.classList.add("hidden");
        });
    }

    // Functions to show specific sections
    function showTests() {
        hideAllContainers();
        if (testsContainer) testsContainer.classList.remove("hidden");
    }

    function showLessons() {
        hideAllContainers();
        if (lessonsContainer) lessonsContainer.classList.remove("hidden");
    }

    function showAlgebraLessons() {
        hideAllContainers();
        if (algebraContainer) algebraContainer.classList.remove("hidden");
    }

    function showInferenceLessons() {
        hideAllContainers();
        if (inferenceContainer) inferenceContainer.classList.remove("hidden");
    }

    function showGeometryLessons() {
        hideAllContainers();
        if (geometryContainer) geometryContainer.classList.remove("hidden");
    }

    // Add Event Listeners (Only if buttons exist)
    if (testButton) testButton.addEventListener("click", showTests);
    if (lessonButton) lessonButton.addEventListener("click", showLessons);
    if (algebraButton) algebraButton.addEventListener("click", showAlgebraLessons);
    if (inferenceButton) inferenceButton.addEventListener("click", showInferenceLessons);
    if (geometryButton) geometryButton.addEventListener("click", showGeometryLessons);
});
