const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/quiz",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("DB Connected");
  }
);
