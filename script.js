let diagramData = "graph TD\n"; // Initialize the Mermaid diagram

function drawMachine() {
    const machineName = document.getElementById("machineName").value.trim();
    const inputMaterial = document.getElementById("inputMaterial").value.trim();
    const numOutputs = parseInt(document.getElementById("numOutputs").value);
    const outputDetails = document.getElementById("outputDetails").value.split(",").map(o => o.trim());

    // Validation
    if (outputDetails.length !== numOutputs) {
        alert("The number of outputs does not match the output details!");
        return;
    }

    // Create the machine node
    diagramData += `${machineName}[${machineName}: ${inputMaterial}]\n`;

    // Add outputs and connect them to the machine
    outputDetails.forEach((output, index) => {
        const outputNode = `${machineName}_output${index + 1}[${output}]`;
        diagramData += `${machineName} --> ${outputNode}\n`;
    });

    // Render the diagram
    renderDiagram();

    // Clear form inputs
    document.getElementById("machineForm").reset();
}

function renderDiagram() {
    const diagramContainer = document.getElementById("diagram");
    diagramContainer.innerHTML = diagramData; // Update the Mermaid diagram data
    mermaid.init(undefined, diagramContainer); // Re-render the diagram
}
