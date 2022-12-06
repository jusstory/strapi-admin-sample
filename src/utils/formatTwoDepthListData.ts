const formatTwoDepthListData = (listData) => {
  const data = listData.map((item) => ({
    key: item.attributes.two_depth,
    id: item.id,
    label: item.attributes.two_depth,
    contents: item.attributes.two_depth.attributes || [],
  }));
  return data;
};

export default formatTwoDepthListData;
