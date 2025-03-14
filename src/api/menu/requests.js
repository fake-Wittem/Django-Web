import {commonGetRequest, commonRequest} from "@/api/api";

/**
 * 获取菜单列表
 * @returns {Promise} - 返回菜单列表数据
 */
export async function getMenuList() {
    return await commonGetRequest('menu/list')
}
