let diagramData = "graph TD\n"; // Initialize diagram data
let currentNodes = []; // Track the last created nodes (outputs or machines)
let nodeHandlers = {}; // Store click handlers for each node

function addMachine() {
    const machineName = document.getElementById("machineName").value;
    const inputMaterial = document.getElementById("inputMaterial").value;
    const numOutputs = parseInt(document.getElementById("numOutputs").value);
    const outputDetails = document.getElementById("outputDetails").value.split(",");

    if (outputDetails.length !== numOutputs) {
        alert("Number of outputs and details do not match!");
        return;
    }

    // Add machine node with clickable class
    const machineNode = `${machineName}[${machineName}: ${inputMaterial}]:::clickable`;
    diagramData += `${machineNode}\n`;

    // Add outputs and update current nodes
    currentNodes = [];
    outputDetails.forEach((output, index) => {
        const outputNode = `${machineName}_output${index + 1}[${output}]:::clickable`;
        diagramData += `${machineName} --> ${outputNode}\n`;
        currentNodes.push(outputNode); // Save output nodes as potential new inputs

        // Register click handler for the output node
        nodeHandlers[outputNode] = () => handleNodeClick(outputNode);
    });

    // Render the diagram
    renderDiagram();

    // Clear form inputs
    document.getElementById("machineForm").reset();
}

function handleNodeClick(nodeId) {
    const clickedNode = nodeId.split("[")[0]; // Get the node identifier
    const machineName = prompt("Enter the new machine name for this node:");
    const inputMaterial = prompt("Enter the input material for this machine:");
    const numOutputs = parseInt(prompt("Enter the number of outputs:"));
    const outputDetails = prompt("Enter the output details (comma-separated):").split(",");

    if (outputDetails.length !== numOutputs) {
        alert("Number of outputs and details do not match!");
        return;
    }

    // Add the new machine node
    const newMachineNode = `${machineName}[${machineName}: ${inputMaterial}]:::clickable`;
    diagramData += `${clickedNode} --> ${newMachineNode}\n`;

    // Add outputs for the new machine
    outputDetails.forEach((output, index) => {
        const outputNode = `${machineName}_output${index + 1}[${output}]:::clickable`;
        diagramData += `${machineName} --> ${outputNode}\n`;

        // Register click handler for the new output node
        nodeHandlers[outputNode] = () => handleNodeClick(outputNode);
    });

    // Render the updated diagram
    renderDiagram();
}

function renderDiagram() {
    const diagramContainer = document.getElementById("diagram");
    diagramContainer.innerHTML = diagramData;
    mermaid.init(undefined, diagramContainer);

    // Add click handlers to the rendered nodes
    Object.keys(nodeHandlers).forEach(nodeId => {
        const nodeElement = document.querySelector(`[id*="${nodeId.split("[")[0]}"]`);
        if (nodeElement) {
            nodeElement.style.cursor = "pointer";
            nodeElement.onclick = nodeHandlers[nodeId];
        }
    });
}
