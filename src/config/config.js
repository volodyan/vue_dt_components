import AxiosService from "@/middleware/services/AxiosService";
import AxiosUrl from "@/middleware/services/AxiosUrl";
import axios from 'axios';
// 环境的切换
let URLPath
if (process.env.NODE_ENV == 'development') {
    URLPath = "DevelopmentHttpUrlConfig"

} else
if (process.env.NODE_ENV == 'debug') {
    URLPath = "DebugHttpUrlConfig"
} else if (process.env.NODE_ENV == 'production') {
    URLPath = "ProductionHttpUrlConfig"
}

console.log("URLPath", URLPath)
class Methods {
    GetConfig() {
        axios.get(URLPath + '/config.json')
            .then(res => {
                console.log("config---res", res)
                AxiosUrl.baseUrlPath = res.data.baseUrlPath //基础接口url

            })

    }




}
export default new Methods()