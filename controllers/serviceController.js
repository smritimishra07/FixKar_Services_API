const mongoose = require('mongoose');
const Service = require('../models/Service');

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    console.error(`Error fetching services: ${err.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new service
exports.createService = async (req, res) => {
  const { name, description, price, category, location, image} = req.body;

  try {
    // Check if a service with the same name already exists
    const existingService = await Service.findOne({ name });

    if (existingService) {
      return res.status(400).json({ message: 'Service with this name already exists' });
    }
    
    const newService = new Service({
      name,
      description,
      price,
      category, 
      location,
      image
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.error(`Error creating service: ${err.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a service by ID
exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, location, image } = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, description, price, category, location, image },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(updatedService);
  } catch (err) {
    console.error(`Error updating service: ${err.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a service by ID
exports.deleteService = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedService = await Service.findByIdAndDelete(id);

      // Check if the ID is valid before proceeding
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Service ID' });
      }
  
      if (!deletedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      res.status(200).json({ message: 'Service deleted successfully' });
    } catch (err) {
      console.error(`Error deleting service: ${err.message}`);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  