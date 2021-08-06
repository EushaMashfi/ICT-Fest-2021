const ProgrammingContest = require("../models/ProgrammingContest.model");

const getPC = (req, res) => {
    res.render("programming-contest/register.ejs", {
        error: req.flash("error"),
    });
};

const postPC = (req, res) => {
    const {
        teamName,
        institutionName,
        coachName,
        coachContact,
        coachEmail,
        coachTshirt,
        leaderName,
        leaderContact,
        leaderEmail,
        leaderTshirt,
        member1Name,
        member1Contact,
        member1Email,
        member1Tshirt,
        member2Name,
        member2Contact,
        member2Email,
        member2Tshirt,
    } = req.body;

    console.log(member2Contact);
    console.log(leaderEmail);
    console.log(coachName);
    console.log(member1Tshirt);

    const registrationFee = 2000;
    const total = registrationFee;
    const paid = 0;
    const selected = false;

    let error = "";

    ProgrammingContest.findOne({
        teamName: teamName,
        coachName: coachName,
    }).then((programmingTeam) => {
        if (programmingTeam) {
            error = "Team already exists!";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/register");
        } else {
            const programmingTeam = new ProgrammingContest({
                teamName,
                institutionName,
                coachName,
                coachContact,
                coachEmail,
                coachTshirt,
                leaderName,
                leaderContact,
                leaderEmail,
                leaderTshirt,
                member1Name,
                member1Contact,
                member1Email,
                member1Tshirt,
                member2Name,
                member2Contact,
                member2Email,
                member2Tshirt,
                total,
                paid,
                selected,
            });
            programmingTeam
                .save()
                .then(() => {
                    error = "Team has been registered successfully!";
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/register");
                })
                .catch(() => {
                    error =
                        "An unexpected error occured while registering participant";
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/register");
                });
        }
    });
};

const getPCList = (req, res) => {
    let all_programmingTeam = [];
    let error = "";
    ProgrammingContest.find()
        .then((data) => {
            all_programmingTeam = data;
            res.render("programming-contest/list.ejs", {
                error: req.flash("error"),
                programmingTeam: all_programmingTeam,
            });
        })
        .catch(() => {
            error = "Failed to retrieve data!";
            res.render("programming-contest/list.ejs", {
                error: req.flash("error", error),
                programmingTeam: all_programmingTeam,
            });
        });
};

const deletePC = (req, res) => {
    let error = "";

    ProgrammingContest.deleteOne({ _id: req.params.id })
        .then(() => {
            let error = "Data has been deleted successfully!";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
        })
        .catch(() => {
            let error = "Failed to delete data";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
        });
};

const paymentDonePC = (req, res) => {
    const id = req.params.id;

    ProgrammingContest.findOne({ _id: id })
        .then((programmingTeam) => {
            programmingTeam.paid = programmingTeam.total;
            programmingTeam
                .save()
                .then(() => {
                    let error = "Payment completed successfully!";
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/list");
                })
                .catch(() => {
                    let error = "Data could not be updated!";
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/list");
                });
        })

        .catch(() => {
            let error = "Data could not be updated!";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
        });
};

const selectPC = (req, res) => {
    const id = req.params.id;

    ProgrammingContest.findOne({ _id: id })
        .then((programmingTeam) => {
            programmingTeam.selected = true;
            programmingTeam
                .save()
                .then(() => {
                    let error = "Participant has been selected successfully!";
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/list");
                })
                .catch(() => {
                    let error = "Data could not be updated!";
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/list");
                });
        })
        .catch(() => {
            let error = "Data could not be updated!";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
        });
};

module.exports = {
    getPC,
    postPC,
    getPCList,
    deletePC,
    paymentDonePC,
    selectPC,
};

// const postPC = (req, res) => {
//     const { name, category, contact, email, institution, tshirt } = req.body;
//     console.log(name);
//     console.log(category);
//     console.log(contact);
//     console.log(email);
//     console.log(institution);
//     console.log(tshirt);
//     let registrationFee = 0;
//     if (category == "School") {
//         registrationFee = 250;
//     } else if (category == "College") {
//         registrationFee = 400;
//     } else {
//         registrationFee = 500;
//     }
//     const total = registrationFee;
//     const paid = 0;
//     const selected = false;
//     let error = "";
//     MathOlympiad.findOne({ name: name, contact: contact }).then(
//         (participant) => {
//             if (participant) {
//                 error =
//                     "Participant with this name and contact number already exists!";
//                 req.flash("error", error);
//                 res.redirect("/MathOlympiad/register");
//             } else {
//                 const participant = new MathOlympiad({
//                     name,
//                     category,
//                     contact,
//                     email,
//                     institution,
//                     paid,
//                     total,
//                     selected,
//                     tshirt,
//                 });
//                 participant
//                     .save()
//                     .then(() => {
//                         error = "Participant has been registered successfully!";
//                         req.flash("error", error);
//                         res.redirect("/MathOlympiad/register");
//                     })
//                     .catch(() => {
//                         error =
//                             "An unexpected error occured while registering participant";
//                         req.flash("error", error);
//                         res.redirect("/MathOlympiad/register");
//                     });
//             }
//         }
//     );
// };

// const getMOList = (req, res) => {
//     let all_participant = [];
//     let error = "";
//     MathOlympiad.find()
//         .then((data) => {
//             all_participant = data;
//             res.render("math-olympiad/list.ejs", {
//                 error: req.flash("error"),
//                 participants: all_participant,
//             });
//         })
//         .catch(() => {
//             error = "Failed to retrieve data!";
//             res.render("math-olympiad/list.ejs", {
//                 error: req.flash("error", error),
//                 participants: all_participant,
//             });
//         });
// };

// const deletePC = (req, res) => {
//     let error = "";
//     const id = req.params.id;
//     console.log(id);
//     res.render("programming-contest/list.ejs");

//     MathOlympiad.deleteOne({ _id: req.params.id })
//         .then(() => {
//             let error = "Data has been deleted successfully!";
//             req.flash("error", error);
//             res.redirect("/MathOlympiad/list");
//         })
//         .catch(() => {
//             let error = "Failed to delete data";
//             req.flash("error", error);
//             res.redirect("/MathOlympiad/list");
//         });
// };

// const paymentDonePC = (req, res) => {
//     const id = req.params.id;

//     MathOlympiad.findOne({ _id: id })
//         .then((participant) => {
//             participant.paid = participant.total;
//             participant
//                 .save()
//                 .then(() => {
//                     let error = "Payment completed successfully!";
//                     req.flash("error", error);
//                     res.redirect("/MathOlympiad/list");
//                 })
//                 .catch(() => {
//                     let error = "Data could not be updated!";
//                     req.flash("error", error);
//                     res.redirect("/MathOlympiad/list");
//                 });
//         })
//         .catch(() => {
//             let error = "Data could not be updated!";
//             req.flash("error", error);
//             res.redirect("/MathOlympiad/list");
//         });
// };

// const selectMO = (req, res) => {
//     const id = req.params.id;

//     MathOlympiad.findOne({ _id: id })
//         .then((participant) => {
//             participant.selected = true;
//             participant
//                 .save()
//                 .then(() => {
//                     let error = "Participant has been selected successfully!";
//                     req.flash("error", error);
//                     res.redirect("/MathOlympiad/list");
//                 })
//                 .catch(() => {
//                     let error = "Data could not be updated!";
//                     req.flash("error", error);
//                     res.redirect("/MathOlympiad/list");
//                 });
//         })
//         .catch(() => {
//             let error = "Data could not be updated!";
//             req.flash("error", error);
//             res.redirect("/MathOlympiad/list");
//         });
// };
