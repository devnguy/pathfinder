import { useContext } from 'react'

import Bfs from '../utils/Bfs'
import Dfs from '../utils/Dfs'
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
                const dfs = new Dfs(graph, values, setVertexProperty)
                dfs.run()
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
