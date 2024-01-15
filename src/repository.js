require("./dbConnection");
const fileDetail = require("./dbSchema/fileDetails");
const taskDetail = require("./dbSchema/taskDetails");


exports.insertFileDetails = (data) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      var fileDetails = new fileDetail(data);
      fileDetails.save(function (err, data) {
        if (err) {
          console.log("error => ", err);
          respose.error = true;
          respose.message = "Database Error";
        } else {
          respose.error = false;
          respose.data = data;
        }
        resolve(respose);
      });
    } catch (err) {
      console.log(err);
      respose.error = true;
      respose.message = "Database Error";
      resolve(respose);
    }
  });
};

exports.getFileDetails = (id) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      fileDetail.find(id, {}, {}, function (err, results) {
        if (err) {
          console.log("error => ", err);
          respose.error = true;
          respose.message = "Database Error";
        } else {
          respose.error = false;
          respose.data = results;
        }
        resolve(respose);
      });
    } catch (err) {
      console.log("error => ", err);
      respose.error = true;
      respose.message = "Database Error";
      resolve(respose);
    }
  });
};

exports.insertTaskDetails = (data) => {
  let respose = {};
  return new Promise((resolve, reject) => {
    try {
      var taskDetails = new taskDetail(data);
      taskDetails.save(function (err, data) {
        if (err) {
          console.log("error => ", err);
          respose.error = true;
          respose.message = "Database Error";
        } else {
          respose.error = false;
          respose.data = data;
        }
        resolve(respose);
      });
    } catch (err) {
      console.log("error => ", err);
      respose.error = true;
      respose.message = "Database Error";
      reject(respose);
    }
  });
};

exports.getTaskDetails = (id) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      taskDetail.find(id, {}, {}, function (err, results) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
          };
          resolve(respose);
        } else {
          respose = {
            error: false,
            data: results,
          };
          resolve(respose);
        }
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
      };
      resolve(respose);
    }
  });
};