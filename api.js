const express = require("express");
const app = express();
const PORT = process.env.PORT;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);

app.use("/codemirror-5.65.15", express.static("./codemirror-5.65.15"));

app.get("/", (req, res) => {
  compiler.flush(function () {});
  res.sendFile("./codeEditor/index.html");
});

app.post("/compile", (req, res) => {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;

  try {
    if (lang == "Cpp") {
      if (!input) {
        var envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        };
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({
              output: "compile error",
            });
          }
        });
      } else {
        var envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        };
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({
              output: "compile error",
            });
          }
        });
      }
    } else if (lang == "Java") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({
              output: "compile error",
            });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({
              output: "compile error",
            });
          }
        });
      }
    } else if (lang == "Python") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({
              output: "compile error",
            });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({
              output: "compile error",
            });
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("listening successfully");
});