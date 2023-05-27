module.exports = app => {
    const playRecord = require("../controllers/playRecord.controller.js");

    var router = require("express").Router();

    // Create a new playRecord
    router.post("/", playRecord.create);

    // Retrieve all PlayRecords
    router.get("/", playRecord.findAll);

    // Retrieve all ended PlayRecords
    router.get("/ended", playRecord.findAllEnded);

    // Retrieve the ongoing PlayRecord
    router.get("/ongoing", playRecord.findOngoing);

    // Retrieve a single PlayRecord with an id
    router.get("/:id", playRecord.findOne);

    // Update a PlayRecord by the id in the request
    router.put("/:id", playRecord.update);

    // Delete a PlayRecord by the id in the request
    router.delete("/:id", playRecord.delete)

    // Delete all PlayRecord from the database
    router.delete("/", playRecord.deleteAll);

    app.use('/api/playRecord', router);
}