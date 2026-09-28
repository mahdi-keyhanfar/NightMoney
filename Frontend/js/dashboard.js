(function () {

    const data = NightMoneyData;

    const totalRevenue = 485000000;
    const totalExpenses = 312500000;
    const netProfit = totalRevenue - totalExpenses;

    const inventoryValue =
        data.products.reduce(
            (sum, product) =>
                sum + product.stock * product.purchasePrice,
            0
        );

    const lowStockProducts =
        data.products.filter(
            product => product.stock <= product.minStock
        );

    NightMoney.renderAppShell(`

        ${NightMoney.getPageTitle(
            "Dashboard",
            "Business overview and financial performance."
        )}

        <section class="stats-grid">

            ${NightMoney.statCard({
                title: NightMoney.t("totalRevenue"),
                value: NightMoney.formatMoney(totalRevenue),
                change: "+12.5%",
                icon: "↗",
                type: "green"
            })}

            ${NightMoney.statCard({
                title: NightMoney.t("totalExpenses"),
                value: NightMoney.formatMoney(totalExpenses),
                change: "+4.8%",
                icon: "↘",
                type: "red"
            })}

            ${NightMoney.statCard({
                title: NightMoney.t("netProfit"),
                value: NightMoney.formatMoney(netProfit),
                change: "+15.2%",
                icon: "◈",
                type: "purple"
            })}

            ${NightMoney.statCard({
                title: NightMoney.t("inventoryValue"),
                value: NightMoney.formatMoney(inventoryValue),
                icon: "▤",
                type: "orange"
            })}

        </section>

        <section class="dashboard-grid">

            <article class="card">

                <div class="card-header">

                    <div>
                        <h3>Revenue vs Expenses</h3>
                        <p>Financial performance over time</p>
                    </div>

                    <div class="range-buttons">

                        <button>7D</button>
                        <button class="active">30D</button>
                        <button>3M</button>
                        <button>1Y</button>

                    </div>

                </div>

                <div class="card-body">

                    <div class="chart-container">
                        <canvas id="revenueChart"></canvas>
                    </div>

                </div>

            </article>

            <article class="card">

                <div class="card-header">

                    <div>
                        <h3>Profit Overview</h3>
                        <p>Net profit trend</p>
                    </div>

                </div>

                <div class="card-body">

                    <div class="chart-container">
                        <canvas id="profitChart"></canvas>
                    </div>

                </div>

            </article>

        </section>

        <section class="dashboard-grid">

            <article class="card">

                <div class="card-header">

                    <div>
                        <h3>Inventory Status</h3>
                        <p>Current stock condition</p>
                    </div>

                    <a href="inventory.html" class="table-action">
                        View Inventory
                    </a>

                </div>

                <div class="card-body">

                    <div class="inventory-list">

                        ${data.products.slice(0, 5).map(product => `

                            <div class="inventory-row">

                                <div class="product-info">

                                    <div class="product-avatar">
                                        ▤
                                    </div>

                                    <div>
                                        <strong>
                                            ${NightMoney.escapeHTML(product.name)}
                                        </strong>

                                        <small>
                                            ${NightMoney.escapeHTML(product.sku)}
                                        </small>
                                    </div>

                                </div>

                                <div class="stock-value">

                                    <strong>
                                        ${NightMoney.formatNumber(product.stock)}
                                    </strong>

                                    <small>
                                        ${product.stock <= product.minStock
                                            ? NightMoney.t("lowStock")
                                            : NightMoney.t("inStock")}
                                    </small>

                                </div>

                            </div>

                        `).join("")}

                    </div>

                </div>

            </article>

            <article class="card">

                <div class="card-header">

                    <div>
                        <h3>Low Stock Products</h3>
                        <p>Products requiring attention</p>
                    </div>

                </div>

                <div class="card-body">

                    ${lowStockProducts.length
                        ? `
                        <div class="inventory-list">

                            ${lowStockProducts.map(product => `

                                <div class="inventory-row">

                                    <div class="product-info">

                                        <div class="product-avatar">
                                            !
                                        </div>

                                        <div>
                                            <strong>
                                                ${NightMoney.escapeHTML(product.name)}
                                            </strong>

                                            <small>
                                                Minimum:
                                                ${product.minStock}
                                            </small>
                                        </div>

                                    </div>

                                    ${NightMoney.statusBadge("Low Stock")}

                                </div>

                            `).join("")}

                        </div>
                        `
                        : `
                            <div class="empty-state">
                                All products have healthy stock levels.
                            </div>
                        `
                    }

                </div>

            </article>

        </section>

        <section class="card" style="margin-bottom:20px;">

            <div class="card-header">

                <div>
                    <h3>Recent Transactions</h3>
                    <p>Latest financial activity</p>
                </div>

                <a href="transactions.html" class="table-action">
                    View All
                </a>

            </div>

            <div class="table-wrapper">

                <table>

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${data.transactions.map(transaction => `

                            <tr>

                                <td>${transaction.date}</td>

                                <td>
                                    <strong>
                                        ${NightMoney.escapeHTML(transaction.description)}
                                    </strong>
                                </td>

                                <td>
                                    ${transaction.type === "income"
                                        ? NightMoney.statusBadge("Income")
                                        : NightMoney.statusBadge("Expense")}
                                </td>

                                <td>
                                    ${NightMoney.escapeHTML(transaction.category)}
                                </td>

                                <td class="${
                                    transaction.type === "income"
                                        ? "amount-income"
                                        : "amount-expense"
                                }">

                                    ${
                                        transaction.type === "income"
                                            ? "+"
                                            : "-"
                                    }

                                    ${NightMoney.formatMoney(transaction.amount)}

                                </td>

                                <td>
                                    ${NightMoney.statusBadge(transaction.status)}
                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>

        </section>

        <section>

            <div class="card-header" style="padding-left:0;padding-right:0;border:0;">

                <div>
                    <h3>${NightMoney.t("quickActions")}</h3>
                </div>

            </div>

            <div class="quick-actions">

                <button
                    class="quick-action"
                    id="quickTransaction"
                >
                    <span class="quick-action-icon">⇄</span>
                    <span>${NightMoney.t("addTransaction")}</span>
                </button>

                <a
                    href="inventory.html"
                    class="quick-action"
                >
                    <span class="quick-action-icon">▤</span>
                    <span>${NightMoney.t("addProduct")}</span>
                </a>

                <a
                    href="sales.html"
                    class="quick-action"
                >
                    <span class="quick-action-icon">↗</span>
                    <span>${NightMoney.t("recordSale")}</span>
                </a>

                <a
                    href="purchases.html"
                    class="quick-action"
                >
                    <span class="quick-action-icon">↙</span>
                    <span>${NightMoney.t("recordPurchase")}</span>
                </a>

            </div>

        </section>

    `);

    const chartOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {
            legend: {
                labels: {
                    color: "#A9A3B8",
                    font: {
                        size: 10
                    }
                }
            }
        },

        scales: {
            x: {
                grid: {
                    color: "rgba(255,255,255,0.035)"
                },
                ticks: {
                    color: "#746D82",
                    font: {
                        size: 9
                    }
                }
            },

            y: {
                grid: {
                    color: "rgba(255,255,255,0.035)"
                },
                ticks: {
                    color: "#746D82",
                    font: {
                        size: 9
                    }
                }
            }
        }
    };

    new Chart(
        document.getElementById("revenueChart"),
        {
            type: "line",

            data: {
                labels: [
                    "Sep 1",
                    "Sep 5",
                    "Sep 10",
                    "Sep 15",
                    "Sep 20",
                    "Sep 25",
                    "Sep 28"
                ],

                datasets: [
                    {
                        label: "Revenue",

                        data: [
                            32000000,
                            51000000,
                            43000000,
                            74000000,
                            62000000,
                            91000000,
                            125000000
                        ],

                        borderColor: "#8B5CF6",

                        backgroundColor:
                            "rgba(139,92,246,0.08)",

                        fill: true,

                        tension: 0.4,

                        pointRadius: 3
                    },

                    {
                        label: "Expenses",

                        data: [
                            22000000,
                            33000000,
                            35000000,
                            48000000,
                            47000000,
                            59000000,
                            68000000
                        ],

                        borderColor: "#EF4444",

                        backgroundColor:
                            "rgba(239,68,68,0.05)",

                        fill: true,

                        tension: 0.4,

                        pointRadius: 3
                    }
                ]
            },

            options: chartOptions
        }
    );

    new Chart(
        document.getElementById("profitChart"),
        {
            type: "line",

            data: {
                labels: [
                    "Sep 1",
                    "Sep 5",
                    "Sep 10",
                    "Sep 15",
                    "Sep 20",
                    "Sep 25",
                    "Sep 28"
                ],

                datasets: [
                    {
                        label: "Net Profit",

                        data: [
                            10000000,
                            18000000,
                            15000000,
                            26000000,
                            19000000,
                            32000000,
                            57000000
                        ],

                        borderColor: "#22C55E",

                        backgroundColor:
                            "rgba(34,197,94,0.08)",

                        fill: true,

                        tension: 0.4,

                        pointRadius: 3
                    }
                ]
            },

            options: chartOptions
        }
    );

    document
        .getElementById("quickTransaction")
        ?.addEventListener("click", () => {

            NightMoney.openModal(
                "Add Transaction",
                `
                <form
                    id="dashboardTransactionForm"
                    class="form-grid"
                >

                    <div class="form-group">
                        <label>Description</label>
                        <input required placeholder="Transaction description">
                    </div>

                    <div class="form-group">
                        <label>Type</label>
                        <select>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Amount</label>
                        <input type="number" required placeholder="0">
                    </div>

                    <div class="form-group">
                        <label>Payment Method</label>
                        <select>
                            <option>Card</option>
                            <option>Cash</option>
                            <option>Bank Transfer</option>
                        </select>
                    </div>

                    <div class="form-actions full">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-close-modal
                        >
                            Cancel
                        </button>

                        <button class="btn btn-primary">
                            Save Transaction
                        </button>
                    </div>

                </form>
                `
            );

            document
                .getElementById("dashboardTransactionForm")
                ?.addEventListener("submit", event => {

                    event.preventDefault();

                    NightMoney.closeModal();

                    NightMoney.showToast(
                        "Transaction saved successfully."
                    );
                });
        });

})();