import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, fullname, sap } = req.body;

  const user = await User.create({
    email,
    fullname,
    sap,
  });

  return res.status(200).json(new ApiResponse(200, user));
});

const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  const user = await User.findOne({ email });
  console.log(user);

  return res.status(200).json(new ApiResponse(200, user));
});

export { registerUser, loginUser };
