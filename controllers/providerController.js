const mongoose = require('mongoose');
const Provider = require('../models/Provider');

// Get all providers
exports.getProviders = async (req, res) => {
  try {
    const providers = await Provider.find().populate('servicesOffered');
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
};

// Create a new provider
exports.createProvider = async (req, res) => {
  const { name, email, servicesOffered } = req.body;
  
  try {
    // Check if a provider with the same email already exists
    const existingProvider = await Provider.findOne({ email });

    if (existingProvider) {
      return res.status(400).json({ message: 'Provider with this email already exists' });
    }

    const newProvider = new Provider({ name, email, servicesOffered });
    await newProvider.save();
    res.status(201).json(newProvider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create provider' });
  }
};

// Update a provider by ID
exports.updateProvider = async (req, res) => {
  const { id } = req.params;
  const { name, email, servicesOffered } = req.body;

  try {
    const updatedProvider = await Provider.findByIdAndUpdate(
      id,
      { name, email, servicesOffered },
      { new: true, runValidators: true }
    ).populate('servicesOffered');

    if (!updatedProvider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    res.status(200).json(updatedProvider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update provider' });
  }
};

// Delete a provider by ID
exports.deleteProvider = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedProvider = await Provider.findByIdAndDelete(id);

      // Check if the ID is valid before proceeding
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Service ID' });
      }

      if (!deletedProvider) {
        return res.status(404).json({ error: 'Provider not found' });
      }
  
      res.status(200).json({ message: 'Provider deleted successfully' });
    } catch (error) {
      console.error(`Error deleting provider: ${error.message}`);
      res.status(500).json({ error: 'Failed to delete provider' });
    }
  };