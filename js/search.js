// 切换搜索卡片的显示状态
function toggleSearchCard() {
    var searchCard = document.querySelector('.search-card'); // 获取搜索卡片元素
    if (searchCard.classList.contains('show')) { // 检查搜索卡片是否显示
        searchCard.classList.remove('show'); // 隐藏搜索卡片
    } else {
        searchCard.classList.add('show'); // 显示搜索卡片
    }
}

// 执行搜索操作（副搜索）
function performSearch() {
    var searchType = document.getElementById('searchType').value; // 获取搜索类型
    var searchInput = document.getElementById('searchInput').value; // 获取搜索输入内容
    // 根据 searchType 和 searchInput 进行搜索逻辑
    console.log(`搜索类型: ${searchType}, 搜索内容: ${searchInput}`); // 打印搜索类型和内容
}

// 执行搜索操作（主搜索）
function performSearchMain() {
    var searchType = document.getElementById('searchTypeMain').value; // 获取搜索类型
    var searchInput = document.getElementById('searchInputMain').value; // 获取搜索输入内容
    // 根据 searchType 和 searchInput 进行搜索逻辑
    console.log(`搜索类型: ${searchType}, 搜索内容: ${searchInput}`); // 打印搜索类型和内容
}

// 根据搜索类型更新副搜索输入框的占位符
function updatePlaceholder() {
    var searchType = document.getElementById('searchType').value; // 获取搜索类型
    var searchInput = document.getElementById('searchInput'); // 获取搜索输入框
    if (searchType === 'article') { // 如果搜索类型是文章
        searchInput.placeholder = '搜索文章...'; // 设置占位符为 "搜索文章..."
    } else { // 否则（搜索类型是作者）
        searchInput.placeholder = '搜索作者...'; // 设置占位符为 "搜索作者..."
    }
}

// 根据搜索类型更新主搜索输入框的占位符
function updatePlaceholderMain() {
    var searchType = document.getElementById('searchTypeMain').value; // 获取搜索类型
    var searchInput = document.getElementById('searchInputMain'); // 获取搜索输入框
    if (searchType === 'article') { // 如果搜索类型是文章
        searchInput.placeholder = '搜索文章...'; // 设置占位符为 "搜索文章..."
    } else { // 否则（搜索类型是作者）
        searchInput.placeholder = '搜索作者...'; // 设置占位符为 "搜索作者..."
    }
}
