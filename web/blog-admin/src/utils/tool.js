
import { parse } from 'qs';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function isObject(value) {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
}

export function isArray(value) {
  const isArrayFn =
    Array.isArray ||
    (arg => Object.prototype.toString.call(arg) === "[object Array]");
  return isArrayFn(value);
}

export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (isObject(value)) return Object.keys(value).length === 0;
  if (isArray(value)) return value.length === 0;

  return false;
}

export function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]";
}

export function objectHandler(obj, handler) {
  const finalObj = Object.keys(obj).reduce(
    (a, c) => ({
      ...a,
      [c]: handler(obj[c])
    }),
    {}
  );
  return finalObj;
}

export function trim(str) {
  if (Object.prototype.toString.call(str) === "[object String]") {
    return str.trim();
  }
  return str;
}

// 转换数据格式
export function transformFormat(data) {
  const MarkerList = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].children.length; j++) {
      MarkerList.push(data[i].children[j])
    }
  }
  return MarkerList;
}

// 转换数据格式
export function transTotalFormFormat(data) {
  const MarkerList = [];
  for (let i = 0; i < data.length; i++) {
    MarkerList.push(data[i])
    for (let j = 0; j < data[i].children.length; j++) {
      MarkerList.push(data[i].children[j])

    }
  }
  return MarkerList;
}

const addZeroFn = (data)=>{
  data = (data < 10 ? `0${data}` : data);
  return data
}

// 时间格式转换
export function formatDate(timeStamp, type) {
  if (!timeStamp) return timeStamp;
  const time = new Date(Number(timeStamp));
  const y = time.getFullYear();
  let m = time.getMonth() + 1;
  m = addZeroFn(m);
  let d = time.getDate();
  d = addZeroFn(d);
  let h = time.getHours();
  h = addZeroFn(h);
  let mm = time.getMinutes();
  mm = addZeroFn(mm);
  let s = time.getSeconds();
  s = addZeroFn(s);
  if (type === 'yy-MM-dd'){
    return `${y}-${m}-${d}`;
  }
  if (type === 'hh:mm'){
    return `${h}:${mm}`;
  }
  return `${y}-${m}-${d} ${h}:${mm}:${s}`;
}

// 获取分
export function cacuLonLatSeconds(seconds) {
  const degree = parseInt(seconds, 10);
  const min = parseInt((seconds - degree) * 60, 10);
  return min
}

// 数组对象去重
export function unique({arr, ele, len}) {
  const res = new Map();
  let out = arr.filter((a) => !res.has(a[ele]) && res.set(a[ele], 1));
  out = out.slice(0, len || out.length);
  return out
}

// 转换FormData格式
export function JSONToFormData(jsonData) {
  console.log(jsonData)
  let formData = new FormData;
  for(var i in jsonData){
    formData.append(i,jsonData[i])
  }
  return formData;
}
