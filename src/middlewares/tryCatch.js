const tryCatch = (routeHandler) => {
  return async (req, res, next) => {
    try {
      await routeHandler(req, res, next);
    } catch (error) {
      res.status(400).json({
        message: "error",
        staatus: "failes",
        error_message: error.message,
      });
    }
  };
};

export default tryCatch;
