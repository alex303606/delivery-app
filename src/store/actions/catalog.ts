import axios from 'axios';
import {GET_SECTIONS} from './actionTypes';
import {ICatalogItem} from '../reducers/catalog';

export const getSections = (parentId: string = '', isRoot: boolean = false) => {
  const params = {
    TYPE: 'get_sections',
    PARENT_ID: parentId, //ID раздела родителя либо пусто
    IS_ROOT: isRoot, //получить только корневые разделы (true / false)
  };
  return (dispatch: any) => {
    return axios
      .post('', params)
      .then((response) => {
        if (response && response.data) {
          dispatch(getSectionsSuccess(response.data.data));
        }
      })
      .catch((error) => console.log(error));
  };
};

const getSectionsSuccess = (catalog: ICatalogItem[]) => {
  return {type: GET_SECTIONS, catalog};
};
