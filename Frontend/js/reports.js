(function () {

    const products =
        NightMoneyData.products;

    const sales =
        NightMoneyData.sales;

    NightMoney.renderAppShell(`

        ${NightMoney.getPageTitle(
            "Reports",
            "Visual financial and business analysis center."
        )}

        <div class="report-controls">

            <div class="period-selector">

                <button>Today</button>
                <button>7 Days</button>
                <button class="active">30 Days</button>
                <button>3 Months</button>
                <button>1 Year</button>
                <button>Custom</button>

            </div>

            <button
                class="btn btn-secondary"
                id="exportReport"
            >
                Export Report
            </button>

        </div>

        <section class="report-grid">

            <article class="card">

                <div class="card-header">

                    <div>
                        <h3>Revenue vs Expenses</h3>
                        <p>Monthly financial performance</p>
                    </div>

                </div>

                <div class="card-body">

                    <div class="chart-container">
                        <canvas id="reportRevenueChart"></canvas>
                    </div>

                </div>

            </article>

            <article class="card">

                <div class="card-header">

                    <div>
                        <h3>Net Profit Over Time</h3>
                        <p>Profitability trend</p>
                    </div>

                </div>

                <div class="card-body">

                    <div class="chart-container">
                        <canvas id="reportProfitChart"></canvas>
                    </div>

                </div>

            </article>

        </section>

        <section class="report-grid">

            <article class="card">

                <div class="card-header">

                    <div>
                        <h3>Expenses by Category</h3>
                        <p>Current period distribution</p>
                    </div>

                </div>

                <div class="card-body">

                    <div class="chart-container small">
                        <canvas id="reportExpenseChart"></canvas>
                    </div>

                </div>

            </article>

            <article class="card">

                <div class="card-header">

                    <div>
                        <h3>Stock In vs Stock Out</h3>
                        <p>Inventory movement</p>
                    </div>

                </div>

                <div class="card-body">

                    <div class="chart-container small">
                        <canvas id="stockMovementChart"></canvas>
                    </div>

                </div>

            </article>

        </section>

        <section class="table-card">

            <div class="table-toolbar">

                <div>
                    <strong>Top Selling Products</strong>
                </div>

            </div>

            <div class="table-wrapper">

                <table>

                    <thead>

                        <tr>
                            <th>Product</th>
                            <th>Units Sold</th>
                            <th>Revenue</th>
                            <th>Cost</th>
                            <th>Profit</th>
                            <th>Profit Margin</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${sales.map(sale => {

                            const revenue =
                                sale.salePrice *
                                sale.quantity;

                            const cost =
                                sale.cost *
                                sale.quantity;

                            const profit =
                                revenue - cost;

                            const margin =
                                Math.round(
                                    (
                                        profit /
                                        revenue
                                    ) * 100
                                );

                            return `

                                <tr>

                                    <td>
                                        <strong>
                                            ${NightMoney.escapeHTML(
                                                sale.product
                                            )}
                                        </strong>
                                    </td>

                                    <td>
                                        ${NightMoney.formatNumber(
                                            sale.quantity
                                        )}
                                    </td>

                                    <td>
                                        ${NightMoney.formatMoney(
                                            revenue
                                        )}
                                    </td>

                                    <td>
                                        ${NightMoney.formatMoney(
                                            cost
                                        )}
                                    </td>

                                    <td class="amount-income">
                                        +${NightMoney.formatMoney(
                                            profit
                                        )}
                                    </td>

                                    <td>
                                        ${margin}%
                                    </td>

                                </tr>

                            `;
                        }).join("")}

                    </tbody>

                </table>

            </div>

        </section>

    `);

    const commonOptions = {

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
        document.getElementById(
            "reportRevenueChart"
        ),
        {
            type: "bar",

            data: {
                labels: [
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep"
                ],

                datasets: [

                    {
                        label: "Revenue",

                        data: [
                            310,
                            350,
                            390,
                            420,
                            455,
                            485
                        ],

                        backgroundColor:
                            "rgba(139,92,246,0.75)",

                        borderRadius: 5
                    },

                    {
                        label: "Expenses",

                        data: [
                            220,
                            245,
                            260,
                            285,
                            298,
                            312
                        ],

                        backgroundColor:
                            "rgba(239,68,68,0.65)",

                        borderRadius: 5
                    }
                ]
            },

            options: commonOptions
        }
    );

    new Chart(
        document.getElementById(
            "reportProfitChart"
        ),
        {
            type: "line",

            data: {
                labels: [
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep"
                ],

                datasets: [
                    {
                        label: "Net Profit",

                        data: [
                            90,
                            105,
                            130,
                            135,
                            157,
                            172
                        ],

                        borderColor: "#22C55E",

                        backgroundColor:
                            "rgba(34,197,94,0.08)",

                        fill: true,

                        tension: 0.4
                    }
                ]
            },

            options: commonOptions
        }
    );

    new Chart(
        document.getElementById(
            "reportExpenseChart"
        ),
        {
            type: "doughnut",

            data: {
                labels: [
                    "Inventory",
                    "Salary",
                    "Rent",
                    "Advertising",
                    "Maintenance",
                    "Transportation"
                ],

                datasets: [
                    {
                        data: [
                            42,
                            20,
                            14,
                            9,
                            8,
                            7
                        ],

                        backgroundColor: [
                            "#8B5CF6",
                            "#6D28D9",
                            "#A78BFA",
                            "#F59E0B",
                            "#EF4444",
                            "#746D82"
                        ],

                        borderWidth: 0
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "bottom",

                        labels: {
                            color: "#A9A3B8",
                            font: {
                                size: 9
                            }
                        }
                    }
                }
            }
        }
    );

    new Chart(
        document.getElementById(
            "stockMovementChart"
        ),
        {
            type: "bar",

            data: {
                labels: [
                    "Week 1",
                    "Week 2",
                    "Week 3",
                    "Week 4"
                ],

                datasets: [

                    {
                        label: "Stock In",

                        data: [
                            120,
                            160,
                            90,
                            145
                        ],

                        backgroundColor:
                            "rgba(34,197,94,0.7)",

                        borderRadius: 5
                    },

                    {
                        label: "Stock Out",

                        data: [
                            75,
                            110,
                            84,
                            98
                        ],

                        backgroundColor:
                            "rgba(239,68,68,0.65)",

                        borderRadius: 5
                    }
                ]
            },

            options: commonOptions
        }
    );

    document
        .getElementById("exportReport")
        ?.addEventListener(
            "click",
            () => {

                NightMoney.showToast(
                    "Report export will be connected to the backend in the production version."
                );
            }
        );

})();