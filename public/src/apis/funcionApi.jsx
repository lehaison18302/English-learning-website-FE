const { axiosClient } = require("./baseApi");

const apiCommon = {
  getPronounce: () => {  
      const url = `pronounce`;
      return axiosClient.get(url);;
    },
  getUseData: (id) => {
    const url = `user/${id}`;
    return axiosClient.get(url);
  }
};
export default apiCommon;