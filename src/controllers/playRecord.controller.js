const db = require("../models");
const PlayRecord = db.playRecord;

// Create and Save a new PlayRecord
exports.create = (req, res) => {
    // Validate request
    if (!req.body.game) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a PlayRecord
    const playRecord = new PlayRecord({
        game: req.body.game,
        platform: req.body.platform,
        start: req.body.start,
        end: req.body.end
    });

    // Save PlayRecord in the database
    playRecord
        .save(playRecord)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured during the creation of PlayRecord."
            });
        });
};

// Retrieve all PlayRecords from the database
exports.findAll = (req, res) => {
    PlayRecord.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving PlayRecords."
      });
    });
};

// Find a single PlayRecord with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    PlayRecord.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found PlayRecord with id " + id });
        else
            res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: "Error retrieving PlayRecord with id " + id });
    });
};

// Update a PlayRecord by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    PlayRecord.findByIdAndUpdate(id, req.body, {useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update PlayRecord with id ${id}. Maybe PlayRecord was not found!`
                });
            }
            else {
                res.send({ message: "PlayRecord was updated successfully." });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error update PlayRecord with id " + id
            });
        });
};

// Delete a PlayRecord by the id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    PlayRecord.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete PlayRecord with id ${id}. Maybe PlayRecord was not found!`
            });
        } else {
            res.send({
                message: "PlayRecord was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete PlayRecord with id " + id
        });
    });
};

// Delete all PlayRecord from the database
exports.deleteAll = (req, res) => {
    PlayRecord.deleteMany({})
    .then(data=> {
        res.send({
            message: `${data.deletedCount} PlayRecords were deleted successfully.`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured wile removing all PlayRecords"
        })
    })
};

// Find all ended PlayRecords
exports.findAllEnded = (req, res) => {
    PlayRecord.find({end:{$ne:null}})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving ended PlayRecords"
        })
    })
};

// Find the ongoing PlayRecord
exports.findOngoing = (req, res) => {
    PlayRecord.find({ end : null })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving ended PlayRecord"
        })
    })
};