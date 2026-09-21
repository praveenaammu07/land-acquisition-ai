let totalProjects = 0;
let highRisk = 0;
let mediumRisk = 0;
let lowRisk = 0;

function predictDelay() {

    const landArea = Number(document.getElementById("landArea").value);
    const documents = Number(document.getElementById("documents").value);
    const approval = Number(document.getElementById("approval").value);

    if (!landArea || documents < 0 || approval < 0) {
        alert("Please enter valid project details.");
        return;
    }

    if (documents > 100 || approval > 100) {
        alert("Percentage must be between 0 and 100.");
        return;
    }

    /*
       Simple risk calculation for the hackathon demo.
       Lower document/approval completion = higher risk.
    */

    const completionScore = (documents + approval) / 2;

    let risk;
    let delayDays;
    let recommendation;

    if (completionScore < 40) {

        risk = "HIGH";
        delayDays = 30;
        highRisk++;

        recommendation =
            "⚠️ Immediate action required. Complete pending documents and approvals.";

    } else if (completionScore < 70) {

        risk = "MEDIUM";
        delayDays = 15;
        mediumRisk++;

        recommendation =
            "⚠️ Follow up on pending documents and approval processes.";

    } else {

        risk = "LOW";
        delayDays = 5;
        lowRisk++;

        recommendation =
            "✅ Project is progressing well. Continue monitoring the process.";
    }

    totalProjects++;

    document.getElementById("totalProjects").innerText = totalProjects;
    document.getElementById("highRisk").innerText = highRisk;
    document.getElementById("mediumRisk").innerText = mediumRisk;
    document.getElementById("lowRisk").innerText = lowRisk;

    document.getElementById("result").style.display = "block";

    document.getElementById("risk").innerHTML =
        "<strong>Risk Level:</strong> " + risk;

    document.getElementById("delay").innerHTML =
        "<strong>Estimated Delay:</strong> " + delayDays + " days";

    document.getElementById("recommendation").innerHTML =
        "<strong>Recommendation:</strong> " + recommendation;
}
