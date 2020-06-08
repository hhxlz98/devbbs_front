import axios from "axios";
import store from "../store";
import { MessageBox } from 'element-ui';
// import Qs from "qs"
axios.defaults.baseURL = "http://localhost:9091"

// request拦截器
axios.interceptors.request.use(config => {
  if (store.state.isLogin) {
    config.headers.Authorization = store.state.user.token;
  }
  return config
}, error => {
  // Do something with request error
  console.error(error) // for debug
  Promise.reject(error)
})

axios.interceptors.response.use(response => {
    if(response != null && response.data.code == "101") {
      MessageBox.alert(response.data.code.info, '参数异常', {
                confirmButtonText: '确定',

              });
    }
    return response
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401://token过期，清除token并跳转到登录页面
               // store.dispatch("logoutUser")
               MessageBox.alert("未登录或登录失效", '请登录', {
                         confirmButtonText: '确定',

                       });
        }
        return Promise.reject(error.response.data)
    } else {
      MessageBox.alert("请刷新页面", '未知错误', {
                confirmButtonText: '确定',

              });
    }

    return error;
})

export const userLogin = (email, password) => {
  return axios({
    url:'/user/login',
    method: "post",
    data: {
      userEmail: email,
      password: password
      }
    });
};

export const userRegister = (email, password, userName, userSex, userShow) => {
  return axios({
    url:'/user/register',
    method:'post',
    data: {
      userEmail: email,
      userName: userName,
      userPassword: password,
      userShow: userShow,
      userSex: userSex,
    }
  });

};

export const getAllPlateList = (userId) => {
  return axios({
    url:'/plate/allList',
    method:'get',
    params: {
      userId : userId
    }
  });
};

export const getMyPlateList = (userId, type) => {
  return axios({
    url:'/plate/myList',
    method:'get',
    params: {
      userId : userId,
      type: type
    }
  });
};

export const addPlateRelate = (userId, plateId, type) => {
  return axios({
    url:'/plate/addRelatePlate',
    method:'post',
    data: {
      userId: userId,
      plateId: plateId,
      type: type,
    }
  });
};

export const deletePlateRelate = (userId, plateId, type) => {
  return axios({
    url:'/plate/deleteRelatePlate',
    method:'post',
    data: {
      userId: userId,
      plateId: plateId,
      type: type,
    }
  });
};

export const getPublishPostInfo = (userId, plateId) => {
  return axios({
    url: '/post/publishInfo',
    method: 'get',
    params: {
      userId: userId,
      plateId: plateId
    }
  })
}

export const addNewPost = (authorId, plateId, title, content, tab, reward, helpfulReward, helpfulNumber, lastTime) => {
  return axios({
    url:'/post/new',
    method:'post',
    data: {
      authorId: authorId,
      plateId: plateId,
      title: title,
      content: content,
      tab: tab,
      reward: reward,
      helpfulReward: helpfulReward,
      helpfulNumber: helpfulNumber,
      lastTime: lastTime,
    }
  });
};

export const getPostList = (plateId, tab, currentPage, pageSize) => {
  return axios({
    url: '/post/list',
    method: 'get',
    params: {
      plateId : plateId,
      tab : tab,
      currentPage : currentPage,
      pageSize : pageSize
    }
  });
};

export const getPlateInfo = (userId, plateId) => {
  return axios({
    url: '/plate/info',
    method: 'get',
    params: {
      userId : userId,
      plateId : plateId
    }
  });
};

export const getPost = (postId, userId) => {
  return axios({
    url: '/post/post',
    method: 'get',
    params: {
      postId: postId,
      userId: userId,
    }
  });
};

export const searchPost = (searchString, searchType, sortType, currentPage, pageSize) => {
  return axios({
    url: '/post/searchPost',
    method: 'get',
    params: {
      searchString: searchString,
      searchType: searchType,
      sortType: sortType,
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export const addPostEvaluate = (postId, userId, type)=> {
  return axios({
    url: '/post/addRelate',
    method: 'post',
    data: {
      postId : postId,
      userId : userId,
      type : type
    }
  })
}

export const deletePostEvaluate = (postId, userId, type)=> {
  return axios({
    url: '/post/deleteRelate',
    method: 'post',
    data: {
      postId : postId,
      userId : userId,
      type : type
    }
  })
}

export const commentList = (postId, userId, currentPage, pageSize) => {
  return axios({
    url: '/comment/list',
    method: 'get',
    params: {
      postId : postId,
      userId : userId,
      currentPage : currentPage,
      pageSize : pageSize
    }
  })
}

export const likeComment = (commentId, userId, type) => {
  return axios({
    url: '/comment/likeComment',
    method: 'post',
    data: {
      commentId: commentId,
      userId: userId,
      type: type
    }
  })
}

export const unlikeComment = (commentId, userId, type) => {
  return axios({
    url: '/comment/unlikeComment',
    method: 'post',
    data: {
      commentId: commentId,
      userId: userId,
      type: type
    }
  })
}

export const assignReward = (postId, commentId, type) => {
  return axios({
    url: '/post/rewardAssign',
    method: 'post',
    data: {
      postId: postId,
      commentId: commentId,
      type: type
    }
  })
}

export const submitReply = (userId, content, postId, upId) => {
  return axios({
    url: '/comment/addComment',
    method: 'post',
    data: {
      userId: userId,
      content: content,
      postId: postId,
      upId: upId
    }
  })
}

export const getUserInfo = (userId, myUserId) => {
  return axios({
    url: '/user/info',
    method: 'get',
    params: {
      userId: userId,
      myUserId: myUserId
    }
  })
}

export const userNameExist = (userName) => {
  return axios({
    url: '/user/existUserName',
    method: 'post',
    data: {
      userName: userName
    }
  })
}

export const updateUserName = (userId, userName) => {
  return axios({
    url: '/user/alterUserName',
    method: 'post',
    data: {
      userId: userId,
      userName: userName
    }
  })
}

export const updateUserShow = (userId, userShow) => {
  return axios({
    url: '/user/alterUserShow',
    method: 'post',
    data: {
      userId: userId,
      userShow: userShow
    }
  })
}

export const updateUserInfo = (userId, userSex, userIntro) => {
  return axios({
    url: '/user/updateUserInfo',
    method: 'post',
    data: {
      userId: userId,
      userSex: userSex,
      userIntro: userIntro
    }
  })
}

export const userPostList = (userId, currentPage, pageSize) => {
  return axios({
    url: '/user/userPostList',
    method: 'get',
    params: {
      userId: userId,
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export const userCommentList = (userId, currentPage, pageSize) => {
  return axios({
    url: '/user/userCommentList',
    method: 'get',
    params: {
      userId: userId,
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export const userRelateList = (userId, type) => {
  return axios({
    url: '/user/userList',
    method: 'get',
    params: {
      userId: userId,
      type: type
    }
  })
}

export const addUserRelate = (user1Id, user2Id, type) => {
  return axios({
    url: '/user/addUserRelate',
    method: 'post',
    data: {
      user1Id: user1Id,
      user2Id: user2Id,
      type: type
    }
  })
}
export const deleteUserRelate = (user1Id, user2Id, type) => {
  return axios({
    url: '/user/deleteUserRelate',
    method: 'post',
    data: {
      user1Id: user1Id,
      user2Id: user2Id,
      type: type
    }
  })
}

export const getMessageList = (userId, currentPage, pageSize) => {
  return axios({
    url: '/mail/messageList',
    method: 'get',
    params: {
      userId: userId,
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export const getNewMessageCount = (userId) => {
  return axios({
    url: '/mail/newMessageCount',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

export const sendFriendApply = (fromId, toId, content) => {
  return axios({
    url: '/social/addApply',
    method: 'post',
    data: {
      fromId: fromId,
      toId: toId,
      content: content
    }
  })
}

export const updateFriendApply = (friendApplyId, state) => {
  return axios({
    url: '/social/updateApply',
    method: 'post',
    data: {
      friendApplyId: friendApplyId,
      state: state
    }
  })
}

export const getApplyList = (userId, currentPage, pageSize) => {
  return axios({
    url: '/social/getMyApply',
    method: 'get',
    params: {
      userId: userId,
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export const getAppliedList = (userId, currentPage, pageSize) => {
  return axios({
    url: '/social/getApplied',
    method: 'get',
    params: {
      userId: userId,
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export const sendMail = (fromId, toId, title, content) => {
  return axios({
    url: '/mail/sendMail',
    method: 'post',
    data: {
      fromId: fromId,
      toId: toId,
      title: title,
      content: content
    }
  })
}

export const updateMail = (mailId, state) => {
  return axios({
    url: '/mail/updateMail',
    method: 'post',
    data: {
      mailId: mailId,
      state: state
    }
  })
}

export const getUserMailList = (userId, currentPage, pageSize, state, isFrom, type) => {
  return axios({
    url: '/mail/getUserMailList',
    method: 'get',
    params: {
      userId: userId,
      currentPage: currentPage,
      pageSize: pageSize,
      state: state,
      isFrom: isFrom,
      type: type
    }
  })
}

export const getSysMailList = (userId, currentPage, pageSize, state, type) => {
  return axios({
    url: '/mail/getSysMailList',
    method: 'get',
    params: {
      userId: userId,
      currentPage: currentPage,
      pageSize: pageSize,
      state: state,
      type: type
    }
  })
}

export const getUserDeleteCommentList = (userId, currentPage, pageSize) => {
  return axios({
    url: '/comment/deleteCommentList',
    method: 'get',
    params: {
      userId: userId,
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export const updateCommentState = (commentId, state) => {
  return axios({
    url: '/comment/updateCommentState',
    method: 'post',
    data: {
      commentId: commentId,
      state: state
    }
  })
}

export const updatePostState = (postId, state) => {
  return axios({
    url: '/post/updateState',
    method: 'post',
    data: {
      postId: postId,
      state: state
    }
  })
}

export const updatePostContent = (postId, content, userId) => {
  return axios({
    url: '/post/updateContent',
    method: 'post',
    data: {
      postId: postId,
      content: content,
      userId: userId
    }
  })
}

export const getUserDeletePostList = (userId, currentPage, pageSize) => {
  return axios({
    url: '/post/userDeletePostList',
    method: 'get',
    params: {
      userId: userId,
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export const getSendedMailList = (userId, currentPage, pageSize, fromDelete) => {
  return axios({
    url: '/mail/sendedMailList',
    method: 'get',
    params: {
      userId: userId,
      currentPage: currentPage,
      pageSize: pageSize,
      fromDelete: fromDelete
    }
  })
}

export const updateMailFromDelete = (mailId, fromDelete) => {
  return axios({
    url: '/mail/updateMailFromDelete',
    method: 'post',
    data: {
      mailId: mailId,
      fromDelete: fromDelete
    }
  })
}

export const getList = (userId) => {
  return axios({
    url: '/task/list',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

export const getDoingList = (userId) => {
  return axios({
    url: '/task/doingList',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

export const getFinishList = (userId) => {
  return axios({
    url: '/task/finishList',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

export const takeTask = (userId, taskId) => {
  return axios({
    url: '/task/getTask',
    method: 'post',
    data: {
      userId: userId,
      taskId: taskId
    }
  })
}

export const getReward = (userId, taskRelateId) => {
  return axios({
    url: '/task/getReward',
    method: 'post',
    data: {
      userId: userId,
      taskRelateId: taskRelateId
    }
  })
}

export const backGetPlateList = (type) => {
  return axios({
    url: '/backManage/plateList',
    method: 'get',
    params: {
      type: type
    }
  })
}

export const changePlateState = (plateId, state) => {
  return axios({
    url: '/backManage/changePlateState',
    method: 'post',
    data: {
      plateId: plateId,
      state: state
    }
  })
}

export const plateNameExist = (plateId, plateName) => {
  return axios({
    url: '/backManage/plateNameExist',
    method: 'post',
    data: {
      plateId: plateId,
      plateName: plateName
    }
  })
}

export const updatePlateInfo = (userId, plateId, plateName, plateIntro, plateImg) => {
  return axios({
    url: '/backManage/updatePlateInfo',
    method: 'post',
    data: {
      userId: userId,
      plateId: plateId,
      plateName: plateName,
      plateIntro: plateIntro,
      plateImg: plateImg
    }
  })
}

export const addNewPlate = (userId, plateName, plateIntro, plateImg) => {
  return axios({
    url: '/backManage/addPlate',
    method: 'post',
    data: {
      userId: userId,
      plateName: plateName,
      plateIntro: plateIntro,
      plateImg: plateImg
    }
  })
}

export const plateManageList = () => {
  return axios({
    url: '/backManage/plateManageList',
    method: 'get',
    params: {

    }
  })
}

export const queryUser = (content, type) => {
  return axios({
    url: '/user/queryUser',
    method: "get",
    params: {
      content: content,
      type: type
    }
  })
}

export const getReportForPlate = (userId, plateId, isDeal) => {
  return axios({
    url: '/report/reportList',
    method: 'get',
    params: {
      userId: userId,
      plateId: plateId,
      isDeal: isDeal
    }
  })
}

export const ignoreReport = (userId, type, typeId, plateId) => {
  return axios({
    url: '/report/ignoreReport',
    method: 'post',
    data: {
      userId: userId,
      type: type,
      typeId: typeId,
      plateId: plateId
    }
  })
}

export const dealReport = (userId, plateId, type, typeId, lastDay, isDelete, isUpReport) => {
  return axios({
    url: '/report/dealReport',
    method: 'post',
    data: {
      userId: userId,
      plateId: plateId,
      type: type,
      typeId: typeId,
      lastDay: lastDay,
      isDelete: isDelete,
      isUpReport: isUpReport
    }
  })
}

export const addReport = (reportUserId, reportInfo, reportedUserId, type, typeId, plateId) => {
  return axios({
    url: '/report/add',
    method: 'post',
    data: {
      reportUserId: reportUserId,
      reportInfo: reportInfo,
      reportedUserId: reportedUserId,
      type: type,
      typeId: typeId,
      plateId: plateId
    }
  })
}

export const userReportList = (isDeal) => {
  return axios({
    url: '/report/userReportList',
    method: 'get',
    params: {
      isDeal: isDeal
    }
  })
}

export const userBan = (typeId) => {
  return axios({
    url: '/report/banUser',
    method: 'post',
    data: {
      typeId: typeId
    }
  })
}

export const userAllPunishList = (userId) => {
  return axios({
    url: '/report/userPunishList',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

export const cancelPubish = (punishRecordId, userId, type) => {
  return axios({
    url: '/report/cancelPunish',
    method: 'post',
    data: {
      punishRecordId: punishRecordId,
      userId: userId,
      type: type
    }
  })
}

export const getAllNewsList = () => {
  return axios({
    url: '/backManage/newsList',
    method: 'get',
    params: {

    }
  })
}

export const getHomeNewsList = () => {
  return axios({
    url: '/backManage/homeNewsList',
    method: 'get',
    params: {

    }
  })
}

export const addNews = (newsIntro, imgUrl, toLink, valid) => {
  return axios({
    url: '/backManage/addNews',
    method: 'post',
    data: {
      newsIntro: newsIntro,
      imgUrl: imgUrl,
      toLink: toLink,
      valid: valid
    }
  })
}

export const updateNewsValid = (newsId, valid) => {
  return axios({
    url: '/backManage/updateNewsValid',
    method: 'post',
    data: {
      newsId: newsId,
      valid: valid
    }
  })
}

export const updateNews = (newsId, newsIntro, imgUrl, toLink) => {
  return axios({
    url: '/backManage/updateNews',
    method: 'post',
    data: {
      newsId: newsId,
      newsIntro: newsIntro,
      imgUrl: imgUrl,
      toLink: toLink
    }
  })
}

export const latestPost = () => {
  return axios({
    url: '/post/latestPost',
    method: 'get',
    params: {
      
    }
  })
}

export const hotPost = () => {
  return axios({
    url: '/post/hotPost',
    method: 'get',
    params: {
      
    }
  })
}

export const deleteNews = (newsId) => {
  return axios({
    url: '/backManage/deleteNews',
    method: 'post',
    data: {
      newsId: newsId
    }
  })
}



export const testToken = (info) => {
  return axios({
    url: '/user/test',
    method: 'get',
    params: {
      info: info
    }
  })
}
