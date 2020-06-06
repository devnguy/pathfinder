class Bfs {
  constructor(graph, values, setVertexProperty) {
    this.graph = graph
    this.visited = []
    this.toBeVisited = []
    this.values = values
    this.setVertexProperty = setVertexProperty
  }

  run() {
    this.toBeVisited.push(this.graph[parseInt(this.values.start)])
    this.timedBfs()
  }

  timedBfs() {
    setTimeout(() => {
      const currentVertex = this.toBeVisited.shift()
      if (!this.visited.includes(currentVertex.id)) {
        this.visited.push(currentVertex.id)
        this.setVertexProperty('visited', currentVertex.id, true)
        if (currentVertex.id === parseInt(this.values.end)) return

        this.pushVerticesInOrder(currentVertex)
      }
      if (this.toBeVisited.length > 0) {
        this.timedBfs()
      }
    }, parseInt(this.values.delay))
  }

  pushVerticesInOrder(currentVertex) {
    const directions = Object.keys(currentVertex.edges)
    const numOfEdges = directions.length
    let count = 0
    let i = directions.indexOf(this.values.direction)

    while (count < numOfEdges) {
      const adjacentEdge = currentVertex.edges[directions[i]]
      if (
        (adjacentEdge || adjacentEdge === 0) &&
        !this.visited.includes(adjacentEdge) &&
        !this.toBeVisited.includes(this.graph[adjacentEdge])
      ) {
        this.toBeVisited.push(this.graph[adjacentEdge])
      }

      if (this.values.nextDirection === 'cw') {
        i = i + 1 < numOfEdges ? i + 1 : 0
      } else {
        i = i - 1 >= 0 ? i - 1 : numOfEdges - 1
      }
      count++
    }
  }
}

export default Bfs
