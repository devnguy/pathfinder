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
  // Initialize graph
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
        },
      ])
    }
  }, [])

  // testing cell rerender
  const toggleVisited = (index) => {
    setGraph((graph) => [
      // before
      ...graph.slice(0, index),
      // toggle visited property of index
      {
        ...graph[index],
        visited: !graph[index].visited,
      },
      // after
      ...graph.slice(index + 1 < size ? index + 1 : graph.length),
    ])
  }

  const bfs = async (graph, start, end) => {
    // [int]
    const visited = []
    // [{Cell}]
    const toBeVisited = []

    toBeVisited.push(graph[start])
    while (toBeVisited.length > 0) {
      const currentVertex = toBeVisited.shift()
      console.log(toBeVisited)
      if (!visited.includes(currentVertex.id)) {
        visited.push(currentVertex.id)
        setTimeout(() => {
          toggleVisited(currentVertex.id)
        }, 1000)
        // set state of cell here, change color or something

        for (const direction in currentVertex.edges) {
          if (currentVertex.edges[direction] && !visited.includes(currentVertex.edges[direction])) {
            toBeVisited.push(graph[currentVertex.edges[direction]])
          }
        }
      }
    }
  }

  return (
    <StyledGrid>
      {graph.map((cell, index) => {
        return <Cell key={index} cell={cell} />
      })}
      <button
        onClick={() => {
          bfs(graph, 0, 24)
        }}
      ></button>
    </StyledGrid>
  )
}

export default Grid
