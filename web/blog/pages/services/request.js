import 'whatwg-fetch';
import {notification} from 'antd';
import {BASE_URL} from '../config/apiConfig'
import {getPageQuery,JSONToFormData} from '../utils/tool';
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const checkStatus = response => {
    let errortext = '';
    console.error(response)
    if (response.resultCode) {
        errortext = codeMessage[response.resultCode] || response.statusText;
    } else {
        errortext = '服务未连接成功， 稍等后重新刷新界面'
    }
    notification.error({
        message: `请求错误 ${response.resultCode || ''}: 服务出错啦！`,
        description: errortext,
    });
};
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option]  The options we want to pass to "fetch"
 * @baseUrl {string} baseUrl  The baseUrl for request url
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option, baseUrl = BASE_URL) {
    const options = {
        ...option,
    };

    const defaultOptions = {
        credentials: 'include',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest',

    };

    const newOptions = {...defaultOptions, ...options};
    if (newOptions.method === 'POST') {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                // 'Content-Type': 'application/json; charset=utf-8',
                // ...newOptions.headers,
            };
            // newOptions.body = JSON.stringify(newOptions.body);
            newOptions.body = JSONToFormData(newOptions.body);
        } else {
            newOptions.headers = {
                Accept: 'application/json',
                // ...newOptions.headers,
            };
        }
    }

    newOptions.headers = {
        ...newOptions.headers,
        // access_token: getPageQuery().token || '1995394078c915a995e555a64ad52b2f6dd4252dce9147837175',
        access_token: getPageQuery().token || '170875557115986625e69729fbb37fef1ee841fc3d3224383137',
    };
    const requestUrl = `${baseUrl}${url}`;
    return new Promise((resolve, reject) => {
        fetch(requestUrl, newOptions)
            .then((response) => response.text())
            .then((responseText) => {
                try {
                    const result = JSON.parse(responseText);
                    resolve(result.data);
                } catch (e) {
                    notification.error({
                        message: '返回格式错误！',
                        description: '返回格式错误！',
                    });
                }
            })
            .catch((err) => {
                checkStatus(err);
                reject(err);
            });
    });
}
