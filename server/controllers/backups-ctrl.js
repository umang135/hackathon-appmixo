const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;

const backups = require("../models/Backup-model");
const test1 = require("../models/test1-model");
const test2 = require("../models/test2-model");
const test3 = require("../models/test3-model");

const axios = require("axios");

const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const dbName = "hackathon_db";
const client = new MongoClient(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
});

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = mm + "-" + dd + "-" + yyyy;

const uploadFile = (coll_name, obj) => {
    // Setting up S3 upload parameters
    var new_file_name =
      "umang/backup/" +
      yyyy +
      "/" +
      mm +
      "/" +
      dd +
      "/collections/" +
      coll_name +
      "/" +
      "bckup_" +
      Date.now() +
      ".json";

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: new_file_name, // File name you want to save as in S3
      Body: obj,
      //ContentType: "application/json",
      ContentType: "application/json; charset=utf-8",
      ACL: "public-read",
      CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: process.env.AWS_REGION,
      },
    };

    // Uploading files to the bucket
    s3.upload(params, async function (err, data) {
      if (err) {
        throw err;
      }

      let BckData = await backups.create({
        src: new_file_name,
        date: Date.now(),
        coll_name: coll_name,
        status: true,
      });

      if (BckData) {
        console.log(
          `File uploaded successfully and data inserted into db. ${data.Location}`
        );
      }
    });
  },
  // createBackup = (req, res) => {
  //   const body = req.body;

  //   if (!body) {
  //     return res.status(400).json({
  //       success: false,
  //       error: "You must provide a Backup",
  //     });
  //   }

  //   const Backup = new Backup(body);

  //   if (!Backup) {
  //     return res.status(400).json({ success: false, error: err });
  //   }

  //   Backup.save()
  //     .then(() => {
  //       return res.status(201).json({
  //         success: true,
  //         id: Backup._id,
  //         message: "Backup created!",
  //       });
  //     })
  //     .catch((error) => {
  //       return res.status(400).json({
  //         error,
  //         message: "Backup not created!",
  //       });
  //     });
  // };

  // updateBackup = async (req, res) => {
  //   const body = req.body;

  //   if (!body) {
  //     return res.status(400).json({
  //       success: false,
  //       error: "You must provide a body to update",
  //     });
  //   }

  //   Backup.findOne({ _id: req.params.id }, (err, Backup) => {
  //     if (err) {
  //       return res.status(404).json({
  //         err,
  //         message: "Backup not found!",
  //       });
  //     }
  //     Backup.name = body.name;
  //     Backup.time = body.time;
  //     Backup.rating = body.rating;
  //     Backup.save()
  //       .then(() => {
  //         return res.status(200).json({
  //           success: true,
  //           id: Backup._id,
  //           message: "Backup updated!",
  //         });
  //       })
  //       .catch((error) => {
  //         return res.status(404).json({
  //           error,
  //           message: "Backup not updated!",
  //         });
  //       });
  //   });
  // };

  // deleteBackup = async (req, res) => {
  //   await Backup.findOneAndDelete({ _id: req.params.id }, (err, Backup) => {
  //     if (err) {
  //       return res.status(400).json({ success: false, error: err });
  //     }

  //     if (!Backup) {
  //       return res
  //         .status(404)
  //         .json({ success: false, error: `Backup not found` });
  //     }

  //     return res.status(200).json({ success: true, data: Backup });
  //   }).catch((err) => console.log(err));
  // };

  // getBackupById = async (req, res) => {
  //   await Backup.findOne({ _id: req.params.id }, (err, Backup) => {
  //     if (err) {
  //       return res.status(400).json({ success: false, error: err });
  //     }

  //     return res.status(200).json({ success: true, data: Backup });
  //   }).catch((err) => console.log(err));
  // };

  // getBackups = async (req, res) => {
  //   await Backup.find({}, (err, Backups) => {
  //     if (err) {
  //       return res.status(400).json({ success: false, error: err });
  //     }
  //     if (!Backups.length) {
  //       return res
  //         .status(404)
  //         .json({ success: false, error: `Backup not found` });
  //     }
  //     return res.status(200).json({ success: true, data: Backups });
  //   }).catch((err) => console.log(err));
  // };

  restoreDbInfo = async (req, res) => {
    let getbcklist = await backups.find({});
    var getParams;
    var db;
    var docs;
    if (getbcklist) {
      client.connect(function (err) {
        getbcklist &&
          Array.isArray(getbcklist) &&
          getbcklist.length > 0 &&
          getbcklist.map(async (value, key) => {
            // value.coll_name;
            // value.src;

            db = client.db(dbName);

            getParams = {
              Bucket: process.env.AWS_BUCKET_NAME, // your bucket name,
              Key: value.src, // path to the object you're looking for
            };

            console.log("getParams", getParams);

            await s3.getObject(getParams, async function (err, data) {
              // Handle any error and exit
              if (err) return err;

              // No error happened
              // Convert Body from a Buffer to a String

              let jsondata = data.Body.toString("utf-8"); // Use the encoding necessary

              if (value.coll_name != "backups") {
                docs = JSON.parse(jsondata);
                docs[0]._id = ObjectId(docs[0]._id);

                await db
                  .collection("restore_" + value.coll_name)
                  .insertMany(docs, function (err, result) {
                    if (err) throw err;
                    console.log("Inserted docs:", result.insertedCount);
                  });
              }
            });
          });

        //client.close();
      });

      return res.status(200).json({
        success: true,
        data: [{ db: backups.db.name }, { getbcklist: getbcklist }],
      });
    }
  },
  getDbInfo = async (req, res) => {
    //get collections start
    var collections = mongoose.connections[0].collections;
    var coll_names = [];
    var data = [];
    var getData;
    Object.keys(collections).map((value, key) => {
      //Object.keys(collections).forEach(async function (value) {
      coll_names.push(value);
      console.log("value", value);
    });
    //get collections start

    client.connect(async function (err) {
      //assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName);

      coll_names &&
        Array.isArray(coll_names) &&
        coll_names.length > 0 &&
        coll_names.map(async (value, key) => {
          await getDocuments(db, value, function (docs) {
            console.log("Closing connection.");

            // Write to file
            try {
              //fs.writeFileSync("out_file.json", JSON.stringify(docs));
              uploadFile(value, JSON.stringify(docs));
              console.log("Done uploading to S3.");
            } catch (err) {
              console.log("Error writing to file", err);
            }
          });
        });

      //client.close();
    });

    const getDocuments = function (db, coll_name, callback) {
      const query = {}; // this is your query criteria
      db.collection(coll_name)
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          callback(result);
        });
    };

    return res.status(200).json({
      success: true,
      data: [{ db: backups.db.name }, { collections: coll_names }],
    });
  };

module.exports = {
  getDbInfo,
  restoreDbInfo,
  // updateBackup,
  // deleteBackup,
  // getBackups,
  // getBackupById,
  // getDbInfo,
};
