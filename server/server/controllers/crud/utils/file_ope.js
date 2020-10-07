import CRUD from "./general";
import AWSOP from "./aws_ope";

const find_ByID = async (req, res, Model) => {
  const role = "employee";
  const type = req.query.type;
  let fileByID = await CRUD.find_ByID(Model, role, req.query.id, res);
  await AWSOP.read(type, req.query.id)
    .then((data) => {
      return res.status(200).json({
        fname: fileByID[type].fname,
        content: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Internal server error, can not read data from aws",
      });
    });
};

const updateByID = async (req, res, Model) => {
  let role = "employee";
  let type = req.body.type;
  req.body[type] = {};
  console.log(req.body);
  req.body[type].fname = req.body.fname;
  req.body[type].createdAt = Date.now();
  await CRUD.updateByID(Model, role, req.body.id, req, res);
};

export default { find_ByID, updateByID };
