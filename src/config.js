var config ;
if (process.env.NODE_ENV !== 'production') {
    config = {
        // basicsUrl:"http://localhost:8000"
        basicsUrl:""
    }
}else {
    config = {
        basicsUrl:"https://blogapi.iweijie.cn"
    }
}

export default  config