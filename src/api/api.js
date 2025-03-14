import requestUtil from "@/util/request"
import {ElMessage} from "element-plus"
import router from "@/router"

export async function commonRequest(url, data = {}, method = "post") {
    try {
        const resp = await requestUtil[method](url, data)
        return await commonHandle(resp)
    } catch (error) {
        ElMessage.error("请求异常，请稍后重试")
        console.error("请求异常:", error)
        return null
    }
}


export async function commonGetRequest(url, data = {}) {
    try {
        const resp = await requestUtil.get(url, data)
        return await commonHandle(resp)
    } catch (error) {
        ElMessage.error("请求异常，请稍后重试")
        console.error("请求异常:", error)
        return null
    }
}

async function commonHandle(response) {
    const result = response.data

    // 如果请求失败，一般为Token过期
    if (!result?.code) {
        ElMessage.error(result || "请求失败")
        // 跳转到登录页面
        await router.replace("/login")
        return null
    }

    // 如果请求成功但业务逻辑失败
    if (result.code !== 200) {
        ElMessage.error(result?.info || "操作失败")
        return null
    }

    // 请求成功
    return result
}