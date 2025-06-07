function saveTestResults(examType, progressKey, testResults) {
    console.log(`Saving ${examType} test results...`);
    
    // Load existing progress
    let storedProgress = JSON.parse(localStorage.getItem(progressKey)) || {};
    let previousProgress = JSON.parse(localStorage.getItem("previousTestResults")) || {};

    // Initialize categories
    Object.keys(testResults).forEach(category => {
        if (!storedProgress[category]) {
            storedProgress[category] = { correct: 0, incorrect: 0 };
        }
        storedProgress[category].correct += Number(testResults[category]?.correct || 0);
        storedProgress[category].incorrect += Number(testResults[category]?.incorrect || 0);
    });

    // Update previous progress with current percentages
    Object.keys(storedProgress).forEach(category => {
        const correct = storedProgress[category].correct;
        const incorrect = storedProgress[category].incorrect;
        const total = correct + incorrect;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        previousProgress[category] = { percentage };
    });

    // Save to localStorage
    localStorage.setItem(progressKey, JSON.stringify(storedProgress));
    localStorage.setItem("testResults", JSON.stringify(testResults));
    localStorage.setItem("previousTestResults", JSON.stringify(previousProgress));
    localStorage.setItem("lastActivity", JSON.stringify({ exam: examType, type: "test", timestamp: Date.now() }));

    console.log(`${examType} Test Results Saved:`, testResults);
    console.log(`${examType} Updated Progress:`, storedProgress);
    console.log(`${examType} Updated Previous Progress:`, previousProgress);
}