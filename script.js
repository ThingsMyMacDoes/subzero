let diagramData = "graph TD\n"; // Initialize Mermaid graph data
let nodeList = []; // List of all output nodes

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
    diagramData += `${machineNodeId}[${machineNodeLabel}]\n`;

    // Add outputs
    outputDetails.forEach((output, index) => {
        const outputNodeId = `${machineNodeId}_output${index + 1}`;
        const outputNodeLabel = `${machineName}: ${inputMaterial} → ${output}`;
        diagramData += `${machineNodeId} --> ${outputNodeId}[${outputNodeLabel}]\n`;

        // Add output node to the dropdown list
        nodeList.push({ id: outputNodeId, label: outputNodeLabel });
    });

    renderDiagram();
    updateNodeSelector();

    // Show the add-machine section for subsequent machines
    document.getElementById("addMachineSection").style.display = "block";

    // Clear form inputs
    document.getElementById("machineForm").reset();
}

// Adds a machine to a selected output node
function addMachineToNode() {
    const selectedNode = document.getElementById("nodeSelector").value;
    const newMachineName = document.getElementById("newMachineName").value.trim();
    const numOutputs = parseInt(document.getElementById("newNumOutputs").value);
    const outputDetails = document.getElementById("newOutputDetails").value.split(",").map(o => o.trim());

    if (!selectedNode) {
        alert("Please select a node to connect!");
        return;
    }

    if (!newMachineName || outputDetails.length !== numOutputs) {
        alert("Invalid inputs!");
        return;
    }

    // Get the input material from the selected node
    const inputMaterial = nodeList.find(node => node.id === selectedNode).label.split("→")[1].trim();

    // Add the new machine node
    const newMachineNodeId = newMachineName;
    const newMachineNodeLabel = `${newMachineName}: ${inputMaterial}`;
    diagramData += `${selectedNode} --> ${newMachineNodeId}[${newMachineNodeLabel}]\n`;

    // Add outputs for the new machine
    outputDetails.forEach((output, index) => {
        const outputNodeId = `${newMachineNodeId}_output${index + 1}`;
        const outputNodeLabel = `${newMachineName}: ${inputMaterial} → ${output}`;
        diagramData += `${newMachineNodeId} --> ${outputNodeId}[${outputNodeLabel}]\n`;

        // Add output node to the dropdown list
        nodeList.push({ id: outputNodeId, label: outputNodeLabel });
    });

    renderDiagram();
    updateNodeSelector();

    // Clear form inputs
    document.getElementById("newMachineName").value = "";
    document.getElementById("newNumOutputs").value = "";
    document.getElementById("newOutputDetails").value = "";
}

// Updates the node dropdown with all available output nodes
function updateNodeSelector() {
    const nodeSelector = document.getElementById("nodeSelector");
    nodeSelector.innerHTML = ""; // Clear previous options

    nodeList.forEach(node => {
        const option = document.createElement("option");
        option.value = node.id;
        option.textContent = node.label;
        nodeSelector.appendChild(option);
    });
}

// Renders the diagram
function renderDiagram() {
    const diagramContainer = document.getElementById("diagram");

    // Clear existing content
    diagramContainer.innerHTML = "";

    // Reinsert updated Mermaid diagram
    diagramContainer.innerHTML = `<div class="mermaid">${diagramData}</div>`;

    // Debugging output (optional)
    console.log("Rendering Diagram with Data:", diagramData);

    // Reinitialize Mermaid
    mermaid.init(undefined, diagramContainer);
}
