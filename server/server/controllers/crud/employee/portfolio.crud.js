import EmployeePortfolio from "../../../models/employee/portfolio.model";
import CRUD from "../utils/general";

const create = async (req, res, next) => {
  await CRUD.create(EmployeePortfolio, req, res, next);
};

const find_ByID = async (req, res) => {
  let role = "employee";
  let portfolioByID = await CRUD.find_ByID(
    EmployeePortfolio,
    role,
    req.body.id,
    res
  );
  return portfolioByID;
};

const updateByID = async (req, res) => {
  let role = "employee";
  const { id, folioID, fname, file, note } = req.body;
  let portfolioByID = await CRUD.find_ByID(
    EmployeePortfolio,
    role,
    req.body.id,
    res
  );

  let ind = -1;
  let findRS = portfolioByID.portfolios.find(function (portfolio, index) {
    if (portfolio.index === folioID) {
      ind = index;
      return true;
    }
  });

  if (findRS === null) {
    let portfolio = new EmployeePortfolio({
      portfolios: [
        {
          index: folioID,
          fname: fname,
          note: note,
        },
      ],
      employee: id,
    });
    portfolio.save();
  } else {
    portfolioByID.portfolios[ind] = {
      index: folioID,
      fname: fname,
      note: note,
    };
    portfolioByID.save();
  }
};

export default { create, find_ByID, updateByID };
