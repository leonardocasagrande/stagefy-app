import { Axios } from '../config/axios';
import { IEvent } from '../types';

const startEvent = async (eventId: string, streamerPeerId: number) => {
  const { data } = await Axios.post<IEvent>(`events/${eventId}/start`, {
    streamerPeerId,
  });
  return data;
};

interface IPreviewEventResponse {
  token: string;
}

interface IJoinEventResponse {
  event: IEvent;
  token: string;
}

const previewEvent = async (eventId: string) => {
  const { data } = await Axios.post<IPreviewEventResponse>(
    `events/${eventId}/preview`,
  );
  return data.token;
};

const joinEvent = async (channelName: string) => {
  const { data } = await Axios.post<IJoinEventResponse>(
    `events/${channelName}/join`,
  );
  return data;
};

const leaveEvent = async (channelName: string) => {
  await Axios.post(`events/${channelName}/leave`);
};

const endEvent = async (channelName: string) => {
  await Axios.post(`events/${channelName}/end`);
};

const eventsService = {
  startEvent,
  joinEvent,
  leaveEvent,
  previewEvent,
  endEvent,
};

export default eventsService;
