import api from '../config/Api';
import key from '../constants/ApiKey';

export const search = async ({ nickname = '', platform = '' }) => {
  const res = api.get(`/search/${platform}/${nickname}?cid=${key}`);
  return res;
};
