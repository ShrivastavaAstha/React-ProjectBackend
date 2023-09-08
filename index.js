const express = require("express");
const app = express();
const moviemodel = require("./models/moviedata");
const accountmodel = require("./models/accountdata");
const feedbackmodel = require("./models/addfeedback");
const { connectDatabase } = require("./connection/connect");

const path = require("path");
app.use(express.json());
app.post("/api/addmovie", async (req, res) => {
  try {
    const newobj = {
      name: req.body.name,
      rating: req.body.rating,
      date: req.body.date,
      gener: req.body.gener,
      description: req.body.description,
      Type: req.body.Type,
      Status: req.body.Status,
    };
    console.log(newobj);
    const moviedata = new moviemodel(newobj);
    await moviedata.save();
    return res.status(200).json({ success: true, message: "Data Saved" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.get("/api/getdata", async (req, res) => {
  try {
    const movie = await moviemodel.find();
    return res.status(200).json({ success: true, data: movie });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.post("/api/handlestatus/:id", async (req, res) => {
  try {
    await moviemodel.findByIdAndUpdate(req.params.id, {
      Status: req.body.Status,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.delete("/api/deletedata/:id", async (req, res) => {
  try {
    await moviemodel.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.post("/api/addaccount", async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await accountmodel.findOne({ email: email });
    if (userExist) {
      return res.json({ message: "Email already Exist" });
    }
    const secondobj = {
      username: req.body.username,
      contact: req.body.contact,
      email: req.body.email,
      password: req.body.password,
    };
    console.log(secondobj);
    const accountdata = new accountmodel(secondobj);
    await accountdata.save();
    return res.status(200).json({ success: true, message: "Data Saved" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await accountmodel.findOne({ email, password });
    if (!user) {
      return res.json({ message: "Invalid cridentials" });
    } else {
      return res.status(200).json({ success: true, data: user });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});
// app.post("/api/login", async (req, res) => {
//   try {
//     let token;
//     const { email, password } = req.body;
//     const userLogin = await accountmodel.findOne({ email: email });
//     console.log(userLogin);

//     if (userLogin) {
//       const isMatch = await bcrypt.compare(password, userLogin.password);
//       token = await userLogin.generateAuthToken();
//       console.log(token);
//       res.cookie("jwttoken", token, {
//         expires: new Date(Date.now() + 25892000000),
//         httpOnly: true,
//       });
//       if (!isMatch) {
//         return res.status(400).json({ error: "Invalid credientials" });
//       } else {
//         return res
//           .status(400)
//           .json({ success: true, message: "Login Successful!" });
//       }
//     } else {
//       return res.status(200).json({ error: "Invalid credientials" });
//     }
//   } catch (error) {
//     return res.status(400).json({ success: false, error: error.message });
//   }
// });

app.post("/api/addfeedback", async (req, res) => {
  try {
    const feedbackobj = {
      name: req.body.name,
      email: req.body.email,
      feedback: req.body.feedback,
    };
    console.log(feedbackobj);
    const feedbackdata = new feedbackmodel(feedbackobj);
    await feedbackdata.save();
    return res.status(200).json({ success: true, message: "Data Saved" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

// const PORT = 5000;
connectDatabase();
const PORT = process.env.PORT || 5000;

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  console.log("here");
  res.sendFile(
    path.resolve(__dirname + "/client/build/index.html"),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
});
app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
});
