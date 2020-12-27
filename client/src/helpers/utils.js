import { toast } from "react-toastify";

export const getBoxSize = () => {
  return window.innerHeight - 240;
};

export const _arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export const successMessage = (title) => {
  toast.success(title, {
    position: "top-center",
    autoClose: 200000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const errorMessage = (title) => {
  toast.error(title, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

// updatedAt

export const objectSort = (data, condition) => {
  let direction = true;
  let key = "updatedAt";
  switch (condition) {
    case "new":
      break;
    case "old":
      direction = false;
      break;
    case "most":
      key = "stars";
      break;
    case "least":
      direction = false;
      key = "stars";
      break;
    default:
      break;
  }

  data.sort(function (first, second) {
    if (direction) {
      if (first[key] > second[key]) return -1;
      return 1;
    }
    if (first[key] > second[key]) return 1;
    return -1;
  });
  return data;
};
