let BASE_URL = 'http://localhost:8090/api/';
// let BASE_URL = 'http://dev.weisw.cn/api/'

let servicePath = {
    getArticle: BASE_URL + 'blog/article/getArticle' ,  //  文章详情接口
    listArticle: BASE_URL + 'blog/article/listArticle' ,  //  文章列表接口
};
export {BASE_URL,servicePath};
