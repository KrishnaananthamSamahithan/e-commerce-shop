const bcrypt = require('bcrypt');
const userModel = require('../models/userModels'); // Make sure userModel is correctly imported
const { log } = require('console');

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({email})

    console.log("üser",user)

    if(user){
      throw new Error("User already exists")
    }

    // Validating input
    if (!email) {
      throw new Error("Please provide Email");
    }
    if (!password) {
      throw new Error("Please provide Password");
    }
    if (!name) {
      throw new Error("Please provide Name");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Use bcrypt.genSalt with await
    const hashPassword = await bcrypt.hash(password, salt); // Use bcrypt.hash with await

    if (!hashPassword) {
      throw new Error("Failed to hash password");
    }

    // Creating the payload with the hashed password
    const payload = {
      ...req.body,
      role : "GENERAL",
      password: hashPassword,
    };

    // Saving the new user to the database
    const userData = new userModel(payload);
    const saveUser = await userData.save(); // Await the save operation

    // Sending the response back to the client
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Created Successfully",
    });
  } catch (err) {
      res.json({
        message: err.message || err, // Send the error message, not the error object
        error: true,
        success: false,
    });
  }
}

module.exports = userSignUpController;
