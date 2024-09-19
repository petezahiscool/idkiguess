let tabCount = 2;
let currentTab = 1;
const tabUrls = {
    1: "/static/index.html"
};

window.onload = () => {
    const savedUrl = localStorage.getItem(`tab_${currentTab}`);
    if (savedUrl) {
        tabUrls[currentTab] = savedUrl;
        document.getElementById('iframe').src = savedUrl;
    }
};

function switchTab(event) {
    event.stopPropagation();
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.currentTarget.classList.add('active');
    currentTab = Number(event.currentTarget.dataset.tab);
    if (tabUrls[currentTab]) {
        document.getElementById('iframe').src = tabUrls[currentTab];
    } else {
        const defaultUrl = "/static/index.html";
        tabUrls[currentTab] = defaultUrl;
        document.getElementById('iframe').src = defaultUrl;
    }
}

function addTab() {
    tabCount++;
    const tabBar = document.querySelector('.tab-bar');
    const newTab = document.createElement('div');
    newTab.className = 'tab';
    newTab.style.opacity = '0';
    newTab.innerHTML = `
        Tab ${tabCount}
        <button class="close-btn" onclick="closeTab(event)"><i class="fas fa-times"></i></button>
    `;
    newTab.dataset.tab = tabCount;
    newTab.onclick = switchTab;
    tabBar.insertBefore(newTab, tabBar.querySelector('.new-tab'));
    requestAnimationFrame(() => {
        newTab.style.opacity = '1';
    });
    tabUrls[tabCount] = "/static/index.html";
    switchTab({ currentTarget: newTab });
}

function closeTab(event) {
    event.stopPropagation();
    const tab = event.currentTarget.parentElement;
    const tabs = document.querySelectorAll('.tab');
    if (tab.dataset.tab === "1") {
        return;
    }
    delete tabUrls[tab.dataset.tab];
    tab.remove();
    if (tabs.length === 1) {
        if (tabs[0].dataset.tab === "1") {
            addTab();
        }
    } else {
        const activeTab = document.querySelector('.tab.active');
        if (activeTab === tab) {
            switchTab({ currentTarget: tabs[0] });
        }
    }
}

function goBack() {
    const activeTab = document.querySelector('.tab.active');
    const currentTabIndex = activeTab.dataset.tab;
    document.getElementById('iframe').contentWindow.history.back();
    tabUrls[currentTabIndex] = document.getElementById('iframe').src;
}

function goForward() {
    const activeTab = document.querySelector('.tab.active');
    const currentTabIndex = activeTab.dataset.tab;
    document.getElementById('iframe').contentWindow.history.forward();
    tabUrls[currentTabIndex] = document.getElementById('iframe').src;
}

function refreshPage() {
    const activeTab = document.querySelector('.tab.active');
    const currentTabIndex = activeTab.dataset.tab;
    document.getElementById('iframe').src = tabUrls[currentTabIndex];
}

function toggleFullscreen() {
    const iframe = document.getElementById('iframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

function toggleSettings() {
    const settingsBox = document.getElementById('settings-box');
    settingsBox.classList.toggle('active');
}

function closeSettings() {
    document.getElementById('settings-box').classList.remove('active');
}

function toggleGames() {
    const gamesBox = document.getElementById('games-box');
    gamesBox.classList.toggle('active');
}

function closeGames() {
    document.getElementById('games-box').classList.remove('active');
}

function loadGame(url) {
    document.getElementById('iframe').src = url;
}
