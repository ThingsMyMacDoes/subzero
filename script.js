let diagramData = "graph TD\n"; // Initialize the Mermaid diagram
let nodeHandlers = {}; // Store click handlers for each node

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
    const machineNodeId = machineName;
    const machineNodeLabel = `${machineName}: ${inputMaterial}`;
    diagramData += `${machineNodeId}[${machineNodeLabel}]:::clickable\n`;

    // Add outputs and connect them to the machine
    outputDetails.forEach((output, index) => {
        const outputNodeId = `${machineNodeId}_output${index + 1}`;
        const outputNodeLabel = `${machineName}: ${inputMaterial} → ${output}`;
        diagramData += `${machineNodeId} --> ${outputNodeId}[${outputNodeLabel}]:::clickable\n`;

        // Register a click handler for the output node
        nodeHandlers[outputNodeId] = () => handleNodeClick(outputNodeId, output);
    });

    // Render the diagram
    renderDiagram();

    // Clear form inputs
    document.getElementById("machineForm").reset();
}

function handleNodeClick(nodeId, outputMaterial) {
    const newMachineName = prompt("Enter the new machine name:");
    const numOutputs = parseInt(prompt("Enter the number of outputs:"));
    const outputDetails = prompt("Enter the output details (comma-separated):").split(",").map(o => o.trim());

    // Validation
    if (outputDetails.length !== numOutputs) {
        alert("The number of outputs does not match the output details!");
        return;
    }

    // Create the new machine node
    const newMachineNodeId = newMachineName;
    const newMachineNodeLabel = `${newMachineName}: ${outputMaterial}`;
    diagramData += `${nodeId} --> ${newMachineNodeId}[${newMachineNodeLabel}]:::clickable\n`;

    // Add outputs for the new machine
    outputDetails.forEach((output, index) => {
        const newOutputNodeId = `${newMachineNodeId}_output${index + 1}`;
        const newOutputNodeLabel = `${newMachineName}: ${outputMaterial} → ${output}`;
        diagramData += `${newMachineNodeId} --> ${newOutputNodeId}[${newOutputNodeLabel}]:::clickable\n`;

        // Register a click handler for the new output node
        nodeHandlers[newOutputNodeId] = () => handleNodeClick(newOutputNodeId, output);
    });

    // Render the updated diagram
    renderDiagram();
}

function renderDiagram() {
    const diagramContainer = document.getElementById("diagram");
    diagramContainer.innerHTML = diagramData; // Update the Mermaid diagram data
    mermaid.init(undefined, diagramContainer); // Re-render the diagram

    // Attach click handlers and change color on click
    Object.keys(nodeHandlers).forEach(nodeId => {
        const nodeElement = document.querySelector(`[id*="${nodeId}"]`);
        if (nodeElement) {
            nodeElement.style.cursor = "pointer";
            nodeElement.onclick = () => {
                nodeElement.style.fill = "#ffcccb"; // Change node color
                nodeHandlers[nodeId](); // Call the click handler
            };
        }
    });
}
