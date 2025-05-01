import { loginService, registerService } from "../service/authService.js";

//register
export const register = async (req, res) => {
  const { email, name, password } = req.body;
  console.log(email, name, password);
  if (!email || !name || !password) {
    throw new Error("all fields are requird");
  }
  const data = await registerService(email, password, name);
  if (data) {
    res.status(201).json({ message: "register successfull", user: data });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("all field are requird");
  }
  const { user, token } = await loginService(email, password);
  res
    .status(200)
    .json({ message: "Login successful", user: user, token: token });
};
