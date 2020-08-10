let BASE_URL = 'http://localhost:8090/api/';
// let BASE_URL = 'http://dev.weisw.cn/api/'

let servicePath = {
    login:'blog/user/login' ,  //  登录接口
    upsertUser:'blog/user/upsertUser' ,  //  登录接口
    upsertArticle: 'blog/article/upsertArticle' ,  //  文章编辑接口
    getArticle:'blog/article/getArticle' ,  //  文章详情接口
    delArticle:'blog/article/delArticle?' ,  //  文章删除接口
    listArticle:'blog/article/listArticle' ,  //  文章列表接口
    listMenu:'blog/menu/listMenu' ,  //  菜单列表接口
    getMenu:'blog/menu/getMenu' ,  //  菜单详情接口
    upsertMenu:'blog/menu/upsertMenu' ,  //  菜单添加/更新接口
    upLoad: 'file/upLoad' ,  //  上传接口
};
export {BASE_URL,servicePath};
