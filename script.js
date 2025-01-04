let diagramData = "graph TD\n"; // Initialize the graph
let nodeHandlers = {}; // Store click handlers for each node
let currentNodes = []; // Track the last created output nodes

function addMachine() {
    const machineName = document.getElementById("machineName").value;
    const inputMaterial = document.getElementById("inputMaterial").value;
    const numOutputs = parseInt(document.getElementById("numOutputs").value);
    const outputDetails = document.getElementById("outputDetails").value.split(",");

    if (outputDetails.length !== numOutputs) {
        alert("Number of outputs and details do not match!");
        return;
    }

    // Create machine node
    const machineNode = `${machineName}[${machineName}: ${inputMaterial}]:::clickable\n`;
    diagramData += machineNode;

    // Connect to current nodes (outputs of the previous machine)
    if (currentNodes.length > 0) {
        currentNodes.forEach(node => {
            diagramData += `${node} --> ${machineName}\n`;
        });
    }

    // Reset currentNodes and add new outputs
    currentNodes = [];
    outputDetails.forEach((output, index) => {
        const outputNode = `${machineName}_output${index + 1}[${output}]:::clickable\n`;
        diagramData += `${machineName} --> ${outputNode}`;
        diagramData += "\n"; // Add newline for Mermaid compatibility
        currentNodes.push(outputNode); // Update the current nodes

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

    // Add new machine node
    const newMachineNode = `${machineName}[${machineName}: ${material}]:::clickable\n`;
    diagramData += `${clickedNode} --> ${machineName}\n`;
    diagramData += newMachineNode;

    // Add outputs for the new machine
    const newOutputNodes = [];
    outputDetails.forEach((output, index) => {
        const outputNode = `${machineName}_output${index + 1}[${output}]:::clickable\n`;
        diagramData += `${machineName} --> ${outputNode}\n`;
        newOutputNodes.push(outputNode);

        // Register click handler for the new output node
        nodeHandlers[outputNode] = () => handleNodeClick(outputNode, output);
    });

    // Update currentNodes to include only the new outputs
    currentNodes = newOutputNodes;

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
