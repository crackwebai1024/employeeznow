
const initialState = {
  employerData: {}
};

export const getEmployerData = (state) => ({
  ...state,
});

export const getEmployerSuccess = (state, { payload }) => {
  debugger
  return {
  ...state,
  employerData : payload,
}};

export const getEmployerFailure = (state) => ({
  ...state,
  // get employer dat failed.
});

export default initialState;
