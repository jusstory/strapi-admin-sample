import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchOneDepths,
  fetchOneDepth,
  fetchPostOneDepth,
  fetchPutOneDepth,
  fetchDeleteOneDepth,
} from '@api/oneDepth';

import formatOneDepthListData from '@utils/formatOneDepthListData';
import formatOneDepthData from '@utils/formatOneDepthData';

type createDataType = {
  data: {
    one_depth: string;
  };
};

type changeDataType = {
  id: string;
  reqData: any;
};

const useOneDepthList = () => {
  const { data: oneDepthListData } = useQuery(
    'oneDepths',
    () => fetchOneDepths(),
    {
      keepPreviousData: true,
      select: (data) => {
        return formatOneDepthListData(data.data);
      },
    },
  );
  return { oneDepthListData };
};

const useOneDepth = (oneDepthId: string) => {
  const { data: oneDepthData } = useQuery(
    ['oneDepths', oneDepthId],
    () => fetchOneDepth(oneDepthId),
    {
      keepPreviousData: true,
      select: (data) => {
        return formatOneDepthData(data.data);
      },
    },
  );
  return { oneDepthData };
};

const useEditOneDepth = () => {
  const queryClient = useQueryClient();
  const { mutate: createOneDepth } = useMutation(
    (reqData: createDataType) => fetchPostOneDepth(reqData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('oneDepths');
      },
    },
  );

  const { mutate: changeOneDepthName } = useMutation(
    (reqData: changeDataType) => fetchPutOneDepth(reqData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('oneDepths');
      },
    },
  );

  const { mutate: deleteOneDepth } = useMutation(
    (menuId: string) => fetchDeleteOneDepth(menuId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('oneDepths');
      },
    },
  );

  const { mutate: refreshOneDepth } = useMutation(
    (menuId: string) => fetchOneDepth(menuId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('oneDepths');
      },
    },
  );

  return {
    createOneDepth,
    changeOneDepthName,
    deleteOneDepth,
    refreshOneDepth,
  };
};
export { useOneDepthList, useOneDepth, useEditOneDepth };
