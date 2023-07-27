module.exports = async (model, type, clause = []) => {
  let result;

  switch (type) {
    case "findAll":
      result = await model.findAll({
        raw: true,
        order: [["id", "DESC"]],
        where: clause,
      });
      break;
  }
  return result;
};
