/**
 * Implementation of breadth first search. Calls timedBfs so that a delay
 * can be observed between loop iterations.
 * @param {int} start index of vertex to start the search
 * @param {int} end index of vertex to end the search
 */
const bfs = (graph, values, setVertexProperty) => {
  // Define timedBfs so it can be ran below
  const timedBfs = (visited, toBeVisited) => {
    setTimeout(() => {
      const currentVertex = values.searchType === 'bfs' ? toBeVisited.shift() : toBeVisited.pop()
      if (!visited.includes(currentVertex.id)) {
        visited.push(currentVertex.id)
        setVertexProperty('visited', currentVertex.id, true)
        if (currentVertex.id === parseInt(values.end)) return

        for (const direction in currentVertex.edges) {
          if (
            values.searchType === 'bfs' &&
            currentVertex.edges[direction] !== null &&
            !visited.includes(currentVertex.edges[direction]) &&
            !toBeVisited.includes(graph[currentVertex.edges[direction]])
          ) {
            // FIXME: push elements in order based on input
            toBeVisited.push(graph[currentVertex.edges[direction]])
          } else if (
            values.searchType === 'dfs' &&
            currentVertex.edges[direction] !== null &&
            !visited.includes(currentVertex.edges[direction])
          ) {
            toBeVisited.push(graph[currentVertex.edges[direction]])
          }
        }
      }
      if (toBeVisited.length > 0) timedBfs(visited, toBeVisited)
    }, parseInt(values.delay))
  }

  // Initalize search by pushing start vertex and run
  const visited = [] // [int]
  const toBeVisited = [] // [Object]

  toBeVisited.push(graph[parseInt(values.start)])
  timedBfs(visited, toBeVisited)
}

export default bfs
