let diagramData = "graph TD\n"; // Initialize Mermaid graph data
let nodeHandlers = {}; // Stores click handlers for each node
let lastNodeId = null; // Track the last added node ID

// Adds the first machine to the diagram
function addFirstMachine() {
    const machineName = document.getElementById("machineName").value.trim();
    const inputMaterial = document.getElementById("inputMaterial").value.trim();
    const numOutputs = parseInt(document.getElementById("numOutputs").value);
    const outputDetails = document.getElementById("outputDetails").value.split(",").map(o => o.trim());

    if (outputDetails.length !== numOutputs) {
        alert("The number of outputs does not match the output details!");
        return;
    }

    // Add the first machine node
    const machineNodeId = machineName;
    const machineNodeLabel = `${machineName}: ${inputMaterial}`;
    diagramData += `${machineNodeId}[${machineNodeLabel}]:::clickable\n`;

    // Add outputs
    outputDetails.forEach((output, index) => {
        const outputNodeId = `${machineNodeId}_output${index + 1}`;
        const outputNodeLabel = `${machineName}: ${inputMaterial} → ${output}`;
        diagramData += `${machineNodeId} --> ${outputNodeId}[${outputNodeLabel}]:::clickable\n`;

        // Register click handler for the output node
        nodeHandlers[outputNodeId] = () => handleNodeClick(outputNodeId, output);
    });

    lastNodeId = machineNodeId; // Set last added node
    renderDiagram();

    // Clear form inputs
    document.getElementById("machineForm").reset();
}

// Handles clicking a node
function handleNodeClick(nodeId, inputMaterial) {
    const newMachineName = prompt("Enter the new machine name:", "");
    const numOutputs = parseInt(prompt("Enter the number of outputs:", ""));
    const outputDetails = prompt("Enter the output details (comma-separated):", "").split(",").map(o => o.trim());

    if (!newMachineName || outputDetails.length !== numOutputs) {
        alert("Invalid inputs!");
        return;
    }

    // Create the new machine node
    const newMachineNodeId = newMachineName;
    const newMachineNodeLabel = `${newMachineName}: ${inputMaterial}`;
    diagramData += `${nodeId} --> ${newMachineNodeId}[${newMachineNodeLabel}]:::clickable\n`;

    // Add outputs for the new machine
    outputDetails.forEach((output, index) => {
        const newOutputNodeId = `${newMachineNodeId}_output${index + 1}`;
        const newOutputNodeLabel = `${newMachineName}: ${inputMaterial} → ${output}`;
        diagramData += `${newMachineNodeId} --> ${newOutputNodeId}[${newOutputNodeLabel}]:::clickable\n`;

        // Register a click handler for the new output node
        nodeHandlers[newOutputNodeId] = () => handleNodeClick(newOutputNodeId, output);
    });

    renderDiagram();
}

// Renders the diagram and attaches click handlers
function renderDiagram() {
    const diagramContainer = document.getElementById("diagram");
    diagramContainer.innerHTML = diagramData;
    mermaid.init(undefined, diagramContainer);

    // Attach click handlers to nodes
    setTimeout(() => {
        Object.keys(nodeHandlers).forEach(nodeId => {
            const nodeElement = document.querySelector(`[id*="${nodeId}"]`);
            if (nodeElement) {
                nodeElement.style.cursor = "pointer";
                nodeElement.onclick = () => {
                    nodeElement.style.fill = "#ffcccb"; // Change color
                    nodeHandlers[nodeId](); // Trigger the node handler
                };
            }
        });
    }, 500); // Delay to allow Mermaid rendering
}
