//this function is called when async (Model) is called
//It returns express (req, res, next) and call function
//fn is async and returns promise so .cath is available
//next calls/invokes global Error handler (in errorController)
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
