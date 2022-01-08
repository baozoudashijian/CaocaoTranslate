
let md5 =  require('./md5');
/****************公共方法*****************/

// 生成指定尾数随机数
function getRandom(num){
  let random = Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,num-1));
  return random
}
console.log(md5)
/****************公共方法*****************/


function translate(options, cb) {
  let baidu = {
    baseUrl: "https://api.fanyi.baidu.com/api/trans/vip/translate?",
    appId: "20220107001049335",
    salt: getRandom(10)
  }
  baidu.sign = md5.hexMD5(`${baidu.appId}${options.value}${baidu.salt}Vh8jY5ezd5oUqakWOX9D`)
console.log()
  wx.request({
    url: `${baidu.baseUrl}q=${options.value}&from=${options.to}&to=${options.from}&appid=${baidu.appId}&salt=${baidu.salt}&sign=${baidu.sign}`,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function(res) {
      cb(res)
    }
  })
}

module.exports = {
  translate
}