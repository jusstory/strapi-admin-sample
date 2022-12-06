import { axiosOneDepth } from '@api';

const fetchOneDepths = async () => {
  const { data } = await axiosOneDepth.get('?populate[two_depths][populate]=*');
  return data;
};

const fetchOneDepth = async (id) => {
  const { data } = await axiosOneDepth.get(
    `/${id}?populate[two_depths][populate]=*`,
  );
  return data;
};

const fetchPostOneDepth = async (reqData) => {
  const { data } = await axiosOneDepth.post('', reqData);
  return data;
};

const fetchPutOneDepth = async (reqData) => {
  const { data } = await axiosOneDepth.put(`/${reqData.id}`, reqData.reqData);
  return data;
};

const fetchDeleteOneDepth = async (id) => {
  const { data } = await axiosOneDepth.delete(`/${id}`);
  return data;
};

export {
  fetchOneDepths,
  fetchOneDepth,
  fetchPostOneDepth,
  fetchPutOneDepth,
  fetchDeleteOneDepth,
};
