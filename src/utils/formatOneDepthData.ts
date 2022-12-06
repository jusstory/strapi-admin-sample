const formatOneDepthData = (oneDepthdata) => {
  const data = {
    ...oneDepthdata.attributes,
    id: oneDepthdata.id,
    two_depths: oneDepthdata.attributes?.two_depths.data.map((item: any) => ({
      ...item,
      key: `two_depth_${item.id}`,
      id: item.id,
      label: item.attributes.two_depth,
      content: {
        data: item.attributes.content.data?.attributes || null,
        id: item.attributes.content.data?.id || null,
      },
    })),
  };
  return data;
};

export default formatOneDepthData;
