import {commonGetRequest, commonRequest} from "@/api/api"

/**
 * 获取用户列表
 * @param queryForm - 查询参数
 * @returns {Promise} - 返回用户列表数据
 */
export async function getUserList(queryForm) {
    return await commonRequest('user/list', {...queryForm})
}

/**
 * 删除用户信息
 * @param ids - ID数组
 * @returns {Promise} - 返回处理结果
 */
export async function deleteUser(ids) {
    return await commonRequest('user/action', [...ids], 'del')
}

/**
 * 重置密码
 * @param id - 用户ID
 * @returns {Promise} - 返回处理结果
 */
export async function resetPwd(id) {
    return await commonGetRequest('user/reset_password?id=' + id)
}

/**
 * 用户状态变更
 * @param id - 用户ID
 * @param status - 变更的状态
 * @returns {Promise} - 返回处理结果
 */
export async function updateUserStatus(id, status) {
    return await commonRequest('user/update_status', {id, status})
}

