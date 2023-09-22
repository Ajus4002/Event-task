import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from '../services/eventService.js';
import Joi from 'joi';

export const create = async (req, res) => {
  // Validation schema
  const schema = Joi.object({
    eventName: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    eventLocationName: Joi.string().required(),
    clientName: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string().required(),
    address: Joi.string().required()
  });
  
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const { eventLogo, clientLogo } = req.files;
  const event = await createEvent({
    ...req.body,
    eventLogo: eventLogo ? `/uploads/eventLogos/${eventLogo.name}` : null,
    clientLogo: clientLogo ? `/uploads/clientLogos/${clientLogo.name}` : null,
  });

  if (eventLogo) eventLogo.mv(`./uploads/eventLogos/${eventLogo.name}`);
  if (clientLogo) clientLogo.mv(`./uploads/clientLogos/${clientLogo.name}`);

  res.send(event);
};

export const list = async (req, res) => {
  const events = await getEvents();
  res.send(events);
};

export const detail = async (req, res) => {
  const event = await getEventById(req.params.id);
  if (!event) return res.status(404).send('Event not found');
  res.send(event);
};

export const update = async (req, res) => {
  const { eventLogo, clientLogo } = req.files ?? {};
  const event = await getEventById(req.params.id);

  if (!event) return res.status(404).send('Event not found');
  
  const updatedEvent = await updateEvent(req.params.id, {
    ...req.body,
    eventLogo: eventLogo ? `/uploads/eventLogos/${eventLogo.name}` : null,
    clientLogo: clientLogo ? `/uploads/clientLogos/${clientLogo.name}` : null,
  });
  if (eventLogo) eventLogo.mv(`./uploads/eventLogos/${eventLogo.name}`);
  if (clientLogo) clientLogo.mv(`./uploads/clientLogos/${clientLogo.name}`);

  res.send(updatedEvent);
};

export const remove = async (req, res) => {
  const event = await getEventById(req.params.id);
  if (!event) return res.status(404).send('Event not found');
  
  await deleteEvent(req.params.id);
  res.send({ message: 'Event deleted' });
};
