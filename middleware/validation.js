export const validateFields = (fields) => {
  return (req, res, next) => {
    const missings = fields.filter((f) => !req.body[f]);

    if (missings.length > 0) {
      return res.status(400).json({
        success: false,
        message: `missing required fields:${missings.join(", ")}`,
      });
    }
    next();
  };
};

export const validateParams = (params) => {
  return (req, res, next) => {
    const missingParams = params.filter((p) => !req.params[p]);
    if (missingParams.length > 0) {
      return res.status(400).json({
        success: false,
        message: `missing required params:${missingParams.join(", ")}`,
      });
    }
    next();
  };
};
