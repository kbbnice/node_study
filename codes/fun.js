/**
 * 用 module.exports, 在引入时, 就不需要在导出模块中命名, 在导入时, 就不需要去看他到底传了
 */

module.exports = {
  // 判断是否是图片
  isImages: function(str) {
    var arr = [
      'bmp',
      'jpg',
      'png',
      'tif',
      'gif',
      'pcx',
      'tga',
      'exif',
      'fpx',
      'svg',
      'psd',
      'cdr',
      'pcd',
      'dxf',
      'ufo',
      'eps',
      'ai',
      'raw',
      'WMF',
      'webp'
    ]
    // let exist = false
    for (let i = 0; i < arr.length; i++) {
      if (str.indexOf(arr[i]) !== -1) {
        return true
      }
    }
    return false
  },

  // 获取时间:
  /**
   *
   * @param {String} params 默认输出带 . 的日期, 含时分秒,(yyyy.mm.dd h:m:s)  参数可选:
   *      '.' : 输出: yyyy.mm.dd
   *      '-' : 输出: yyyy-mm-dd
   *      '-:' : 输出: yyyy-mm-dd h:m:s
   *
   */
  getDate: function(params) {
    var newDate = new Date()
    var year = newDate.getFullYear()
    var month = newDate.getMonth()
    var date = newDate.getDate()
    var h = newDate.getHours()
    var m = newDate.getMinutes()
    var s = newDate.getSeconds()

    if (params === '-') {
      return year + '-' + month + '-' + date
    } else if (params === '.') {
      return year + '.' + month + '.' + date
    } else if (params === '-:') {
      return year + '-' + month + '-' + date + ' ' + h + ':' + m + ':' + s
    } else {
      return year + '.' + month + '.' + date + ' ' + h + ':' + m + ':' + s
    }
  }
}
