const { axiosClient } = require("./baseApi");

const apiCommon = {
getUserByID: (id) => {  
    const url = `user?user_id=${id}`;
    return axiosClient.get(url);;
  }
};
export default apiCommon;