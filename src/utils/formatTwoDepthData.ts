const formatTwoDepthData = (twoDepthdata) => {
  const data = {
    ...twoDepthdata.attributes,
    id: twoDepthdata.id,
    content: {
      ...twoDepthdata.attributes?.content.data?.attributes,
      id: twoDepthdata.attributes?.content.data?.id || null,
    },
  };
  return data;
};

export default formatTwoDepthData;
