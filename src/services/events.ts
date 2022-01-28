import { Axios } from '../config/axios';
import { IStartedEvent } from '../types';

const startEvent = async (eventId: string) => {
  const { data } = await Axios.post<IStartedEvent>(`events/${eventId}/start`);
  return data;
};

const eventsService = {
  startEvent,
};

export default eventsService;
