import styled from 'styled-components'
import { useState, useEffect } from 'react'

const StyledCell = styled.div`
  width: 48px;
  height: 48px;
  border: 1px solid black;
  background: ${(props) => (props.visited ? 'red' : 'none')};
`

const Cell = (props) => {
  const [visited, setVisited] = useState(false)
  useEffect(() => {
    setVisited(props.cell.visited)
  }, [props.cell.visited])
  return <StyledCell visited={visited} />
}

export default Cell
