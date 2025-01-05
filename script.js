
const { Canvas } = window['diagram-js'];

// Initialize Canvas
const canvas = new Canvas({
  container: document.getElementById('canvas'),
});

let nodeId = 1;

// Function to add a node
function addNode(name, x, y) {
  const node = {
    id: `node-${nodeId++}`,
    label: name,
    x,
    y,
  };
  // For simplicity, represent a node as an object (expand with Diagram.js specifics).
  return node;
}

// Function to connect nodes
function connectNodes(source, target) {
  const connection = {
    id: `connection-${source.id}-${target.id}`,
    source: source.id,
    target: target.id,
  };
  return connection;
}

// Handle form submission
document.getElementById('machineForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const machineName = document.getElementById('machineName').value;
  const numOutputs = parseInt(document.getElementById('numOutputs').value);
  const outputTypes = document.getElementById('outputTypes').value.split(',');

  if (numOutputs !== outputTypes.length) {
    alert('Number of outputs must match the number of types.');
    return;
  }

  // Add the main machine node
  const machineNode = addNode(machineName, 200, 200);

  // Add output nodes and connections
  const outputNodes = [];
  const connections = [];
  outputTypes.forEach((type, index) => {
    const outputNode = addNode(type.trim(), 400 + index * 100, 200);
    outputNodes.push(outputNode);
    connections.push(connectNodes(machineNode, outputNode));
  });

  // Render nodes and connections (this part should use Diagram.js rendering logic).
  console.log('Machine Node:', machineNode);
  console.log('Output Nodes:', outputNodes);
  console.log('Connections:', connections);
});
