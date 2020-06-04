const dfs = (graph, values, setVertexProperty) => {
  const timedDfs = (visited, toBeVisited) => {
    setTimeout(() => {
      const currentVertex = toBeVisited.pop()
      if (!visited.includes(currentVertex.id)) {
        visited.push(currentVertex.id)
        setVertexProperty('visited', currentVertex.id, true)
        if (currentVertex.id === parseInt(values.end)) return

        for (const direction in currentVertex.edges) {
          if (
            currentVertex.edges[direction] !== null &&
            !visited.includes(currentVertex.edges[direction])
          ) {
            toBeVisited.push(graph[currentVertex.edges[direction]])
          }
        }
      }
      if (toBeVisited.length > 0) timedDfs(visited, toBeVisited)
    }, parseInt(values.delay))
  }

  // Initalize search by pushing start vertex and run
  const visited = [] // [int]
  const toBeVisited = [] // [Object]

  toBeVisited.push(graph[parseInt(values.start)])
  timedDfs(visited, toBeVisited)
}

export default dfs
