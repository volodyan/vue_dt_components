/**
 * 使用此方法设置主题
 *
 * 在global.scss里配置主题相关组件颜色
 */

// 先加载所有的主题(安装全局使用sass插件，默认主题lighttheme)


// 默认主题
export const defaultTheme = 'lighttheme';
export const themeList = [{
        name: '深色',
        key: 'darktheme'
    },
    {
        name: '浅色',
        key: 'lighttheme'
    }
];

export const setTheme = (themeName = defaultTheme) => {
    // let key = 'themeProperty';
    if (themeName === 'default') {
        // 移除之前主题的属性
        // window.localStorage.removeItem(key)
        if (document.body.className) document.body.className = ''
    } else {
        // 把该主题的所有属性存到缓存
        document.body.className = themeName;
    }
}