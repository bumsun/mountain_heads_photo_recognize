
import qs from 'querystring'

export const getRequestUrl = () => {
    return "http://193.106.172.231/api/";
};
export const getHttpParams = (params) => {
    var httpParams = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: qs.stringify(params)
    }
    return httpParams;
};
export const declension = (count, one, two, five) => {
    var realCount = parseInt(count);
  
    if (realCount > 100)
    realCount %= 100;
  
    if (realCount > 20)
    realCount %= 10;
  
    switch (realCount) {
        case 1:
            return one;
        case 2:
        case 3:
        case 4:
            return two;
        default:
            return five;
    }
  }