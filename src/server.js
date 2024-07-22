const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://vvvarshithnagubandi:vvv123@cluster0.ubnlel2.mongodb.net/varshithbank",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Schema creation for database
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  accountNumber: Number,
  branch: String,
  phoneNumber: Number,
  balance: {
    type: Number,
    default: 0,
  },
});

// Creation of model
const Customer = mongoose.model("Customer", userSchema);

// Posting data on signup
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password, accountNumber, branch, phoneNumber } = req.body;
    const newCustomer = new Customer({
      username,
      password,
      accountNumber,
      branch,
      phoneNumber,
    });
    await newCustomer.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const customer = await Customer.findOne({ username });
    if (!customer) {
      return res.status(401).json({ message: "Invalid username" });
    }
    if (customer.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    return res.status(200).json({
      message: "Login Successful",
      customer: {
        username: customer.username,
        accountNumber: customer.accountNumber,
        branch: customer.branch,
        phoneNumber: customer.phoneNumber,
        balance: customer.balance,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Schema creation for deposit records
const depositSchema = new mongoose.Schema({
  username: String,
  accountNumber: Number,
  date: String,
  depositeAmount: Number,
  depositType: String,
});

// Creation of model
const Deposit = mongoose.model("Deposit", depositSchema);

// Deposit endpoint
app.post("/api/deposited", async (req, res) => {
  try {
    const { username, accountNumber, date, depositeAmount, depositType } =
      req.body;
    const customer = await Customer.findOne({ username, accountNumber });

    if (!customer) {
      return res
        .status(401)
        .json({ message: "Invalid Username and Account number" });
    }

    customer.balance = Number(customer.balance) + Number(depositeAmount);
    await customer.save();

    const newDeposit = new Deposit({
      username,
      accountNumber,
      date,
      depositeAmount,
      depositType,
    });
    await newDeposit.save();

    return res.status(200).json({
      message: "Deposit successful",
      balance: customer.balance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const withdrawalSchema = new mongoose.Schema({
  username: String,
  accountNumber: Number,
  withdrawalAmount: Number,
  withdrawalType: String,
  date: String,
});

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);
app.post("/api/withdraw", async (req, res) => {
  try {
    const { username, accountNumber, withdrawalAmount, withdrawalType, date } =
      req.body;

    const customer = await Customer.findOne({ username, accountNumber });
    console.log(req.body);
    console.log(customer.balance);
    console.log(withdrawalAmount);
    customer.balance = customer.balance - withdrawalAmount;
    console.log(customer.balance);
    await customer.save();

    return res.status(200).json({
      message: "Withdrawal successful",
      balance: customer.balance,
    });
    const newWithdrawal = new Withdrawal({
      username,
      accountNumber,
      withdrawalAmount,
      withdrawalType,
      date,
    });
    await newWithdrawal.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
