
import Diagram from 'diagram-js';

const diagram = new Diagram({
  canvas: {
    container: document.getElementById('canvas'),
  },
});

const canvas = diagram.get('canvas');
let nodeId = 1;

// Function to add a node
function addNode(name, x, y) {
  const node = {
    id: `node-${nodeId++}`,
    type: 'shape',
    x,
    y,
    width: 100,
    height: 50,
    businessObject: { name },
  };

  canvas.addShape(node);
  return node;
}

// Function to connect nodes
function connectNodes(source, target) {
  const connection = {
    id: `connection-${source.id}-${target.id}`,
    type: 'connection',
    source: source,
    target: target,
  };

  canvas.addConnection(connection);
  return connection;
}

// Handle form submission
document.getElementById('machineForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const machineName = document.getElementById('machineName').value;
  const numOutputs = parseInt(document.getElementById('numOutputs').value, 10);
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
    const outputNode = addNode(type.trim(), 400 + index * 150, 200);
    outputNodes.push(outputNode);
    connections.push(connectNodes(machineNode, outputNode));
  });

  console.log('Machine Node:', machineNode);
  console.log('Output Nodes:', outputNodes);
  console.log('Connections:', connections);
});
