import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'

import Cell from './Cell'
import GridContext from '../context/GridContext'

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 48px);
  grid-template-rows: repeat(${(props) => props.length}, 48px);
`

const Grid = () => {
  const { values } = useContext(GridContext)
  const [graph, setGraph] = useState([])
  const length = parseInt(values.length)
  const width = parseInt(values.width)
  const size = length * width
  // On mount, initialize graph. Adjacent edges are based on position of vertex.
  // Update graph when length/width changes
  useEffect(() => {
    setGraph([])
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
          isStart: i === parseInt(values.start) ? true : false,
          isEnd: i === parseInt(values.end) ? true : false,
        },
      ])
    }
  }, [values])

  /**
   * Modifies the property of a graph vertex, updates state.
   * @param {string} prop prop to modify; options are 'visited', 'isStart',
   * and 'isEnd'
   * @param {int} index index of vertex
   * @param {bool} bool bool val to set prop to
   */
  const setVertexProperty = (prop, index, bool) => {
    setGraph((graph) => [
      ...graph.slice(0, index),
      {
        ...graph[index],
        [prop]: bool,
      },
      ...graph.slice(index + 1 < size ? index + 1 : graph.length),
    ])
  }

  /**
   * Updates state and resets properties of graph vertices back to default
   * false values
   */
  const handleReset = () => {
    for (let i = 0; i < size; i++) {
      setVertexProperty('visited', i, false)
    }
  }

  /**
   * Implementation of breadth first search. Calls timedBfs so that a delay
   * can be observed between loop iterations.
   * @param {int} start index of vertex to start the search
   * @param {int} end index of vertex to end the search
   */
  const bfs = () => {
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
              currentVertex.edges[direction] &&
              !visited.includes(currentVertex.edges[direction]) &&
              !toBeVisited.includes(graph[currentVertex.edges[direction]])
            ) {
              // FIXME: push elements in order based on input
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

  return (
    <StyledGrid length={values.length} width={values.width}>
      {graph.map((cell, index) => {
        return <Cell key={index} cell={cell} />
      })}
      <button onClick={bfs}></button>
      <button onClick={handleReset}>Reset</button>
    </StyledGrid>
  )
}

export default Grid
