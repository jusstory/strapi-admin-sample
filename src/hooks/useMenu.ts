import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchMenu,
  fetchPostMenu,
  fetchPutMenu,
  fetchDeleteMenu,
} from '@api/menus';
import formatOneDepthListData from '@utils/formatOneDepthListData';

type createDataType = {
  data: {
    title: string;
  };
};

type changeDataType = {
  menuId: string;
  reqData: any;
};

const useMenu = () => {
  const { data: menuData } = useQuery('menus', () => fetchMenu(), {
    keepPreviousData: true,
    select: (data) => {
      return formatOneDepthListData(data.data);
    },
  });
  return { menuData };
};

const useEditMenu = () => {
  const queryClient = useQueryClient();
  const { mutate: createMenu } = useMutation(
    (reqData: createDataType) => fetchPostMenu(reqData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('menus');
      },
    },
  );

  const { mutate: changeMenuName } = useMutation(
    (reqData: changeDataType) => fetchPutMenu(reqData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('menus');
      },
    },
  );

  const { mutate: deleteMenu } = useMutation(
    (menuId: string) => fetchDeleteMenu(menuId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('menus');
      },
    },
  );

  return { createMenu, changeMenuName, deleteMenu };
};
export { useMenu, useEditMenu };
