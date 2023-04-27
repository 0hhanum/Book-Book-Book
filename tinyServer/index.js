require("dotenv").config();
const express = require("express"); //express를 설치했기 때문에 가져올 수 있다.
const bodyParser = require("body-parser");
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.json()); // parse application/json
app.use("/", express.static("./public"));
app.get("/", (req, res) => {
  //   res.send("Hello World!");
  res.render("index.html");
});
app.post("/sendmail", async (req, res) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${process.env.MAILGUN_API_KEY}`);

    var urlencoded = new URLSearchParams();
    urlencoded.append("from", `${process.env.MAILGUN_ADDRESS}`);
    urlencoded.append("to", `${process.env.MAILGUN_ADDRESS}`);
    urlencoded.append("subject", req.body.subject);
    urlencoded.append("text", req.body.message);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const response = await fetch(process.env.MAILGUN_DOMAIN, requestOptions);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log("Mail sent successfully!");
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
app.listen(8888);
