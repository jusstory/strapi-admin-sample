import { axiosTwoDepth } from '@api';

const fetchTwoDepths = async () => {
  const { data } = await axiosTwoDepth.get('?populate=*');
  return data;
};

const fetchTwoDepth = async (id) => {
  const { data } = await axiosTwoDepth.get(`/${id}?populate=*`);
  return data;
};

const fetchPostTwoDepth = async (reqData) => {
  const { data } = await axiosTwoDepth.post('', reqData);
  return data;
};

const fetchPutTwoDepth = async (reqData) => {
  const { data } = await axiosTwoDepth.put(`/${reqData.id}`, reqData.reqData);
  return data;
};

const fetchDeleteTwoDepth = async (id) => {
  const { data } = await axiosTwoDepth.delete(`/${id}`);
  return data;
};

export {
  fetchTwoDepths,
  fetchTwoDepth,
  fetchPostTwoDepth,
  fetchPutTwoDepth,
  fetchDeleteTwoDepth,
};
