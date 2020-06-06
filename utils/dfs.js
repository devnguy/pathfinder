import Bfs from './Bfs'

class Dfs extends Bfs {
  constructor(graph, values, setVertexProperty) {
    super(graph, values, setVertexProperty)
  }

  timedExplore() {
    setTimeout(() => {
      // pop instead of shift
      const currentVertex = this.toBeVisited.pop()
      if (!this.visited.includes(currentVertex.id)) {
        this.visited.push(currentVertex.id)
        this.setVertexProperty('visited', currentVertex.id, true)
        if (currentVertex.id === parseInt(this.values.end)) return

        this.pushVerticesInOrder(currentVertex)
      }
      if (this.toBeVisited.length > 0) this.timedExplore()
    }, parseInt(this.values.delay))
  }

  pushVerticesInOrder(currentVertex) {
    const directions = Object.keys(currentVertex.edges)
    const numOfEdges = directions.length
    let count = 0
    let i = directions.indexOf(this.values.direction)
    // To add adjacent edges in backwards order, start at i - 1
    i = i - 1 >= 0 ? i - 1 : numOfEdges - 1

    while (count < numOfEdges) {
      const adjacentEdge = currentVertex.edges[directions[i]]
      if ((adjacentEdge || adjacentEdge === 0) && !this.visited.includes(adjacentEdge)) {
        this.toBeVisited.push(this.graph[adjacentEdge])
      }

      if (this.values.nextDirection === 'ccw') {
        i = i + 1 < numOfEdges ? i + 1 : 0
      } else {
        i = i - 1 >= 0 ? i - 1 : numOfEdges - 1
      }
      count++
    }
  }
}

export default Dfs
