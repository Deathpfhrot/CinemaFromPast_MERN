const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");

function readData(path) {
    return new Promise((resolve, rejects) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                console.log(err);
                rejects(err);
            } else {
                const result = JSON.parse(data);
                resolve(result);
            }
        });
    });
}

function writeData(data, path) {
    return new Promise((resolve, rejects) => {
        fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
            if (err) rejects(err);
            else {
                console.log("Dates has been written");
                resolve(data);
            }
        });
    });
}

module.exports = { readData, writeData };