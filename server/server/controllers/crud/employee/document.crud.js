import EmployeeDocument from "../../../models/employee/document.model";
import CRUD from "../utils/general";
import AWSOP from "../utils/aws_ope";

const find_ByID = async (req, res) => {
  let role = "employee";
  let documentByID = await CRUD.find_ByID(
    EmployeeDocument,
    role,
    req.body.id,
    res
  );
  let resumeCont = AWSOP.read("resume", documentByID.resume.fcryptoName);
  let deplomaCont = AWSOP.read("deploma", documentByID.deploma.fcryptoName);
  let licenceCont = AWSOP.read("licence", documentByID.licence.fcryptoName);
  let refCont = AWSOP.read(
    "refletter",
    documentByID.referenceLetter.fcryptoName
  );
  Promise.all([resumeCont, deplomaCont, licenceCont, refCont]).then(
    (values) => {
      return res
        .status(200)
        .json({
          resume: {
            fname: documentByID.resume.fname,
            data: resumeCont,
          },
          deploma: {
            fname: documentByID.deploma.fname,
            data: deplomaCont,
          },
          licence: {
            fname: documentByID.licence.fname,
            data: licenceCont,
          },
          referenceLetter: {
            fname: documentByID.referenceLetter.fname,
            data: refCont,
          },
        })
        .catch((err) => {
          return res.status(403).json({
            error: err,
          });
        });
    }
  );
};

const updateByID = async (req, res) => {
  let role = "employee";
  req.body[type].fname = req.body.fname;
  if (req.body.newFName === undefined) {
    req.body[type].fname = req.body.fname;
    req.body[type].fcryptoName = req.body.id + req.body.fname;
  } else {
    req.body[type].fname = req.body.newFName;
    req.body[type].fcryptoName = req.body.id + req.body.newFName;
  }
  await CRUD.updateByID(EmployeeDocument, role, req.body.id, req, res);
};

export default { find_ByID, updateByID };
