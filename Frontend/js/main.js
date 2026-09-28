(function () {

    const page = document.body.dataset.page;

    const auth = localStorage.getItem("nightMoneyAuth");

    if (!auth && page !== undefined) {
        window.location.href = "index.html";
        return;
    }

    const translations = {

        en: {
            dashboard: "Dashboard",
            transactions: "Transactions",
            inventory: "Inventory",
            sales: "Sales",
            purchases: "Purchases",
            finance: "Finance",
            reports: "Reports",
            settings: "Settings",

            totalRevenue: "Total Revenue",
            totalExpenses: "Total Expenses",
            netProfit: "Net Profit",
            inventoryValue: "Inventory Value",

            revenue: "Revenue",
            expenses: "Expenses",
            profit: "Profit",

            recentTransactions: "Recent Transactions",
            inventoryStatus: "Inventory Status",
            recentActivity: "Recent Product Activity",
            quickActions: "Quick Actions",

            addTransaction: "Add Transaction",
            addProduct: "Add Product",
            recordSale: "Record Sale",
            recordPurchase: "Record Purchase",

            search: "Search",
            filter: "Filter",
            actions: "Actions",

            income: "Income",
            expense: "Expense",
            completed: "Completed",
            pending: "Pending",
            lowStock: "Low Stock",
            inStock: "In Stock",

            logout: "Logout",
            profile: "Profile",
            accountSettings: "Account Settings"
        },

        fa: {
            dashboard: "داشبورد",
            transactions: "تراکنش‌ها",
            inventory: "موجودی",
            sales: "فروش",
            purchases: "خریدها",
            finance: "مالی",
            reports: "گزارش‌ها",
            settings: "تنظیمات",

            totalRevenue: "کل درآمد",
            totalExpenses: "کل هزینه‌ها",
            netProfit: "سود خالص",
            inventoryValue: "ارزش موجودی",

            revenue: "درآمد",
            expenses: "هزینه‌ها",
            profit: "سود",

            recentTransactions: "تراکنش‌های اخیر",
            inventoryStatus: "وضعیت موجودی",
            recentActivity: "فعالیت اخیر محصولات",
            quickActions: "دسترسی سریع",

            addTransaction: "افزودن تراکنش",
            addProduct: "افزودن محصول",
            recordSale: "ثبت فروش",
            recordPurchase: "ثبت خرید",

            search: "جستجو",
            filter: "فیلتر",
            actions: "عملیات",

            income: "درآمد",
            expense: "هزینه",
            completed: "تکمیل شده",
            pending: "در انتظار",
            lowStock: "موجودی کم",
            inStock: "موجود",

            logout: "خروج",
            profile: "پروفایل",
            accountSettings: "تنظیمات حساب"
        }
    };

    let currentLanguage =
        localStorage.getItem("nightMoneyLanguage") || "en";

    let currentTheme =
        localStorage.getItem("nightMoneyTheme") || "dark";

    function getUser() {
        try {
            return JSON.parse(
                localStorage.getItem("nightMoneyUser")
            ) || {
                name: "Alex Morgan",
                role: "Financial Manager"
            };
        } catch {
            return {
                name: "Alex Morgan",
                role: "Financial Manager"
            };
        }
    }

    function t(key) {
        return translations[currentLanguage][key] || key;
    }

    function formatMoney(value) {
        return new Intl.NumberFormat(
            currentLanguage === "fa" ? "fa-IR" : "en-US"
        ).format(value) + " ₮";
    }

    function formatNumber(value) {
        return new Intl.NumberFormat(
            currentLanguage === "fa" ? "fa-IR" : "en-US"
        ).format(value);
    }

    function escapeHTML(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function showToast(message, type = "success") {

        const existing = document.querySelector(".toast");

        if (existing) {
            existing.remove();
        }

        const toast = document.createElement("div");

        toast.className = `toast toast-${type}`;

        toast.innerHTML = `
            <span>${escapeHTML(message)}</span>
        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        setTimeout(() => {
            toast.classList.remove("show");

            setTimeout(() => toast.remove(), 250);

        }, 2800);
    }

    function openModal(title, content) {

        closeModal();

        const modal = document.createElement("div");

        modal.className = "modal-overlay";

        modal.innerHTML = `
            <div class="modal">

                <div class="modal-header">
                    <h3>${title}</h3>

                    <button
                        class="icon-button"
                        data-close-modal
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <div class="modal-body">
                    ${content}
                </div>

            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener("click", event => {

            if (
                event.target === modal ||
                event.target.closest("[data-close-modal]")
            ) {
                closeModal();
            }

        });
    }

    function closeModal() {
        document.querySelector(".modal-overlay")?.remove();
    }

    function renderAppShell(content) {

        const user = getUser();

        const navItems = [
            ["dashboard", "dashboard.html", "▦"],
            ["transactions", "transactions.html", "⇄"],
            ["inventory", "inventory.html", "▤"],
            ["sales", "sales.html", "↗"],
            ["purchases", "purchases.html", "↙"],
            ["finance", "finance.html", "◈"],
            ["reports", "reports.html", "◫"],
            ["settings", "settings.html", "⚙"]
        ];

        const primaryNav = navItems.slice(0, 7);
        const secondaryNav = navItems.slice(7);

        document.getElementById("app").innerHTML = `

            <div class="app-layout">

                <aside class="sidebar" id="sidebar">

                    <div class="sidebar-brand">

                        <div class="brand-mark">
                            N
                        </div>

                        <div class="sidebar-brand-text">
                            <strong>NIGHT MONEY</strong>
                            <span>NIGHT MOTORS</span>
                        </div>

                        <button
                            class="sidebar-close"
                            id="sidebarClose"
                        >
                            ×
                        </button>

                    </div>

                    <nav class="sidebar-nav">

                        <div class="nav-section">

                            ${primaryNav.map(item => `
                                <a
                                    href="${item[1]}"
                                    class="nav-item ${page === item[0] ? "active" : ""}"
                                >
                                    <span class="nav-icon">${item[2]}</span>
                                    <span>${t(item[0])}</span>
                                </a>
                            `).join("")}

                        </div>

                        <div class="nav-divider"></div>

                        <div class="nav-section">

                            ${secondaryNav.map(item => `
                                <a
                                    href="${item[1]}"
                                    class="nav-item ${page === item[0] ? "active" : ""}"
                                >
                                    <span class="nav-icon">${item[2]}</span>
                                    <span>${t(item[0])}</span>
                                </a>
                            `).join("")}

                        </div>

                    </nav>

                    <div class="sidebar-footer">

                        <div class="system-status">
                            <span class="status-dot"></span>

                            <div>
                                <strong>System Online</strong>
                                <small>All services operational</small>
                            </div>
                        </div>

                    </div>

                </aside>

                <div class="sidebar-overlay" id="sidebarOverlay"></div>

                <main class="main-area">

                    <header class="topbar">

                        <div class="topbar-left">

                            <button
                                class="mobile-menu"
                                id="mobileMenu"
                                aria-label="Open menu"
                            >
                                ☰
                            </button>

                            <div class="page-context">
                                <span>NIGHT MONEY</span>
                                <strong>${t(page)}</strong>
                            </div>

                        </div>

                        <div class="topbar-actions">

                            <div class="language-switcher">

                                <button
                                    class="${currentLanguage === "en" ? "active" : ""}"
                                    data-language="en"
                                >
                                    EN
                                </button>

                                <span>|</span>

                                <button
                                    class="${currentLanguage === "fa" ? "active" : ""}"
                                    data-language="fa"
                                >
                                    FA
                                </button>

                            </div>

                            <button
                                class="theme-toggle"
                                id="themeToggle"
                                aria-label="Toggle theme"
                            >
                                ${currentTheme === "dark" ? "☼" : "☾"}
                            </button>

                            <div class="account-menu-wrapper">

                                <button
                                    class="account-button"
                                    id="accountButton"
                                >

                                    <span class="avatar">
                                        ${escapeHTML(user.name.charAt(0))}
                                    </span>

                                    <span class="account-info">
                                        <strong>${escapeHTML(user.name)}</strong>
                                        <small>${escapeHTML(user.role)}</small>
                                    </span>

                                    <span class="account-arrow">
                                        ▾
                                    </span>

                                </button>

                                <div
                                    class="account-dropdown"
                                    id="accountDropdown"
                                >

                                    <a href="settings.html">
                                        ${t("profile")}
                                    </a>

                                    <a href="settings.html">
                                        ${t("accountSettings")}
                                    </a>

                                    <div></div>

                                    <button id="logoutButton">
                                        ${t("logout")}
                                    </button>

                                </div>

                            </div>

                        </div>

                    </header>

                    <div class="content-area">
                        ${content}
                    </div>

                </main>

            </div>
        `;

        initializeShell();
    }

    function initializeShell() {

        applyTheme();
        applyLanguageDirection();

        document
            .getElementById("mobileMenu")
            ?.addEventListener("click", () => {
                document
                    .getElementById("sidebar")
                    .classList.add("open");

                document
                    .getElementById("sidebarOverlay")
                    .classList.add("show");
            });

        document
            .getElementById("sidebarClose")
            ?.addEventListener("click", closeSidebar);

        document
            .getElementById("sidebarOverlay")
            ?.addEventListener("click", closeSidebar);

        document
            .getElementById("themeToggle")
            ?.addEventListener("click", toggleTheme);

        document
            .querySelectorAll("[data-language]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    currentLanguage =
                        button.dataset.language;

                    localStorage.setItem(
                        "nightMoneyLanguage",
                        currentLanguage
                    );

                    location.reload();
                });

            });

        const accountButton =
            document.getElementById("accountButton");

        const dropdown =
            document.getElementById("accountDropdown");

        accountButton?.addEventListener("click", event => {

            event.stopPropagation();

            dropdown.classList.toggle("show");
        });

        document.addEventListener("click", () => {
            dropdown?.classList.remove("show");
        });

        document
            .getElementById("logoutButton")
            ?.addEventListener("click", () => {

                localStorage.removeItem("nightMoneyAuth");
                localStorage.removeItem("nightMoneyUser");

                window.location.href = "index.html";
            });
    }

    function closeSidebar() {

        document
            .getElementById("sidebar")
            ?.classList.remove("open");

        document
            .getElementById("sidebarOverlay")
            ?.classList.remove("show");
    }

    function toggleTheme() {

        currentTheme =
            currentTheme === "dark" ? "light" : "dark";

        localStorage.setItem(
            "nightMoneyTheme",
            currentTheme
        );

        applyTheme();
    }

    function applyTheme() {

        document.documentElement.dataset.theme =
            currentTheme;
    }

    function applyLanguageDirection() {

        document.documentElement.lang =
            currentLanguage;

        document.documentElement.dir =
            currentLanguage === "fa" ? "rtl" : "ltr";
    }

    function getPageTitle(title, subtitle = "") {

        return `
            <div class="page-heading">

                <div>
                    <span class="eyebrow">NIGHT MONEY</span>
                    <h1>${title}</h1>
                    ${subtitle ? `<p>${subtitle}</p>` : ""}
                </div>

            </div>
        `;
    }

    function statCard({
        title,
        value,
        change = "",
        icon = "◈",
        type = "purple"
    }) {

        return `
            <article class="stat-card">

                <div class="stat-card-top">

                    <div class="stat-icon ${type}">
                        ${icon}
                    </div>

                    ${change ? `
                        <span class="stat-change ${change.startsWith("-") ? "negative" : "positive"}">
                            ${change}
                        </span>
                    ` : ""}

                </div>

                <span class="stat-label">${title}</span>

                <strong class="stat-value">${value}</strong>

            </article>
        `;
    }

    function statusBadge(status) {

        let type = "neutral";

        const value = String(status).toLowerCase();

        if (
            value.includes("completed") ||
            value.includes("received") ||
            value.includes("active") ||
            value.includes("in stock")
        ) {
            type = "success";
        }

        if (
            value.includes("low") ||
            value.includes("pending")
        ) {
            type = "warning";
        }

        if (
            value.includes("failed") ||
            value.includes("out")
        ) {
            type = "danger";
        }

        return `
            <span class="status-badge ${type}">
                ${escapeHTML(status)}
            </span>
        `;
    }

    window.NightMoney = {
        t,
        formatMoney,
        formatNumber,
        escapeHTML,
        showToast,
        openModal,
        closeModal,
        renderAppShell,
        getPageTitle,
        statCard,
        statusBadge,
        getUser
    };

})();