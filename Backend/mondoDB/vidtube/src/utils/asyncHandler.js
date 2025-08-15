const asyncHandler = (requesthandler) => {
  return (req, res, next) => {
    Promise.resolve(requesthandler(req, res, next)).catch((err) => next(err));
  }; //next is for middleware
};
export {asyncHandler}