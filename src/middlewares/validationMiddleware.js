const validationMiddleware = (
  req,
  res,
  next
) => {

  try {

    const {
      name,
      email,
      password,
      phone,
    } = req.body;



    /* 🔥 LOGIN ROUTE */
    const isLogin =
      req.originalUrl.includes(
        "/login"
      );



    /* =====================================
       🔥 SIGNUP VALIDATION
    ===================================== */

    if (!isLogin) {

      /* 🔥 NAME */
      if (
        !name ||
        name.trim() === ""
      ) {

        return res.status(400).json({
          success: false,
          msg:
            "Name is required ❌",
        });
      }



      if (
        name.trim().length < 2
      ) {

        return res.status(400).json({
          success: false,
          msg:
            "Name must be at least 2 characters ❌",
        });
      }



      /* 🔥 PHONE */
      if (
        !phone ||
        phone.trim() === ""
      ) {

        return res.status(400).json({
          success: false,
          msg:
            "Phone is required ❌",
        });
      }



      const phoneRegex =
        /^[0-9]{10}$/;

      if (
        !phoneRegex.test(
          phone.trim()
        )
      ) {

        return res.status(400).json({
          success: false,
          msg:
            "Phone number must be 10 digits ❌",
        });
      }
    }



    /* =====================================
       🔥 EMAIL
    ===================================== */

    if (
      !email ||
      email.trim() === ""
    ) {

      return res.status(400).json({
        success: false,
        msg:
          "Email is required ❌",
      });
    }



    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        email.trim()
      )
    ) {

      return res.status(400).json({
        success: false,
        msg:
          "Invalid email format ❌",
      });
    }



    /* =====================================
       🔥 PASSWORD
    ===================================== */

    if (
      !password ||
      password.trim() === ""
    ) {

      return res.status(400).json({
        success: false,
        msg:
          "Password is required ❌",
      });
    }



    if (
      password.length < 6
    ) {

      return res.status(400).json({
        success: false,
        msg:
          "Password must be at least 6 characters ❌",
      });
    }



    next();

  } catch (err) {

    console.log(
      "VALIDATION ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg:
        "Validation failed ❌",
    });
  }
};

export default validationMiddleware;