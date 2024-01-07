const Interview = require('../models/interviewSchema');
const Student = require('../models/studentSchema');

//this is the dashboard section
module.exports.dashboard = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // Fetch all student information
      let students = await Student.find({}).populate("interviews");

      // populating all interviews with students
      let interviews = await Interview.find({}).populate("students.student");

      return res.render("dashboard", {
        title: "Dashboard",
        // show all info about students
        all_students: students, 
        // show all info about interview
        interview: interviews
    
    });

    }else{
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
}
