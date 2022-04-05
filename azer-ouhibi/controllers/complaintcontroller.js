const Complaint = require("../model/complaint.js");
const { requireAuth, checkUser, notReqAuthentication } = require('../middleware/authMiddleware')



// Create and Save a new Message
exports.createcomp = ((req, res) => {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
  const complaint = new Complaint({
    object: req.body.object,
    content : req.body.content , 
    compdate : date ,
    user : req.user._id
  });
  complaint
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Complaint.",
      });
    });
});

// Retrieve all messages from the database.
exports.findAllcomp = (req, res) => {
  Complaint.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

// Find a single message with a messageId
exports.findOnecomp = (req, res) => {
  Complaint.findById(req.params.complaintId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "complaint not found with id " + req.params.complaintId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Complaint not found with id " + req.params.complaintId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving complaint with id " + req.params.complaintId,
      });
    });
};

// Update a message identified by the messageId in the request
exports.updatecomp = (req, res) => {
  Complaint.findByIdAndUpdate(
    req.params.complaintId,
    {
      object: req.body.object,
      content : req.body.content 
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "complaint not found with id " + req.params.complaintId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.complaintId,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.complaintId,
      });
    });
};

// Delete a message with the specified messageId in the request
exports.deletecomp = (req, res) => {
  Complaint.findByIdAndRemove(req.params.complaintId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.compalaintId,
        });
      }
      res.send({ message: "Message deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.complaintId,
        });
      }
      return res.status(500).send({
        message: "Could not delete message with id " + req.params.complaintId,
      });
    });
};