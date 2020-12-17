import Axios from "@lib/axios";

export async function getUserData(data) {
  return await Axios.get("/crud/employee/databyid" + data);
}

export async function loadSkill(data) {
  return await Axios.get("/crud/employee/skill" + data);
}

export async function updateSkill(data) {
  return await Axios.post("/crud/employee/skill", data);
}

export async function updateJobExperience(data) {
  return await Axios.post("/crud/employee/experience", data);
}

export async function loadExperienceData(data) {
  return await Axios.get("/crud/employee/experience" + data);
}

export async function updatePreference(data) {
  return await Axios.post("/crud/employee/preference", data);
}

export async function loadPreference(data) {
  return await Axios.get("/crud/employee/preference" + data);
}

export async function uploadProfilePhoto(data) {
  const config = {
    headers: {
      enctype: "multipart/form-data",
    },
  };
  return await Axios.post("/crud/employee/image", data, config);
}

export async function deleteProfilePhoto(data) {
  const config = {
    headers: {
      enctype: "multipart/form-data",
    },
  };
  return await Axios.post("/crud/employee/image/delete", data, config);
}

export async function getProfilePhoto(data) {
  return await Axios.get("/crud/employee/image" + data);
}

export async function getBackgroundImage(data) {
  return await Axios.get("/crud/employee/image" + data);
}

export async function uploadPortfolioImage(data) {
  return await Axios.post("/crud/employee/portfolio", data);
}

export async function getPortfolioImage(data) {
  return await Axios.get("/crud/employee/portfolio" + data);
}

export async function deleteFolio(data) {
  return await Axios.post("/crud/employee/portfolio/delete", data);
}

export async function uploadDocument(data) {
  return await Axios.post("/crud/employee/document", data);
}

export async function updateBasicInfo(data) {
  return await Axios.post("/crud/employee/basic", data);
}

export async function onGetUserDocument(data) {
  return await Axios.get("/crud/employee/document" + data);
}

export async function contestVideoUpload(data) {
  return await Axios.post("/crud/employee/contestvideo", data);
}

export async function onGetContestVideo(data) {
  return await Axios.get("/crud/employee/contestvideo" + data);
}

export async function onDeleteContestVideo(data) {
  return await Axios.post("/crud/employee/contestvideo/delete", data);
}
