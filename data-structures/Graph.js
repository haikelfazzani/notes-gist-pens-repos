class Graph  {
  constructor() {
    this.adjList = {};
  }

  addVertex = (vertex) => {
    this.adjList[vertex] = [];
  }
  
  
  addEdge = (vertex1, vertex2) => {
    this.adjList[vertex1].push(vertex2);
  }
}

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('C', 'B');
graph.addEdge('B', 'C');

console.log(graph.adjList)