import formatTwoDepthListData from '@utils/formatTwoDepthListData';

const formatOneDepthListData = (listData) => {
  const data = listData.map((item: any) => ({
    key: `one_depth_${item.id}`,
    id: item.id,
    label: item.attributes.one_depth,
    two_depths: formatTwoDepthListData(item.attributes.two_depths.data),
  }));
  return data;
};

export default formatOneDepthListData;
