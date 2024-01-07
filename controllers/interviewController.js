const Interview = require("../models/interviewSchema");
const Student = require("../models/studentSchema");

// add interview page rendering
module.exports.addInterview = (req, res) => {
  return res.render("addInterview");
};

// now we creating Interview
module.exports.createInterview = async (req, res) => {
  try {
    //  create
    Interview.create(req.body, (err, interview) => {
      if (err) {
        console.log("Error in set Interview");
        return res.redirect("back");
      }
      console.log(req.body);
      req.flash("success", "Intervier Conduct Successfully");
      return res.redirect("back");
    });
  } catch (err) {
    console.log("Error in creating interview", err.message);
    return res.redirect("back");
  }
};

// fetch student and interview
module.exports.enrollInInterview = async (req, res) => {
  try {
    // first check interview by id
    let interview = await Interview.findById(req.params.id);

    if (interview) {
      let student = await Student.findOne({ email: req.body.email });
      if (student) {
        // check if student already enrolled in interview
        let alreadyEnrolled = await Interview.findOne({
          "students.student": student.id,
        
        });

        if (alreadyEnrolled) {
          if (alreadyEnrolled.company === interview.company) {
            req.flash(
              "error",
              `${student.name} already enrolled in ${interview.company} interview!`
           );
            return res.redirect("back");
          }
        }

        let studentObj = {
          student: student.id,
          result: req.body.result,
        };
        // updating students field of interview by putting reference of newly enrolled student
        await interview.updateOne({
          $push: { students: studentObj },
        });

        // updating interview of student
        let assignedInterview = {
          company: interview.company,
          date: interview.date,
          result: req.body.result,
        };
        await student.updateOne({
          $push: { interviews: assignedInterview },
        });

        req.flash(
          "success",
          `${student.name} enrolled in ${interview.company} interview! , success`
        );
        return res.redirect("back");
      }
      req.flash("error", "Error");
      return res.redirect("back");
    }

    req.flash("error", "Cant't find user Id");
    return res.redirect("back");
  } catch (err) {
    console.log("error", "Error in enrolling interview!");
    return res.redirect("back");
  }
};

// delete now
module.exports.delete = async (req, res) => {
  try {
    const { studentId, interviewId } = req.params;
    // Find the interview
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      // If the interview doesn't exist, return an error response
      console.log("Interview not found for ID:", interviewId);
      req.flash("error", "This interview is not Valid/Found ");
      return res.status(404).send("Interview not found");
    }

    // Remove the reference of the student from the interview schema
    await Interview.findOneAndUpdate(
      { _id: interviewId },
      { $pull: { students: { student: studentId } } }
    );

    // Remove the interview from the student's schema using the interview's company
    await Student.findOneAndUpdate(
      { _id: studentId },
      { $pull: { interviews: { company: interview.company } } }
    );

    req.flash(
      "success",
      `Interview by ${interview.company} Date :${interview.date}Canceled  Successfully`
    );
    return res.redirect("back");
  }catch (err) {
    console.error("Error in deallocating from interview:", err);
    return res.status(500).send("Internal Server Error");
  }
};
