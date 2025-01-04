let diagramData = "graph TD\n"; // Initialize diagram data with a newline
let nodeHandlers = {}; // Store click handlers for each node
let currentNodes = []; // Track output nodes for the next machine

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
    const machineNode = `${machineName}[${machineName}: ${inputMaterial}]:::clickable\n`;
    diagramData += machineNode;

    // Connect to all current nodes (outputs from the previous step)
    currentNodes.forEach(node => {
        diagramData += `${node} --> ${machineName}\n`;
    });

    // Add outputs and update current nodes
    currentNodes = [];
    outputDetails.forEach((output, index) => {
        const outputNode = `${machineName}_output${index + 1}[${output}]:::clickable\n`;
        diagramData += `${machineName} --> ${outputNode}`;
        diagramData += "\n"; // Add newline for Mermaid compatibility
        currentNodes.push(outputNode); // Save output nodes as potential inputs

        // Register click handler for the output node
        nodeHandlers[outputNode] = () => handleNodeClick(outputNode, output);
    });

    // Render the diagram
    renderDiagram();

    // Clear form inputs
    document.getElementById("machineForm").reset();
}

function handleNodeClick(nodeId, material) {
    const clickedNode = nodeId.split("[")[0]; // Extract the node identifier
    const machineName = prompt("Enter the new machine name for this node:");
    const numOutputs = parseInt(prompt(`Enter the number of outputs for ${machineName}:`));
    const outputDetails = prompt("Enter the output details (comma-separated):").split(",");

    if (outputDetails.length !== numOutputs) {
        alert("Number of outputs and details do not match!");
        return;
    }

    // Add the new machine node
    const newMachineNode = `${machineName}[${machineName}: ${material}]:::clickable\n`;
    diagramData += `${clickedNode} --> ${machineName}\n`;
    diagramData += newMachineNode;

    // Add outputs for the new machine
    currentNodes = []; // Reset current nodes for the new outputs
    outputDetails.forEach((output, index) => {
        const outputNode = `${machineName}_output${index + 1}[${output}]:::clickable\n`;
        diagramData += `${machineName} --> ${outputNode}\n`;
        currentNodes.push(outputNode); // Update current nodes

        // Register click handler for the new output node
        nodeHandlers[outputNode] = () => handleNodeClick(outputNode, output);
    });

    // Render the updated diagram
    renderDiagram();
}

function renderDiagram() {
    const diagramContainer = document.getElementById("diagram");
    diagramContainer.innerHTML = diagramData; // Inject the updated diagram data
    mermaid.init(undefined, diagramContainer); // Reinitialize Mermaid

    // Attach click handlers to rendered nodes
    Object.keys(nodeHandlers).forEach(nodeId => {
        const nodeElement = document.querySelector(`[id*="${nodeId.split("[")[0]}"]`);
        if (nodeElement) {
            nodeElement.style.cursor = "pointer";
            nodeElement.onclick = nodeHandlers[nodeId];
        }
    });
}
