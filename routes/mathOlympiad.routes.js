const express = require("express");
const router = express.Router();

const {
    ensureAuthenticated,
    addUserData,
} = require("../middlewares/auth.middleware");

const {
    getMO,
    postMO,
    getMOList,
    deleteMO,
    paymentDoneMO,
    selectMO,
    getEditMO,
    postEditMO,
} = require("../controllers/mathOlympiad.controller");

router.get("/register", ensureAuthenticated, addUserData, getMO);
router.post("/register", ensureAuthenticated, addUserData, postMO);

router.get("/list", ensureAuthenticated, addUserData, getMOList);
router.get("/delete/:id", ensureAuthenticated, addUserData, deleteMO);
router.get("/paymentDone/:id", ensureAuthenticated, addUserData, paymentDoneMO);
router.get("/select/:id", ensureAuthenticated, addUserData, selectMO);

router.get(
    "/edit-participant/:id",
    ensureAuthenticated,
    addUserData,
    getEditMO
);
router.post("/edit-participant", ensureAuthenticated, addUserData, postEditMO);

module.exports = router;
