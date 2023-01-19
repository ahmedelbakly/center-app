require("dotenv").config();
exports.authReq = async (req, res, next) => {
  const shafrat = process.env.SHFARAT.split(" ");

  const save = await req.headers.save;
  
  try {
    if (!save) {
      return res.json("communicate with backend developer");
    } else {
      const pass = shafrat.includes(save);
      if (!pass) {
        return res.json("communicate with backend developer ");
      } else {
        // console.log(pass);
        next();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
