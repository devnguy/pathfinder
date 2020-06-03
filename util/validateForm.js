// const INITIAL_STATE = {
//   start: '',
//   end: '',
//   length: '',
//   width: '',
//   delay: '',
//   searchType: '',
//   direction: '',
//   nextDirection: '',
// }

const validateForm = (values) => {
  let errors = {}
  // Start errors
  if (values.start < 0 || values.start >= values.length * values.width) {
    errors.start = `Start must be between 0 and ${values.length * values.width}`
  }
  // End errors
  if (values.end < 0 || values.end >= values.length * values.width) {
    errors.end = `End must be between 0 and ${values.length * values.width}`
  }
  // Delay errors
  if (values.delay < 0) errors.end = 'Delay must be greater than 0ms'
  // Direction errors
  if (!values.direction) errors.direction = 'Direction required'
  // NextDirection errors
  if (!values.nextDirection) errors.nextDirection = 'Next direction required'
}

export default validateForm
