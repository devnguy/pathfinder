import Grid from './Grid'
import OptionsForm from './OptionsForm'
import GridContext from '../context/GridContext'
import useFormValidation from '../hooks/useFormValidation'

const INITIAL_STATE = {
  start: '',
  end: '',
  length: 4,
  width: 4,
  delay: 250,
  searchType: 'bfs',
  direction: '',
  nextDirection: '',
}

const App = () => {
  const { handleChange, values } = useFormValidation(INITIAL_STATE)
  return (
    <div>
      <GridContext.Provider value={{ handleChange, values }}>
        <OptionsForm />
        <Grid length={parseInt(values.length)} width={parseInt(values.width)} />
      </GridContext.Provider>
    </div>
  )
}

export default App
