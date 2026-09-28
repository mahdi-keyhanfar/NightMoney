(function () {

    let sales = [...NightMoneyData.sales];

    function getRevenue(sale) {
        return sale.salePrice * sale.quantity;
    }

    function getCost(sale) {
        return sale.cost * sale.quantity;
    }

    function getProfit(sale) {
        return getRevenue(sale) - getCost(sale);
    }

    function render() {

        const totalRevenue =
            sales.reduce(
                (sum, sale) =>
                    sum + getRevenue(sale),
                0
            );

        const totalCost =
            sales.reduce(
                (sum, sale) =>
                    sum + getCost(sale),
                0
            );

        const totalProfit =
            totalRevenue - totalCost;

        const totalUnits =
            sales.reduce(
                (sum, sale) =>
                    sum + sale.quantity,
                0
            );

        NightMoney.renderAppShell(`

            ${NightMoney.getPageTitle(
                "Sales",
                "Manage product sales and profitability."
            )}

            <section class="stats-grid">

                ${NightMoney.statCard({
                    title: "Today's Sales",
                    value: NightMoney.formatMoney(
                        totalRevenue
                    ),
                    icon: "↗",
                    type: "green"
                })}

                ${NightMoney.statCard({
                    title: "Monthly Sales",
                    value: NightMoney.formatMoney(
                        totalRevenue
                    ),
                    icon: "▥",
                    type: "purple"
                })}

                ${NightMoney.statCard({
                    title: "Total Units Sold",
                    value: NightMoney.formatNumber(
                        totalUnits
                    ),
                    icon: "▤",
                    type: "orange"
                })}

                ${NightMoney.statCard({
                    title: "Total Profit",
                    value: NightMoney.formatMoney(
                        totalProfit
                    ),
                    icon: "◈",
                    type: "green"
                })}

            </section>

            <section class="table-card">

                <div class="table-toolbar">

                    <div>
                        <strong>Sales Records</strong>
                    </div>

                    <div class="toolbar-actions">

                        <input
                            class="search-input"
                            id="salesSearch"
                            placeholder="Search sales..."
                        >

                        <button
                            class="btn btn-primary"
                            id="recordSale"
                        >
                            + Record Sale
                        </button>

                    </div>

                </div>

                <div class="table-wrapper">

                    <table>

                        <thead>

                            <tr>
                                <th>Date</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Sale Price</th>
                                <th>Cost</th>
                                <th>Revenue</th>
                                <th>Profit</th>
                            </tr>

                        </thead>

                        <tbody id="salesBody"></tbody>

                    </table>

                </div>

            </section>

        `);

        renderRows(sales);

        document
            .getElementById("salesSearch")
            .addEventListener(
                "input",
                event => {

                    const query =
                        event.target.value
                            .toLowerCase();

                    renderRows(
                        sales.filter(
                            sale =>
                                `${sale.product}
                                 ${sale.date}`
                                    .toLowerCase()
                                    .includes(query)
                        )
                    );
                }
            );

        document
            .getElementById("recordSale")
            .addEventListener(
                "click",
                openSaleModal
            );
    }

    function renderRows(items) {

        document
            .getElementById("salesBody")
            .innerHTML = items.map(sale => `

                <tr>

                    <td>${sale.date}</td>

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
                            sale.salePrice
                        )}
                    </td>

                    <td>
                        ${NightMoney.formatMoney(
                            sale.cost
                        )}
                    </td>

                    <td>
                        <strong>
                            ${NightMoney.formatMoney(
                                getRevenue(sale)
                            )}
                        </strong>
                    </td>

                    <td class="amount-income">
                        +${NightMoney.formatMoney(
                            getProfit(sale)
                        )}
                    </td>

                </tr>

            `).join("");
    }

    function openSaleModal() {

        const products =
            NightMoneyData.products;

        NightMoney.openModal(
            "Record Sale",
            `

            <form id="saleForm">

                <div class="form-grid">

                    <div class="form-group">
                        <label>Date</label>

                        <input
                            id="saleDate"
                            type="date"
                            value="2026-09-28"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label>Product</label>

                        <select id="saleProduct">

                            ${products.map(
                                product => `
                                    <option
                                        value="${product.id}"
                                    >
                                        ${NightMoney.escapeHTML(
                                            product.name
                                        )}
                                    </option>
                                `
                            ).join("")}

                        </select>
                    </div>

                    <div class="form-group">
                        <label>Quantity</label>

                        <input
                            id="saleQuantity"
                            type="number"
                            min="1"
                            value="1"
                            required
                        >
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
                        class="btn btn-primary"
                        type="submit"
                    >
                        Record Sale
                    </button>

                </div>

            </form>

            `
        );

        document
            .getElementById("saleForm")
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    const product =
                        products.find(
                            product =>
                                product.id ===
                                Number(
                                    document
                                        .getElementById(
                                            "saleProduct"
                                        )
                                        .value
                                )
                        );

                    const quantity =
                        Number(
                            document
                                .getElementById(
                                    "saleQuantity"
                                )
                                .value
                        );

                    if (
                        !product ||
                        quantity > product.stock
                    ) {

                        NightMoney.showToast(
                            "Insufficient stock.",
                            "error"
                        );

                        return;
                    }

                    product.stock -= quantity;

                    sales.unshift({

                        id: Date.now(),

                        date:
                            document
                                .getElementById(
                                    "saleDate"
                                )
                                .value,

                        product: product.name,

                        quantity,

                        salePrice:
                            product.salePrice,

                        cost:
                            product.purchasePrice
                    });

                    NightMoney.closeModal();

                    NightMoney.showToast(
                        "Sale recorded successfully."
                    );

                    render();
                }
            );
    }

    render();

})();