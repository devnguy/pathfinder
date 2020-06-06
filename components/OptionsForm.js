import { useContext } from 'react'
import GridContext from '../context/GridContext'

const OptionsForm = () => {
  const { handleChange, values } = useContext(GridContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(values)
  }

  return (
    <div>
      <h2>Pathfinding Options</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="number"
            onChange={handleChange}
            name="start"
            value={
              values.start >= values.length * values.width
                ? values.length * values.width - 1
                : values.start < 0
                ? 0
                : values.start
            }
            placeholder="Starting cell number"
            required
          />
          <input
            onChange={handleChange}
            name="end"
            value={
              values.end >= values.length * values.width
                ? values.length * values.width - 1
                : values.end < 0
                ? 0
                : values.end
            }
            placeholder="Ending cell number"
          />
        </div>
        <div>
          Length
          <input
            type="range"
            onChange={handleChange}
            name="length"
            min={1}
            max={20}
            value={values.length}
          />
          <input
            onChange={handleChange}
            name="length"
            value={values.length > 20 ? 20 : values.length < 1 ? 1 : values.length}
          />
        </div>
        <div>
          Width
          <input
            type="range"
            onChange={handleChange}
            name="width"
            min={1}
            max={20}
            value={values.width}
          />
          <input
            onChange={handleChange}
            name="width"
            value={values.width > 20 ? 20 : values.width < 1 ? 1 : values.width}
          />
        </div>
        <div>
          Delay (ms)
          <input
            type="range"
            onChange={handleChange}
            name="delay"
            min={0}
            max={1000}
            step={50}
            value={values.delay}
          />
          <input
            type="number"
            onChange={handleChange}
            name="delay"
            value={values.delay > 1000 ? 1000 : values.delay < 0 ? 0 : values.delay}
          />
        </div>
        <div>
          <input
            onChange={handleChange}
            type="radio"
            name="searchType"
            value="bfs"
            checked={values.searchType === 'bfs'}
          />
          bfs
          <input
            onChange={handleChange}
            type="radio"
            name="searchType"
            value="dfs"
            checked={values.searchType === 'dfs'}
          />
          dfs
        </div>
        <div>
          <select name="direction" onChange={handleChange}>
            <option value="">--Starting direction--</option>
            <option value="up">Up</option>
            <option value="right">Right</option>
            <option value="down">Down</option>
            <option value="left">Left</option>
          </select>
          <select name="nextDirection" onChange={handleChange}>
            <option value="">--Next direction--</option>
            <option value="cw">Clockwise</option>
            <option value="ccw">Counter Clockwise</option>
          </select>
        </div>
        {/* <div>
          <button type="submit">Run</button>
        </div> */}
      </form>
    </div>
  )
}

export default OptionsForm
