const Order = require('../models/orderModel');

async function createOrder(req, res) {
  try {
    const { user_id, productList } = req.body;

    const order = new Order({ user_id, productList });
    await order.save();

    res.json({ message: 'Order created successfully.', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateOrderById(req, res) {
  try {
    const { user_id, productList } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { user_id, productList },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json({ message: 'Order updated successfully.', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteOrderById(req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json({ message: 'Order deleted successfully.', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getAllOrders
};
