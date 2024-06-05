// 定义标题相关信息
var leaveTitle = 'w(ﾟДﾟ)w 不要走！再看看嘛！';
var backTitle = '♪(^∇^*)欢迎肥来！';
var originTitle = 'MXQWQ Blog';
var signatureTitle = '——BY:LY';

// 将标题组合为一个数组
var titleParts = [backTitle, originTitle, signatureTitle];
var titleText = titleParts.join('');

var currentIndex = 0; // 记录当前标题字符位置
var intervalId; // 用于存储定时器的ID

// 启动显示完整标题函数
function showFullTitle() {
    function displayFullTitle() {
        if (currentIndex < titleText.length) {
            document.title += titleText.charAt(currentIndex); // 逐字显示标题
            currentIndex++; // 更新当前字符位置
        } else {
            clearInterval(intervalId); // 标题显示完毕后清除定时器
            setTimeout(startMoveTitle, 1000); // 延迟1秒后开始标题移动
        }
    }

    intervalId = setInterval(displayFullTitle, 100); // 每隔100毫秒显示一个字符
}

// 启动标题移动函数
function startMoveTitle() {
    currentIndex = 0; // 重置当前字符位置

    function moveTitle() {
        if (currentIndex <= titleText.length) {
            document.title = titleText.substring(currentIndex); // 从左向右移动标题
            currentIndex++; // 更新当前字符位置
        } else {
            clearInterval(intervalId); // 标题移动完毕后清除定时器
            document.title = originTitle; // 恢复原始标题
        }
    }

    intervalId = setInterval(moveTitle, 100); // 每隔100毫秒移动一个字符
}

document.addEventListener('visibilitychange', function (event) {
    event.preventDefault(); // 阻止默认行为

    if (document.hidden) {
        document.title = leaveTitle; // 当页面隐藏时显示离开提示
        clearInterval(intervalId); // 清除定时器
    } else {
        currentIndex = 0; // 重置当前字符位置
        document.title = ''; // 清空标题
        showFullTitle(); // 开始完整标题显示
    }
});

