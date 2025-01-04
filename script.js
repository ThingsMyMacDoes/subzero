let diagramData = "graph TD\n"; // Initialize diagram data
let lastMachine = ""; // Keep track of the last machine for connections

function addMachine() {
    const machineName = document.getElementById("machineName").value;
    const inputMaterial = document.getElementById("inputMaterial").value;
    const numOutputs = parseInt(document.getElementById("numOutputs").value);
    const outputDetails = document.getElementById("outputDetails").value.split(",");

    if (outputDetails.length !== numOutputs) {
        alert("Number of outputs and details do not match!");
        return;
    }

    // Add machine node
    diagramData += `${machineName}[${machineName}: ${inputMaterial}]\n`;

    // Connect to previous machine if applicable
    if (lastMachine) {
        diagramData += `${lastMachine} --> ${machineName}\n`;
    }

    // Add outputs
    outputDetails.forEach((output, index) => {
        const outputNode = `${machineName}_output${index + 1}[${output}]`;
        diagramData += `${machineName} --> ${outputNode}\n`;
    });

    lastMachine = machineName; // Update last machine

    // Render the diagram
    renderDiagram();
}

function renderDiagram() {
    const diagramContainer = document.getElementById("diagram");
    diagramContainer.innerHTML = diagramData;
    mermaid.init(undefined, diagramContainer);
}
