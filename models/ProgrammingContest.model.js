const mongoose = require("mongoose");
const PCSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
    },
    institutionName: {
        type: String,
        required: true,
    },
    coachName: {
        type: String,
        required: true,
    },
    coachContact: {
        type: String,
        required: false,
    },
    coachEmail: {
        type: String,
        required: true,
    },
    coachTshirt: {
        type: String,
        required: true,
    },

    leaderName: {
        type: String,
        required: true,
    },
    leaderContact: {
        type: String,
        required: false,
    },
    leaderEmail: {
        type: String,
        required: true,
    },
    leaderTshirt: {
        type: String,
        required: true,
    },

    member1Name: {
        type: String,
        required: true,
    },
    member1Contact: {
        type: String,
        required: false,
    },
    member1Email: {
        type: String,
        required: true,
    },
    member1Tshirt: {
        type: String,
        required: true,
    },

    member2Name: {
        type: String,
        required: true,
    },
    member2Contact: {
        type: String,
        required: false,
    },
    member2Email: {
        type: String,
        required: true,
    },
    member2Tshirt: {
        type: String,
        required: true,
    },

    total: {
        type: Number,
        required: true,
    },
    paid: {
        type: Number,
        required: true,
    },
    selected: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const ProgrammingContest = mongoose.model("ProgrammingContest", PCSchema);
module.exports = ProgrammingContest;
