import Faq from "../models/Faq.js";



/* 🔥 GET ALL FAQs */
export const getFaqs = async (
  req,
  res
) => {
  try {

    const faqs =
      await Faq.find()
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: faqs.length,
      faqs,
    });

  } catch (err) {

    console.log(
      "GET FAQ ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 CREATE FAQ */
export const createFaq = async (
  req,
  res
) => {
  try {

    let {
      question,
      answer,
    } = req.body;

    /* 🔥 REQUIRED CHECK */
    if (
      !question ||
      !answer
    ) {
      return res.status(400).json({
        success: false,
        msg:
          "Question & answer required ❌",
      });
    }

    /* 🔥 CLEAN DATA */
    question =
      question.trim();

    answer =
      answer.trim();

    /* 🔥 DUPLICATE CHECK */
    const existingFaq =
      await Faq.findOne({
        question,
      });

    if (existingFaq) {
      return res.status(400).json({
        success: false,
        msg:
          "FAQ already exists ❌",
      });
    }

    /* 🔥 CREATE */
    const faq =
      await Faq.create({
        question,
        answer,
      });

    res.status(201).json({
      success: true,
      msg:
        "FAQ created successfully ✅",
      faq,
    });

  } catch (err) {

    console.log(
      "CREATE FAQ ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 UPDATE FAQ */
export const updateFaq = async (
  req,
  res
) => {
  try {

    const faq =
      await Faq.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!faq) {
      return res.status(404).json({
        success: false,
        msg:
          "FAQ not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "FAQ updated ✅",
      faq,
    });

  } catch (err) {

    console.log(
      "UPDATE FAQ ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};




/* 🔥 DELETE FAQ */
export const deleteFaq = async (
  req,
  res
) => {
  try {

    const faq =
      await Faq.findByIdAndDelete(
        req.params.id
      );

    if (!faq) {
      return res.status(404).json({
        success: false,
        msg:
          "FAQ not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      msg:
        "FAQ deleted successfully ✅",
    });

  } catch (err) {

    console.log(
      "DELETE FAQ ERROR:",
      err.message
    );

    res.status(500).json({
      success: false,
      msg: "Server error ❌",
    });
  }
};