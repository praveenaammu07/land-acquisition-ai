function predictDelay() {
    const landArea = Number(document.getElementById("landArea").value);
    const documents = Number(document.getElementById("documents").value);
    const approval = Number(document.getElementById("approval").value);

    let risk = 0;

    if (landArea > 10) {
        risk += 30;
    }

    if (documents < 70) {
        risk += 30;
    }

    if (approval < 60) {
        risk += 30;
    }

    if (risk >= 60) {
        showResult("High Risk", risk);
    } else if (risk >= 30) {
        showResult("Medium Risk", risk);
    } else {
        showResult("Low Risk", risk);
    }
}

function showResult(level, score) {
    const result = document.getElementById("result");

    result.innerHTML = `
        <h2>Prediction Result</h2>
        <p><strong>Delay Risk:</strong> ${level}</p>
        <p><strong>Risk Score:</strong> ${score}%</p>
        <p>Early detection can help authorities take preventive action.</p>
    `;
}
