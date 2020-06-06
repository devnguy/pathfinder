import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'

import GridContext from '../context/GridContext'

const StyledCell = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid black;
  background: ${(props) =>
    props.isWall
      ? '#444'
      : props.visited && props.isStart
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
  const { walls, setWalls, isEditingWalls, setIsEditingWalls } = useContext(GridContext)
  const [visited, setVisited] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const [isWall, setIsWall] = useState(false)

  useEffect(() => {
    setVisited(props.cell.visited)
    setIsStart(props.cell.isStart)
    setIsEnd(props.cell.isEnd)
    setIsWall(props.cell.isWall)
  }, [props.cell])

  const toggleWall = (event) => {
    // console.log(props.cell.isWall)
    if (isEditingWalls) {
      if (walls.includes(props.cell.id)) {
        setWalls(walls.filter((wall) => wall !== props.cell.id))
      } else {
        setWalls([...walls, props.cell.id])
      }
    }
  }

  const toggleIsEditingWalls = () => {
    setIsEditingWalls(!isEditingWalls)
  }

  const enableIsEditingWalls = () => {
    setIsEditingWalls(true)
    toggleWall()
  }

  return (
    <StyledCell
      isWall={isWall}
      visited={visited}
      isStart={isStart}
      isEnd={isEnd}
      onMouseOver={toggleWall}
      onClick={toggleIsEditingWalls}
    >
      {/* {props.cell.id} */}
    </StyledCell>
  )
}

export default Cell
