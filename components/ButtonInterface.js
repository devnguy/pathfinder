import { useContext } from 'react'

import bfs from '../utils/bfs'
import dfs from '../utils/dfs'
import GridContext from '../context/GridContext'

const ButtonInterface = ({ setVertexProperty, handleReset }) => {
  const { values, graph } = useContext(GridContext)

  return (
    <div>
      <button
        onClick={
          values.searchType === 'bfs'
            ? () => {
                bfs(graph, values, setVertexProperty)
              }
            : () => {
                dfs(graph, values, setVertexProperty)
              }
        }
      >
        Run
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default ButtonInterface
