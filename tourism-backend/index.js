const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const signUpRoute = require("./routes/signUp.route");
const travelRoute = require("./routes/booking.route");
const logInRoute = require("./routes/login.route");
const userRoute = require("./routes/user.router");
const contactRoute = require("./routes/contact.router");
const swaggerUi= require ('swagger-ui-express')
const swaggerJson = require('./swagger.json')

const PORT = process.env.PORT || 5000;

dotenv.config({ path: "./.env" });
//TODO: after zupdating the db check if everything is working fine
//middleware
app.use(express.json());
app.use(cors()); // allowing external app to access the api
app.use(morgan("dev")); // log the request in the console

/* mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("Connected to database successfully"))
  .catch((err) => console.log(err)); */
 
  mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.xwadktq.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(){
    console.log('connection on')
})
  app.use("/swagger", swaggerUi.serve,swaggerUi.setup(swaggerJson))
app.use("/users", signUpRoute);
app.use("/user", userRoute);
app.use("/login", logInRoute);
app.use("/api/bookings", travelRoute);
app.use("/contact", contactRoute);

app.listen(PORT, () => {
  console.log(`server is listening on port https://localhost/${PORT}`);
});
