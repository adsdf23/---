// 导航栏汉堡菜单功能
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // 汉堡菜单点击事件
    burger.addEventListener('click', () => {
        // 切换导航菜单
        nav.classList.toggle('active');
        
        // 汉堡菜单动画
        burger.classList.toggle('toggle');
        
        // 链接动画
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // 点击导航链接后关闭菜单（在移动设备上）
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
    
    // 点击页面其他区域关闭菜单
    document.addEventListener('click', (event) => {
        const isClickInsideNav = nav.contains(event.target);
        const isClickInsideBurger = burger.contains(event.target);
        
        if (!isClickInsideNav && !isClickInsideBurger && nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });

    // 确保所有排名功能在页面加载完成后立即初始化
    console.log("DOM完全加载，立即初始化所有排名功能");
    initAllRankingFunctions();
});

// 强制初始化所有排名功能
function initAllRankingFunctions() {
    console.log("开始强制初始化所有排名功能");
    
    try {
        // 初始化配件数据管理
        initComponentRankings();
        
        // 针对主板排名特别重新初始化
        if (document.getElementById('mb-search')) {
            console.log("检测到主板搜索框，单独重新初始化主板排名");
            setTimeout(() => initMotherboardRanking(), 100);
        }
    } catch (error) {
        console.error("初始化排名功能时发生错误:", error);
    }
}

// 平滑滚动 - 排除选项卡链接
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // 排除选项卡链接
    if (anchor.classList.contains('nav-link') && anchor.hasAttribute('data-toggle')) {
        return;
    }
    
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (!target) return;
        
        window.scrollTo({
            top: target.offsetTop - 70, // 减去导航栏高度
            behavior: 'smooth'
        });
    });
});

// 滚动时导航栏变化效果
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.97)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.background = 'white';
    }
});

// 为汉堡菜单添加切换动画样式
const style = document.createElement('style');
style.innerHTML = `
    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .burger.toggle .line2 {
        opacity: 0;
    }
    
    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// 复制联系邮箱到剪贴板功能
document.addEventListener('DOMContentLoaded', () => {
    const emailAddress = 'josp4x1se5@1sec.site';
    
    // 获取所有文本包含"联系我们"的按钮
    document.querySelectorAll('a.btn').forEach(button => {
        if (button.textContent.includes('联系我们')) {
            button.addEventListener('click', copyEmailToClipboard);
        }
    });
    
    // 特别针对ID为contactUsBtn的按钮
    const contactBtn = document.getElementById('contactUsBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', copyEmailToClipboard);
    }
    
    // 复制邮箱到剪贴板的函数
    function copyEmailToClipboard(e) {
        e.preventDefault();
        
        // 使用现代Clipboard API（如果支持）
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(emailAddress)
                .then(() => {
                    alert('邮箱地址已复制到剪贴板：' + emailAddress);
                })
                .catch((err) => {
                    console.error('无法复制到剪贴板: ', err);
                    fallbackCopyToClipboard();
                });
        } else {
            // 回退到传统方法
            fallbackCopyToClipboard();
        }
        
        // 传统复制方法
        function fallbackCopyToClipboard() {
            const textarea = document.createElement('textarea');
            textarea.value = emailAddress;
            textarea.style.position = 'fixed'; 
            textarea.style.opacity = 0;
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                const success = document.execCommand('copy');
                if (success) {
                    alert('邮箱地址已复制到剪贴板：' + emailAddress);
                } else {
                    alert('复制失败，请手动复制邮箱：' + emailAddress);
                }
            } catch (err) {
                console.error('复制失败: ', err);
                alert('复制失败，请手动复制邮箱：' + emailAddress);
            }
            
            document.body.removeChild(textarea);
        }
    }
    
    // 处理排名选项卡切换功能
    const tabLinks = document.querySelectorAll('.nav-tabs .nav-link');
    if (tabLinks.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 保存当前滚动位置
                const currentScrollPosition = window.scrollY;
                
                // 移除所有选项卡的激活状态
                tabLinks.forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // 移除所有选项卡内容的激活状态
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('show', 'active');
                });
                
                // 激活当前选项卡
                this.classList.add('active');
                
                // 获取目标选项卡内容并激活
                const targetId = this.getAttribute('href');
                const targetPane = document.querySelector(targetId);
                if (targetPane) {
                    targetPane.classList.add('show', 'active');
                }
                
                // 恢复到之前的滚动位置
                window.scrollTo({
                    top: currentScrollPosition
                });
            });
        });
    }
});

// 配件排名功能增强
document.addEventListener('DOMContentLoaded', function() {
    // 初始化配件数据管理
    initComponentRankings();
    
    // 在页面加载完成后，预加载额外的数据
    setTimeout(() => {
        preloadComponentData();
    }, 2000);
});

// 预加载组件数据
function preloadComponentData() {
    console.log("开始预加载额外组件数据...");
    
    // 预加载CPU数据
    if (document.getElementById('cpu-table-body')) {
        for (let page = 3; page <= 10; page++) {
            setTimeout(() => {
                const cpuEvent = new CustomEvent('preloadCPUData', { detail: { page: page } });
                document.dispatchEvent(cpuEvent);
            }, (page - 3) * 300);
        }
    }
    
    // 预加载GPU数据
    if (document.getElementById('gpu-table-body')) {
        for (let page = 3; page <= 10; page++) {
            setTimeout(() => {
                const gpuEvent = new CustomEvent('preloadGPUData', { detail: { page: page } });
                document.dispatchEvent(gpuEvent);
            }, (page - 3) * 300 + 1500);
        }
    }
    
    // 预加载主板数据
    if (document.getElementById('mb-table-body')) {
        for (let page = 3; page <= 10; page++) {
            setTimeout(() => {
                const mbEvent = new CustomEvent('preloadMBData', { detail: { page: page } });
                document.dispatchEvent(mbEvent);
            }, (page - 3) * 300 + 3000);
        }
    }
    
    // 其他组件的预加载将在后续实现...
}

function initComponentRankings() {
    // CPU排名处理
    initCPURanking();
    
    // GPU排名功能
    initGPURanking();
    
    // 主板排名功能
    initMotherboardRanking();
    
    // 其他组件排名初始化
    initMemoryRanking();
    initStorageRanking();
    initCoolingRanking();
    initCaseRanking();
    initPowerRanking();
    initMonitorRanking();
    initPeripheralRanking();
}

// CPU排名功能
function initCPURanking() {
    const searchInput = document.getElementById('cpu-search');
    const tableBody = document.getElementById('cpu-table-body');
    const pagination = document.getElementById('cpu-pagination');
    const loading = document.getElementById('cpu-loading');
    
    if (!searchInput || !tableBody || !pagination) {
        return; // 如果元素不存在，则退出
    }
    
    // 当前页码
    let currentPage = 1;
    // 每页显示数量
    const itemsPerPage = 20;
    // 总页数 (200个条目 / 每页20个 = 10页)
    const totalPages = 10;
    
    // 初始化页面
    showPage(currentPage);
    
    // 搜索框事件监听
    searchInput.addEventListener('input', function() {
        filterCPUList();
    });
    
    // 分页事件监听
    pagination.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (e.target.tagName === 'A') {
            const pageAction = e.target.getAttribute('data-page');
            
            if (pageAction === 'next') {
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                    showPage(currentPage);
                }
            } else if (pageAction === 'prev') {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                    showPage(currentPage);
                }
            } else if (pageAction === 'first') {
                currentPage = 1;
                updatePagination();
                showPage(currentPage);
            } else {
                currentPage = parseInt(pageAction);
                updatePagination();
                showPage(currentPage);
            }
        }
    });
    
    // 显示指定页码的项目
    function showPage(page) {
        // 如果是第1页，显示已有内容
        if (page === 1) {
            // 隐藏所有带data-page属性的行
            document.querySelectorAll('#cpu-table-body tr[data-page]').forEach(row => {
                row.style.display = 'none';
            });
            // 显示所有不带data-page属性的行（前10个）
            document.querySelectorAll('#cpu-table-body tr:not([data-page])').forEach(row => {
                row.style.display = '';
            });
            return;
        }
        
        // 如果是第2页，显示已有的第2页内容
        if (page === 2) {
            // 隐藏所有行
            document.querySelectorAll('#cpu-table-body tr').forEach(row => {
                row.style.display = 'none';
            });
            // 显示所有data-page="2"的行
            document.querySelectorAll('#cpu-table-body tr[data-page="2"]').forEach(row => {
                row.style.display = '';
            });
            return;
        }
        
        // 如果是第3页及以后，需要动态加载数据
        if (page >= 3) {
            loadCPUPage(page);
        }
    }
    
    // 动态加载CPU数据
    function loadCPUPage(page) {
        // 模拟加载中状态
        loading.style.display = 'block';
        
        // 模拟网络请求延迟
        setTimeout(() => {
            loading.style.display = 'none';
            
            // 清除现有内容
            document.querySelectorAll('#cpu-table-body tr').forEach(row => {
                row.style.display = 'none';
            });
            
            // 根据页码动态生成内容
            const startRank = (page - 1) * itemsPerPage + 1;
            let html = '';
            
            for (let i = 0; i < itemsPerPage; i++) {
                const rank = startRank + i;
                if (rank > 200) break; // 不超过200个条目
                
                // 为不同页面生成不同的CPU数据
                let cpuData;
                
                if (rank >= 21 && rank <= 200) {
                    // 根据排名动态生成CPU数据
                    const brandOptions = ['AMD', 'Intel'];
                    const brandIndex = rank % 2; // 循环使用两个品牌
                    const brand = brandOptions[brandIndex];
                    
                    let model, cores, score, price, pricePerf, usage;
                    
                    if (rank <= 50) {
                        // 21-50名：较好的CPU
                        score = Math.max(7.0, Math.min(8.0, 8.0 - ((rank - 21) * 0.03))).toFixed(1);
                        
                        if (brand === 'AMD') {
                            const tier = Math.floor(Math.random() * 2) + 7; // Ryzen 7 或 9
                            const series = Math.floor(Math.random() * 2) + 8; // 8000 或 9000 系列
                            model = `${brand} Ryzen ${tier} ${series}${Math.floor(Math.random() * 9)}00${(rank % 4 === 0) ? 'X' : (rank % 4 === 1) ? 'XT' : ''}`;
                            cores = `${(tier === 9) ? (Math.floor(Math.random() * 6) + 12) : (Math.floor(Math.random() * 4) + 8)}核/${(tier === 9) ? (Math.floor(Math.random() * 12) + 24) : (Math.floor(Math.random() * 8) + 16)}线程`;
                        } else {
                            const gen = (rank % 3 === 0) ? "Ultra" : "i";
                            const tier = (gen === "Ultra") ? Math.floor(Math.random() * 2) + 7 : Math.floor(Math.random() * 2) + 7; // 第7或第9代
                            const number = (gen === "Ultra") ? `${Math.floor(Math.random() * 3) + 1}${Math.floor(Math.random() * 8) + 1}` : `1${Math.floor(Math.random() * 2) + 3}${Math.floor(Math.random() * 7) + 3}00K`;
                            model = `${brand} Core ${gen}${tier} ${number}`;
                            cores = `${Math.floor(Math.random() * 8) + 10}核/${Math.floor(Math.random() * 10) + 16}线程`;
                        }
                        
                        price = Math.round((2500 + (rank % 11) * 100) / 100) * 100;
                        pricePerf = Math.min(9.0, Math.max(8.0, 9.0 - ((rank - 21) * 0.03))).toFixed(1);
                        usage = ['游戏与流媒体', '内容创作与游戏', '多任务与创意工作', '高端游戏与轻度创作'][rank % 4];
                    } else if (rank <= 100) {
                        // 51-100名：中端CPU
                        score = Math.max(6.0, Math.min(7.0, 7.0 - ((rank - 51) * 0.02))).toFixed(1);
                        
                        if (brand === 'AMD') {
                            const tier = Math.floor(Math.random() * 2) + 5; // Ryzen 5 或 7
                            const series = Math.floor(Math.random() * 3) + 6; // 6000, 7000 或 8000 系列
                            model = `${brand} Ryzen ${tier} ${series}${Math.floor(Math.random() * 9)}00${(rank % 5 === 0) ? 'X' : (rank % 5 === 1) ? 'G' : ''}`;
                            cores = `${(tier === 7) ? (Math.floor(Math.random() * 2) + 6) : (Math.floor(Math.random() * 2) + 4)}核/${(tier === 7) ? (Math.floor(Math.random() * 4) + 12) : (Math.floor(Math.random() * 4) + 8)}线程`;
                        } else {
                            const gen = (rank % 4 === 0) ? "Ultra" : "i";
                            const tier = (gen === "Ultra") ? Math.floor(Math.random() * 2) + 5 : Math.floor(Math.random() * 3) + 5; // 第5或第7代，i5、i7
                            const number = (gen === "Ultra") ? `${Math.floor(Math.random() * 3) + 1}${Math.floor(Math.random() * 7) + 3}` : `1${Math.floor(Math.random() * 2) + 2}${Math.floor(Math.random() * 7) + 3}00`;
                            model = `${brand} Core ${gen}${tier} ${number}${(rank % 6 === 0) ? 'K' : ''}`;
                            cores = `${Math.floor(Math.random() * 6) + 6}核/${Math.floor(Math.random() * 8) + 8}线程`;
                        }
                        
                        price = Math.round((1500 + (rank % 9) * 100) / 50) * 50;
                        pricePerf = Math.min(9.2, Math.max(8.3, 9.2 - ((rank - 51) * 0.02))).toFixed(1);
                        usage = ['日常办公与游戏', '主流游戏体验', '家用多任务', '入门级创意工作'][rank % 4];
                    } else {
                        // 101-200名：入门/老旧CPU
                        score = Math.max(4.0, Math.min(6.0, 6.0 - ((rank - 101) * 0.01))).toFixed(1);
                        
                        if (brand === 'AMD') {
                            const tier = Math.floor(Math.random() * 2) + 3; // Ryzen 3 或 5
                            const series = Math.floor(Math.random() * 4) + 3; // 3000-6000 系列
                            model = `${brand} Ryzen ${tier} ${series}${Math.floor(Math.random() * 9)}00${(rank % 4 === 0) ? 'G' : (rank % 5 === 1) ? 'GE' : ''}`;
                            cores = `${(tier === 5) ? (Math.floor(Math.random() * 2) + 4) : (Math.floor(Math.random() * 2) + 2)}核/${(tier === 5) ? (Math.floor(Math.random() * 4) + 8) : (Math.floor(Math.random() * 4) + 4)}线程`;
                        } else {
                            const gen = (rank % 5 === 0) ? "Pentium" : (rank % 5 === 1) ? "Celeron" : "i";
                            let tier, number;
                            
                            if (gen === "Pentium" || gen === "Celeron") {
                                tier = "";
                                number = `G${Math.floor(Math.random() * 999) + 5000}`;
                            } else {
                                tier = Math.floor(Math.random() * 3) + 3; // i3-i5
                                number = `${Math.floor(Math.random() * 3) + 8}${Math.floor(Math.random() * 9)}00`;
                            }
                            
                            model = `${brand} ${gen}${tier ? tier : ''} ${number}`;
                            cores = `${Math.floor(Math.random() * 3) + 2}核/${Math.floor(Math.random() * 4) + 4}线程`;
                        }
                        
                        price = Math.round((500 + (rank % 11) * 50) / 50) * 50;
                        pricePerf = Math.min(9.0, Math.max(8.0, 9.0 - ((rank - 101) * 0.01))).toFixed(1);
                        usage = ['基础办公', '网页浏览与媒体播放', '入门级游戏', '轻度多任务'][rank % 4];
                    }
                    
                    cpuData = {
                        brand: brand,
                        model: model,
                        cores: cores,
                        score: `${score}/10`,
                        price: `¥${price}`,
                        pricePerf: `${pricePerf}/10`,
                        usage: usage
                    };
                }
                
                if (cpuData) {
                    html += `
                    <tr data-page="${page}" data-brand="${cpuData.brand}" data-price="${cpuData.price.replace('¥', '')}">
                        <td>${rank}</td>
                        <td>${cpuData.model}</td>
                        <td>${cpuData.cores}</td>
                        <td>${cpuData.score}</td>
                        <td class="price-highlight">${cpuData.price}</td>
                        <td>${cpuData.pricePerf}</td>
                        <td>${cpuData.usage}</td>
                    </tr>`;
                }
            }
            
            // 插入生成的HTML
            if (html) {
                tableBody.insertAdjacentHTML('beforeend', html);
                
                // 显示当前页的行
                document.querySelectorAll(`#cpu-table-body tr[data-page="${page}"]`).forEach(row => {
                    row.style.display = '';
                });
            }
        }, 500);
    }
    
    // 更新分页控件
    function updatePagination() {
        const paginationLinks = pagination.querySelectorAll('a');
        paginationLinks.forEach(link => {
            link.classList.remove('active');
            const page = link.getAttribute('data-page');
            if (page && parseInt(page) === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // 筛选CPU列表
    function filterCPUList() {
        const searchTerm = searchInput.value.toLowerCase();
        
        // 重置到第一页
        currentPage = 1;
        updatePagination();
        
        // 应用筛选条件
        const rows = document.querySelectorAll('#cpu-table-body tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const cpuName = row.children[1].textContent.toLowerCase();
            
            let matchesSearch = true;
            
            // 搜索词筛选
            if (searchTerm && !cpuName.includes(searchTerm)) {
                matchesSearch = false;
            }
            
            // 应用筛选结果
            if (matchesSearch) {
                row.style.display = '';
                visibleCount++;
                
                // 控制每页显示数量
                if (visibleCount > itemsPerPage) {
                    row.style.display = 'none';
                }
            } else {
                row.style.display = 'none';
            }
        });
    }
}

// GPU排名功能
function initGPURanking() {
    const searchInput = document.getElementById('gpu-search');
    const tableBody = document.getElementById('gpu-table-body');
    const pagination = document.getElementById('gpu-pagination');
    const loading = document.getElementById('gpu-loading');
    
    if (!searchInput || !tableBody || !pagination) {
        return; // 如果元素不存在，则退出
    }
    
    // 当前页码
    let currentPage = 1;
    // 每页显示数量
    const itemsPerPage = 20;
    // 总页数 (200个条目 / 每页20个 = 10页)
    const totalPages = 10;
    
    // 初始化页面
    showPage(currentPage);
    
    // 搜索框事件监听
    searchInput.addEventListener('input', function() {
        filterGPUList();
    });
    
    // 分页事件监听
    pagination.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (e.target.tagName === 'A') {
            const pageAction = e.target.getAttribute('data-page');
            
            if (pageAction === 'next') {
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                    showPage(currentPage);
                }
            } else if (pageAction === 'prev') {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                    showPage(currentPage);
                }
            } else if (pageAction === 'first') {
                currentPage = 1;
                updatePagination();
                showPage(currentPage);
            } else {
                currentPage = parseInt(pageAction);
                updatePagination();
                showPage(currentPage);
            }
        }
    });
    
    // 显示指定页码的项目
    function showPage(page) {
        // 如果是第1页，显示已有内容
        if (page === 1) {
            // 隐藏所有带data-page属性的行
            document.querySelectorAll('#gpu-table-body tr[data-page]').forEach(row => {
                row.style.display = 'none';
            });
            // 显示所有不带data-page属性的行（前10个）
            document.querySelectorAll('#gpu-table-body tr:not([data-page])').forEach(row => {
                row.style.display = '';
            });
            return;
        }
        
        // 如果是第2页，显示已有的第2页内容
        if (page === 2) {
            // 隐藏所有行
            document.querySelectorAll('#gpu-table-body tr').forEach(row => {
                row.style.display = 'none';
            });
            // 显示所有data-page="2"的行
            document.querySelectorAll('#gpu-table-body tr[data-page="2"]').forEach(row => {
                row.style.display = '';
            });
            return;
        }
        
        // 如果是第3页及以后，需要动态加载数据
        if (page >= 3) {
            loadGPUPage(page);
        }
    }
    
    // 动态加载GPU数据
    function loadGPUPage(page) {
        // 模拟加载中状态
        loading.style.display = 'block';
        
        // 模拟网络请求延迟
        setTimeout(() => {
            loading.style.display = 'none';
            
            // 清除现有内容
            document.querySelectorAll('#gpu-table-body tr').forEach(row => {
                row.style.display = 'none';
            });
            
            // 根据页码动态生成内容
            const startRank = (page - 1) * itemsPerPage + 1;
            let html = '';
            
            for (let i = 0; i < itemsPerPage; i++) {
                const rank = startRank + i;
                if (rank > 200) break; // 不超过200个条目
                
                // 为不同页面生成不同的GPU数据
                let gpuData;
                
                if (rank >= 21 && rank <= 200) {
                    // 根据排名动态生成显卡数据
                    const brandOptions = ['NVIDIA', 'AMD', 'Intel'];
                    const brandIndex = rank % 3; // 循环使用三个品牌
                    const brand = brandOptions[brandIndex];
                    
                    let model, score, price, pricePerf, resolution;
                    
                    if (rank <= 50) {
                        // 21-50名：中高端显卡
                        score = Math.max(5.0, Math.min(7.2, 7.2 - ((rank - 21) * 0.05))).toFixed(1);
                        
                        if (brand === 'NVIDIA') {
                            const series = (rank % 2 === 0) ? 4000 : 3000;
                            const tier = Math.floor(Math.random() * 3) + 3; // 30/40系列中的中高端
                            model = `${brand} GeForce RTX ${series}${tier}0${(rank % 3 === 0) ? ' Ti' : ''}`;
                        } else if (brand === 'AMD') {
                            const series = (rank % 2 === 0) ? 7000 : 8000;
                            const tier = Math.floor(Math.random() * 3) + 5; // RX 7/8系列中高端
                            model = `${brand} Radeon RX ${series}${tier}00${(rank % 3 === 0) ? ' XT' : ''}`;
                        } else {
                            model = `${brand} Arc A${(rank % 3) + 5}${Math.floor(Math.random() * 5) + 4}0`;
                        }
                        
                        price = Math.round((1300 + (rank % 9) * 200) / 100) * 100;
                        pricePerf = Math.min(9.7, Math.max(8.5, 9.7 - ((rank - 21) * 0.03))).toFixed(1);
                        resolution = (rank <= 30) ? '1080p/2K' : '1080p';
                    } else if (rank <= 100) {
                        // 51-100名：主流显卡
                        score = Math.max(3.0, Math.min(5.0, 5.0 - ((rank - 51) * 0.04))).toFixed(1);
                        
                        if (brand === 'NVIDIA') {
                            const series = (rank % 3 === 0) ? 4000 : (rank % 3 === 1) ? 3000 : 2000;
                            const tier = Math.floor(Math.random() * 2) + 1; // 低端型号
                            model = `${brand} GeForce ${(series >= 3000) ? 'RTX' : 'GTX'} ${series}${tier}0${(rank % 5 === 0) ? ' Ti' : ''}`;
                        } else if (brand === 'AMD') {
                            const series = (rank % 3 === 0) ? 7000 : (rank % 3 === 1) ? 6000 : 5000;
                            const tier = Math.floor(Math.random() * 3) + 3; // 主流型号
                            model = `${brand} Radeon RX ${series}${tier}00${(rank % 4 === 0) ? ' XT' : ''}`;
                        } else {
                            model = `${brand} Arc A${(rank % 2) + 3}${Math.floor(Math.random() * 5) + 3}0`;
                        }
                        
                        price = Math.round((600 + (rank % 7) * 100) / 50) * 50;
                        pricePerf = Math.min(9.6, Math.max(7.5, 9.6 - ((rank - 51) * 0.02))).toFixed(1);
                        resolution = '1080p';
                    } else {
                        // 101-200名：入门/老旧显卡
                        score = Math.max(1.0, Math.min(3.0, 3.0 - ((rank - 101) * 0.02))).toFixed(1);
                        
                        if (brand === 'NVIDIA') {
                            const series = (rank % 4 === 0) ? 2000 : (rank % 4 === 1) ? 1000 : (rank % 4 === 2) ? 900 : 700;
                            const tier = Math.floor(Math.random() * 3) + 3; // 老旧系列
                            const prefix = series >= 2000 ? 'RTX' : 'GTX';
                            model = `${brand} GeForce ${prefix} ${series}${tier}0${(rank % 3 === 0) ? ' Ti' : ''}`;
                        } else if (brand === 'AMD') {
                            const series = (rank % 3 === 0) ? 5000 : (rank % 3 === 1) ? 500 : 400;
                            const tier = Math.floor(Math.random() * 6) + 3;
                            const prefix = series >= 5000 ? 'RX' : 'R7/R9';
                            model = `${brand} Radeon ${prefix} ${series} ${(series < 1000) ? tier * 10 : tier * 100}${(rank % 4 === 0) ? ' XT' : ''}`;
                        } else {
                            model = `${brand} HD/UHD Graphics ${Math.floor(Math.random() * 1000) + 500}`;
                        }
                        
                        price = Math.round((200 + (rank % 7) * 50) / 50) * 50;
                        pricePerf = Math.min(8.0, Math.max(5.0, 8.0 - ((rank - 101) * 0.03))).toFixed(1);
                        resolution = (rank <= 150) ? '1080p' : '720p';
                    }
                    
                    gpuData = {
                        brand: brand,
                        model: model,
                        score: `${score}/10`,
                        price: `¥${price}`,
                        pricePerf: `${pricePerf}/10`,
                        resolution: resolution
                    };
                }
                
                if (gpuData) {
                    html += `
                    <tr data-page="${page}" data-brand="${gpuData.brand}" data-price="${gpuData.price.replace('¥', '')}">
                        <td>${rank}</td>
                        <td>${gpuData.model}</td>
                        <td>${gpuData.score}</td>
                        <td class="price-highlight">${gpuData.price}</td>
                        <td>${gpuData.pricePerf}</td>
                        <td>${gpuData.resolution}</td>
                    </tr>`;
                }
            }
            
            // 插入生成的HTML
            if (html) {
                tableBody.insertAdjacentHTML('beforeend', html);
                
                // 显示当前页的行
                document.querySelectorAll(`#gpu-table-body tr[data-page="${page}"]`).forEach(row => {
                    row.style.display = '';
                });
            }
        }, 500);
    }
    
    // 更新分页控件
    function updatePagination() {
        const paginationLinks = pagination.querySelectorAll('a');
        paginationLinks.forEach(link => {
            link.classList.remove('active');
            const page = link.getAttribute('data-page');
            if (page && parseInt(page) === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // 筛选GPU列表
    function filterGPUList() {
        const searchTerm = searchInput.value.toLowerCase();
        
        // 重置到第一页
        currentPage = 1;
        updatePagination();
        
        // 应用筛选条件
        const rows = document.querySelectorAll('#gpu-table-body tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const gpuName = row.children[1].textContent.toLowerCase();
            
            let matchesSearch = true;
            
            // 搜索词筛选
            if (searchTerm && !gpuName.includes(searchTerm)) {
                matchesSearch = false;
            }
            
            // 应用筛选结果
            if (matchesSearch) {
                row.style.display = '';
                visibleCount++;
                
                // 控制每页显示数量
                if (visibleCount > itemsPerPage) {
                    row.style.display = 'none';
                }
            } else {
                row.style.display = 'none';
            }
        });
    }
}

// 主板排名功能
function initMotherboardRanking() {
    const searchInput = document.getElementById('mb-search');
    const tableBody = document.getElementById('mb-table-body');
    const pagination = document.getElementById('mb-pagination');
    const loading = document.getElementById('mb-loading');
    
    if (!searchInput || !tableBody || !pagination) {
        console.error('主板排名所需的DOM元素不存在');
        return; // 如果元素不存在，则退出
    }
    
    console.log('主板排名初始化开始...');
    
    // 当前页码
    let currentPage = 1;
    // 每页显示数量
    const itemsPerPage = 20;
    // 总页数 (200个条目 / 每页20个 = 10页)
    const totalPages = 10;
    
    // 初始化页面
    showPage(currentPage);
    
    // 搜索框事件监听 - 使用多种事件确保触发
    searchInput.addEventListener('input', filterMotherboardList);
    searchInput.addEventListener('keyup', filterMotherboardList);
    searchInput.addEventListener('change', filterMotherboardList);
    
    console.log('搜索框事件监听器已绑定');
    
    // 分页事件监听 - 使用事件委托确保点击捕获
    pagination.addEventListener('click', function(e) {
        console.log('分页点击被触发', e.target);
        e.preventDefault();
        
        if (e.target.tagName === 'A') {
            const pageAction = e.target.getAttribute('data-page');
            console.log('尝试切换到页面:', pageAction);
            
            if (pageAction === 'next') {
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                    showPage(currentPage);
                }
            } else if (pageAction === 'prev') {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                    showPage(currentPage);
                }
            } else if (pageAction === 'first') {
                currentPage = 1;
                updatePagination();
                showPage(currentPage);
            } else {
                currentPage = parseInt(pageAction);
                updatePagination();
                showPage(currentPage);
            }
        }
    });
    
    console.log('分页事件监听器已绑定');
    
    // 显示指定页码的项目
    function showPage(page) {
        console.log('展示页面:', page);
        // 如果是第1页，显示已有内容
        if (page === 1) {
            // 隐藏所有带data-page属性的行
            document.querySelectorAll('#mb-table-body tr[data-page]').forEach(row => {
                row.style.display = 'none';
            });
            // 显示所有不带data-page属性的行（前10个）
            document.querySelectorAll('#mb-table-body tr:not([data-page])').forEach(row => {
                row.style.display = '';
            });
            return;
        }
        
        // 如果是第2页，显示已有的第2页内容
        if (page === 2) {
            // 隐藏所有行
            document.querySelectorAll('#mb-table-body tr').forEach(row => {
                row.style.display = 'none';
            });
            // 显示所有data-page="2"的行
            document.querySelectorAll('#mb-table-body tr[data-page="2"]').forEach(row => {
                row.style.display = '';
            });
            return;
        }
        
        // 如果是第3页及以后，需要动态加载数据
        if (page >= 3) {
            loadMotherboardPage(page);
        }
    }
    
    // 动态加载主板数据
    function loadMotherboardPage(page) {
        // 模拟加载中状态
        loading.style.display = 'block';
        
        // 模拟网络请求延迟
        setTimeout(() => {
            loading.style.display = 'none';
            
            // 清除现有内容
            document.querySelectorAll('#mb-table-body tr').forEach(row => {
                row.style.display = 'none';
            });
            
            // 根据页码动态生成内容
            const startRank = (page - 1) * itemsPerPage + 1;
            let html = '';
            
            for (let i = 0; i < itemsPerPage; i++) {
                const rank = startRank + i;
                if (rank > 200) break; // 不超过200个条目
                
                // 为不同页面生成不同的主板数据
                let motherboardData;
                
                if (rank >= 21 && rank <= 200) {
                    // 根据排名动态生成主板数据
                    const platforms = ['AMD AM5', 'Intel LGA1851', 'AMD AM4', 'Intel LGA1700'];
                    const platformIndex = rank % 4; // 循环使用四个平台
                    const platform = platforms[platformIndex];
                    
                    let model, price, pricePerf, useCase;
                    
                    const manufacturers = ['ASUS', 'MSI', 'Gigabyte', 'ASRock'];
                    const manufacturer = manufacturers[rank % 4];
                    
                    if (rank <= 50) {
                        // 21-50名：中高端主板
                        if (platform === 'AMD AM5' || platform === 'Intel LGA1851') {
                            // 新平台高端主板
                            const tier = Math.random() > 0.5 ? 'Gaming' : 'Creator';
                            const chipset = platform === 'AMD AM5' ? (Math.random() > 0.5 ? 'X870' : 'B850') : (Math.random() > 0.5 ? 'Z890' : 'B860');
                            
                            const seriesByManufacturer = {
                                'ASUS': ['ROG STRIX', 'TUF Gaming', 'ProArt'],
                                'MSI': ['MPG', 'MAG', 'PRO'],
                                'Gigabyte': ['AORUS', 'Gaming', 'Vision'],
                                'ASRock': ['Taichi', 'PG Velocita', 'Steel Legend']
                            };
                            
                            const series = seriesByManufacturer[manufacturer][rank % 3];
                            const suffix = Math.random() > 0.7 ? 'WiFi' : Math.random() > 0.5 ? 'AX' : '';
                            
                            model = `${manufacturer} ${series} ${chipset}${Math.random() > 0.5 ? '-A' : ''} ${tier}${suffix ? ' ' + suffix : ''}`;
                            price = Math.round((2500 + (rank % 9) * 200) / 100) * 100;
                            pricePerf = Math.min(9.0, Math.max(8.0, 9.0 - ((rank - 21) * 0.03))).toFixed(1);
                        } else {
                            // 老平台中高端主板
                            const chipset = platform === 'AMD AM4' ? (Math.random() > 0.5 ? 'X570S' : 'B550') : (Math.random() > 0.5 ? 'Z690' : 'B660');
                            
                            const seriesByManufacturer = {
                                'ASUS': ['ROG STRIX', 'TUF Gaming', 'Prime'],
                                'MSI': ['MPG', 'MAG', 'PRO'],
                                'Gigabyte': ['AORUS', 'Gaming', 'UD'],
                                'ASRock': ['Taichi', 'Extreme', 'Steel Legend']
                            };
                            
                            const series = seriesByManufacturer[manufacturer][rank % 3];
                            const suffix = Math.random() > 0.6 ? 'WiFi' : '';
                            
                            model = `${manufacturer} ${series} ${chipset}${Math.random() > 0.5 ? '-A' : ''} ${suffix}`;
                            price = Math.round((1800 + (rank % 7) * 150) / 100) * 100;
                            pricePerf = Math.min(8.8, Math.max(8.0, 8.8 - ((rank - 21) * 0.02))).toFixed(1);
                        }
                        
                        useCase = ['高性能游戏平台', '全能创作平台', '超频稳定平台', '高端游戏与工作站'][rank % 4];
                    } else if (rank <= 100) {
                        // 51-100名：主流主板
                        if (platform === 'AMD AM5' || platform === 'Intel LGA1851') {
                            // 新平台主流主板
                            const chipset = platform === 'AMD AM5' ? 'B850' : 'B860';
                            const formFactor = Math.random() > 0.3 ? '' : Math.random() > 0.5 ? 'M' : 'I';
                            
                            const seriesByManufacturer = {
                                'ASUS': ['TUF Gaming', 'Prime', 'ProArt'],
                                'MSI': ['MAG', 'PRO', 'Tomahawk'],
                                'Gigabyte': ['Gaming', 'UD', 'Aero'],
                                'ASRock': ['PG Lightning', 'Pro', 'Phantom Gaming']
                            };
                            
                            const series = seriesByManufacturer[manufacturer][rank % 3];
                            const suffix = Math.random() > 0.5 ? 'WiFi' : '';
                            
                            model = `${manufacturer} ${series} ${chipset}${formFactor}${Math.random() > 0.7 ? '-P' : ''} ${suffix}`;
                            price = Math.round((1300 + (rank % 8) * 150) / 50) * 50;
                            pricePerf = Math.min(9.3, Math.max(8.5, 9.3 - ((rank - 51) * 0.01))).toFixed(1);
                        } else {
                            // 老平台主流主板
                            const chipset = platform === 'AMD AM4' ? 'B550' : 'B660';
                            const formFactor = Math.random() > 0.4 ? '' : 'M';
                            
                            const seriesByManufacturer = {
                                'ASUS': ['TUF Gaming', 'Prime', 'CSM'],
                                'MSI': ['MAG', 'PRO', 'Bazooka'],
                                'Gigabyte': ['Gaming', 'DS3H', 'UD'],
                                'ASRock': ['Pro', 'Phantom Gaming', 'HDV']
                            };
                            
                            const series = seriesByManufacturer[manufacturer][rank % 3];
                            
                            model = `${manufacturer} ${series} ${chipset}${formFactor}`;
                            price = Math.round((800 + (rank % 7) * 100) / 50) * 50;
                            pricePerf = Math.min(9.5, Math.max(8.7, 9.5 - ((rank - 51) * 0.01))).toFixed(1);
                        }
                        
                        useCase = ['日常游戏平台', '家用办公平台', '中端多用途平台', '入门内容创作'][rank % 4];
                    } else {
                        // 101-200名：入门/老旧主板
                        if (platform === 'AMD AM4' || platform === 'Intel LGA1700') {
                            // 老平台入门主板
                            const chipset = platform === 'AMD AM4' ? (Math.random() > 0.6 ? 'A520' : (Math.random() > 0.5 ? 'B450' : 'A320')) : (Math.random() > 0.6 ? 'H610' : (Math.random() > 0.5 ? 'B560' : 'H510'));
                            const formFactor = Math.random() > 0.3 ? 'M' : '';
                            
                            const seriesByManufacturer = {
                                'ASUS': ['Prime', 'CSM', 'Business'],
                                'MSI': ['PRO', 'Bazooka', 'Bomber'],
                                'Gigabyte': ['DS3H', 'UD', 'S2H'],
                                'ASRock': ['HDV', 'M-HDV', 'Phantom Gaming']
                            };
                            
                            const series = seriesByManufacturer[manufacturer][rank % 3];
                            
                            model = `${manufacturer} ${series} ${chipset}${formFactor}`;
                            price = Math.round((500 + (rank % 9) * 50) / 50) * 50;
                            pricePerf = Math.min(9.8, Math.max(8.8, 9.8 - ((rank - 101) * 0.005))).toFixed(1);
                        } else {
                            // 新平台入门主板或老平台
                            const chipset = platform === 'AMD AM5' ? 'A620' : 'H810';
                            const formFactor = 'M';
                            
                            const seriesByManufacturer = {
                                'ASUS': ['Prime', 'CSM'],
                                'MSI': ['PRO', 'Modern'],
                                'Gigabyte': ['DS3H', 'UD'],
                                'ASRock': ['HDV', 'M']
                            };
                            
                            const series = seriesByManufacturer[manufacturer][rank % 2];
                            
                            model = `${manufacturer} ${series} ${chipset}${formFactor}`;
                            price = Math.round((600 + (rank % 8) * 60) / 50) * 50;
                            pricePerf = Math.min(9.7, Math.max(9.0, 9.7 - ((rank - 101) * 0.003))).toFixed(1);
                        }
                        
                        useCase = ['基础办公系统', '入门级平台', '预算紧张型', '老旧系统升级'][rank % 4];
                    }
                    
                    motherboardData = {
                        model: model,
                        platform: platform,
                        price: `¥${price}`,
                        pricePerf: `${pricePerf}/10`,
                        useCase: useCase
                    };
                }
                
                if (motherboardData) {
                    html += `
                    <tr data-page="${page}" data-platform="${motherboardData.platform}" data-price="${motherboardData.price.replace('¥', '')}">
                        <td>${rank}</td>
                        <td>${motherboardData.model}</td>
                        <td>${motherboardData.platform}</td>
                        <td class="price-highlight">${motherboardData.price}</td>
                        <td>${motherboardData.pricePerf}</td>
                        <td>${motherboardData.useCase}</td>
                    </tr>`;
                }
            }
            
            // 插入生成的HTML
            if (html) {
                tableBody.insertAdjacentHTML('beforeend', html);
                
                // 显示当前页的行
                document.querySelectorAll(`#mb-table-body tr[data-page="${page}"]`).forEach(row => {
                    row.style.display = '';
                });
            }
        }, 500);
    }
    
    // 更新分页控件
    function updatePagination() {
        console.log('更新分页控件, 当前页:', currentPage);
        const paginationLinks = pagination.querySelectorAll('a');
        paginationLinks.forEach(link => {
            link.classList.remove('active');
            const page = link.getAttribute('data-page');
            if (page && parseInt(page) === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // 筛选主板列表
    function filterMotherboardList() {
        console.log('筛选主板列表, 搜索词:', searchInput.value);
        const searchTerm = searchInput.value.toLowerCase();
        
        // 重置到第一页
        currentPage = 1;
        updatePagination();
        
        // 应用筛选条件
        const rows = document.querySelectorAll('#mb-table-body tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const motherboardName = row.children[1].textContent.toLowerCase();
            
            let matchesSearch = true;
            
            // 搜索词筛选
            if (searchTerm && !motherboardName.includes(searchTerm)) {
                matchesSearch = false;
            }
            
            // 应用筛选结果
            if (matchesSearch) {
                row.style.display = '';
                visibleCount++;
                
                // 控制每页显示数量
                if (visibleCount > itemsPerPage) {
                    row.style.display = 'none';
                }
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    console.log('主板排名初始化完成');
}

// 内存排名功能
function initMemoryRanking() {
    console.log("内存排名功能初始化");
    
    const searchInput = document.getElementById('memory-search');
    const tableBody = document.getElementById('memory-table-body');
    const pagination = document.getElementById('memory-pagination');
    const loading = document.getElementById('memory-loading');
    
    if (!searchInput || !tableBody || !pagination) {
        console.error('内存排名所需的DOM元素不存在');
        return; // 如果元素不存在，则退出
    }
    
    console.log('内存排名初始化开始...');
    
    // 当前页码
    let currentPage = 1;
    // 每页显示数量
    const itemsPerPage = 20;
    // 总页数 (200个条目 / 每页20个 = 10页)
    const totalPages = 10;
    
    // 初始化页面
    showPage(currentPage);
    
    // 搜索框事件监听 - 使用多种事件确保触发
    searchInput.addEventListener('input', filterMemoryList);
    searchInput.addEventListener('keyup', filterMemoryList);
    searchInput.addEventListener('change', filterMemoryList);
    
    console.log('内存搜索框事件监听器已绑定');
    
    // 分页事件监听
    pagination.addEventListener('click', function(e) {
        console.log('分页点击被触发', e.target);
        e.preventDefault();
        
        if (e.target.tagName === 'A') {
            const pageAction = e.target.getAttribute('data-page');
            console.log('尝试切换到页面:', pageAction);
            
            if (pageAction === 'next') {
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                    showPage(currentPage);
                }
            } else if (pageAction === 'prev') {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                    showPage(currentPage);
                }
            } else if (pageAction === 'first') {
                currentPage = 1;
                updatePagination();
                showPage(currentPage);
            } else {
                currentPage = parseInt(pageAction);
                updatePagination();
                showPage(currentPage);
            }
        }
    });
    
    console.log('内存分页事件监听器已绑定');
    
    // 显示指定页码的项目
    function showPage(page) {
        console.log('展示页面:', page);
        
        // 如果是第1页，显示已有内容
        if (page === 1) {
            // 隐藏所有带data-page属性的行
            document.querySelectorAll('#memory-table-body tr[data-page]').forEach(row => {
                row.style.display = 'none';
            });
            // 显示所有不带data-page属性的行（前10个）
            document.querySelectorAll('#memory-table-body tr:not([data-page])').forEach(row => {
                row.style.display = '';
            });
            return;
        }
        
        // 如果是第2页及以后，需要动态加载数据
        if (page >= 2) {
            loadMemoryPage(page);
        }
    }
    
    // 动态加载内存数据
    function loadMemoryPage(page) {
        // 模拟加载中状态
        loading.style.display = 'block';
        
        // 模拟网络请求延迟
        setTimeout(() => {
            loading.style.display = 'none';
            
            // 清除现有内容
            document.querySelectorAll('#memory-table-body tr').forEach(row => {
                row.style.display = 'none';
            });
            
            // 根据页码动态生成内容
            const startRank = (page - 1) * itemsPerPage + 1;
            let html = '';
            
            for (let i = 0; i < itemsPerPage; i++) {
                const rank = startRank + i;
                if (rank > 200) break; // 不超过200个条目
                
                // 为不同页面生成不同的内存条数据
                let memoryData;
                
                if (rank >= 6 && rank <= 200) {
                    // 根据排名动态生成内存数据
                    const brands = ['G.SKILL', 'Corsair', 'Kingston', 'Crucial', 'TeamGroup', 'Samsung', 'ADATA', 'Patriot', 'Micron', 'HyperX'];
                    const brand = brands[rank % brands.length];
                    
                    let model, type, price, pricePerf, useCase;
                    
                    if (rank <= 30) {
                        // 高端内存
                        const series = ['Trident Z5 RGB', 'Dominator Titanium', 'Fury Beast RGB', 'Pro', 'T-Force Delta RGB', 'B-Die'];
                        const seriesName = series[rank % series.length];
                        model = `${brand} ${seriesName}`;
                        
                        const speed = [7200, 7600, 8000, 8400, 8800][rank % 5];
                        const latency = [30, 32, 34, 36, 38][rank % 5];
                        type = `DDR5-${speed} CL${latency}`;
                        
                        price = Math.round((1500 + (rank % 11) * 100) / 100) * 100;
                        pricePerf = ((10 - rank * 0.05) % 1.5 + 8).toFixed(1) + "/10";
                        
                        useCase = ['极限超频与顶级游戏', '高端游戏与内容创作', '专业电竞用途', '顶级工作站', '高性能全能型'][rank % 5];
                    } else if (rank <= 100) {
                        // 中端内存
                        const series = ['Ripjaws S5', 'Vengeance RGB', 'Fury', 'Ballistix', 'T-Force Vulcan', 'PRO'];
                        const seriesName = series[rank % series.length];
                        model = `${brand} ${seriesName}`;
                        
                        const speed = [5600, 6000, 6400, 6800][rank % 4];
                        const latency = [36, 38, 40, 42][rank % 4];
                        type = `DDR5-${speed} CL${latency}`;
                        
                        price = Math.round((800 + (rank % 9) * 50) / 50) * 50;
                        pricePerf = ((10 - rank * 0.03) % 1 + 8.5).toFixed(1) + "/10";
                        
                        useCase = ['主流游戏', '日常创作', '家庭工作站', '多任务处理', '主流性价比之选'][rank % 5];
                    } else {
                        // 入门内存
                        const series = ['Value', 'Basic', 'Standard', 'Essential', 'Performance'];
                        const seriesName = series[rank % series.length];
                        model = `${brand} ${seriesName}`;
                        
                        const isOld = rank > 150;
                        const type1 = isOld ? "DDR4" : "DDR5";
                        const speed = isOld ? 
                            [3200, 3600, 4000, 4400][rank % 4] :
                            [4800, 5200, 5600][rank % 3];
                        const latency = isOld ?
                            [16, 18, 19, 22][rank % 4] :
                            [42, 46, 48, 52][rank % 4];
                        type = `${type1}-${speed} CL${latency}`;
                        
                        price = Math.round((400 + (rank % 7) * 30) / 10) * 10;
                        pricePerf = ((10 - rank * 0.01) % 0.5 + 9).toFixed(1) + "/10";
                        
                        useCase = ['日常办公', '家用电脑', '入门游戏', '预算方案', '基本使用'][rank % 5];
                    }
                    
                    memoryData = {
                        model: model,
                        type: type,
                        price: `¥${price}`,
                        pricePerf: pricePerf,
                        useCase: useCase
                    };
                }
                
                if (memoryData) {
                    html += `
                    <tr data-page="${page}">
                        <td>${rank}</td>
                        <td>${memoryData.model}</td>
                        <td>${memoryData.type}</td>
                        <td class="price-highlight">${memoryData.price}</td>
                        <td>${memoryData.pricePerf}</td>
                        <td>${memoryData.useCase}</td>
                    </tr>`;
                }
            }
            
            // 插入生成的HTML
            if (html) {
                tableBody.insertAdjacentHTML('beforeend', html);
                
                // 显示当前页的行
                tableBody.querySelectorAll(`tr[data-page="${page}"]`).forEach(row => {
                    row.style.display = '';
                });
            }
        }, 500);
    }
    
    // 更新分页控件
    function updatePagination() {
        console.log('更新分页控件, 当前页:', currentPage);
        const paginationLinks = pagination.querySelectorAll('a');
        paginationLinks.forEach(link => {
            link.classList.remove('active');
            const page = link.getAttribute('data-page');
            if (page && parseInt(page) === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // 筛选内存列表
    function filterMemoryList() {
        console.log('筛选内存列表, 搜索词:', searchInput.value);
        const searchTerm = searchInput.value.toLowerCase();
        
        // 重置到第一页
        currentPage = 1;
        updatePagination();
        
        // 应用筛选条件
        const rows = document.querySelectorAll('#memory-table-body tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const memoryName = row.children[1].textContent.toLowerCase();
            const memoryType = row.children[2].textContent.toLowerCase();
            
            // 搜索词筛选 (匹配名称或类型)
            const matchesSearch = !searchTerm || 
                memoryName.includes(searchTerm) || 
                memoryType.includes(searchTerm);
            
            // 应用筛选结果
            if (matchesSearch) {
                row.style.display = '';
                visibleCount++;
                
                // 控制每页显示数量
                if (visibleCount > itemsPerPage) {
                    row.style.display = 'none';
                }
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    console.log('内存排名初始化完成');
}

// 存储设备排名功能
function initStorageRanking() {
    console.log("存储设备排名功能初始化");
    
    const searchInput = document.getElementById('storage-search');
    const tableBody = document.getElementById('storage-table-body');
    const pagination = document.getElementById('storage-pagination');
    const loading = document.getElementById('storage-loading');
    
    if (!searchInput || !tableBody || !pagination) {
        console.error('存储排名所需的DOM元素不存在');
        return; // 如果元素不存在，则退出
    }
    
    console.log('存储排名初始化开始...');
    
    // 当前页码
    let currentPage = 1;
    // 每页显示数量
    const itemsPerPage = 20;
    // 总页数 (200个条目 / 每页20个 = 10页)
    const totalPages = 10;
    
    // 初始化页面
    showPage(currentPage);
    
    // 搜索框事件监听 - 使用多种事件确保触发
    searchInput.addEventListener('input', filterStorageList);
    searchInput.addEventListener('keyup', filterStorageList);
    searchInput.addEventListener('change', filterStorageList);
    
    console.log('存储搜索框事件监听器已绑定');
    
    // 分页事件监听
    pagination.addEventListener('click', function(e) {
        console.log('分页点击被触发', e.target);
        e.preventDefault();
        
        if (e.target.tagName === 'A') {
            const pageAction = e.target.getAttribute('data-page');
            console.log('尝试切换到页面:', pageAction);
            
            if (pageAction === 'next') {
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                    showPage(currentPage);
                }
            } else if (pageAction === 'prev') {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                    showPage(currentPage);
                }
            } else if (pageAction === 'first') {
                currentPage = 1;
                updatePagination();
                showPage(currentPage);
            } else {
                currentPage = parseInt(pageAction);
                updatePagination();
                showPage(currentPage);
            }
        }
    });
    
    console.log('存储分页事件监听器已绑定');
    
    // 显示指定页码的项目
    function showPage(page) {
        console.log('展示页面:', page);
        
        // 如果是第1页，显示已有内容
        if (page === 1) {
            // 隐藏所有带data-page属性的行
            document.querySelectorAll('#storage-table-body tr[data-page]').forEach(row => {
                row.style.display = 'none';
            });
            // 显示所有不带data-page属性的行（前10个）
            document.querySelectorAll('#storage-table-body tr:not([data-page])').forEach(row => {
                row.style.display = '';
            });
            return;
        }
        
        // 如果是第2页及以后，需要动态加载数据
        if (page >= 2) {
            loadStoragePage(page);
        }
    }
    
    // 动态加载存储数据
    function loadStoragePage(page) {
        // 模拟加载中状态
        loading.style.display = 'block';
        
        // 模拟网络请求延迟
        setTimeout(() => {
            loading.style.display = 'none';
            
            // 清除现有内容
            document.querySelectorAll('#storage-table-body tr').forEach(row => {
                row.style.display = 'none';
            });
            
            // 根据页码动态生成内容
            const startRank = (page - 1) * itemsPerPage + 1;
            let html = '';
            
            for (let i = 0; i < itemsPerPage; i++) {
                const rank = startRank + i;
                if (rank > 200) break; // 不超过200个条目
                
                // 为不同页面生成不同的存储设备数据
                let storageData;
                
                if (rank >= 6 && rank <= 200) {
                    // 根据排名动态生成存储数据
                    const brands = ['Samsung', 'Western Digital', 'Seagate', 'Crucial', 'Kingston', 'SK hynix', 'Sabrent', 'ADATA', 'TeamGroup', 'Corsair', 'Intel', 'Micron', 'Toshiba', 'PNY', 'Gigabyte', 'Lexar'];
                    const brand = brands[rank % brands.length];
                    
                    let model, type, price, pricePerf, useCase;
                    
                    // 存储类型
                    const storageTypes = [
                        { name: 'PCIe 5.0 NVMe SSD', maxRank: 30 }, 
                        { name: 'PCIe 4.0 NVMe SSD', maxRank: 80 },
                        { name: 'PCIe 3.0 NVMe SSD', maxRank: 120 },
                        { name: 'SATA SSD', maxRank: 160 },
                        { name: 'HDD', maxRank: 200 }
                    ];
                    
                    let storageType = storageTypes.find(type => rank <= type.maxRank).name;
                    
                    // 容量和型号依据排名变化
                    let capacity, speed, endurance;
                    
                    if (rank <= 30) {
                        // 高端PCIe 5.0 SSD
                        const capacities = [2, 4, 8];
                        capacity = capacities[rank % capacities.length];
                        
                        const series = [
                            '990 Pro Gen5', 'Black SN890', 'T700', 'Rocket 5', 'Gamma MAX', 
                            'Fury Renegade PCIe 5', 'Platinum P54 Ultra', 'Legend 960', 'MP700'
                        ];
                        const seriesName = series[rank % series.length];
                        model = `${brand} ${seriesName}`;
                        
                        const speed = (12 + (rank % 3)) + 'GB/s';
                        endurance = (1800 - (rank * 10)) + 'TBW';
                        type = `${storageType} ${capacity}TB`;
                        
                        price = Math.round((1200 + (capacity * 500) - (rank * 10)) / 50) * 50;
                        pricePerf = ((9.7 - (rank * 0.05) % 1.5)).toFixed(1) + "/10";
                        
                        useCase = ['顶级游戏与专业工作站', '高端游戏与内容创作', '专业视频剪辑', '前沿游戏和研发', 'AI开发'][rank % 5];
                    } else if (rank <= 80) {
                        // 中高端PCIe 4.0 SSD
                        const capacities = [1, 2, 4];
                        capacity = capacities[rank % capacities.length];
                        
                        const series = [
                            '980 Pro', 'Black SN850X', 'FireCuda 530', 'P5 Plus', 'KC3000', 
                            'Platinum P41', 'AORUS Gen4', 'XPG Gammix S70'
                        ];
                        const seriesName = series[rank % series.length];
                        model = `${brand} ${seriesName}`;
                        
                        speed = (7 + (rank % 3)) + 'GB/s';
                        endurance = (1200 - (rank * 5)) + 'TBW';
                        type = `${storageType} ${capacity}TB`;
                        
                        price = Math.round((600 + (capacity * 300) - ((rank - 30) * 5)) / 10) * 10;
                        pricePerf = ((9.8 - ((rank - 30) * 0.02) % 0.8)).toFixed(1) + "/10";
                        
                        useCase = ['主流高性能', '游戏与内容创作', '日常使用和创作', '视频编辑工作站', '全能性能型'][rank % 5];
                    } else if (rank <= 120) {
                        // 主流PCIe 3.0 SSD
                        const capacities = [500, 1000, 2000];
                        capacity = capacities[rank % capacities.length];
                        capacity = capacity >= 1000 ? (capacity/1000) + "TB" : capacity + "GB";
                        
                        const series = [
                            '970 EVO Plus', 'Blue SN570', 'MX500', 'A2000', 'P2', 
                            'NV1', 'CS3030'
                        ];
                        const seriesName = series[rank % series.length];
                        model = `${brand} ${seriesName}`;
                        
                        speed = (3 + (rank % 3)) + 'GB/s';
                        endurance = (600 - ((rank - 80) * 3)) + 'TBW';
                        type = `${storageType} ${capacity}`;
                        
                        price = Math.round((300 + (capacity === "500GB" ? 50 : capacity === "1TB" ? 150 : 350) - ((rank - 80) * 2)) / 10) * 10;
                        pricePerf = ((9.9 - ((rank - 80) * 0.01) % 0.3)).toFixed(1) + "/10";
                        
                        useCase = ['日常使用', '游戏加载', '系统盘', '预算PC配置', '性价比方案'][rank % 5];
                    } else if (rank <= 160) {
                        // SATA SSD
                        const capacities = [250, 500, 1000, 2000];
                        capacity = capacities[rank % capacities.length];
                        capacity = capacity >= 1000 ? (capacity/1000) + "TB" : capacity + "GB";
                        
                        const series = [
                            '870 EVO', '870 QVO', 'MX500', 'BX500', 'A400', 
                            'UV500', 'WD Blue 3D'
                        ];
                        const seriesName = series[rank % series.length];
                        model = `${brand} ${seriesName}`;
                        
                        speed = '550MB/s';
                        type = `${storageType} ${capacity}`;
                        
                        price = Math.round((180 + (capacity === "250GB" ? 20 : capacity === "500GB" ? 70 : capacity === "1TB" ? 170 : 350) - ((rank - 120) * 1)) / 10) * 10;
                        pricePerf = ((9.7 - ((rank - 120) * 0.02) % 0.5)).toFixed(1) + "/10";
                        
                        useCase = ['大容量存储', '老设备升级', '预算项目', '家用影音库', '文件归档'][rank % 5];
                    } else {
                        // 机械硬盘
                        const capacities = [1, 2, 4, 8, 12, 16, 20];
                        capacity = capacities[rank % capacities.length];
                        
                        const series = [
                            'Barracuda', 'Blue', 'IronWolf', 'RED Plus', 'Ultrastar', 
                            'X300', 'Exos', 'SkyHawk', 'Purple'
                        ];
                        const seriesName = series[rank % series.length];
                        model = `${brand} ${seriesName}`;
                        
                        speed = (5400 + ((rank % 2) * 1800)) + 'RPM';
                        type = `${storageType} ${capacity}TB`;
                        
                        price = Math.round((120 + (capacity * 50) - ((rank - 160) * 0.5)) / 10) * 10;
                        pricePerf = ((9.5 - ((rank - 160) * 0.03) % 0.7)).toFixed(1) + "/10";
                        
                        useCase = ['大容量存储', '影音媒体库', 'NAS设备', '监控存储', '长期归档'][rank % 5];
                    }
                    
                    storageData = {
                        model: model,
                        type: type,
                        price: `¥${price}`,
                        pricePerf: pricePerf,
                        useCase: useCase
                    };
                }
                
                if (storageData) {
                    html += `
                    <tr data-page="${page}">
                        <td>${rank}</td>
                        <td>${storageData.model}</td>
                        <td>${storageData.type}</td>
                        <td class="price-highlight">${storageData.price}</td>
                        <td>${storageData.pricePerf}</td>
                        <td>${storageData.useCase}</td>
                    </tr>`;
                }
            }
            
            // 插入生成的HTML
            if (html) {
                tableBody.insertAdjacentHTML('beforeend', html);
                
                // 显示当前页的行
                tableBody.querySelectorAll(`tr[data-page="${page}"]`).forEach(row => {
                    row.style.display = '';
                });
            }
        }, 500);
    }
    
    // 更新分页控件
    function updatePagination() {
        console.log('更新分页控件, 当前页:', currentPage);
        const paginationLinks = pagination.querySelectorAll('a');
        paginationLinks.forEach(link => {
            link.classList.remove('active');
            const page = link.getAttribute('data-page');
            if (page && parseInt(page) === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // 筛选存储列表
    function filterStorageList() {
        console.log('筛选存储列表, 搜索词:', searchInput.value);
        const searchTerm = searchInput.value.toLowerCase();
        
        // 重置到第一页
        currentPage = 1;
        updatePagination();
        
        // 应用筛选条件
        const rows = document.querySelectorAll('#storage-table-body tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const storageName = row.children[1].textContent.toLowerCase();
            const storageType = row.children[2].textContent.toLowerCase();
            
            // 搜索词筛选 (匹配名称或类型)
            const matchesSearch = !searchTerm || 
                storageName.includes(searchTerm) || 
                storageType.includes(searchTerm);
            
            // 应用筛选结果
            if (matchesSearch) {
                row.style.display = '';
                visibleCount++;
                
                // 控制每页显示数量
                if (visibleCount > itemsPerPage) {
                    row.style.display = 'none';
                }
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    console.log('存储排名初始化完成');
}

// 散热器排名功能
function initCoolingRanking() {
    console.log("散热器排名功能初始化中...");
    
    // 获取DOM元素
    const searchInput = document.getElementById('cooling-search');
    const tableBody = document.getElementById('cooling-table-body');
    const pagination = document.getElementById('cooling-pagination');
    const loadingIndicator = document.getElementById('cooling-loading');
    
    // 如果任一元素不存在，则退出
    if (!searchInput || !tableBody || !pagination || !loadingIndicator) {
        console.error('散热器排名所需DOM元素不存在');
        return;
    }
    
    // 初始化变量
    let currentPage = 1;
    const itemsPerPage = 20; // 每页显示的项目数
    
    // 绑定事件监听
    searchInput.addEventListener('input', filterCoolingList);
    pagination.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            changeCoolingPage(page);
        }
    });
    
    // 初始加载第一页
    loadCoolingPage(1);
    
    // 切换页面
    function changeCoolingPage(page) {
        console.log('切换到散热器页面:', page);
        
        // 处理下一页、上一页等导航
        if (page === 'next') {
            currentPage++;
        } else if (page === 'prev') {
            currentPage = Math.max(1, currentPage - 1);
        } else if (page === 'first') {
            currentPage = 1;
        } else {
            currentPage = parseInt(page);
        }
        
        // 隐藏所有项目
        showPage(currentPage);
        
        // 更新分页控件
        updatePagination();
        
        // 如果当前页没有数据，则加载该页
        if (tableBody.querySelectorAll(`tr[data-page="${currentPage}"]`).length === 0) {
            loadCoolingPage(currentPage);
        }
    }
    
    // 显示指定页面的项目
    function showPage(page) {
        console.log('显示散热器页面:', page);
        
        // 隐藏所有行
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            row.style.display = 'none';
        });
        
        // 显示当前页的行
        const currentRows = tableBody.querySelectorAll(`tr[data-page="${page}"]`);
        currentRows.forEach(row => {
            row.style.display = '';
        });
    }
    
    // 加载散热器页面数据
    function loadCoolingPage(page) {
        console.log('加载散热器页面:', page);
        
        // 显示加载指示器
        loadingIndicator.style.display = 'block';
        
        // 模拟数据加载延迟
        setTimeout(() => {
            // 隐藏加载指示器
            loadingIndicator.style.display = 'none';
            
            let html = '';
            // 生成散热器数据
            for (let i = 1; i <= itemsPerPage; i++) {
                const rank = (page - 1) * itemsPerPage + i;
                
                // 超过100个散热器就不再生成
                if (rank > 100) break;
                
                // 生成散热器数据
                let coolerData;
                
                // 根据排名生成不同类型的散热器
                if (rank <= 20) {
                    // 高端散热器
                    const models = [
                        "Noctua NH-D15", "Arctic Liquid Freezer II Pro 420", 
                        "Thermalright Ultra Phantom", "DeepCool Assassin IV", 
                        "be quiet! Silent Loop 3 360", "Corsair iCUE H170i Elite", 
                        "EK-AIO Elite 360", "Phanteks Glacier One 360MPH", 
                        "NZXT Kraken Z73", "Cooler Master MasterLiquid PL-G AI"
                    ];
                    
                    const types = ["双塔风冷", "360mm一体水冷", "420mm一体水冷", "单塔顶级风冷", "280mm一体水冷"];
                    const model = `${models[rank % models.length]} ${rank <= 10 ? "Pro" : "Elite"}`;
                    const type = types[rank % types.length];
                    const price = 450 + Math.floor(rank % 5) * 150;
                    const pricePerf = (9.8 - (rank % 10) * 0.1).toFixed(1) + "/10";
                    const useCase = ["高端CPU散热", "超频冷却", "安静工作站", "旗舰游戏PC", "发烧级工作站"][rank % 5];
                    
                    coolerData = {
                        model: model,
                        type: type,
                        price: `¥${price}`,
                        pricePerf: pricePerf,
                        useCase: useCase
                    };
                } else if (rank <= 60) {
                    // 中端散热器
                    const models = [
                        "DeepCool AK620", "Scythe Fuma 2", 
                        "Arctic Liquid Freezer II 240", "be quiet! Dark Rock Pro 5", 
                        "Thermalright Peerless Assassin 120", "ID-COOLING ZOOMFLOW 240", 
                        "Corsair H100i RGB", "Phanteks PH-TC14PE", 
                        "Noctua NH-U12A", "Cooler Master Hyper 212 Black"
                    ];
                    
                    const types = ["双塔风冷", "240mm一体水冷", "单塔风冷", "120mm一体水冷", "超薄风冷"];
                    const model = `${models[rank % models.length]} ${rank <= 40 ? "Performance" : "Value"}`;
                    const type = types[rank % types.length];
                    const price = 200 + Math.floor(rank % 4) * 50;
                    const pricePerf = (9.7 - (rank % 20) * 0.05).toFixed(1) + "/10";
                    const useCase = ["中高端CPU散热", "静音散热方案", "普通游戏PC", "家用工作站", "多媒体电脑"][rank % 5];
                    
                    coolerData = {
                        model: model,
                        type: type,
                        price: `¥${price}`,
                        pricePerf: pricePerf,
                        useCase: useCase
                    };
                } else {
                    // 入门级散热器
                    const models = [
                        "ID-COOLING SE-224-XT", "Deepcool GAMMAXX 400", 
                        "Cooler Master Hyper H412R", "Arctic Freezer 7 X", 
                        "Thermaltake UX100", "ALSEYE H120D", 
                        "Jonsbo CR-1000", "Snowman T4", 
                        "Vetroo V5", "Zalman CNPS10X"
                    ];
                    
                    const types = ["单塔风冷", "下吹式风冷", "迷你风冷", "RGB风冷", "铜管散热器"];
                    const model = models[rank % models.length];
                    const type = types[rank % types.length];
                    const price = 69 + Math.floor(rank % 8) * 10;
                    const pricePerf = (9.2 - (rank % 20) * 0.05).toFixed(1) + "/10";
                    const useCase = ["入门级CPU散热", "静音散热", "经济实用", "办公电脑", "家用电脑"][rank % 5];
                    
                    coolerData = {
                        model: model,
                        type: type,
                        price: `¥${price}`,
                        pricePerf: pricePerf,
                        useCase: useCase
                    };
                }
                
                if (coolerData) {
                    html += `
                    <tr data-page="${page}">
                        <td>${rank}</td>
                        <td>${coolerData.model}</td>
                        <td>${coolerData.type}</td>
                        <td class="price-highlight">${coolerData.price}</td>
                        <td>${coolerData.pricePerf}</td>
                        <td>${coolerData.useCase}</td>
                    </tr>`;
                }
            }
            
            // 插入生成的HTML
            if (html) {
                tableBody.insertAdjacentHTML('beforeend', html);
                
                // 显示当前页的行
                tableBody.querySelectorAll(`tr[data-page="${page}"]`).forEach(row => {
                    row.style.display = '';
                });
            }
        }, 500);
    }
    
    // 更新分页控件
    function updatePagination() {
        console.log('更新分页控件, 当前页:', currentPage);
        const paginationLinks = pagination.querySelectorAll('a');
        paginationLinks.forEach(link => {
            link.classList.remove('active');
            const page = link.getAttribute('data-page');
            if (page && parseInt(page) === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // 筛选散热器列表
    function filterCoolingList() {
        console.log('筛选散热器列表, 搜索词:', searchInput.value);
        const searchTerm = searchInput.value.toLowerCase();
        
        // 重置到第一页
        currentPage = 1;
        updatePagination();
        
        // 应用筛选条件
        const rows = document.querySelectorAll('#cooling-table-body tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const coolerName = row.children[1].textContent.toLowerCase();
            const coolerType = row.children[2].textContent.toLowerCase();
            
            // 搜索词筛选 (匹配名称或类型)
            const matchesSearch = !searchTerm || 
                coolerName.includes(searchTerm) || 
                coolerType.includes(searchTerm);
            
            // 应用筛选结果
            if (matchesSearch) {
                row.style.display = '';
                visibleCount++;
                
                // 控制每页显示数量
                if (visibleCount > itemsPerPage) {
                    row.style.display = 'none';
                }
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    console.log('散热器排名初始化完成');
}

// 机箱排名功能
function initCaseRanking() {
    console.log("机箱排名功能初始化中...");
    
    // 获取DOM元素
    const searchInput = document.getElementById('case-search');
    const tableBody = document.getElementById('case-table-body');
    const pagination = document.getElementById('case-pagination');
    const loadingIndicator = document.getElementById('case-loading');
    
    // 如果任一元素不存在，则退出
    if (!searchInput || !tableBody || !pagination || !loadingIndicator) {
        console.error('机箱排名所需DOM元素不存在');
        return;
    }
    
    // 初始化变量
    let currentPage = 1;
    const itemsPerPage = 20; // 每页显示的项目数
    
    // 绑定事件监听
    searchInput.addEventListener('input', filterCaseList);
    pagination.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            changeCasePage(page);
        }
    });
    
    // 初始加载第一页
    loadCasePage(1);
    
    // 切换页面
    function changeCasePage(page) {
        console.log('切换到机箱页面:', page);
        
        // 处理下一页、上一页等导航
        if (page === 'next') {
            currentPage++;
        } else if (page === 'prev') {
            currentPage = Math.max(1, currentPage - 1);
        } else if (page === 'first') {
            currentPage = 1;
        } else {
            currentPage = parseInt(page);
        }
        
        // 隐藏所有项目
        showPage(currentPage);
        
        // 更新分页控件
        updatePagination();
        
        // 如果当前页没有数据，则加载该页
        if (tableBody.querySelectorAll(`tr[data-page="${currentPage}"]`).length === 0) {
            loadCasePage(currentPage);
        }
    }
    
    // 显示指定页面的项目
    function showPage(page) {
        console.log('显示机箱页面:', page);
        
        // 隐藏所有行
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            row.style.display = 'none';
        });
        
        // 显示当前页的行
        const currentRows = tableBody.querySelectorAll(`tr[data-page="${page}"]`);
        currentRows.forEach(row => {
            row.style.display = '';
        });
    }
    
    // 加载机箱页面数据
    function loadCasePage(page) {
        console.log('加载机箱页面:', page);
        
        // 显示加载指示器
        loadingIndicator.style.display = 'block';
        
        // 模拟数据加载延迟
        setTimeout(() => {
            // 隐藏加载指示器
            loadingIndicator.style.display = 'none';
            
            let html = '';
            // 生成机箱数据
            for (let i = 1; i <= itemsPerPage; i++) {
                const rank = (page - 1) * itemsPerPage + i;
                
                // 超过100个机箱就不再生成
                if (rank > 100) break;
                
                // 生成机箱数据
                let caseData;
                
                // 根据排名生成不同类型的机箱
                if (rank <= 20) {
                    // 高端机箱
                    const models = [
                        "Lian Li O11 Dynamic", "NZXT H9 Flow", 
                        "Fractal Design Meshify C2", "Corsair 7000D Airflow", 
                        "Phanteks Evolv X2", "be quiet! Dark Base Pro 901", 
                        "Cooler Master Cosmos C700M", "Thermaltake View 71", 
                        "InWin 925", "Hyte Y60"
                    ];
                    
                    const types = ["全塔ATX", "中塔ATX", "大型E-ATX", "开放式ITX", "双系统ATX"];
                    const model = `${models[rank % models.length]} ${rank <= 10 ? "Premium" : "Pro"}`;
                    const type = types[rank % types.length];
                    const price = 750 + Math.floor(rank % 6) * 150;
                    const pricePerf = (9.8 - (rank % 10) * 0.1).toFixed(1) + "/10";
                    const useCase = ["豪华展示型构建", "高端水冷平台", "多GPU工作站", "顶级游戏PC", "专业内容创作站"][rank % 5];
                    
                    caseData = {
                        model: model,
                        type: type,
                        price: `¥${price}`,
                        pricePerf: pricePerf,
                        useCase: useCase
                    };
                } else if (rank <= 60) {
                    // 中端机箱
                    const models = [
                        "Corsair 4000D Airflow", "NZXT H5 Flow", 
                        "Lian Li Lancool 216", "Fractal Design North", 
                        "be quiet! Pure Base 600", "Phanteks P500A", 
                        "Cooler Master TD500 Mesh", "Thermaltake Versa H18", 
                        "Silverstone FARA R1", "DeepCool CK560"
                    ];
                    
                    const types = ["中塔ATX", "Micro-ATX", "ITX", "中小型ATX", "开放式平台"];
                    const model = `${models[rank % models.length]} ${rank <= 40 ? "Digital" : "Essential"}`;
                    const type = types[rank % types.length];
                    const price = 300 + Math.floor(rank % 5) * 70;
                    const pricePerf = (9.9 - (rank % 20) * 0.05).toFixed(1) + "/10";
                    const useCase = ["高性价比游戏构建", "静音办公平台", "温控优先设计", "多功能家用PC", "中端工作站"][rank % 5];
                    
                    caseData = {
                        model: model,
                        type: type,
                        price: `¥${price}`,
                        pricePerf: pricePerf,
                        useCase: useCase
                    };
                } else {
                    // 入门级机箱
                    const models = [
                        "Deepcool Matrexx 55", "Cooler Master Q300L", 
                        "Thermaltake Versa H17", "NZXT H210", 
                        "Fractal Design Focus G", "Corsair 110Q", 
                        "Antec NX100", "Phanteks P300", 
                        "MSI MAG Forge 100R", "Silverstone PS15"
                    ];
                    
                    const types = ["Mini塔式ATX", "紧凑型M-ATX", "Mini-ITX", "预算ATX", "入门级M-ATX"];
                    const model = models[rank % models.length];
                    const type = types[rank % types.length];
                    const price = 149 + Math.floor(rank % 6) * 20;
                    const pricePerf = (9.5 - (rank % 20) * 0.03).toFixed(1) + "/10";
                    const useCase = ["入门级游戏PC", "家庭办公电脑", "预算型构建", "日常多媒体", "学生电脑"][rank % 5];
                    
                    caseData = {
                        model: model,
                        type: type,
                        price: `¥${price}`,
                        pricePerf: pricePerf,
                        useCase: useCase
                    };
                }
                
                if (caseData) {
                    html += `
                    <tr data-page="${page}">
                        <td>${rank}</td>
                        <td>${caseData.model}</td>
                        <td>${caseData.type}</td>
                        <td class="price-highlight">${caseData.price}</td>
                        <td>${caseData.pricePerf}</td>
                        <td>${caseData.useCase}</td>
                    </tr>`;
                }
            }
            
            // 插入生成的HTML
            if (html) {
                tableBody.insertAdjacentHTML('beforeend', html);
                
                // 显示当前页的行
                tableBody.querySelectorAll(`tr[data-page="${page}"]`).forEach(row => {
                    row.style.display = '';
                });
            }
        }, 500);
    }
    
    // 更新分页控件
    function updatePagination() {
        console.log('更新分页控件, 当前页:', currentPage);
        const paginationLinks = pagination.querySelectorAll('a');
        paginationLinks.forEach(link => {
            link.classList.remove('active');
            const page = link.getAttribute('data-page');
            if (page && parseInt(page) === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // 筛选机箱列表
    function filterCaseList() {
        console.log('筛选机箱列表, 搜索词:', searchInput.value);
        const searchTerm = searchInput.value.toLowerCase();
        
        // 重置到第一页
        currentPage = 1;
        updatePagination();
        
        // 应用筛选条件
        const rows = document.querySelectorAll('#case-table-body tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const caseName = row.children[1].textContent.toLowerCase();
            const caseType = row.children[2].textContent.toLowerCase();
            
            // 搜索词筛选 (匹配名称或类型)
            const matchesSearch = !searchTerm || 
                caseName.includes(searchTerm) || 
                caseType.includes(searchTerm);
            
            // 应用筛选结果
            if (matchesSearch) {
                row.style.display = '';
                visibleCount++;
                
                // 控制每页显示数量
                if (visibleCount > itemsPerPage) {
                    row.style.display = 'none';
                }
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    console.log('机箱排名初始化完成');
}

// 电源排名功能
function initPowerRanking() {
    console.log("电源排名功能已初始化");
}

// 显示器排名功能
function initMonitorRanking() {
    console.log("显示器排名功能初始化中...");
    
    // 获取DOM元素
    const searchInput = document.getElementById('monitor-search');
    const tableBody = document.getElementById('monitor-table-body');
    const pagination = document.getElementById('monitor-pagination');
    const loadingIndicator = document.getElementById('monitor-loading');
    
    // 如果任一元素不存在，则退出
    if (!searchInput || !tableBody || !pagination || !loadingIndicator) {
        console.error('显示器排名所需DOM元素不存在');
        return;
    }
    
    // 初始化变量
    let currentPage = 1;
    const itemsPerPage = 20; // 每页显示的项目数
    
    // 绑定事件监听
    searchInput.addEventListener('input', filterMonitorList);
    pagination.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            changeMonitorPage(page);
        }
    });
    
    // 初始加载第一页
    loadMonitorPage(1);
    
    // 切换页面
    function changeMonitorPage(page) {
        console.log('切换到显示器页面:', page);
        
        // 处理下一页、上一页等导航
        if (page === 'next') {
            currentPage++;
        } else if (page === 'prev') {
            currentPage = Math.max(1, currentPage - 1);
        } else if (page === 'first') {
            currentPage = 1;
        } else {
            currentPage = parseInt(page);
        }
        
        // 隐藏所有项目
        showPage(currentPage);
        
        // 更新分页控件
        updatePagination();
        
        // 如果当前页没有数据，则加载该页
        if (tableBody.querySelectorAll(`tr[data-page="${currentPage}"]`).length === 0) {
            loadMonitorPage(currentPage);
        }
    }
    
    // 显示指定页面的项目
    function showPage(page) {
        console.log('显示显示器页面:', page);
        
        // 隐藏所有行
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            row.style.display = 'none';
        });
        
        // 显示当前页的行
        const currentRows = tableBody.querySelectorAll(`tr[data-page="${page}"]`);
        currentRows.forEach(row => {
            row.style.display = '';
        });
    }
    
    // 加载显示器页面数据
    function loadMonitorPage(page) {
        console.log('加载显示器页面:', page);
        
        // 显示加载指示器
        loadingIndicator.style.display = 'block';
        
        // 模拟数据加载延迟
        setTimeout(() => {
            // 隐藏加载指示器
            loadingIndicator.style.display = 'none';
            
            let html = '';
            // 生成显示器数据
            for (let i = 1; i <= itemsPerPage; i++) {
                const rank = (page - 1) * itemsPerPage + i;
                
                // 超过100个显示器就不再生成
                if (rank > 100) break;
                
                // 生成显示器数据
                let monitorData;
                
                // 根据排名生成不同类型的显示器
                if (rank <= 20) {
                    // 高端显示器
                    const brands = [
                        "LG", "Samsung", "Alienware", "ASUS ROG", 
                        "Acer Predator", "Sony", "ViewSonic", "BenQ", 
                        "Eve", "MSI"
                    ];
                    
                    const series = [
                        "UltraGear", "Odyssey", "AW", "Swift", 
                        "Nitro", "BRAVIA", "Elite", "Zowie", 
                        "Spectrum", "Optix"
                    ];
                    
                    const types = ["OLED", "QD-OLED", "Mini-LED", "WOLED", "Micro-LED"];
                    const sizes = ["27\"", "32\"", "34\"", "38\"", "42\"", "48\""];
                    const resolutions = ["4K UHD", "5K", "QHD", "UW-QHD", "WQHD"];
                    
                    const brand = brands[rank % brands.length];
                    const serie = series[rank % series.length];
                    const type = types[rank % types.length];
                    const size = sizes[rank % sizes.length];
                    const resolution = resolutions[rank % resolutions.length];
                    
                    const model = `${brand} ${serie} ${type} ${size} ${resolution}`;
                    const monitorType = `${type} | ${resolution} | ${size}`;
                    
                    const price = 3500 + Math.floor(rank % 6) * 350;
                    const pricePerf = (9.9 - (rank % 10) * 0.1).toFixed(1) + "/10";
                    const useCase = ["专业游戏电竞", "内容创作", "4K视频编辑", "专业色彩处理", "沉浸式游戏体验"][rank % 5];
                    
                    monitorData = {
                        model: model,
                        type: monitorType,
                        price: `¥${price}`,
                        pricePerf: pricePerf,
                        useCase: useCase
                    };
                } else if (rank <= 60) {
                    // 中端显示器
                    const brands = [
                        "AOC", "Gigabyte", "Dell", "BenQ", 
                        "Philips", "HP", "Huawei", "Xiaomi", 
                        "INNOCN", "LG"
                    ];
                    
                    const series = [
                        "AGON", "M", "Ultrasharp", "Mobiuz", 
                        "Evnia", "X", "MateView", "Redmi", 
                        "Creator", "Ergo"
                    ];
                    
                    const types = ["IPS", "VA", "Fast IPS", "Nano IPS", "QLED"];
                    const sizes = ["24\"", "27\"", "28\"", "32\"", "34\""];
                    const resolutions = ["QHD", "FHD", "4K UHD", "WQHD", "UW-FHD"];
                    
                    const brand = brands[rank % brands.length];
                    const serie = series[rank % series.length];
                    const type = types[rank % types.length];
                    const size = sizes[rank % sizes.length];
                    const resolution = resolutions[rank % resolutions.length];
                    
                    const model = `${brand} ${serie} ${type} ${size} ${resolution}`;
                    const monitorType = `${type} | ${resolution} | ${size}`;
                    
                    const price = 1200 + Math.floor(rank % 5) * 170;
                    const pricePerf = (9.5 - (rank % 20) * 0.05).toFixed(1) + "/10";
                    const useCase = ["日常游戏", "办公设计", "多用途显示", "家庭娱乐", "文档处理"][rank % 5];
                    
                    monitorData = {
                        model: model,
                        type: monitorType,
                        price: `¥${price}`,
                        pricePerf: pricePerf,
                        useCase: useCase
                    };
                } else {
                    // 入门级显示器
                    const brands = [
                        "AOC", "Acer", "ViewSonic", "Philips", 
                        "ASUS", "Dell", "HP", "JVC", 
                        "ThinkVision", "INNOCN"
                    ];
                    
                    const types = ["IPS", "VA", "TN", "LED"];
                    const sizes = ["21.5\"", "23\"", "23.8\"", "24\"", "27\""];
                    const resolutions = ["FHD", "HD+", "HD", "WFHD"];
                    
                    const brand = brands[rank % brands.length];
                    const type = types[rank % types.length];
                    const size = sizes[rank % sizes.length];
                    const resolution = resolutions[rank % resolutions.length];
                    
                    const model = `${brand} ${size} ${resolution}`;
                    const monitorType = `${type} | ${resolution} | ${size}`;
                    
                    const price = 599 + Math.floor(rank % 6) * 50;
                    const pricePerf = (8.9 - (rank % 20) * 0.03).toFixed(1) + "/10";
                    const useCase = ["日常办公", "学习使用", "家庭娱乐", "文档处理", "基础多媒体"][rank % 5];
                    
                    monitorData = {
                        model: model,
                        type: monitorType,
                        price: `¥${price}`,
                        pricePerf: pricePerf,
                        useCase: useCase
                    };
                }
                
                if (monitorData) {
                    html += `
                    <tr data-page="${page}">
                        <td>${rank}</td>
                        <td>${monitorData.model}</td>
                        <td>${monitorData.type}</td>
                        <td class="price-highlight">${monitorData.price}</td>
                        <td>${monitorData.pricePerf}</td>
                        <td>${monitorData.useCase}</td>
                    </tr>`;
                }
            }
            
            // 插入生成的HTML
            if (html) {
                tableBody.insertAdjacentHTML('beforeend', html);
                
                // 显示当前页的行
                tableBody.querySelectorAll(`tr[data-page="${page}"]`).forEach(row => {
                    row.style.display = '';
                });
            }
        }, 500);
    }
    
    // 更新分页控件
    function updatePagination() {
        console.log('更新分页控件, 当前页:', currentPage);
        const paginationLinks = pagination.querySelectorAll('a');
        paginationLinks.forEach(link => {
            link.classList.remove('active');
            const page = link.getAttribute('data-page');
            if (page && parseInt(page) === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // 筛选显示器列表
    function filterMonitorList() {
        console.log('筛选显示器列表, 搜索词:', searchInput.value);
        const searchTerm = searchInput.value.toLowerCase();
        
        // 重置到第一页
        currentPage = 1;
        updatePagination();
        
        // 应用筛选条件
        const rows = document.querySelectorAll('#monitor-table-body tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const monitorName = row.children[1].textContent.toLowerCase();
            const monitorType = row.children[2].textContent.toLowerCase();
            
            // 搜索词筛选 (匹配名称或类型)
            const matchesSearch = !searchTerm || 
                monitorName.includes(searchTerm) || 
                monitorType.includes(searchTerm);
            
            // 应用筛选结果
            if (matchesSearch) {
                row.style.display = '';
                visibleCount++;
                
                // 控制每页显示数量
                if (visibleCount > itemsPerPage) {
                    row.style.display = 'none';
                }
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    console.log('显示器排名初始化完成');
}

// 外设排名功能
function initPeripheralRanking() {
    console.log("外设排名功能初始化中...");
    
    // 获取DOM元素
    const searchInput = document.getElementById('peripheral-search');
    const tableBody = document.getElementById('peripheral-table-body');
    const pagination = document.getElementById('peripheral-pagination');
    const loadingIndicator = document.getElementById('peripheral-loading');
    
    // 如果任一元素不存在，则退出
    if (!searchInput || !tableBody || !pagination || !loadingIndicator) {
        console.error('外设排名所需DOM元素不存在');
        return;
    }
    
    // 初始化变量
    let currentPage = 1;
    const itemsPerPage = 20; // 每页显示的项目数
    
    // 绑定事件监听
    searchInput.addEventListener('input', filterPeripheralList);
    pagination.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            changePeripheralPage(page);
        }
    });
    
    // 初始加载第一页
    loadPeripheralPage(1);
    
    // 切换页面
    function changePeripheralPage(page) {
        console.log('切换到外设页面:', page);
        
        // 处理下一页、上一页等导航
        if (page === 'next') {
            currentPage++;
        } else if (page === 'prev') {
            currentPage = Math.max(1, currentPage - 1);
        } else if (page === 'first') {
            currentPage = 1;
        } else {
            currentPage = parseInt(page);
        }
        
        // 隐藏所有项目
        showPage(currentPage);
        
        // 更新分页控件
        updatePagination();
        
        // 如果当前页没有数据，则加载该页
        if (tableBody.querySelectorAll(`tr[data-page="${currentPage}"]`).length === 0) {
            loadPeripheralPage(currentPage);
        }
    }
    
    // 显示指定页面的项目
    function showPage(page) {
        console.log('显示外设页面:', page);
        
        // 隐藏所有行
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            row.style.display = 'none';
        });
        
        // 显示当前页的行
        const currentRows = tableBody.querySelectorAll(`tr[data-page="${page}"]`);
        currentRows.forEach(row => {
            row.style.display = '';
        });
    }
    
    // 加载外设页面数据
    function loadPeripheralPage(page) {
        console.log('加载外设页面:', page);
        
        // 显示加载指示器
        loadingIndicator.style.display = 'block';
        
        // 模拟数据加载延迟
        setTimeout(() => {
            // 隐藏加载指示器
            loadingIndicator.style.display = 'none';
            
            let html = '';
            // 生成外设数据
            for (let i = 1; i <= itemsPerPage; i++) {
                const rank = (page - 1) * itemsPerPage + i;
                
                // 超过100个外设就不再生成
                if (rank > 100) break;
                
                // 生成外设数据
                let peripheralData;
                
                // 根据排名生成不同类型的外设
                if (rank <= 20) {
                    // 高端鼠标
                    if (rank <= 10) {
                        const brands = [
                            "罗技", "雷蛇", "SteelSeries", "Zowie", 
                            "Glorious", "Endgame Gear", "Finalmouse", "Vaxee", 
                            "Pulsar", "Xtrfy"
                        ];
                        
                        const series = [
                            "G Pro X", "DeathAdder", "Prime", "EC", 
                            "Model O", "XM1", "Starlight-12", "Outset", 
                            "Xlite", "M4"
                        ];
                        
                        const types = ["无线游戏鼠标", "电竞光学鼠标", "轻量化电竞鼠标", "电竞鼠标"];
                        
                        const brand = brands[rank % brands.length];
                        const serie = series[rank % series.length];
                        const type = types[rank % types.length];
                        
                        const model = `${brand} ${serie} ${rank <= 5 ? "Superlight" : "Pro"}`;
                        
                        const price = 699 + Math.floor(rank % 6) * 50;
                        const pricePerf = (9.9 - (rank % 10) * 0.1).toFixed(1) + "/10";
                        const useCase = ["专业电竞", "FPS游戏", "MOBA游戏", "精准操作", "无线游戏"][rank % 5];
                        
                        peripheralData = {
                            model: model,
                            type: type,
                            price: `¥${price}`,
                            pricePerf: pricePerf,
                            useCase: useCase
                        };
                    } else {
                        // 高端键盘
                        const brands = [
                            "罗技", "雷蛇", "SteelSeries", "Corsair", 
                            "HHKB", "Keychron", "Ducky", "Varmilo", 
                            "Akko", "Leopold"
                        ];
                        
                        const series = [
                            "G Pro X", "Huntsman", "Apex Pro", "K100", 
                            "Professional", "Q系列", "One 3", "VA系列", 
                            "MOD系列", "FC系列"
                        ];
                        
                        const types = ["机械键盘", "光学键盘", "热插拔键盘", "无线机械键盘", "静电容键盘"];
                        
                        const brand = brands[rank % brands.length];
                        const serie = series[rank % series.length];
                        const type = types[rank % types.length];
                        
                        const model = `${brand} ${serie} ${rank <= 15 ? "TKL" : "Mini"}`;
                        
                        const price = 899 + Math.floor(rank % 6) * 70;
                        const pricePerf = (9.8 - ((rank-10) % 10) * 0.1).toFixed(1) + "/10";
                        const useCase = ["游戏竞技", "键盘爱好者", "办公输入", "编程开发", "便携办公"][rank % 5];
                        
                        peripheralData = {
                            model: model,
                            type: type,
                            price: `¥${price}`,
                            pricePerf: pricePerf,
                            useCase: useCase
                        };
                    }
                } else if (rank <= 60) {
                    // 中端外设
                    if (rank % 3 === 0) {
                        // 中端鼠标
                        const brands = [
                            "罗技", "雷蛇", "HyperX", "赛睿", 
                            "Glorious", "Cooler Master", "微软", "惠普", 
                            "达尔优", "双飞燕"
                        ];
                        
                        const series = [
                            "G305", "Basilisk", "Pulsefire", "Rival", 
                            "Model D", "MM710", "Pro IntelliMouse", "OMEN", 
                            "GM911", "血手幽灵"
                        ];
                        
                        const types = ["无线办公鼠标", "游戏鼠标", "人体工学鼠标", "多键编程鼠标"];
                        
                        const brand = brands[rank % brands.length];
                        const serie = series[rank % series.length];
                        const type = types[rank % types.length];
                        
                        const model = `${brand} ${serie} ${type === "无线办公鼠标" ? "Wireless" : ""}`;
                        
                        const price = 249 + Math.floor(rank % 5) * 30;
                        const pricePerf = (9.6 - (rank % 20) * 0.05).toFixed(1) + "/10";
                        const useCase = ["日常游戏", "办公使用", "家庭娱乐", "轻度游戏", "文档处理"][rank % 5];
                        
                        peripheralData = {
                            model: model,
                            type: type,
                            price: `¥${price}`,
                            pricePerf: pricePerf,
                            useCase: useCase
                        };
                    } else if (rank % 3 === 1) {
                        // 中端键盘
                        const brands = [
                            "雷蛇", "罗技", "赛睿", "美商海盗船", 
                            "Keychron", "Ducky", "ikbc", "Akko", 
                            "达尔优", "航世"
                        ];
                        
                        const series = [
                            "BlackWidow", "G413", "Apex 5", "K70", 
                            "K8", "One 2", "C系列", "3098", 
                            "EK812", "GK系列"
                        ];
                        
                        const types = ["机械键盘", "办公键盘", "游戏键盘", "无线键盘"];
                        
                        const brand = brands[rank % brands.length];
                        const serie = series[rank % series.length];
                        const type = types[rank % types.length];
                        
                        const model = `${brand} ${serie} ${type === "无线键盘" ? "Wireless" : ""}`;
                        
                        const price = 349 + Math.floor(rank % 5) * 40;
                        const pricePerf = (9.5 - (rank % 20) * 0.05).toFixed(1) + "/10";
                        const useCase = ["游戏娱乐", "日常办公", "家用输入", "轻度游戏", "多设备切换"][rank % 5];
                        
                        peripheralData = {
                            model: model,
                            type: type,
                            price: `¥${price}`,
                            pricePerf: pricePerf,
                            useCase: useCase
                        };
                    } else {
                        // 中端耳机
                        const brands = [
                            "罗技", "雷蛇", "海盗船", "HyperX", 
                            "SteelSeries", "Sennheiser", "森海塞尔", "铁三角", 
                            "拜亚动力", "漫步者"
                        ];
                        
                        const series = [
                            "G Pro", "BlackShark", "HS70", "Cloud Alpha", 
                            "Arctis 5", "GSP 300", "HD 560S", "ATH-M50x", 
                            "DT 770", "H5000"
                        ];
                        
                        const types = ["游戏耳机", "HIFI耳机", "工作室耳机", "无线耳机", "监听耳机"];
                        
                        const brand = brands[rank % brands.length];
                        const serie = series[rank % series.length];
                        const type = types[rank % types.length];
                        
                        const model = `${brand} ${serie} ${type === "无线耳机" ? "Wireless" : "Pro"}`;
                        
                        const price = 399 + Math.floor(rank % 5) * 50;
                        const pricePerf = (9.4 - (rank % 20) * 0.05).toFixed(1) + "/10";
                        const useCase = ["游戏音效", "音乐欣赏", "虚拟会议", "影视娱乐", "录音监听"][rank % 5];
                        
                        peripheralData = {
                            model: model,
                            type: type,
                            price: `¥${price}`,
                            pricePerf: pricePerf,
                            useCase: useCase
                        };
                    }
                } else {
                    // 入门级外设
                    if (rank % 3 === 0) {
                        // 入门级鼠标
                        const brands = [
                            "罗技", "雷蛇", "达尔优", "双飞燕", 
                            "微软", "惠普", "戴尔", "联想", 
                            "飞利浦", "雷柏"
                        ];
                        
                        const series = [
                            "G102", "DeathAdder Essential", "EM901", "WM-01", 
                            "Basic Mouse", "X500", "MS116", "M120", 
                            "SPK7344", "V20"
                        ];
                        
                        const types = ["办公鼠标", "入门游戏鼠标", "无线鼠标", "有线鼠标"];
                        
                        const brand = brands[rank % brands.length];
                        const serie = series[rank % series.length];
                        const type = types[rank % types.length];
                        
                        const model = `${brand} ${serie}`;
                        
                        const price = 49 + Math.floor(rank % 6) * 15;
                        const pricePerf = (8.9 - (rank % 20) * 0.03).toFixed(1) + "/10";
                        const useCase = ["日常办公", "家庭使用", "学生电脑", "基础操作", "简单游戏"][rank % 5];
                        
                        peripheralData = {
                            model: model,
                            type: type,
                            price: `¥${price}`,
                            pricePerf: pricePerf,
                            useCase: useCase
                        };
                    } else if (rank % 3 === 1) {
                        // 入门级键盘
                        const brands = [
                            "罗技", "雷蛇", "达尔优", "双飞燕", 
                            "航世", "惠普", "戴尔", "联想", 
                            "赛睿", "Akko"
                        ];
                        
                        const series = [
                            "K380", "Cynosa Lite", "EK812", "KR-85", 
                            "GK系列", "K150", "KB216", "K120", 
                            "Apex 3", "3068"
                        ];
                        
                        const types = ["薄膜键盘", "入门机械", "办公键盘", "游戏键盘"];
                        
                        const brand = brands[rank % brands.length];
                        const serie = series[rank % series.length];
                        const type = types[rank % types.length];
                        
                        const model = `${brand} ${serie}`;
                        
                        const price = 69 + Math.floor(rank % 6) * 20;
                        const pricePerf = (8.8 - (rank % 20) * 0.03).toFixed(1) + "/10";
                        const useCase = ["日常文字处理", "家庭办公", "学生使用", "基础输入", "休闲游戏"][rank % 5];
                        
                        peripheralData = {
                            model: model,
                            type: type,
                            price: `¥${price}`,
                            pricePerf: pricePerf,
                            useCase: useCase
                        };
                    } else {
                        // 入门级耳机/套装
                        const brands = [
                            "漫步者", "雷蛇", "罗技", "飞利浦", 
                            "铁三角", "声丽", "索尼", "JBL", 
                            "森海塞尔", "入门套装"
                        ];
                        
                        const series = [
                            "G1", "Kraken X", "H111", "SHP1900", 
                            "ATH-T200", "G15", "MDR-ZX110", "C100", 
                            "HD 206", "KM-101"
                        ];
                        
                        const types = ["耳机", "耳麦", "套装", "游戏耳机"];
                        
                        const brand = brands[rank % brands.length];
                        const serie = series[rank % series.length];
                        const type = types[rank % types.length];
                        
                        let model;
                        if (brand === "入门套装") {
                            const comboBrands = ["雷蛇", "罗技", "双飞燕", "达尔优", "航世"];
                            model = `${comboBrands[rank % comboBrands.length]} ${type} ${serie}`;
                        } else {
                            model = `${brand} ${serie}`;
                        }
                        
                        const price = 89 + Math.floor(rank % 6) * 25;
                        const pricePerf = (8.7 - (rank % 20) * 0.03).toFixed(1) + "/10";
                        const useCase = ["视频会议", "日常音乐", "网课学习", "家庭娱乐", "入门游戏"][rank % 5];
                        
                        peripheralData = {
                            model: model,
                            type: type,
                            price: `¥${price}`,
                            pricePerf: pricePerf,
                            useCase: useCase
                        };
                    }
                }
                
                if (peripheralData) {
                    html += `
                    <tr data-page="${page}">
                        <td>${rank}</td>
                        <td>${peripheralData.model}</td>
                        <td>${peripheralData.type}</td>
                        <td class="price-highlight">${peripheralData.price}</td>
                        <td>${peripheralData.pricePerf}</td>
                        <td>${peripheralData.useCase}</td>
                    </tr>`;
                }
            }
            
            // 插入生成的HTML
            if (html) {
                tableBody.insertAdjacentHTML('beforeend', html);
                
                // 显示当前页的行
                tableBody.querySelectorAll(`tr[data-page="${page}"]`).forEach(row => {
                    row.style.display = '';
                });
            }
        }, 500);
    }
    
    // 更新分页控件
    function updatePagination() {
        console.log('更新分页控件, 当前页:', currentPage);
        const paginationLinks = pagination.querySelectorAll('a');
        paginationLinks.forEach(link => {
            link.classList.remove('active');
            const page = link.getAttribute('data-page');
            if (page && parseInt(page) === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // 筛选外设列表
    function filterPeripheralList() {
        console.log('筛选外设列表, 搜索词:', searchInput.value);
        const searchTerm = searchInput.value.toLowerCase();
        
        // 重置到第一页
        currentPage = 1;
        updatePagination();
        
        // 应用筛选条件
        const rows = document.querySelectorAll('#peripheral-table-body tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const peripheralName = row.children[1].textContent.toLowerCase();
            const peripheralType = row.children[2].textContent.toLowerCase();
            
            // 搜索词筛选 (匹配名称或类型)
            const matchesSearch = !searchTerm || 
                peripheralName.includes(searchTerm) || 
                peripheralType.includes(searchTerm);
            
            // 应用筛选结果
            if (matchesSearch) {
                row.style.display = '';
                visibleCount++;
                
                // 控制每页显示数量
                if (visibleCount > itemsPerPage) {
                    row.style.display = 'none';
                }
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    console.log('外设排名初始化完成');
}

// 添加立即执行函数，确保页面加载后绑定事件
(function() {
    // 在页面加载完成后执行
    window.addEventListener('load', function() {
        console.log("页面完全加载，初始化所有排名功能");
        
        // 初始化主板排名功能
        initMotherboardRanking();
        
        // 初始化CPU排名功能
        initCpuRanking();
        
        // 初始化GPU排名功能
        initGpuRanking();
        
        // 初始化内存排名功能
        initMemoryRanking();
        
        // 初始化存储排名功能
        initStorageRanking();
        
        // 初始化散热排名功能
        initCoolingRanking();
        
        // 初始化机箱排名功能
        initCaseRanking();
        
        // 初始化电源排名功能
        initPsuRanking();
        
        // 初始化显示器排名功能
        initMonitorRanking();
        
        // 初始化外设排名功能
        initPeripheralRanking();
    });
})();