import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  // fetchTwoDepths,
  fetchTwoDepthContent,
  fetchPostTwoDepthContent,
  fetchPutTwoDepthContent,
  fetchDeleteTwoDepthContent,
} from '@api/contents';

// import formatTwoDepthListData from '@utils/formatTwoDepthListData';
import formatTwoDepthData from '@utils/formatTwoDepthData';

type createDataType = {
  data: {
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

const useTwoDepthContent = (TwoDepthId: string) => {
  const { data: TwoDepthContentData } = useQuery(
    ['twoDepths', TwoDepthId],
    () => fetchTwoDepthContent(TwoDepthId),
    {
      keepPreviousData: true,
      select: (data) => {
        return formatTwoDepthData(data.data);
      },
    },
  );
  return { TwoDepthContentData };
};

const useEditTwoDepthContent = (twoDepthId?: string) => {
  const queryClient = useQueryClient();
  const { mutate: createTwoDepthContent } = useMutation(
    (reqData: createDataType) => fetchPostTwoDepthContent(reqData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('oneDepths');
        queryClient.invalidateQueries('twoDepths');
        queryClient.invalidateQueries(['twoDepths', twoDepthId]);
      },
    },
  );

  const { mutate: changeTwoDepthContent } = useMutation(
    (reqData: changeDataType) => fetchPutTwoDepthContent(reqData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('oneDepths');
        queryClient.invalidateQueries('twoDepths');
        queryClient.invalidateQueries(['twoDepths', twoDepthId]);
      },
    },
  );

  const { mutate: deleteTwoDepthContent } = useMutation(
    (menuId: string) => fetchDeleteTwoDepthContent(menuId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('oneDepths');
        queryClient.invalidateQueries('twoDepths');
      },
    },
  );

  return {
    createTwoDepthContent,
    changeTwoDepthContent,
    deleteTwoDepthContent,
  };
};
export { useTwoDepthContent, useEditTwoDepthContent };
