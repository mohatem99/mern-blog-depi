import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers?.token.split(" ")[1];

  if (!token) {
    res.status(400).json({ message: "Token not provided" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  if (!decoded?.userId) {
    res.status(400).json({ message: "invalid payload" });
  }
  req.user_id = decoded.userId;
  console.log(req.user_id);

  next();
};
