import {createStore} from 'vuex'

export default createStore({
    state: {
        // 当前标签页
        editableTabsValue: '/index',
        // 所有展示的标签页
        editableTabs: [
            {
                title: '首页',
                name: '/index',
            }
        ]
    },
    getters: {},
    mutations: {
        // 点击菜单，添加标签页
        ADD_TAB: (state, tab) => {
            // 修改当前选中的标签页
            state.editableTabsValue = tab.path

            if (state.editableTabs.findIndex(item => item.name === tab.path) !== -1) return
            // 如果当前已添加的标签页中没有点击的菜单，则添加该菜单的标签页
            state.editableTabs.push({
                title: tab.name,
                name: tab.path,
            })
        },
        // 退出登录后重置标签页
        RESET_TAB: (state, tab) => {
            state.editableTabsValue = '/index'
            state.editableTabs = [{
                title: '首页',
                name: '/index',
            }]
        }
    },
    actions: {},
    modules: {}
})
