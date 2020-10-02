import extend from "lodash/extend";
import errorHandler from "../../../helpers/dbErrorHandler";

const create = async (Model, req, res, next) => {
  const element = new Model(req.body);
  try {
    await element.save();
    if (next === undefined) {
      return res.status(200).json({
        message: "Successfully created!",
      });
    } else {
      await next();
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const find_ByID = async (Model, role, id, res) => {
  try {
    let user = await Model.findOne({ [role]: id });
    console.log(user);
    return user;
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const updateByID = async (Model, role, id, req, res) => {
  try {
    let user = await find_ByID(Model, role, id, res);
    console.log(user);
    delete req.body.id;
    req.body[role] = id;

    // check create or update
    if (user === null) {
      user = new Model(req.body);
    } else {
      user = extend(user, req.body);
    }
    console.log(user);
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    console.log("error");
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  find_ByID,
  updateByID,
};
