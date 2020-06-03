import useFormValidation from '../hooks/useFormValidation'

const INITIAL_STATE = {
  start: '',
  end: '',
  length: '',
  width: '',
  delay: '',
  searchType: '',
  direction: '',
  nextDirection: '',
}

const OptionsForm = () => {
  const { handleChange, values } = useFormValidation(INITIAL_STATE)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(values)
  }

  return (
    <div>
      <h2>Pathfinding Options</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="start"
          value={values.start}
          placeholder="Starting cell number"
        />
        <input
          onChange={handleChange}
          name="end"
          value={values.end}
          placeholder="Ending cell number"
        />
        <input
          onChange={handleChange}
          name="length"
          value={values.length}
          placeholder="Length of grid"
        />
        <input
          onChange={handleChange}
          name="width"
          value={values.width}
          placeholder="Width of grid"
        />
        <input
          onChange={handleChange}
          name="delay"
          value={values.delay}
          placeholder="Delay between steps (ms)"
        />
        <input
          onChange={handleChange}
          name="searchType"
          value={values.searchType}
          placeholder="Type of search (BFS/DFS)"
        />
        <input
          onChange={handleChange}
          name="direction"
          value={values.direction}
          placeholder="Initial direction to search"
        />
        <input
          onChange={handleChange}
          name="nextDirection"
          value={values.nextDirection}
          placeholder="Next direction to search (CW/CCW)"
        />
        <div>
          <button type="submit">Run</button>
        </div>
      </form>
    </div>
  )
}

export default OptionsForm
