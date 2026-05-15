const roleMiddleware = (
  ...roles
) => {

  return (
    req,
    res,
    next
  ) => {

    try {

      /* 🔥 USER CHECK */
      if (!req.user) {
        return res.status(401).json({
          success: false,
          msg:
            "Unauthorized access ❌",
        });
      }

      /* 🔥 ROLE CHECK */
      if (
        !roles.includes(
          req.user.role
        )
      ) {
        return res.status(403).json({
          success: false,
          msg:
            "Access denied ❌",
        });
      }

      next();

    } catch (err) {

      console.log(
        "ROLE MIDDLEWARE ERROR:",
        err.message
      );

      res.status(500).json({
        success: false,
        msg:
          "Role authorization failed ❌",
      });
    }
  };
};

export default roleMiddleware;