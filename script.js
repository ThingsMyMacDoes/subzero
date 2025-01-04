let diagramData = "graph TD\n"; // Initialize diagram data
let currentNodes = []; // To track the last created nodes (outputs or machine)

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

    // Connect to all current nodes (outputs from the previous step)
    currentNodes.forEach(node => {
        diagramData += `${node} --> ${machineName}\n`;
    });

    // Add outputs and update current nodes
    currentNodes = [];
    outputDetails.forEach((output, index) => {
        const outputNode = `${machineName}_output${index + 1}[${output}]`;
        diagramData += `${machineName} --> ${outputNode}\n`;
        currentNodes.push(outputNode); // Save output nodes as potential new inputs
    });

    // Render the diagram
    renderDiagram();

    // Clear form inputs
    document.getElementById("machineForm").reset();
}

function renderDiagram() {
    const diagramContainer = document.getElementById("diagram");
    diagramContainer.innerHTML = diagramData;
    mermaid.init(undefined, diagramContainer);
}
