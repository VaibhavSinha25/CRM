import Customer from "../models/Customer.js";
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { name, email, totalSpend, visitCount, lastActive } = req.body;
    const newCustomer = new Customer({
      name,
      email,
      totalSpend,
      visitCount,
      lastActive,
    });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};
export { getCustomers, createCustomer };
