import TimeSlot from "../models/TimeSlot.js";

export const timeslotService = {
  list: () => TimeSlot.find().sort({ day: 1, startTime: 1 }),
  getById: (id) => TimeSlot.findById(id),
  create: (data) => TimeSlot.create(data),
  update: (id, data) =>
    TimeSlot.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  remove: (id) => TimeSlot.findByIdAndDelete(id),
};
