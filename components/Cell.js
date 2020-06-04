import styled from 'styled-components'
import { useState, useEffect } from 'react'

const StyledCell = styled.div`
  width: 48px;
  height: 48px;
  border: 1px solid black;
  background: ${(props) =>
    props.visited && props.isStart
      ? 'yellow'
      : props.visited && props.isEnd
      ? 'green'
      : props.isStart || props.isEnd
      ? 'blue'
      : props.visited
      ? 'red'
      : 'none'};
`

const Cell = (props) => {
  const [visited, setVisited] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    setVisited(props.cell.visited)
    setIsStart(props.cell.isStart)
    setIsEnd(props.cell.isEnd)
  }, [props.cell])

  const log = (event) => {
    console.log(props.cell)
  }

  return (
    <StyledCell visited={visited} isStart={isStart} isEnd={isEnd} onClick={log}>
      {props.cell.id}
    </StyledCell>
  )
}

export default Cell
