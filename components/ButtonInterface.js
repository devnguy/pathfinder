import { useContext } from 'react'

import Bfs from '../utils/Bfs'
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
                const bfs = new Bfs(graph, values, setVertexProperty)
                bfs.run()
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
