const Promo = require('../models/promoModal');

async function createPromo(req, res) {
  try {
    const { name ,productId, reduction, startDate, endDate } = req.body;

    const promo = new Promo({name ,productId, reduction, startDate, endDate });
    await promo.save();

    res.status(201).json({ message: 'Promo created successfully', promo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllPromos(req, res) {
  try {
    const promos = await Promo.find();
    res.json(promos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getPromoById(req, res) {
  try {
    const promo = await Promo.findById(req.params.promoId);

    if (!promo) {
      return res.status(404).json({ message: 'Promo not found.' });
    }

    res.json(promo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updatePromoById(req, res) {
  try {
    const { productId, reduction, startDate, endDate } = req.body;

    const promo = await Promo.findByIdAndUpdate(
      req.params.promoId,
      { productId, reduction, startDate, endDate },
      { new: true }
    );

    if (!promo) {
      return res.status(404).json({ message: 'Promo not found.' });
    }

    res.json({ message: 'Promo updated successfully.', promo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deletePromoById(req, res) {
  try {
    const promo = await Promo.findByIdAndDelete(req.params.promoId);

    if (!promo) {
      return res.status(404).json({ message: 'Promo not found.' });
    }

    res.json({ message: 'Promo deleted successfully.', promo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createPromo,
  getAllPromos,
  getPromoById,
  updatePromoById,
  deletePromoById,
};
