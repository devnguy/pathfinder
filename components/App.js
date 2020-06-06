import { useState, useEffect } from 'react'

import Grid from './Grid'
import OptionsForm from './OptionsForm'
import GridContext from '../context/GridContext'
import useFormValidation from '../hooks/useFormValidation'
import INITIAL_STATE from '../utils/initialState'
import ButtonInterface from './ButtonInterface'

const App = () => {
  const { handleChange, values } = useFormValidation(INITIAL_STATE)
  const [graph, setGraph] = useState([])
  const [walls, setWalls] = useState([])
  const [isEditingWalls, setIsEditingWalls] = useState(false)
  const length = parseInt(values.length)
  const width = parseInt(values.width)
  const size = length * width

  // On mount, initialize graph. Adjacent edges are based on position of vertex.
  // Update graph when input changes.
  useEffect(() => {
    setGraph([])
    for (let i = 0; i < size; i++) {
      setGraph((graph) => [
        ...graph,
        {
          id: i,
          edges: {
            up: assignEdge(i, 'up'),
            right: assignEdge(i, 'right'),
            down: assignEdge(i, 'down'),
            left: assignEdge(i, 'left'),
          },
          visited: false,
          isStart: i === parseInt(values.start) ? true : false,
          isEnd: i === parseInt(values.end) ? true : false,
          isWall: walls.includes(i) ? true : false,
        },
      ])
    }
  }, [values, walls])

  // An edge is valid if it is within range and it's not a wall.
  const assignEdge = (i, direction) => {
    switch (direction) {
      case 'up':
        return i - width >= 0 && !walls.includes(i - width) ? i - width : null
      case 'right':
        return i % width !== width - 1 && !walls.includes(i + 1) ? i + 1 : null
      case 'down':
        return i + width < size && !walls.includes(i + width) ? i + width : null
      case 'left':
        return i % width !== 0 && !walls.includes(i - 1) ? i - 1 : null
      default:
        return null
    }
  }

  /**
   * Modifies the property of a graph vertex, updates state.
   * @param {string} prop: prop to modify; options are 'visited', 'isStart',
   * and 'isEnd'
   * @param {int} index: index of vertex
   * @param {bool} bool: bool val to set prop to
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
   * false values.
   */
  const handleResetPath = () => {
    graph.forEach((vertex, i) => {
      setVertexProperty('visited', i, false)
    })
  }

  const handleResetWalls = () => {
    setWalls([])
  }

  return (
    <div>
      <GridContext.Provider
        value={{
          handleChange,
          values,
          graph,
          setVertexProperty,
          handleResetPath,
          walls,
          setWalls,
          isEditingWalls,
          setIsEditingWalls,
          handleResetWalls,
        }}
      >
        <OptionsForm />
        <ButtonInterface />
        <Grid />
      </GridContext.Provider>
    </div>
  )
}

export default App
