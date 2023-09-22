import Event from '../models/Event.js';

export const createEvent = async (data) => {
  return await Event.create(data);
};

export const getEvents = async () => {
  return await Event.findAll();
};

export const getEventById = async (id) => {
  return await Event.findByPk(id);
};

export const updateEvent = async (id, data) => {
  return await Event.update(data, {
    where: { id }
  });
};

export const deleteEvent = async (id) => {
  return await Event.destroy({
    where: { id }
  });
};
