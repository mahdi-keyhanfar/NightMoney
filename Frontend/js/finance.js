(function () {

    const transactions =
        NightMoneyData.transactions;

    const income =
        transactions
            .filter(t => t.type === "income");

    const expenses =
        transactions
            .filter(t => t.type === "expense");

    const totalIncome =
        income.reduce(
            (sum, item) =>
                sum + item.amount,
            0
        );

    const totalExpenses =
        expenses.reduce(
            (sum, item) =>
                sum + item.amount,
            0
        );

    NightMoney.renderAppShell(`

        ${NightMoney.getPageTitle(
            "Finance",
            "Monitor income, expenses and financial categories."
        )}

        <section class="stats-grid">

            ${NightMoney.statCard({
                title: "Total Income",
                value: NightMoney.formatMoney(totalIncome),
                icon: "↗",
                type: "green"
            })}

            ${NightMoney.statCard({
                title: "Total Expenses",
                value: NightMoney.formatMoney(totalExpenses),
                icon: "↘",
                type: "red"
            })}

            ${NightMoney.statCard({
                title: "Net Balance",
                value: NightMoney.formatMoney(
                    totalIncome - totalExpenses
                ),
                icon: "◈",
                type: "purple"
            })}

            ${NightMoney.statCard({
                title: "Savings Ratio",
                value:
                    Math.round(
                        (
                            (totalIncome - totalExpenses) /
                            totalIncome
                        ) * 100
                    ) + "%",
                icon: "%",
                type: "green"
            })}

        </section>

        <section class="dashboard-grid equal">

            <article class="card">

                <div class="card-header">

                    <div>
                        <h3>Income by Category</h3>
                        <p>Where business income comes from</p>
                    </div>

                </div>

                <div class="card-body">

                    <div class="chart-container small">
                        <canvas id="incomeChart"></canvas>
                    </div>

                </div>

            </article>

            <article class="card">

                <div class="card-header">

                    <div>
                        <h3>Expenses by Category</h3>
                        <p>Business expenditure distribution</p>
                    </div>

                </div>

                <div class="card-body">

                    <div class="chart-container small">
                        <canvas id="expenseChart"></canvas>
                    </div>

                </div>

            </article>

        </section>

        <section class="table-card">

            <div class="table-toolbar">

                <div>
                    <strong>Financial Activity</strong>
                </div>

                <a
                    href="transactions.html"
                    class="table-action"
                >
                    Manage Transactions
                </a>

            </div>

            <div class="table-wrapper">

                <table>

                    <thead>

                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${transactions.map(
                            transaction => `

                            <tr>

                                <td>
                                    ${transaction.date}
                                </td>

                                <td>
                                    <strong>
                                        ${NightMoney.escapeHTML(
                                            transaction.description
                                        )}
                                    </strong>
                                </td>

                                <td>
                                    ${NightMoney.escapeHTML(
                                        transaction.category
                                    )}
                                </td>

                                <td>
                                    ${NightMoney.statusBadge(
                                        transaction.type === "income"
                                            ? "Income"
                                            : "Expense"
                                    )}
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

                                    ${NightMoney.formatMoney(
                                        transaction.amount
                                    )}

                                </td>

                            </tr>

                        `
                        ).join("")}

                    </tbody>

                </table>

            </div>

        </section>

    `);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#A9A3B8",
                    font: {
                        size: 10
                    }
                }
            }
        }
    };

    new Chart(
        document.getElementById("incomeChart"),
        {
            type: "doughnut",

            data: {
                labels: [
                    "Product Sales",
                    "Services"
                ],

                datasets: [
                    {
                        data: [
                            147000000,
                            338000000
                        ],

                        backgroundColor: [
                            "#8B5CF6",
                            "#A78BFA"
                        ],

                        borderWidth: 0
                    }
                ]
            },

            options: chartOptions
        }
    );

    new Chart(
        document.getElementById("expenseChart"),
        {
            type: "doughnut",

            data: {
                labels: [
                    "Inventory",
                    "Rent",
                    "Advertising",
                    "Other"
                ],

                datasets: [
                    {
                        data: [
                            168000000,
                            62000000,
                            37000000,
                            45500000
                        ],

                        backgroundColor: [
                            "#8B5CF6",
                            "#EF4444",
                            "#F59E0B",
                            "#6D28D9"
                        ],

                        borderWidth: 0
                    }
                ]
            },

            options: chartOptions
        }
    );

})();