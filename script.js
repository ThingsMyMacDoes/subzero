let diagramData = "graph TD\n"; // Initialize diagram data

// Function to draw the machine flowchart
function drawFlowchart() {
    // Define machine, input, and outputs
    const machine1 = {
        name: "Machine1",
        input: "MixedWaste",
        outputs: ["Metal", "Plastic"]
    };

    const machine2 = {
        name: "Machine2",
        input: "Metal",
        outputs: ["LargeMetal", "SmallMetal"]
    };

    const machine3 = {
        name: "Machine3",
        input: "Plastic",
        outputs: ["LightPlastic", "DarkPlastic"]
    };

    // Add first machine
    const machine1Label = `${machine1.name}: ${machine1.input}`;
    diagramData += `${machine1.name}[${machine1Label}]\n`;

    // Add outputs for the first machine
    const machine1Output1 = `${machine1.name}_output1`;
    const machine1Output2 = `${machine1.name}_output2`;
    diagramData += `${machine1.name} --> ${machine1Output1}[${machine1.name}: ${machine1.input} → ${machine1.outputs[0]}]\n`;
    diagramData += `${machine1.name} --> ${machine1Output2}[${machine1.name}: ${machine1.input} → ${machine1.outputs[1]}]\n`;

    // Add second machine (connected to first output of Machine1)
    const machine2Label = `${machine2.name}: ${machine2.input}`;
    diagramData += `${machine1Output1} --> ${machine2.name}[${machine2Label}]\n`;

    // Add outputs for the second machine
    const machine2Output1 = `${machine2.name}_output1`;
    const machine2Output2 = `${machine2.name}_output2`;
    diagramData += `${machine2.name} --> ${machine2Output1}[${machine2.name}: ${machine2.input} → ${machine2.outputs[0]}]\n`;
    diagramData += `${machine2.name} --> ${machine2Output2}[${machine2.name}: ${machine2.input} → ${machine2.outputs[1]}]\n`;

    // Add third machine (connected to second output of Machine1)
    const machine3Label = `${machine3.name}: ${machine3.input}`;
    diagramData += `${machine1Output2} --> ${machine3.name}[${machine3Label}]\n`;

    // Add outputs for the third machine
    const machine3Output1 = `${machine3.name}_output1`;
    const machine3Output2 = `${machine3.name}_output2`;
    diagramData += `${machine3.name} --> ${machine3Output1}[${machine3.name}: ${machine3.input} → ${machine3.outputs[0]}]\n`;
    diagramData += `${machine3.name} --> ${machine3Output2}[${machine3.name}: ${machine3.input} → ${machine3.outputs[1]}]\n`;

    renderDiagram();
}

// Function to render the diagram
function renderDiagram() {
    const diagramContainer = document.getElementById("diagram");
    diagramContainer.innerHTML = `<div class="mermaid">${diagramData}</div>`;
    mermaid.init(undefined, diagramContainer);
}

// Draw the flowchart on page load
drawFlowchart();
