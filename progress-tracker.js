document.addEventListener("DOMContentLoaded", () => {
    function updateProgress(source) {
        console.log(`updateProgress called from: ${source}`);

        // Process ACT progress
        let actTestResults = localStorage.getItem("actTestResults");
        console.log("Retrieved actTestResults from localStorage:", actTestResults);

        let parsedActResults = actTestResults ? JSON.parse(actTestResults) : {};
        console.log("Parsed actTestResults:", parsedActResults);
        console.log("All ACT categories and their scores:", parsedActResults);

        let actSection = document.getElementById("act-progress-container");
        console.log("ACT section element:", actSection);
        console.log("Is ACT section active?", actSection && !actSection.classList.contains("hidden"));

        if (actSection && !actSection.classList.contains("hidden")) {
            let progressItems = actSection.querySelectorAll(".progress-item");
            console.log("Found ACT progress items:", progressItems.length);

            let historicalProgress = JSON.parse(localStorage.getItem("actHistoricalProgress")) || {};
            let actProgress = JSON.parse(localStorage.getItem("actProgress")) || {};
            console.log("Loaded actHistoricalProgress before update:", historicalProgress);
            console.log("Loaded actProgress before update:", actProgress);

            Object.keys(parsedActResults).forEach(category => {
                if (!actProgress[category]) {
                    actProgress[category] = { correct: 0, incorrect: 0 };
                }
                actProgress[category].correct += Number(parsedActResults[category]?.correct || 0);
                actProgress[category].incorrect += Number(parsedActResults[category]?.incorrect || 0);
                console.log(`Category: ${category}, Updated ACT progress - Correct: ${actProgress[category].correct}, Incorrect: ${actProgress[category].incorrect}`);
            });

            localStorage.setItem("actProgress", JSON.stringify(actProgress));
            console.log("Updated actProgress:", actProgress);

            localStorage.removeItem("actTestResults");
            console.log("Cleared actTestResults from localStorage");

            progressItems.forEach(item => {
                let displayCategory = item.querySelector(".progress-label").textContent.toLowerCase().replace(/\s+/g, "-");
                let category = `act-${displayCategory}`;
                console.log("Processing ACT category:", category);

                let progressBarElement = document.getElementById(`${category}-bar`);
                let progressTextElement = document.getElementById(`${category}-text`);
                console.log(`Bar element for ${category}:`, progressBarElement);
                console.log(`Text element for ${category}:`, progressTextElement);

                let categoryData = actProgress[category] || { correct: 0, incorrect: 0 };
                let total = categoryData.correct + categoryData.incorrect;
                let percentage = total > 0 ? Math.round((categoryData.correct / total) * 100) : 0;

                if (!categoryData) {
                    console.log(`No data found for category ${category}`);
                }

                if (progressBarElement) {
                    progressBarElement.style.width = `${percentage}%`;
                    progressBarElement.offsetHeight;
                } else {
                    console.warn(`Progress bar element not found for category ${category}. Expected ID: ${category}-bar`);
                }

                if (progressTextElement) {
                    let previousPercentage = historicalProgress[category]?.percentage || 0;
                    console.log(`ACT Category: ${category}, Previous Percentage: ${previousPercentage}, Current Percentage: ${percentage}`);

                    let arrow = "→";
                    let increased = percentage > previousPercentage;
                    let decreased = percentage < previousPercentage;
                    if (increased) {
                        arrow = "↑";
                    } else if (decreased) {
                        arrow = "↓";
                    }

                    if (increased) {
                        console.log(`ACT Category: ${category}, Arrow Set to ↑ (Increased)`);
                    } else if (decreased) {
                        console.log(`ACT Category: ${category}, Arrow Set to ↓ (Decreased)`);
                    } else {
                        console.log(`ACT Category: ${category}, Arrow Set to → (No Change)`);
                    }

                    let arrowColor = increased ? "green" : decreased ? "red" : "#4e5163";
                    progressTextElement.innerHTML = `${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`;
                    progressTextElement.offsetHeight;
                    console.log(`Updated ACT ${category} - Bar width: ${percentage}%, Text: ${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`);
                } else {
                    console.log(`Text element not found for ${category}`);
                }

                historicalProgress[category] = { percentage };
            });

            console.log("Saving actHistoricalProgress:", historicalProgress);
            localStorage.setItem("actHistoricalProgress", JSON.stringify(historicalProgress));
            console.log("Updated actHistoricalProgress:", historicalProgress);

            actSection.style.display = "block";
            console.log("ACT progress container made visible in ACT section");
        }

        // Process SAT progress
        let satTestResults = localStorage.getItem("satTestResults");
        console.log("Retrieved satTestResults from localStorage:", satTestResults);

        let parsedSatResults = satTestResults ? JSON.parse(satTestResults) : {};
        console.log("Parsed satTestResults:", parsedSatResults);
        console.log("All SAT categories and their scores:", parsedSatResults);

        let satSection = document.getElementById("sat-progress-container");
        console.log("SAT section element:", satSection);
        console.log("Is SAT section active?", satSection && !satSection.classList.contains("hidden"));

        if (satSection && !satSection.classList.contains("hidden")) {
            let progressItems = satSection.querySelectorAll(".progress-item");
            console.log("Found SAT progress items:", progressItems.length);

            let historicalProgress = JSON.parse(localStorage.getItem("satHistoricalProgress")) || {};
            let satProgress = JSON.parse(localStorage.getItem("satProgress")) || {};
            console.log("Loaded satHistoricalProgress before update:", historicalProgress);
            console.log("Loaded satProgress before update:", satProgress);

            Object.keys(parsedSatResults).forEach(category => {
                if (!satProgress[category]) {
                    satProgress[category] = { correct: 0, incorrect: 0 };
                }
                satProgress[category].correct += Number(parsedSatResults[category]?.correct || 0);
                satProgress[category].incorrect += Number(parsedSatResults[category]?.incorrect || 0);
                console.log(`Category: ${category}, Updated SAT progress - Correct: ${satProgress[category].correct}, Incorrect: ${satProgress[category].incorrect}`);
            });

            localStorage.setItem("satProgress", JSON.stringify(satProgress));
            console.log("Updated satProgress:", satProgress);

            localStorage.removeItem("satTestResults");
            console.log("Cleared satTestResults from localStorage");

            progressItems.forEach(item => {
                let category = item.querySelector(".progress-label").textContent.toLowerCase().replace(/\s+/g, "-");
                console.log("Processing SAT category:", category);

                let progressBarElement = document.getElementById(`${category}-bar`);
                let progressTextElement = document.getElementById(`${category}-text`);
                console.log(`Bar element for ${category}:`, progressBarElement);
                console.log(`Text element for ${category}:`, progressTextElement);

                let categoryData = satProgress[category] || { correct: 0, incorrect: 0 };
                let total = categoryData.correct + categoryData.incorrect;
                let percentage = total > 0 ? Math.round((categoryData.correct / total) * 100) : 0;

                if (!categoryData) {
                    console.log(`No data found for category ${category}`);
                }

                if (progressBarElement) {
                    progressBarElement.style.width = `${percentage}%`;
                    progressBarElement.offsetHeight;
                } else {
                    console.warn(`Progress bar element not found for category ${category}. Expected ID: ${category}-bar`);
                }

                if (progressTextElement) {
                    let previousPercentage = historicalProgress[category]?.percentage || 0;
                    console.log(`SAT Category: ${category}, Previous Percentage: ${previousPercentage}, Current Percentage: ${percentage}`);

                    let arrow = "→";
                    let increased = percentage > previousPercentage;
                    let decreased = percentage < previousPercentage;
                    if (increased) {
                        arrow = "↑";
                    } else if (decreased) {
                        arrow = "↓";
                    }

                    if (increased) {
                        console.log(`SAT Category: ${category}, Arrow Set to ↑ (Increased)`);
                    } else if (decreased) {
                        console.log(`SAT Category: ${category}, Arrow Set to ↓ (Decreased)`);
                    } else {
                        console.log(`SAT Category: ${category}, Arrow Set to → (No Change)`);
                    }

                    let arrowColor = increased ? "green" : decreased ? "red" : "#4e5163";
                    progressTextElement.innerHTML = `${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`;
                    progressTextElement.offsetHeight;
                    console.log(`Updated SAT ${category} - Bar width: ${percentage}%, Text: ${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`);
                } else {
                    console.log(`Text element not found for ${category}`);
                }

                historicalProgress[category] = { percentage };
            });

            console.log("Saving satHistoricalProgress:", historicalProgress);
            localStorage.setItem("satHistoricalProgress", JSON.stringify(historicalProgress));
            console.log("Updated satHistoricalProgress:", historicalProgress);

            satSection.style.display = "block";
            console.log("SAT progress container made visible in SAT section");
        }

        // Process GED progress
        let gedTestResults = localStorage.getItem("gedTestResults");
        console.log("Retrieved gedTestResults from localStorage:", gedTestResults);

        let parsedGedResults = gedTestResults ? JSON.parse(gedTestResults) : {};
        console.log("Parsed gedTestResults:", parsedGedResults);
        console.log("All GED categories and their scores:", parsedGedResults);

        let gedSection = document.getElementById("ged-progress-container");
        console.log("GED section element:", gedSection);
        console.log("Is GED section active?", gedSection && !gedSection.classList.contains("hidden"));

        if (gedSection && !gedSection.classList.contains("hidden")) {
            let progressItems = gedSection.querySelectorAll(".progress-item");
            console.log("Found GED progress items:", progressItems.length);

            let historicalProgress = JSON.parse(localStorage.getItem("gedHistoricalProgress")) || {};
            let gedProgress = JSON.parse(localStorage.getItem("gedProgress")) || {};
            console.log("Loaded gedHistoricalProgress before update:", historicalProgress);
            console.log("Loaded gedProgress before update:", gedProgress);

            Object.keys(parsedGedResults).forEach(category => {
                if (!gedProgress[category]) {
                    gedProgress[category] = { correct: 0, incorrect: 0 };
                }
                gedProgress[category].correct += Number(parsedGedResults[category]?.correct || 0);
                gedProgress[category].incorrect += Number(parsedGedResults[category]?.incorrect || 0);
                console.log(`Category: ${category}, Updated GED progress - Correct: ${gedProgress[category].correct}, Incorrect: ${gedProgress[category].incorrect}`);
            });

            localStorage.setItem("gedProgress", JSON.stringify(gedProgress));
            console.log("Updated gedProgress:", gedProgress);

            localStorage.removeItem("gedTestResults");
            console.log("Cleared gedTestResults from localStorage");

            progressItems.forEach(item => {
                let displayCategory = item.querySelector(".progress-label").textContent.toLowerCase().replace(/\s+/g, "-");
                let category = `ged-${displayCategory}`; // Add ged- prefix for GED categories
                console.log("Processing GED category:", category);

                let progressBarElement = document.getElementById(`${category}-bar`);
                let progressTextElement = document.getElementById(`${category}-text`);
                console.log(`Bar element for ${category}:`, progressBarElement);
                console.log(`Text element for ${category}:`, progressTextElement);

                let categoryData = gedProgress[category] || { correct: 0, incorrect: 0 };
                let total = categoryData.correct + categoryData.incorrect;
                let percentage = total > 0 ? Math.round((categoryData.correct / total) * 100) : 0;

                if (!categoryData) {
                    console.log(`No data found for category ${category}`);
                }

                if (progressBarElement) {
                    progressBarElement.style.width = `${percentage}%`;
                    progressBarElement.offsetHeight;
                } else {
                    console.warn(`Progress bar element not found for category ${category}. Expected ID: ${category}-bar`);
                }

                if (progressTextElement) {
                    let previousPercentage = historicalProgress[category]?.percentage || 0;
                    console.log(`GED Category: ${category}, Previous Percentage: ${previousPercentage}, Current Percentage: ${percentage}`);

                    let arrow = "→";
                    let increased = percentage > previousPercentage;
                    let decreased = percentage < previousPercentage;
                    if (increased) {
                        arrow = "↑";
                    } else if (decreased) {
                        arrow = "↓";
                    }

                    if (increased) {
                        console.log(`GED Category: ${category}, Arrow Set to ↑ (Increased)`);
                    } else if (decreased) {
                        console.log(`GED Category: ${category}, Arrow Set to ↓ (Decreased)`);
                    } else {
                        console.log(`GED Category: ${category}, Arrow Set to → (No Change)`);
                    }

                    let arrowColor = increased ? "green" : decreased ? "red" : "#4e5163";
                    progressTextElement.innerHTML = `${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`;
                    progressTextElement.offsetHeight;
                    console.log(`Updated GED ${category} - Bar width: ${percentage}%, Text: ${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`);
                } else {
                    console.log(`Text element not found for ${category}`);
                }

                historicalProgress[category] = { percentage };
            });

            console.log("Saving gedHistoricalProgress:", historicalProgress);
            localStorage.setItem("gedHistoricalProgress", JSON.stringify(historicalProgress));
            console.log("Updated gedHistoricalProgress:", historicalProgress);

            gedSection.style.display = "block";
            console.log("GED progress container made visible in GED section");
        }
    }

    // Event Listeners
    document.addEventListener("DOMContentLoaded", () => updateProgress("DOMContentLoaded"));

    window.addEventListener("testSubmitted", () => {
        console.log("Test submitted, updating progress...");
        updateProgress("testSubmitted");
    });

    document.querySelectorAll(".button-30").forEach(button => {
        button.addEventListener("click", () => {
            setTimeout(() => {
                const actSection = document.querySelector("#act-progress-container");
                const satSection = document.querySelector("#sat-progress-container");
                const gedSection = document.querySelector("#ged-progress-container");
                const isActSectionActive = actSection && !actSection.classList.contains("hidden");
                const isSatSectionActive = satSection && !satSection.classList.contains("hidden");
                const isGedSectionActive = gedSection && !gedSection.classList.contains("hidden");
                console.log("Button clicked - Is ACT section active?", isActSectionActive);
                console.log("Button clicked - Is SAT section active?", isSatSectionActive);
                console.log("Button clicked - Is GED section active?", isGedSectionActive);

                if (isActSectionActive || isSatSectionActive || isGedSectionActive) {
                    updateProgress("tabSwitch");
                }
            }, 100);
        });
    });
});