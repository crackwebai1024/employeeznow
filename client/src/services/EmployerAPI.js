import Axios from '@lib/axios';

export async function getUserData(data) {
  return await Axios.get('/crud/employer/databyid' + data);
}

export async function onSaveFilter(data) {
  return await Axios.post('/crud/employer/searchfilter', data)
}

export async function onGetfilterList(data) {
  return await Axios.get('/crud/employer/searchfilter' + data)
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

export async function onGetEmployerData(data) {
  return await Axios.get('/search/getsearchemployee' + data)
}

export async function onPurhcaseEmployee(data) {
  return await Axios.post('/payment/sendrequest', data)
}

export async function onPayRequest(data) {
  return await Axios.post('/payment/purchase', data)
}

export async function onUpdateEmployer(data) {
  return await Axios.post('/crud/employer/update', data)
}

export async function onAddToCart(data) {
  return await Axios.post('/cart/addtocart', data)
}

export async function onLoadCartList(data) {
  return await Axios.get('/cart/read' + data)
}

export async function onChargeRequest(data) {
  return await Axios.post('/payment/charge', data )
}

export async function onRemoveCart(data) {
  return await Axios.post('/cart/deleteone', data)
}

export async function onFreePurchase(data) {
  return await Axios.post('/cart/purchase', data)
}