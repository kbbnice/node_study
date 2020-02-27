var fs = require('fs')

fs.readdir('D:/myfiles/project/personalPro/node/codes/view', function(error, files) {
    if(error) {
        console.log(error)
    } else {
        console.log(files)
    }

})