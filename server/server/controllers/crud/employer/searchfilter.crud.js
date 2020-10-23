import SearchFilter from "../../../models/employer/search.model";
import CRUD from "../utils/general";
import errorHandler from "../../../helpers/dbErrorHandler";
import extend from "lodash/extend";

const findByID = async (req, res) => {
  try {
    let se_filter = null;
    console.log(req.query);
    if (req.body.filterID || req.query.filterID) {
      let filterID =
        req.body.filterID === undefined
          ? req.query.filterID
          : req.body.filterID;
      se_filter = await SearchFilter.findOne({ _id: filterID });
    }
    return se_filter;
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const updateByID = async (req, res, next) => {
  req.body.employer = req.body.id;
  console.log(req.body);
  try {
    let se_filter = await findByID(req, res);
    console.log(se_filter);
    if (se_filter === null) {
      se_filter = new SearchFilter(req.body);
    } else {
      se_filter = extend(se_filter, req.body);
    }
    console.log(se_filter);
    await se_filter.save();

    // test for creating, updating filter
    return res.status(200).json({
      success: se_filter,
    });
    // await next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const find_ByID = async (req, res) => {
  if (req.query.filterID) {
    let filter = await findByID(req, res);
    return res.status(200).json({
      filter,
    });
  } else {
    let filters = [];
    try {
      filters = await SearchFilter.find({ employer: req.query.id });
      console.log(filters);
      return res.status(200).json({
        filters,
      });
    } catch (err) {
      return res.status(403).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  }
};

const deleteByID = async (req, res) => {
  try {
    await SearchFilter.remove({ _id: req.body.filterID });
    return res.status(200).json({
      success: "delete successfully",
    });
  } catch (err) {
    return res.status(403).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { find_ByID, updateByID, deleteByID };
