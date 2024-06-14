const express = require("express");
const User = require("../Models/New-User");
const bcrypt = require("bcrypt");
const router = express.Router();


router.post("/", async (req, res) => {
  const data = new User(req.body);
  if (req.body.password) {
    bcrypt.hash(req.body.password, 12, async (error, hash) => {
      if (error) {
        res.send({ result: "fail", message: "internal server error" });
      } else {
        data.password = hash;
        try {
          await data.save();
          res.send({
            result: "Done",
            message: "Record is created",
            data: data,
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await User.find().sort({ _id: -1 });
    res.send({
      total: data.length,
      result: "Done",
      message: "User found",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params._id });
    if (data) {
      res.send({ result: "Done", message: "User found", data: data });
    } else {
      res.send({ result: "Fail", message: "No User found", data: data });
    }
  } catch (error) {
    console.log(error);
  }
});
router.put("/:_id", async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params._id });
    if (data) {
      // data.username = req.body.username ?? data/username
      data.name = req.body.name ?? data.name;
      data.email = req.body.email ?? data.email;
      data.contact = req.body.contact ?? data.contact;
      data.address = req.body.address ?? data.address;
      res.send({ result: "Done", message: "User data is updated", data: data });

      await data.save();
      res.send({ result: "Done", message: "Record is updated", data: data });
    } else {
      res.send({ result: "Fail", message: "No User found", data: data });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params._id });
    await data.deleteOne();
    res.send({ result: "Done", message: "User delete", data: data });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = await User.findOne({ username: req.body.username });
    if (data) {
       await bcrypt.compare(req.body.password, data.password)
      res.send({ result: "matched", message: "login successful", data: data });
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
