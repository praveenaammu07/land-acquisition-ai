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

    if (approval < 50) {
        risk += 40;
    }

    let result = "";

    if (risk >= 70) {
        result = "⚠️ High Risk of Delay";
    } 
    else if (risk >= 40) {
        result = "🟡 Medium Risk of Delay";
    } 
    else {
        result = "🟢 Low Risk of Delay";
    }

    document.getElementById("result").innerHTML =
        "Prediction: " + result;
}
