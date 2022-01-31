import { Axios } from '../config/axios';
import { ILike } from '../types';

const addLike = async (eventId: string) => {
  Axios.post('likes', { eventId });
};

const removeLike = async (eventId: string) => {
  Axios.delete(`likes/${eventId}`);
};

const getLikeByEventId = async (eventId: string) => {
  const { data } = await Axios.get<ILike>(`likes/${eventId}`);
  return data;
};

const likesService = {
  addLike,
  removeLike,
  getLikeByEventId,
};

export default likesService;
