import api from '../config/Api';
import key from '../constants/ApiKey';

export const search = async ({ nickname = '', platform = '' }) => {
  const res = api.get(`/search/${platform}/${nickname}?cid=${key}`);
  return res;
};

export const getPlayer = async ({ playerId = '' }) => {
  const res = api.get(`/player/${playerId}?cid=${key}`);
  return res;
};
