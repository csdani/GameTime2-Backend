const mongoose = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            game: String,
            platform: String,
            start: Date,
            end: Date
        },
        { timestamps: true }
    );
        
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const PlayRecord = mongoose.model('playRecord', schema);
    return PlayRecord;
};