import {commonGetRequest, commonRequest} from "@/api/api";

/**
 * 获取角色列表
 * @param queryForm - 查询参数
 * @returns {Promise} - 返回角色列表数据
 */
export async function getRoleList(queryForm) {
    return await commonRequest('role/list', {...queryForm})
}

/**
 * 删除角色信息
 * @param ids - ID数组
 * @returns {Promise} - 返回处理结果
 */
export async function deleteRole(ids) {
    return await commonRequest('user/action', [...ids], 'del')
}

/**
 * 获取角色拥有菜单权限
 * @param id - 角色ID
 * @returns {Promise} - 返回菜单ID数组
 */
export async function getMenuIds(id) {
    return await commonGetRequest('role/menus')
}