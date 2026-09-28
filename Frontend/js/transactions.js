(function () {

    let transactions = [...NightMoneyData.transactions];

    function render() {

        const totalIncome =
            transactions
                .filter(t => t.type === "income")
                .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses =
            transactions
                .filter(t => t.type === "expense")
                .reduce((sum, t) => sum + t.amount, 0);

        const balance =
            totalIncome - totalExpenses;

        NightMoney.renderAppShell(`

            ${NightMoney.getPageTitle(
                "Transactions",
                "Manage income, expenses and financial records."
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
                    title: "Balance",
                    value: NightMoney.formatMoney(balance),
                    icon: "◈",
                    type: "purple"
                })}

                ${NightMoney.statCard({
                    title: "Transactions",
                    value: NightMoney.formatNumber(transactions.length),
                    icon: "⇄",
                    type: "orange"
                })}

            </section>

            <section class="table-card">

                <div class="table-toolbar">

                    <div>
                        <strong>Transaction Records</strong>
                    </div>

                    <div class="toolbar-actions">

                        <input
                            class="search-input"
                            id="transactionSearch"
                            placeholder="Search transactions..."
                        >

                        <button
                            class="btn btn-primary"
                            id="addTransaction"
                        >
                            + Add Transaction
                        </button>

                    </div>

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
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody id="transactionTableBody"></tbody>

                    </table>

                </div>

            </section>

        `);

        renderRows(transactions);

        document
            .getElementById("transactionSearch")
            .addEventListener("input", event => {

                const query =
                    event.target.value.toLowerCase();

                renderRows(
                    transactions.filter(transaction =>
                        `${transaction.description}
                         ${transaction.category}
                         ${transaction.type}
                         ${transaction.method}`
                            .toLowerCase()
                            .includes(query)
                    )
                );
            });

        document
            .getElementById("addTransaction")
            .addEventListener("click", openAddModal);
    }

    function renderRows(items) {

        const tbody =
            document.getElementById(
                "transactionTableBody"
            );

        tbody.innerHTML = items.map(transaction => `

            <tr>

                <td>${transaction.date}</td>

                <td>
                    <strong>
                        ${NightMoney.escapeHTML(transaction.description)}
                    </strong>
                </td>

                <td>
                    ${NightMoney.statusBadge(
                        transaction.type === "income"
                            ? "Income"
                            : "Expense"
                    )}
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
                    ${NightMoney.escapeHTML(transaction.method)}
                </td>

                <td>
                    ${NightMoney.statusBadge(transaction.status)}
                </td>

                <td>
                    <button
                        class="table-action"
                        data-delete="${transaction.id}"
                    >
                        Delete
                    </button>
                </td>

            </tr>

        `).join("");

        tbody
            .querySelectorAll("[data-delete]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const id =
                        Number(button.dataset.delete);

                    transactions =
                        transactions.filter(
                            transaction =>
                                transaction.id !== id
                        );

                    render();

                    NightMoney.showToast(
                        "Transaction deleted."
                    );
                });

            });
    }

    function openAddModal() {

        NightMoney.openModal(
            "Add Transaction",
            `

            <form id="transactionForm">

                <div class="form-grid">

                    <div class="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            id="transactionDate"
                            value="2026-09-28"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label>Type</label>

                        <select id="transactionType">

                            <option value="income">
                                Income
                            </option>

                            <option value="expense">
                                Expense
                            </option>

                        </select>
                    </div>

                    <div class="form-group">
                        <label>Description</label>

                        <input
                            id="transactionDescription"
                            required
                            placeholder="Product sale"
                        >
                    </div>

                    <div class="form-group">
                        <label>Category</label>

                        <select id="transactionCategory">

                            <option>Product Sales</option>
                            <option>Services</option>
                            <option>Inventory</option>
                            <option>Salary</option>
                            <option>Rent</option>
                            <option>Advertising</option>
                            <option>Maintenance</option>
                            <option>Transportation</option>
                            <option>Other</option>

                        </select>
                    </div>

                    <div class="form-group">
                        <label>Amount</label>

                        <input
                            id="transactionAmount"
                            type="number"
                            min="0"
                            required
                            placeholder="0"
                        >
                    </div>

                    <div class="form-group">
                        <label>Payment Method</label>

                        <select id="transactionMethod">

                            <option>Card</option>
                            <option>Cash</option>
                            <option>Bank Transfer</option>

                        </select>
                    </div>

                </div>

                <div class="form-actions">

                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-close-modal
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="btn btn-primary"
                    >
                        Save Transaction
                    </button>

                </div>

            </form>

            `
        );

        document
            .getElementById("transactionForm")
            .addEventListener("submit", event => {

                event.preventDefault();

                transactions.unshift({

                    id: Date.now(),

                    date:
                        document.getElementById(
                            "transactionDate"
                        ).value,

                    description:
                        document.getElementById(
                            "transactionDescription"
                        ).value,

                    type:
                        document.getElementById(
                            "transactionType"
                        ).value,

                    category:
                        document.getElementById(
                            "transactionCategory"
                        ).value,

                    amount:
                        Number(
                            document.getElementById(
                                "transactionAmount"
                            ).value
                        ),

                    method:
                        document.getElementById(
                            "transactionMethod"
                        ).value,

                    status: "Completed"
                });

                NightMoney.closeModal();

                NightMoney.showToast(
                    "Transaction added successfully."
                );

                render();
            });
    }

    render();

})();