const Student = require("../models/studentSchema");

module.exports.addStudent = (req, res) => {
  return res.render("add-students");
};

// first we create student
module.exports.createStudent = (req, res) => {
  // find by email
  Student.findOne({ email: req.body.email }, (err, student) => {
    if (err) {
      console.log("Error, Student not found ");
      return res.redirect("back");
    }
    // if student is not exist then create sstudent
    if (!student) {
      Student.create(req.body, (err, newStudent) => {
        if (err) {
          req.flash("error", "Error in creating Student");
          return res.redirect("back");
        }
        console.log(newStudent);
        req.flash("success", "Student created successfully");
        return res.redirect("/dashboard");
      });
    } else {
      req.flash("error", "Error in creating Student");
      return res.redirect("back");
    }
  });
};

// deleting the student
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      // If the student doesn't exist, you might want to handle this case appropriately.
      console.log("Student not found");
      req.flash("error", "Student not found");

      return res.redirect("back");
    }
    //  delete student
    await student.remove();
    req.flash("success", "Student Deleted Successfully");
    return res.redirect("back");
  } catch (err) {
    // Handle the error  by sending an error response to the client.
    req.flash("error", "Error in Deleting Student");
    return res.redirect("back");
  }
};

// edit  student
module.exports.edit = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      // Handle the case where the student is not found
      req.flash("error", "student not found");
      return res.redirect("back");
    }
    //  if user is authenticated then only delete student
    if(req.isAuthenticated()) {
      return res.render("editStudent", {
        student: student,
      });
    }
 
    return res.redirect("/");
  } catch (err) {
 
    return res.redirect("back");
  }
};

// Upadte student
module.exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      req.flash("error", "Student not found");
      return res.redirect("back");
    }
    // all data of student that we want to update
    
    student.name = req.body.name;
    student.email = req.body.email;
    student.collage = req.body.collage;
    student.batchName = req.body.batchName;
    student.dsaScore = req.body.dsaScore;
    student.reactScore = req.body.reactScore;
    student.webDevScore = req.body.webDevScore;
    student.placement = req.body.placement;
  
    student.save();
    req.flash("success", "Student Updated successfully");
    return res.redirect("back");
  } catch (err) {
    console.log("Error in update", err.message);
    return res.redirect("back");
  }
};
