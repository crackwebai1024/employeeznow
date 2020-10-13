import Axios from '@lib/axios';

export async function getUserData(data) {
  return await Axios.get('/crud/employer/databyid' + data);
}
