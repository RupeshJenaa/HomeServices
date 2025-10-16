import Service from '../models/Service.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js'; // Add this import

export const getProviderServices = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message,
    });
  }
};

export const addService = async (req, res) => {
  try {
    const { title, description, category, price, duration } = req.body;

    const service = await Service.create({
      provider: req.user._id,
      title,
      description,
      category,
      price,
      duration,
    });

    // Add service to provider's services array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { 'providerInfo.services': service._id }
    });

    res.status(201).json({
      success: true,
      data: service,
      message: 'Service added successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding service',
      error: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { title, description, category, price, duration, isActive } = req.body;

    const service = await Service.findOne({
      _id: req.params.id,
      provider: req.user._id,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        price,
        duration,
        isActive,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedService,
      message: 'Service updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating service',
      error: error.message,
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      provider: req.user._id,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    // Remove service from provider's services array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { 'providerInfo.services': req.params.id }
    });

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error.message,
    });
  }
};

export const getProviderBookings = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = { provider: req.user._id };

    if (status) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter)
      .populate('customer', 'name email phone')
      .populate('service')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message,
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['confirmed', 'in-progress', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      provider: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      data: booking,
      message: 'Booking status updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message,
    });
  }
};

export const getEarnings = async (req, res) => {
  try {
    const { period } = req.query; // 'day', 'week', 'month', 'year'
    
    let startDate = new Date();
    const endDate = new Date();

    switch (period) {
      case 'day':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 1); // Default to last month
    }

    const earnings = await Booking.aggregate([
      {
        $match: {
          provider: req.user._id,
          status: 'completed',
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: '$totalAmount' },
          totalBookings: { $sum: 1 }
        }
      }
    ]);

    const totalEarnings = earnings.length > 0 ? earnings[0].totalEarnings : 0;
    const totalBookings = earnings.length > 0 ? earnings[0].totalBookings : 0;

    res.status(200).json({
      success: true,
      data: {
        totalEarnings,
        totalBookings,
        period: period || 'month'
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching earnings',
      error: error.message,
    });
  }
};