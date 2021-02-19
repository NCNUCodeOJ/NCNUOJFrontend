import axios from 'axios';
const serverURL = "http://localhost:8000";
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const newApplyNewHighClass = (date, start, end, className, classroom) => {
  return axios.post(`${serverURL}/high/info/`, {
    "teachDate": date,
    "startTime": start,
    "endTime": end,
    "className": className,
    "classroom": classroom
  });
}
const newUserAccount = (SchoolID, StudentID, Email, UserName, RealName, Password) => {
  return axios.post(`${serverURL}/high/info/`, {
    "SchoolID": SchoolID,
    "StudentID": StudentID,
    "Email": Email,
    "UserName": UserName,
    "RealName": RealName,
    "Password": Password,
  });
}
const editUserAccount = (SchoolID, StudentID, Email, UserName, RealName, Password) => {
  return axios.post(`${serverURL}/high/info/`, {
    "SchoolID": SchoolID,
    "StudentID": StudentID,
    "Email": Email,
    "UserName": UserName,
    "RealName": RealName,
    "Password": Password,
  });
}


export {newApplyNewHighClass, newUserAccount, editUserAccount};
