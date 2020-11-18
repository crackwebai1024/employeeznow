import Axios from "@lib/axios";

export async function onSendInterest(data) {
  return await Axios.post("/mail/employer/interest", data);
}

export async function onSendNoInterest(data) {
  return await Axios.post("/mail/employer/nointerest", data);
}
