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
    // Add adjacent edges in backwards order
    if (this.values.nextDirection === 'ccw') {
      i = i + 1 < numOfEdges ? i + 1 : 0
    } else {
      i = i - 1 >= 0 ? i - 1 : numOfEdges - 1
    }

    while (count < numOfEdges) {
      const adjacentEdge = currentVertex.edges[directions[i]]
      if ((adjacentEdge || adjacentEdge === 0) && !this.visited.includes(adjacentEdge)) {
        // If vertex is already in toBeVisited, remove vertex from toBeVisited
        // and add it to the end. This prevents the search from stalling.
        if (this.toBeVisited.includes(this.graph[adjacentEdge])) {
          this.toBeVisited = this.toBeVisited.filter(
            (vertex) => vertex !== this.graph[adjacentEdge]
          )
        }
        this.toBeVisited.push(this.graph[adjacentEdge])
        if (adjacentEdge === 5) {
          console.log(i)
        }
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
