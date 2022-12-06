import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  // fetchTwoDepths,
  fetchTwoDepth,
  fetchPostTwoDepth,
  fetchPutTwoDepth,
  fetchDeleteTwoDepth,
} from '@api/twoDepth';

// import formatTwoDepthListData from '@utils/formatTwoDepthListData';
import formatTwoDepthData from '@utils/formatTwoDepthData';

type createDataType = {
  data: {
    one_depth: string;
    two_depth: string;
    content?: string;
  };
};

type changeDataType = {
  id: string;
  reqData: any;
};

// const useTwoDepthList = () => {
//   const { data: TwoDepthListData } = useQuery(
//     'TwoDepths',
//     () => fetchTwoDepths(),
//     {
//       keepPreviousData: true,
//       select: (data) => {
//         return formatTwoDepthListData(data.data);
//       },
//     },
//   );
//   return { TwoDepthListData };
// };

const useTwoDepth = (TwoDepthId: string) => {
  const { data: TwoDepthData } = useQuery(
    ['twoDepths', TwoDepthId],
    () => fetchTwoDepth(TwoDepthId),
    {
      keepPreviousData: true,
      select: (data) => {
        return formatTwoDepthData(data.data);
      },
    },
  );
  return { TwoDepthData };
};

const useEditTwoDepth = () => {
  const queryClient = useQueryClient();
  const { mutate: createTwoDepth } = useMutation(
    (reqData: createDataType) => fetchPostTwoDepth(reqData),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('oneDepths');
        queryClient.invalidateQueries('twoDepths');
        localStorage.setItem('createNewTwoDepthId', data.data.id);
      },
    },
  );

  const { mutate: changeTwoDepthName } = useMutation(
    (reqData: changeDataType) => fetchPutTwoDepth(reqData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('oneDepths');
        queryClient.invalidateQueries('twoDepths');
      },
    },
  );

  const { mutate: deleteTwoDepth } = useMutation(
    (menuId: string) => fetchDeleteTwoDepth(menuId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('oneDepths');
        queryClient.invalidateQueries('twoDepths');
      },
    },
  );

  return { createTwoDepth, changeTwoDepthName, deleteTwoDepth };
};
export { useTwoDepth, useEditTwoDepth };
