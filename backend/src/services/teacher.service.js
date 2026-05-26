import Teacher from "../models/Teacher.js";

function buildListQuery({ search, active }) {
  const query = {};

  if (active === "true") query.active = true;
  else if (active === "false") query.active = false;

  if (search?.trim()) {
    const term = search.trim();
    query.$or = [
      { fullName: { $regex: term, $options: "i" } },
      { email: { $regex: term, $options: "i" } },
    ];
  }

  return query;
}

function normalizePayload(data) {
  const payload = { ...data };
  if (payload.email) payload.email = payload.email.trim().toLowerCase();
  if (payload.fullName) payload.fullName = payload.fullName.trim();
  if (payload.specialty) payload.specialty = payload.specialty.trim();
  if (payload.availableCourses) {
    payload.availableCourses = payload.availableCourses.filter(Boolean);
  }
  return payload;
}

const populateOpts = { path: "availableCourses", select: "code name active" };

export const teacherService = {
  list: (params = {}) =>
    Teacher.find(buildListQuery(params))
      .populate(populateOpts)
      .sort({ fullName: 1 }),

  getById: (id) => Teacher.findById(id).populate(populateOpts),

  create: async (data) => {
    const created = await Teacher.create(normalizePayload(data));
    return Teacher.findById(created._id).populate(populateOpts);
  },

  update: (id, data) =>
    Teacher.findByIdAndUpdate(id, normalizePayload(data), {
      new: true,
      runValidators: true,
    }).populate(populateOpts),

  /** Eliminación lógica */
  remove: (id) =>
    Teacher.findByIdAndUpdate(
      id,
      { active: false },
      { new: true, runValidators: true }
    ).populate(populateOpts),

  updateAvailability: (id, availability) =>
    Teacher.findByIdAndUpdate(
      id,
      { availability: availability || [] },
      { new: true, runValidators: true }
    ).populate(populateOpts),

  updateCourses: (id, availableCourses) =>
    Teacher.findByIdAndUpdate(
      id,
      { availableCourses: availableCourses || [] },
      { new: true, runValidators: true }
    ).populate(populateOpts),
};
