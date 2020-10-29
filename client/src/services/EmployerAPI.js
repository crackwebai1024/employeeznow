import Axios from '@lib/axios';

export async function getUserData(data) {
  return await Axios.get('/crud/employer/databyid' + data);
}

export async function onSaveFilter(data) {
  return await Axios.post('/crud/employer/searchfilter', data)
}

export async function onGetfilterList(data) {
  return await Axios.get('/crud/employer/searchfilter' +  data)
}

export async function onSearchEmployee(data) {
  return await Axios.post('/crud/employer/searchfilter', data)
}

export async function onGetSearchResult(data) {
  return await Axios.get('/search/searchresult' + data)
}

export async function onRemoveFilter(data) {
  return await Axios.post('/crud/employer/searchfilter/delete', data)
}

export async function onAskInterest(data) {
  return await Axios.post('/mail/employee/interest', data)
}
