import Order from "../models/Order.js";
const createOrder = async (req, res) => {
  try {
    const { customerId, amount, date } = req.body;
    const order = new Order({ customerId, amount, date });
    await order.save();
    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { createOrder };
