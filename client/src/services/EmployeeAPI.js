import Axios from '@lib/axios';

export async function getUserData(data) {
  return await Axios.get('/crud/employee/databyid' + data);
}

export async function loadSkill(data) {
  return await Axios.get('/crud/employee/skill' + data)
}

export async function updateSkill(data) {
  return await Axios.post('/crud/employee/skill', data)
}