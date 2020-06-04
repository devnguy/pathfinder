import styled from 'styled-components'
import { useContext } from 'react'

import Cell from './Cell'
import GridContext from '../context/GridContext'

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 48px);
  grid-template-rows: repeat(${(props) => props.length}, 48px);
`

const Grid = () => {
  const { values, graph } = useContext(GridContext)

  return (
    <StyledGrid length={values.length} width={values.width}>
      {graph.map((cell, index) => {
        return <Cell key={index} cell={cell} />
      })}
    </StyledGrid>
  )
}

export default Grid
