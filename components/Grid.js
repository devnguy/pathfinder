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
      // if (graph[i].isStart) setVertexProperty('isStart', i, false)
      // if (graph[i].isEnd) setVertexProperty('isEnd', i, false)
    }
  }

  /**
   * Implementation of breadth first search. Calls itself so that a delay can
   * be observed between loop iterations.
   * @param {array[int]} visited visited vertices
   * @param {array[object]} toBeVisited vertices that will be visited
   * @param {int} end position of vertex which when found, will stop the
   * algorithm
   * @param {int} delay time in ms to delay between loop iterations
   */
  const timedBfs = (visited, toBeVisited, end, delay) => {
    setTimeout(() => {
      const currentVertex = values.searchType === 'bfs' ? toBeVisited.shift() : toBeVisited.pop()
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

  /**
   * Initializes breadth first search.
   * @param {int} start index of vertex to start the search
   * @param {int} end index of vertex to end the search
   */
  const bfs = (start, end) => {
    // [int]
    const visited = []
    // [{cell}]
    const toBeVisited = []
    setVertexProperty('isStart', start, true)
    setVertexProperty('isEnd', end, true)

    toBeVisited.push(graph[start])
    timedBfs(visited, toBeVisited, end, values.delay)
  }

  return (
    <StyledGrid length={values.length} width={values.width}>
      {graph.map((cell, index) => {
        return <Cell key={index} cell={cell} />
      })}
      <button
        onClick={() => {
          bfs(parseInt(values.start), parseInt(values.end))
        }}
      ></button>
      <button onClick={handleReset}>Reset</button>
    </StyledGrid>
  )
}

export default Grid
