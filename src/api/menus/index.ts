import { axiosMenus } from '@api';

const fetchMenu = async () => {
  const { data } = await axiosMenus.get('?populate=*');
  return data;
};

const fetchPostMenu = async (reqData) => {
  const { data } = await axiosMenus.post('', reqData);
  return data;
};

const fetchPutMenu = async (reqData) => {
  const { data } = await axiosMenus.put(`/${reqData.menuId}`, reqData.reqData);
  return data;
};

const fetchDeleteMenu = async (menuId) => {
  const { data } = await axiosMenus.delete(`/${menuId}`);
  return data;
};

export { fetchMenu, fetchPostMenu, fetchPutMenu, fetchDeleteMenu };

// import { axiosMenus } from '@api';

// import { useQuery } from 'react-query';

// const useMenusQuery = () => {
//   return useQuery('', () =>
//     fetch('http://localhost:1337/api/menus').then((res) => res.json()),
//   );
// };

// export { useMenusQuery };
