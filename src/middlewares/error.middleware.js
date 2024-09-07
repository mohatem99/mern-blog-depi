export const errorHandler = (API) => {
  return (req, res, next) => {
    API(req, res, next).catch((err) => {
      next(err);
    });
  };
};
