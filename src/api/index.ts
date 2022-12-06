import axios from 'axios';

const DEVEL_URL =
  'http://ec2-15-164-251-34.ap-northeast-2.compute.amazonaws.com:1337/api';

const axios_timeout = 18000;
const axios_headers = {
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8',
};

const createAxios = (originUrl, url) => {
  return axios.create({
    baseURL: `${originUrl}/${url}`,
    timeout: axios_timeout,
    // headers: axios_headers,
  });
};

export const axiosService = createAxios(DEVEL_URL, '');

export const axiosMenus = createAxios(DEVEL_URL, 'menus');

export const axiosOneDepth = createAxios(DEVEL_URL, 'one-depths');

export const axiosTwoDepth = createAxios(DEVEL_URL, 'two-depths');

export const axiosTwoDepthContents = createAxios(DEVEL_URL, 'contents');
