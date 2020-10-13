import Axios from '@lib/axios';

export async function employeeEmailVerify(data) {
  return await Axios.post('/auth/employee/isvalidemail', data);
}

export async function phoneVerifyRequest(data) {
  return await Axios.get('/auth/employee/isvalidphone', data)
}

export async function signupConfirm(data) {
  return await Axios.post('/auth/employee/isphoneverified', data)
}
export async function onLogin(data) {
  return await Axios.post('/auth/common/signin', data)
}
export async function onEmployerSignup(data) {
  return await Axios.post('/auth/employer/isemailverified', data)
}

export async function EmployerSendCode(data) {
  return await Axios.post('/auth/employer/sendcode', data)
}
