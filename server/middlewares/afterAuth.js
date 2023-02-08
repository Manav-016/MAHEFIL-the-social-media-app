import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      res.status(403).json("Invalid Access");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = verified;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
