import styled from 'styled-components'
import { useState, useEffect } from 'react'

import Cell from './Cell'

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 48px 48px 48px 48px 48px;
  grid-template-rows: 48px 48px 48px 48px 48px;
`

const Grid = ({ length, width }) => {
  const [graph, setGraph] = useState([])
  const size = length * width
  // On mount, initialize graph. Adjacent edges are based on position of vertex.
  useEffect(() => {
    for (let i = 0; i < size; i++) {
      setGraph((graph) => [
        ...graph,
        {
          id: i,
          edges: {
            up: i - width >= 0 ? i - width : null,
            right: i % width !== width - 1 ? i + 1 : null,
            down: i + width < size ? i + width : null,
            left: i % width !== 0 ? i - 1 : null,
          },
          visited: false,
          isStart: false,
          isEnd: false,
        },
      ])
    }
  }, [])

  const setVertexProperty = (prop, index, bool) => {
    setGraph((graph) => [
      // before
      ...graph.slice(0, index),
      // set visited property of index to bool
      {
        ...graph[index],
        [prop]: bool,
      },
      // after, if there are remaining elements
      ...graph.slice(index + 1 < size ? index + 1 : graph.length),
    ])
  }

  const handleReset = () => {
    for (let i = 0; i < size; i++) {
      setVertexProperty('visited', i, false)
      if (graph[i].isStart) setVertexProperty('isStart', i, false)
      if (graph[i].isEnd) setVertexProperty('isEnd', i, false)
    }
  }

  const timedBfs = (visited, toBeVisited, end, delay) => {
    setTimeout(() => {
      const currentVertex = toBeVisited.shift()
      if (!visited.includes(currentVertex.id)) {
        visited.push(currentVertex.id)
        setVertexProperty('visited', currentVertex.id, true)
        if (currentVertex.id === end) return

        for (const direction in currentVertex.edges) {
          if (currentVertex.edges[direction] && !visited.includes(currentVertex.edges[direction])) {
            toBeVisited.push(graph[currentVertex.edges[direction]])
          }
        }
      }
      if (toBeVisited.length > 0) timedBfs(visited, toBeVisited, end, delay)
    }, delay)
  }

  const bfs = (start, end) => {
    // [int]
    const visited = []
    // [{Cell}]
    const toBeVisited = []
    setVertexProperty('isStart', start, true)
    setVertexProperty('isEnd', end, true)

    toBeVisited.push(graph[start])
    timedBfs(visited, toBeVisited, end, 500)
  }

  return (
    <StyledGrid>
      {graph.map((cell, index) => {
        return <Cell key={index} cell={cell} />
      })}
      <button
        onClick={() => {
          bfs(0, 11)
        }}
      ></button>
      <button onClick={handleReset}>Reset</button>
    </StyledGrid>
  )
}

export default Grid
