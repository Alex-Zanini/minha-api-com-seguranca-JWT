const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../models/mockDB");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, username, password: hash });
  res.status(201).json({ message: "Usuário registrado com sucesso" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Senha incorreta" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ accessToken: token });
};
