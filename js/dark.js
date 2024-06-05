document.addEventListener('DOMContentLoaded', (event) => {
    // 获取切换模式按钮
    const toggleButton = document.querySelector('.mode-toggle');

    // 为切换模式按钮添加点击事件监听器
    toggleButton.addEventListener('click', () => {
        // 切换 body 元素的 'dark-mode' 类
        document.body.classList.toggle('dark-mode');
    });
});
