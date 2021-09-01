const MathOlympiad = require("../models/MathOlympiad.model");
let regID = 202104000;

const getRegisterID = () => {
    MathOlympiad.findOne({ registerID: regID }).then((participant) => {
        if (participant) {
            regID++;
            console.log("finding");
            console.log(regID);
            getRegisterID();
        } else {
            console.log("the one to save");
            console.log(regID);
        }
    });
};

const getMO = (req, res) => {
    getRegisterID();
    res.render("math-olympiad/register.ejs", { error: req.flash("error") });
};

const postMO = (req, res) => {
    const { name, category, contact, email, institution, tshirt } = req.body;
    console.log(name);
    console.log(category);
    console.log(contact);
    console.log(email);
    console.log(institution);
    console.log(tshirt);
    let registerID = regID;
    console.log("the one saving");
    console.log(registerID);

    let registrationFee = 0;
    if (category == "School") {
        registrationFee = 250;
    } else if (category == "College") {
        registrationFee = 400;
    } else {
        registrationFee = 500;
    }

    const total = registrationFee;
    const paid = 0;
    const selected = false;

    let error = "";

    MathOlympiad.findOne({ name: name, contact: contact }).then(
        (participant) => {
            if (participant) {
                error =
                    "Participant with this name and contact number already exists!";
                req.flash("error", error);
                res.redirect("/MathOlympiad/register");
            } else {
                const participant = new MathOlympiad({
                    name,
                    registerID,
                    category,
                    contact,
                    email,
                    institution,
                    paid,
                    total,
                    selected,
                    tshirt,
                });
                participant
                    .save()
                    .then(() => {
                        sendMail(email, verficationCode);
                        console.log("abcd");
                        error = "Participant has been registered successfully!";
                        req.flash("error", error);
                        res.redirect("/MathOlympiad/register");
                    })
                    .catch(() => {
                        error =
                            "An unexpected error occured while registering participant";
                        req.flash("error", error);
                        res.redirect("/MathOlympiad/register");
                    });
            }
        }
    );
};

const getMOList = (req, res) => {
    let all_participant = [];
    let error = "";
    MathOlympiad.find()
        .then((data) => {
            all_participant = data;
            res.render("math-olympiad/list.ejs", {
                error: req.flash("error"),
                participants: all_participant,
            });
        })
        .catch(() => {
            error = "Failed to retrieve data!";
            res.render("math-olympiad/list.ejs", {
                error: req.flash("error", error),
                participants: all_participant,
            });
        });
};

const deleteMO = (req, res) => {
    let error = "";

    MathOlympiad.deleteOne({ _id: req.params.id })
        .then(() => {
            let error = "Data has been deleted successfully!";
            req.flash("error", error);
            res.redirect("/MathOlympiad/list");
        })
        .catch(() => {
            let error = "Failed to delete data";
            req.flash("error", error);
            res.redirect("/MathOlympiad/list");
        });
};

const paymentDoneMO = (req, res) => {
    const id = req.params.id;

    MathOlympiad.findOne({ _id: id })
        .then((participant) => {
            participant.paid = participant.total;
            participant
                .save()
                .then(() => {
                    let error = "Payment completed successfully!";
                    req.flash("error", error);
                    res.redirect("/MathOlympiad/list");
                })
                .catch(() => {
                    let error = "Data could not be updated!";
                    req.flash("error", error);
                    res.redirect("/MathOlympiad/list");
                });
        })
        .catch(() => {
            let error = "Data could not be updated!";
            req.flash("error", error);
            res.redirect("/MathOlympiad/list");
        });
};

const selectMO = (req, res) => {
    const id = req.params.id;

    MathOlympiad.findOne({ _id: id })
        .then((participant) => {
            participant.selected = true;
            participant
                .save()
                .then(() => {
                    let error = "Participant has been selected successfully!";
                    req.flash("error", error);
                    res.redirect("/MathOlympiad/list");
                })
                .catch(() => {
                    let error = "Data could not be updated!";
                    req.flash("error", error);
                    res.redirect("/MathOlympiad/list");
                });
        })
        .catch(() => {
            let error = "Data could not be updated!";
            req.flash("error", error);
            res.redirect("/MathOlympiad/list");
        });
};

const getEditMO = (req, res) => {
    const id = req.params.id;
    let info = [];
    MathOlympiad.findOne({ _id: id })
        .then((data) => {
            info = data;
            res.render("math-olympiad/editParticipant.ejs", {
                error: req.flash("error"),
                participant: info,
            });
        })
        .catch((e) => {
            console.log(e);
            error = "Failed to fetch participants";
            res.render("math-olympiad/editParticipant.ejs", {
                error: req.flash("error", error),
                participant: info,
            });
        });
};

const postEditMO = async (req, res) => {
    let registrationFee = 0;
    const { name, contact, category, email, institution, tshirt } = req.body;
    if (category == "School") {
        registrationFee = 250;
    } else if (category == "College") {
        registrationFee = 400;
    } else if (category == "University") {
        registrationFee = 500;
    }
    const total = registrationFee;
    const data = await MathOlympiad.findOneAndUpdate(
        { name: name, contact: contact },
        { category, email, institution, tshirt, total }
    );
    if (data) {
        console.log("findOneAndUpdate ", data);
        res.redirect("/MathOlympiad/list");
    }
};

module.exports = {
    getMO,
    postMO,
    getMOList,
    deleteMO,
    paymentDoneMO,
    selectMO,
    postEditMO,
    getEditMO,
};
