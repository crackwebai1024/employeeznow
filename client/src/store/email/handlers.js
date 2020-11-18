const initialState = {
  interestSuccess: 'NONE',
  noInterestSuccess: "NONE"
};

export const sendInterestRequest = (state) => ({
  interestSuccess: "REQUEST"
});

export const sendInterestSuccess = (state) => ({
  interestSuccess: "SUCCESS"
});

export const sendInterestFailure = (state) => ({
  interestSuccess: "FAILURE"
});

export const sendNoInterestRequest = (state) => ({
  noInterestSuccess: "REQUEST"
});

export const sendNoInterestSuccess = (state) => ({
  noInterestSuccess: "SUCCESS"
});

export const sendNoInterestFailure = (state) => ({
  noInterestSuccess: "FAILURE"
});

export default initialState;
