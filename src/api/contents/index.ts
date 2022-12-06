import { axiosTwoDepthContents } from '@api';

const fetchTwoDepthContents = async () => {
  const { data } = await axiosTwoDepthContents.get('?populate=*');
  return data;
};

const fetchTwoDepthContent = async (id) => {
  const { data } = await axiosTwoDepthContents.get(`/${id}?populate=*`);
  return data;
};

const fetchPostTwoDepthContent = async (reqData) => {
  const { data } = await axiosTwoDepthContents.post('', reqData);
  return data;
};

const fetchPutTwoDepthContent = async (reqData) => {
  const { data } = await axiosTwoDepthContents.put(
    `/${reqData.id}`,
    reqData.reqData,
  );
  return data;
};

const fetchDeleteTwoDepthContent = async (id) => {
  const { data } = await axiosTwoDepthContents.delete(`/${id}`);
  return data;
};

export {
  fetchTwoDepthContents,
  fetchTwoDepthContent,
  fetchPostTwoDepthContent,
  fetchPutTwoDepthContent,
  fetchDeleteTwoDepthContent,
};
