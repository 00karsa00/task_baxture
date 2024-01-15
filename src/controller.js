const repository = require("./repository");
const fs = require('fs');
const path = require('path');

const validateInputForMogoseId = (input) => {
    if (typeof input === 'string') {
        // Check if it's a string of 12 bytes
        if (input.length === 12 && Buffer.from(input, 'utf8').length === 12) {
            return true;
        }
        
        // Check if it's a string of 24 hex characters
        if (/^[0-9a-fA-F]{24}$/.test(input)) {
            return true;
        }
    } else if (typeof input === 'number') {
        // Check if it's an integer
        if (Number.isInteger(input)) {
            return true;
        }
    }
  
    // If none of the conditions match, return false
    return false;
  }

exports.insertFileDetails = async (req, res, next) => {
    try {
        let respose = {};
        let insertFile = await repository.insertFileDetails({
            originalName: req.file.originalname,
            fileName: req.file.filename,
            // fileDetails: data.toString(),
        });
        if (insertFile.error) {
            res.send(insertFile);
            return false;
        };
        console.log("insertFile => ",insertFile)
        respose.error = false;
        respose.message = `File upload successfully..`;
        respose.fileId = insertFile.data._id;
        res.send(respose);
        return false;
    } catch (e) {
        console.log("error => ", e);
        respose.error = true;
        respose.message = "Internal Error";
        res.send(respose);
        return false;
    }
};

exports.getFileDetails = async (req, res, next) => {
    try {
        let respose = {};
        if(!req.body.fileId || !req.body.fileId.length ) {
            respose.error = true;
            respose.message = "fileId field is required";
            res.send(respose);
            return false;
        }
        if(!validateInputForMogoseId(req.body.fileId)) {
            respose.error = true;
            respose.message = "fileId is invalid format..";
            res.send(respose);
            return false;
        }
        if(!req.body.k || !req.body.k.length ) {
            respose.error = true;
            respose.message = "k field is required";
            res.send(respose);
            return false;
        }
        let fileDetail = await repository.getFileDetails({ _id: req.body.fileId });
        if (fileDetail.error)
            return res.send(fileDetail);

        if (fileDetail.data.length) {
            fs.readFile(`${__dirname, path.join(__dirname, '../uploads')}/${fileDetail.data[0].fileName}`, async (err, data) => {
                if (err) {
                    console.log("err => ", err)
                    respose.error = true;
                    respose.message = "Internal Error";
                    res.send(respose);
                    return false;
                }

                let totalWords = data.toString();
                totalWords = totalWords.replace(/\n/g, " ");
                totalWords = totalWords.replace(/\r/g, " ");
                totalWords = totalWords.split(' ');
                totalWords = totalWords.filter((item) => item.trim().length > 0)
                let todalWord = {};
                totalWords.map((item) => {
                    todalWord[item] ? todalWord[item]++ : todalWord[item] = 1;
                })
                let uniqword = Object.keys(todalWord).filter(item => todalWord[item] == 1);
                let insertTask = await repository.insertTaskDetails({
                    fileId: req.body.fileId,
                    countWords: totalWords.length,
                    countUniqueWords: uniqword.length,
                    findTopKWords: req.body.k,
                    findTopKWordCount: todalWord[req.body.k],
                });
                if (insertTask.error)
                    return res.send(insertTask);

                respose.error = false;
                respose.message = `Successfully Insert Task Details..`;
                respose.taskId = insertTask.data._id;
                res.send(respose);

            });
        } else {
            respose.error = true;
            respose.message = "File id is not found";
            res.send(respose);
            return false;
        }
    } catch (e) {
        console.log("error => ", e);
        respose.error = true;
        respose.message = "Internal Error";
        res.send(respose);
        return false;
    }
};

exports.getTaskDetails = async (req, res, next) => {
    try {
        let respose = {};
        if(!req.body.taskId || !req.body.taskId.length ) {
            respose.error = true;
            respose.message = "taskId field is required";
            res.send(respose);
            return false;
        }
        if(!validateInputForMogoseId(req.body.taskId)) {
            respose.error = true;
            respose.message = "fileId is invalid format..";
            res.send(respose);
            return false;
        }
        let task = await repository.getTaskDetails({ _id: req.body.taskId });
        if (task.error) {
            return res.send(task);
        }
        respose.message = `Data fatch successfully`;
        respose.error = false,
        respose.data = task
        return res.send(task);
    } catch (e) {
        console.log("error => ", e);
        respose.error = true;
        respose.message = "Internal Error";
        res.send(respose);
        return false;
    }
};
