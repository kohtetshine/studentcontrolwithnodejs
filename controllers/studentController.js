const express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const Student = require('../models/student.model');

router.get("/", (req, res) => {
  res.render("students/addOrEdit", {
    viewTitle: "Insert Student"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }

});
 
function insertRecord(req, res) {
    var student = new Student();
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;
    
    student.save()
      .then(doc => {
        res.redirect("student/list");
      })
      .catch(err => {
        console.log("Error during insert: " + err);
      });
  }
  

 

function updateRecord(req, res) {
  Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then(updatedStudent => {
      if (!updatedStudent) {
        console.log("Student not found with id: " + req.body._id);
        res.status(404).send("Student not found");
        return;
      }
      console.log("Student updated successfully:", updatedStudent);
      res.redirect("/student/list");
    })
    .catch(err => {
      console.log("Error during update:", err);
      res.status(500).send("Error during update");
    });
}


router.get("/list", async (req, res) => {
    try {
      const docs = await Student.find().maxTimeMS(30000).exec(); // Increase timeout to 30 seconds
      res.render("students/list", { list: docs });
    } catch (err) {
      console.log("Error in retrieval: " + err);
      res.status(500).send("Error in retrieval: " + err);
    }
  });
  
  
router.get("/:id", async (req, res) => {
  try {
    const doc = await Student.findById(req.params.id).exec();
    if (!doc) {
      console.log("Student not found with id: " + req.params.id);
      res.status(404).send("Student not found");
      return;
    }
    res.render("students/addOrEdit", {
      viewTitle: "Update Student",
      student: doc
    });
    console.log(doc);
  } catch (err) {
    console.log("Error retrieving student: " + err);
    res.status(500).send("Error retrieving student");
  }
});


router.get("/delete/:id", async (req, res) => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      if (deletedStudent) {
        res.redirect("/student/list");
      } else {
        console.log("Student not found with id: " + req.params.id);
        res.status(404).send("Student not found");
      }
    } catch (error) {
      console.log("Error in deletion: " + error);
      res.status(500).send("Error deleting student");
    }
  });

module.exports = router;