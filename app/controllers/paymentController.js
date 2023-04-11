const Payment = require('../models/paymentModel');

async function createPayment(req, res) {
  try {
    const { user_id, order_id, amount } = req.body;

    const payment = new Payment({
      user_id,
      order_id,
      amount
    });

    await payment.save();

    res.status(201).json({ message: 'Payment created successfully.', payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllPayments(req, res) {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getPaymentById(req, res) {
  try {
    const payment = await Payment.findById(req.params.paymentId);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updatePaymentById(req, res) {
  try {
    const { user_id, order_id, amount } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      req.params.paymentId,
      { user_id, order_id, amount },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }

    res.json({ message: 'Payment updated successfully.', payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deletePaymentById(req, res) {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.paymentId);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }

    res.json({ message: 'Payment deleted successfully.', payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById
};
