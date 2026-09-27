/* =========================================================
   Night Money
   Dashboard JavaScript
   ========================================================= */

"use strict";


/* =========================================================
   Elements
   ========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const languageToggle =
    document.getElementById("languageToggle");

const accountButton =
    document.getElementById("accountButton");

const accountMenu =
    document.getElementById("accountMenu");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const sidebar =
    document.getElementById("sidebar");


/* =========================================================
   Translations
   ========================================================= */

const translations = {

    en: {

        managementSystem: "Management System",

        mainMenu: "MAIN MENU",

        management: "MANAGEMENT",

        dashboard: "Dashboard",

        products: "Products",

        transactions: "Transactions",

        inventory: "Inventory",

        sales: "Sales",

        purchases: "Purchases",

        systemOnline: "System Online",

        servicesOperational:
            "All services operational",

        administrator:
            "Administrator",

        profile:
            "Profile",

        settings:
            "Settings",

        logout:
            "Logout",

        overview:
            "Overview",

        overviewDescription:
            "Here's what's happening with your business.",

        totalRevenue:
            "Total Revenue",

        totalExpenses:
            "Total Expenses",

        netProfit:
            "Net Profit",

        inventoryValue:
            "Inventory Value",

        vsLastMonth:
            "vs last month",

        revenueExpenses:
            "Revenue & Expenses",

        incomeExpensesOverTime:
            "Income and expenses over time",

        profitOverview:
            "Profit Overview",

        revenueMinusExpenses:
            "Revenue minus expenses",

        inventoryStatus:
            "Inventory Status",

        currentStockOverview:
            "Current stock overview",

        viewAll:
            "View all",

        product:
            "Product",

        code:
            "Code",

        quantity:
            "Quantity",

        value:
            "Value",

        lowStock:
            "Low Stock",

        productsAttention:
            "Products requiring attention",

        recentTransactions:
            "Recent Transactions",

        latestFinancialActivity:
            "Latest financial activity",

        viewAllTransactions:
            "View all transactions",

        recentSalesPurchases:
            "Recent Sales & Purchases",

        latestStockMovements:
            "Latest stock movements",

        quickActions:
            "Quick Actions",

        frequentlyUsedActions:
            "Frequently used actions",

        addTransaction:
            "Add Transaction",

        addProduct:
            "Add Product",

        recordSale:
            "Record Sale",

        recordPurchase:
            "Record Purchase",

        currentMonth:
            "Current Month",

        profit:
            "Profit",

        expenses:
            "Expenses",

        revenue:
            "Revenue"
    },


    fa: {

        managementSystem:
            "سیستم مدیریت",

        mainMenu:
            "منوی اصلی",

        management:
            "مدیریت",

        dashboard:
            "داشبورد",

        products:
            "محصولات",

        transactions:
            "تراکنش‌ها",

        inventory:
            "موجودی",

        sales:
            "فروش‌ها",

        purchases:
            "خریدها",

        systemOnline:
            "سیستم آنلاین",

        servicesOperational:
            "تمام سرویس‌ها فعال هستند",

        administrator:
            "مدیر سیستم",

        profile:
            "پروفایل",

        settings:
            "تنظیمات",

        logout:
            "خروج",

        overview:
            "نمای کلی",

        overviewDescription:
            "وضعیت کلی کسب‌وکار شما در اینجا نمایش داده می‌شود.",

        totalRevenue:
            "کل درآمد",

        totalExpenses:
            "کل هزینه",

        netProfit:
            "سود خالص",

        inventoryValue:
            "ارزش موجودی",

        vsLastMonth:
            "نسبت به ماه گذشته",

        revenueExpenses:
            "درآمد و هزینه",

        incomeExpensesOverTime:
            "درآمد و هزینه در طول زمان",

        profitOverview:
            "نمای کلی سود",

        revenueMinusExpenses:
            "درآمد منهای هزینه",

        inventoryStatus:
            "وضعیت موجودی",

        currentStockOverview:
            "نمای کلی موجودی فعلی",

        viewAll:
            "مشاهده همه",

        product:
            "محصول",

        code:
            "کد",

        quantity:
            "تعداد",

        value:
            "ارزش",

        lowStock:
            "موجودی کم",

        productsAttention:
            "محصولات نیازمند توجه",

        recentTransactions:
            "تراکنش‌های اخیر",

        latestFinancialActivity:
            "آخرین فعالیت‌های مالی",

        viewAllTransactions:
            "مشاهده همه تراکنش‌ها",

        recentSalesPurchases:
            "فروش و خریدهای اخیر",

        latestStockMovements:
            "آخرین تغییرات موجودی",

        quickActions:
            "دسترسی سریع",

        frequentlyUsedActions:
            "عملیات پرکاربرد",

        addTransaction:
            "افزودن تراکنش",

        addProduct:
            "افزودن محصول",

        recordSale:
            "ثبت فروش",

        recordPurchase:
            "ثبت خرید",

        currentMonth:
            "ماه جاری",

        profit:
            "سود",

        expenses:
            "هزینه",

        revenue:
            "درآمد"
    }

};


/* =========================================================
   Language
   ========================================================= */

let currentLanguage =
    localStorage.getItem(
        "nightMoneyLanguage"
    ) || "en";


function applyLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang =
        language;

    /*
       مهم:
       dir هیچ‌وقت rtl نمی‌شود.
       Layout همیشه LTR است.
    */

    document.documentElement.dir =
        "ltr";


    const dictionary =
        translations[language];


    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            if (dictionary[key]) {

                element.textContent =
                    dictionary[key];
            }

        });


    languageToggle.textContent =
        language === "en"
            ? "FA"
            : "EN";


    localStorage.setItem(
        "nightMoneyLanguage",
        language
    );
}


languageToggle.addEventListener(
    "click",
    () => {

        const newLanguage =
            currentLanguage === "en"
                ? "fa"
                : "en";

        applyLanguage(newLanguage);
    }
);


/* =========================================================
   Theme
   ========================================================= */

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        themeIcon.textContent =
            "☀";

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

        themeIcon.textContent =
            "☾";
    }
}


const savedTheme =
    localStorage.getItem(
        "nightMoneyTheme"
    ) || "light";


applyTheme(savedTheme);


themeToggle.addEventListener(
    "click",
    () => {

        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );

        const newTheme =
            isDark
                ? "light"
                : "dark";

        applyTheme(newTheme);

        localStorage.setItem(
            "nightMoneyTheme",
            newTheme
        );

        updateChartsTheme();
    }
);


/* =========================================================
   Account Menu
   ========================================================= */

accountButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        accountMenu.classList.toggle(
            "open"
        );
    }
);


document.addEventListener(
    "click",
    event => {

        if (
            !accountMenu.contains(event.target) &&
            !accountButton.contains(event.target)
        ) {

            accountMenu.classList.remove(
                "open"
            );
        }
    }
);


/* =========================================================
   Mobile Sidebar
   ========================================================= */

mobileMenuButton.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "mobile-open"
        );
    }
);


/* =========================================================
   Sidebar Navigation
   ========================================================= */

document
    .querySelectorAll(".navigation-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            event => {

                event.preventDefault();

                document
                    .querySelectorAll(
                        ".navigation-item"
                    )
                    .forEach(nav => {

                        nav.classList.remove(
                            "active"
                        );
                    });


                item.classList.add(
                    "active"
                );


                /*
                   بعداً اینجا Routing واقعی
                   صفحات پروژه قرار می‌گیرد.
                */


                sidebar.classList.remove(
                    "mobile-open"
                );
            }
        );

    });


/* =========================================================
   Chart Data
   ========================================================= */

/*
   فعلاً Mock Data است.

   بعداً Backend همین ساختار را برمی‌گرداند:

   {
       revenue: [],
       expenses: [],
       labels: []
   }

   بنابراین Chart UI لازم نیست تغییر کند.
*/

const chartData = {

    "7d": {

        labels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],

        revenue: [
            850000,
            920000,
            780000,
            1200000,
            1100000,
            1450000,
            1320000
        ],

        expenses: [
            420000,
            390000,
            450000,
            510000,
            470000,
            620000,
            550000
        ]
    },


    "30d": {

        labels: [
            "1",
            "5",
            "10",
            "15",
            "20",
            "25",
            "30"
        ],

        revenue: [
            3200000,
            4100000,
            3500000,
            4700000,
            3900000,
            5200000,
            6080000
        ],

        expenses: [
            1400000,
            1700000,
            1600000,
            1800000,
            1500000,
            1900000,
            1340000
        ]
    },


    "3m": {

        labels: [
            "Month 1",
            "Month 2",
            "Month 3"
        ],

        revenue: [
            18400000,
            21800000,
            25480000
        ],

        expenses: [
            8200000,
            9100000,
            9240000
        ]
    },


    "1y": {

        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],

        revenue: [
            18200000,
            19400000,
            21100000,
            20500000,
            22800000,
            23600000,
            24100000,
            24900000,
            25480000,
            0,
            0,
            0
        ],

        expenses: [
            8100000,
            8400000,
            8900000,
            9200000,
            9700000,
            10100000,
            9600000,
            9300000,
            9240000,
            0,
            0,
            0
        ]
    }

};


/* =========================================================
   Calculate Profit
   ========================================================= */

function calculateProfit(
    revenue,
    expenses
) {

    return revenue.map(
        (value, index) =>
            value - (expenses[index] || 0)
    );
}


/* =========================================================
   Chart Helpers
   ========================================================= */

function formatToman(value) {

    return new Intl.NumberFormat(
        "en-US"
    ).format(value) + " T";
}


function getChartTextColor() {

    return document.body.classList.contains(
        "dark-mode"
    )
        ? "#aaa2b4"
        : "#77717f";
}


function getChartGridColor() {

    return document.body.classList.contains(
        "dark-mode"
    )
        ? "rgba(255,255,255,0.055)"
        : "rgba(30,20,40,0.06)";
}


/* =========================================================
   Revenue / Expense Chart
   ========================================================= */

const revenueExpenseCanvas =
    document.getElementById(
        "revenueExpenseChart"
    );


const revenueExpenseContext =
    revenueExpenseCanvas.getContext(
        "2d"
    );


let revenueExpenseChart;


function createRevenueExpenseChart(
    period = "30d"
) {

    const data =
        chartData[period];


    if (revenueExpenseChart) {

        revenueExpenseChart.destroy();
    }


    revenueExpenseChart =
        new Chart(
            revenueExpenseContext,
            {

                type: "line",

                data: {

                    labels: data.labels,

                    datasets: [

                        {

                            label:
                                currentLanguage === "fa"
                                    ? "درآمد"
                                    : "Revenue",

                            data: data.revenue,

                            borderColor:
                                "#7c3aed",

                            backgroundColor:
                                "rgba(124,58,237,0.07)",

                            borderWidth: 2,

                            pointRadius: 3,

                            pointHoverRadius: 5,

                            tension: 0.4,

                            fill: true
                        },


                        {

                            label:
                                currentLanguage === "fa"
                                    ? "هزینه"
                                    : "Expenses",

                            data: data.expenses,

                            borderColor:
                                "#ef4444",

                            backgroundColor:
                                "rgba(239,68,68,0.035)",

                            borderWidth: 2,

                            pointRadius: 3,

                            pointHoverRadius: 5,

                            tension: 0.4,

                            fill: true
                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    interaction: {

                        mode: "index",

                        intersect: false
                    },


                    plugins: {

                        legend: {

                            position: "top",

                            align: "end",

                            labels: {

                                color:
                                    getChartTextColor(),

                                font: {

                                    size: 9,

                                    family:
                                        "Inter"
                                },

                                usePointStyle: true,

                                boxWidth: 7,

                                padding: 15
                            }
                        },


                        tooltip: {

                            callbacks: {

                                label:
                                    function (context) {

                                        return (
                                            " " +
                                            context.dataset.label +
                                            ": " +
                                            formatToman(
                                                context.raw
                                            )
                                        );
                                    }

                            }
                        }

                    },


                    scales: {

                        x: {

                            grid: {

                                display: false
                            },

                            ticks: {

                                color:
                                    getChartTextColor(),

                                font: {

                                    size: 8
                                }
                            }

                        },


                        y: {

                            beginAtZero: true,

                            grid: {

                                color:
                                    getChartGridColor()
                            },

                            ticks: {

                                color:
                                    getChartTextColor(),

                                font: {

                                    size: 8
                                },

                                callback:
                                    function (value) {

                                        if (
                                            value >= 1000000
                                        ) {

                                            return (
                                                value /
                                                1000000
                                            ) + "M";
                                        }

                                        if (
                                            value >= 1000
                                        ) {

                                            return (
                                                value /
                                                1000
                                            ) + "K";
                                        }

                                        return value;
                                    }
                            }

                        }

                    }

                }

            }
        );
}


/* =========================================================
   Profit Chart
   ========================================================= */

const profitCanvas =
    document.getElementById(
        "profitChart"
    );


const profitContext =
    profitCanvas.getContext(
        "2d"
    );


let profitChart;


function createProfitChart(
    period = "30d"
) {

    const data =
        chartData[period];


    const profits =
        calculateProfit(
            data.revenue,
            data.expenses
        );


    if (profitChart) {

        profitChart.destroy();
    }


    const gradient =
        profitContext.createLinearGradient(
            0,
            0,
            0,
            260
        );


    gradient.addColorStop(
        0,
        "rgba(124,58,237,0.20)"
    );


    gradient.addColorStop(
        1,
        "rgba(124,58,237,0)"
    );


    profitChart =
        new Chart(
            profitContext,
            {

                type: "line",

                data: {

                    labels: data.labels,

                    datasets: [

                        {

                            label:
                                currentLanguage === "fa"
                                    ? "سود"
                                    : "Profit",

                            data: profits,

                            borderColor:
                                "#8b5cf6",

                            backgroundColor:
                                gradient,

                            borderWidth: 2.5,

                            pointRadius: 3,

                            pointHoverRadius: 5,

                            tension: 0.42,

                            fill: true
                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,


                    plugins: {

                        legend: {

                            display: false
                        },


                        tooltip: {

                            callbacks: {

                                label:
                                    function (context) {

                                        return (
                                            " " +
                                            (
                                                currentLanguage === "fa"
                                                    ? "سود"
                                                    : "Profit"
                                            ) +
                                            ": " +
                                            formatToman(
                                                context.raw
                                            )
                                        );
                                    }

                            }
                        }

                    },


                    scales: {

                        x: {

                            grid: {

                                display: false
                            },

                            ticks: {

                                color:
                                    getChartTextColor(),

                                font: {

                                    size: 8
                                }
                            }

                        },


                        y: {

                            beginAtZero: true,

                            grid: {

                                color:
                                    getChartGridColor()
                            },

                            ticks: {

                                color:
                                    getChartTextColor(),

                                font: {

                                    size: 8
                                },

                                callback:
                                    function (value) {

                                        if (
                                            value >= 1000000
                                        ) {

                                            return (
                                                value /
                                                1000000
                                            ) + "M";
                                        }

                                        if (
                                            value >= 1000
                                        ) {

                                            return (
                                                value /
                                                1000
                                            ) + "K";
                                        }

                                        return value;
                                    }

                            }

                        }

                    }

                }

            }
        );
}


/* =========================================================
   Chart Period
   ========================================================= */

document
    .querySelectorAll(
        ".period-selector button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".period-selector button"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );
                    });


                button.classList.add(
                    "active"
                );


                const period =
                    button.dataset.period;


                createRevenueExpenseChart(
                    period
                );

                createProfitChart(
                    period
                );

            }
        );

    });


/* =========================================================
   Update Charts Theme
   ========================================================= */

function updateChartsTheme() {

    const activePeriodButton =
        document.querySelector(
            ".period-selector button.active"
        );


    const period =
        activePeriodButton
            ? activePeriodButton.dataset.period
            : "30d";


    createRevenueExpenseChart(
        period
    );

    createProfitChart(
        period
    );
}


/* =========================================================
   Update Charts Language
   ========================================================= */

function updateChartsLanguage() {

    const activePeriodButton =
        document.querySelector(
            ".period-selector button.active"
        );


    const period =
        activePeriodButton
            ? activePeriodButton.dataset.period
            : "30d";


    createRevenueExpenseChart(
        period
    );

    createProfitChart(
        period
    );
}


/* =========================================================
   Override Language Function
   ========================================================= */

const originalApplyLanguage =
    applyLanguage;


applyLanguage = function (language) {

    originalApplyLanguage(language);

    updateChartsLanguage();
};


/* =========================================================
   Current Month
   ========================================================= */

function setCurrentMonth() {

    const monthElement =
        document.getElementById(
            "currentMonthLabel"
        );


    const date =
        new Date();


    const monthNames = {

        en: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],

        fa: [
            "ژانویه",
            "فوریه",
            "مارس",
            "آوریل",
            "مه",
            "ژوئن",
            "ژوئیه",
            "اوت",
            "سپتامبر",
            "اکتبر",
            "نوامبر",
            "دسامبر"
        ]

    };


    monthElement.textContent =
        monthNames[currentLanguage][
        date.getMonth()
        ] +
        " " +
        date.getFullYear();
}


/* =========================================================
   Initial Setup
   ========================================================= */

applyLanguage(
    currentLanguage
);

setCurrentMonth();

createRevenueExpenseChart(
    "30d"
);

createProfitChart(
    "30d"
);  