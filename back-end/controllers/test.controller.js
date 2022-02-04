exports.publicContent = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.protectedContent = (req, res) => {
  res.status(200).send("User Protected Content.");
};
