import Manufacturing from "../models/Manufacturing.js";
import Order from "../models/Order.js";
import Testimonial from "../models/Testimonial.js";
import Subscriber from "../models/Subscriber.js";

export const getServices = async (req, res) => {
  try {
    const services = await Manufacturing.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: services.length, services });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: testimonials.length, testimonials });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: subscribers.length, subscribers });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ success: false, msg: "Order not found" });
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, msg: "Order not found" });
    res.status(200).json({ success: true, msg: "Order deleted" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) return res.status(404).json({ success: false, msg: "Testimonial not found" });
    res.status(200).json({ success: true, testimonial });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, msg: "Testimonial not found" });
    res.status(200).json({ success: true, msg: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const updateSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subscriber) return res.status(404).json({ success: false, msg: "Subscriber not found" });
    res.status(200).json({ success: true, subscriber });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) return res.status(404).json({ success: false, msg: "Subscriber not found" });
    res.status(200).json({ success: true, msg: "Subscriber deleted" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
