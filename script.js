let projects = JSON.parse(localStorage.getItem("landProjects")) || [];


/* =========================
   PREDICT DELAY
========================= */

function predictDelay() {

    const projectId = document.getElementById("projectId").value.trim();
    const projectName = document.getElementById("projectName").value.trim();
    const location = document.getElementById("location").value.trim();
    const officer = document.getElementById("officer").value.trim();

    const landArea = Number(
        document.getElementById("landArea").value
    );

    const documents = Number(
        document.getElementById("documents").value
    );

    const approval = Number(
        document.getElementById("approval").value
    );


    /* VALIDATION */

    if (
        !projectId ||
        !projectName ||
        !location ||
        !officer ||
        !landArea ||
        isNaN(documents) ||
        isNaN(approval)
    ) {

        alert(
            "Please enter all project details before prediction."
        );

        return;
    }


    if (
        documents < 0 ||
        documents > 100 ||
        approval < 0 ||
        approval > 100
    ) {

        alert(
            "Documents and Approval must be between 0 and 100."
        );

        return;
    }


    /* =========================
       RISK CALCULATION
    ========================= */

    const completionScore =
        (documents + approval) / 2;


    let risk;
    let riskPercentage;
    let delayDays;
    let recommendation;


    if (completionScore < 40) {

        risk = "HIGH";
        riskPercentage = 80 + Math.round(
            (40 - completionScore) / 2
        );

        delayDays = 30;

        recommendation =
            "Immediate action required. Complete pending documents and speed up approval processing.";

    }

    else if (completionScore < 70) {

        risk = "MEDIUM";
        riskPercentage = 50 + Math.round(
            (70 - completionScore) / 2
        );

        delayDays = 15;

        recommendation =
            "Follow up on pending documents and approval procedures to avoid further delay.";

    }

    else {

        risk = "LOW";
        riskPercentage = Math.max(
            10,
            40 - Math.round(completionScore - 70)
        );

        delayDays = 5;

        recommendation =
            "Project is progressing well. Continue regular monitoring.";

    }


    /* =========================
       SAVE PROJECT
    ========================= */

    const project = {

        id: projectId,
        name: projectName,
        location: location,
        officer: officer,
        landArea: landArea,

        documents: documents,
        approval: approval,

        risk: risk,
        riskPercentage: riskPercentage,

        delayDays: delayDays,

        date: new Date().toLocaleDateString()

    };


    projects.push(project);


    localStorage.setItem(
        "landProjects",
        JSON.stringify(projects)
    );


    /* =========================
       SHOW RESULT
    ========================= */

    document.getElementById("result").style.display =
        "block";


    document.getElementById("risk").innerHTML =
        "⚠️ <strong>Risk Level:</strong> " +
        risk +
        " (" +
        riskPercentage +
        "%)";


    document.getElementById("delay").innerHTML =
        "⏳ <strong>Estimated Delay:</strong> " +
        delayDays +
        " days";


    document.getElementById("recommendation").innerHTML =
        "💡 <strong>AI Recommendation:</strong> " +
        recommendation;


    /* =========================
       PROGRESS
    ========================= */

    document.getElementById(
        "documentProgress"
    ).innerText = documents + "%";


    document.getElementById(
        "documentBar"
    ).style.width = documents + "%";


    document.getElementById(
        "approvalProgress"
    ).innerText = approval + "%";


    document.getElementById(
        "approvalBar"
    ).style.width = approval + "%";


    /* =========================
       SMART ALERT
    ========================= */

    let alertMessage =
        "✅ No critical alerts. Project is being monitored.";

    if (risk === "HIGH") {

        alertMessage =
            "🚨 HIGH RISK: " +
            projectName +
            " may face approximately " +
            delayDays +
            " days of delay. Immediate action recommended.";

    }

    else if (risk === "MEDIUM") {

        alertMessage =
            "⚠️ MEDIUM RISK: " +
            projectName +
            " needs follow-up on pending activities.";

    }


    document.getElementById(
        "alertMessage"
    ).innerText = alertMessage;


    /* =========================
       UPDATE DASHBOARD
    ========================= */

    updateDashboard();


    /* =========================
       UPDATE HISTORY
    ========================= */

    updateHistory();


    /* =========================
       CLEAR FORM
    ========================= */

    document.getElementById(
        "projectId"
    ).value = "";

    document.getElementById(
        "projectName"
    ).value = "";

    document.getElementById(
        "location"
    ).value = "";

    document.getElementById(
        "officer"
    ).value = "";

    document.getElementById(
        "landArea"
    ).value = "";

    document.getElementById(
        "documents"
    ).value = "";

    document.getElementById(
        "approval"
    ).value = "";

}


/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    const total =
        projects.length;

    const high =
        projects.filter(
            p => p.risk === "HIGH"
        ).length;

    const medium =
        projects.filter(
            p => p.risk === "MEDIUM"
        ).length;

    const low =
        projects.filter(
            p => p.risk === "LOW"
        ).length;


    document.getElementById(
        "totalProjects"
    ).innerText = total;


    document.getElementById(
        "highRisk"
    ).innerText = high;


    document.getElementById(
        "mediumRisk"
    ).innerText = medium;


    document.getElementById(
        "lowRisk"
    ).innerText = low;

}


/* =========================
   PROJECT HISTORY
========================= */

function updateHistory() {

    const table =
        document.getElementById(
            "historyTable"
        );


    if (projects.length === 0) {

        table.innerHTML =
            `
            <tr>
                <td colspan="5">
                    No projects yet
                </td>
            </tr>
            `;

        return;
    }


    table.innerHTML = "";


    projects
        .slice()
        .reverse()
        .forEach(project => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${project.id}</td>

                <td>${project.name}</td>

                <td>${project.location}</td>

                <td>
                    ${project.risk}
                    (${project.riskPercentage}%)
                </td>

                <td>
                    ${project.delayDays} days
                </td>

            `;


            table.appendChild(row);

        });

}


/* =========================
   LOAD SAVED DATA
========================= */

updateDashboard();

updateHistory();
function filterProjects() {

    const search =
        document.getElementById("searchProject")
        .value
        .toLowerCase();

    const risk =
        document.getElementById("riskFilter")
        .value;

    const filtered = projects.filter(project => {

        const matchesSearch =
            project.id.toLowerCase().includes(search) ||
            project.name.toLowerCase().includes(search);

        const matchesRisk =
            risk === "ALL" ||
            project.risk === risk;

        return matchesSearch && matchesRisk;
    });

    const table =
        document.getElementById("historyTable");

    if (filtered.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No matching projects found
                </td>
            </tr>
        `;

        return;
    }

    table.innerHTML = "";

    filtered
        .slice()
        .reverse()
        .forEach(project => {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${project.id}</td>
                <td>${project.name}</td>
                <td>${project.location}</td>
                <td>
                    ${project.risk}
                    (${project.riskPercentage}%)
                </td>
                <td>
                    ${project.delayDays} days
                </td>
            `;

            table.appendChild(row);
        });
}
