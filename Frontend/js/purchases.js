(function () {

    let purchases = [...NightMoneyData.purchases];

    function getTotal(purchase) {

        return (
            purchase.quantity *
            purchase.unitCost
        );
    }

    function render() {

        const total =
            purchases.reduce(
                (sum, purchase) =>
                    sum + getTotal(purchase),
                0
            );

        const quantity =
            purchases.reduce(
                (sum, purchase) =>
                    sum + purchase.quantity,
                0
            );

        NightMoney.renderAppShell(`

            ${NightMoney.getPageTitle(
                "Purchases",
                "Manage suppliers, purchasing and stock acquisition."
            )}

            <section class="stats-grid">

                ${NightMoney.statCard({
                    title: "Total Purchases",
                    value: NightMoney.formatMoney(total),
                    icon: "↙",
                    type: "red"
                })}

                ${NightMoney.statCard({
                    title: "This Month",
                    value: NightMoney.formatMoney(total),
                    icon: "◈",
                    type: "purple"
                })}

                ${NightMoney.statCard({
                    title: "Purchased Units",
                    value: NightMoney.formatNumber(quantity),
                    icon: "▤",
                    type: "green"
                })}

                ${NightMoney.statCard({
                    title: "Purchase Records",
                    value: NightMoney.formatNumber(
                        purchases.length
                    ),
                    icon: "▥",
                    type: "orange"
                })}

            </section>

            <section class="table-card">

                <div class="table-toolbar">

                    <div>
                        <strong>Purchase Records</strong>
                    </div>

                    <div class="toolbar-actions">

                        <input
                            class="search-input"
                            id="purchaseSearch"
                            placeholder="Search purchases..."
                        >

                        <button
                            class="btn btn-primary"
                            id="recordPurchase"
                        >
                            + Record Purchase
                        </button>

                    </div>

                </div>

                <div class="table-wrapper">

                    <table>

                        <thead>

                            <tr>
                                <th>Date</th>
                                <th>Supplier</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Unit Cost</th>
                                <th>Total Cost</th>
                                <th>Status</th>
                            </tr>

                        </thead>

                        <tbody id="purchaseBody"></tbody>

                    </table>

                </div>

            </section>

        `);

        renderRows(purchases);

        document
            .getElementById("purchaseSearch")
            .addEventListener(
                "input",
                event => {

                    const query =
                        event.target.value
                            .toLowerCase();

                    renderRows(
                        purchases.filter(
                            purchase =>
                                `${purchase.supplier}
                                 ${purchase.product}
                                 ${purchase.date}`
                                    .toLowerCase()
                                    .includes(query)
                        )
                    );
                }
            );

        document
            .getElementById("recordPurchase")
            .addEventListener(
                "click",
                openPurchaseModal
            );
    }

    function renderRows(items) {

        document
            .getElementById("purchaseBody")
            .innerHTML = items.map(
                purchase => `

                <tr>

                    <td>${purchase.date}</td>

                    <td>
                        <strong>
                            ${NightMoney.escapeHTML(
                                purchase.supplier
                            )}
                        </strong>
                    </td>

                    <td>
                        ${NightMoney.escapeHTML(
                            purchase.product
                        )}
                    </td>

                    <td>
                        ${NightMoney.formatNumber(
                            purchase.quantity
                        )}
                    </td>

                    <td>
                        ${NightMoney.formatMoney(
                            purchase.unitCost
                        )}
                    </td>

                    <td>
                        <strong>
                            ${NightMoney.formatMoney(
                                getTotal(purchase)
                            )}
                        </strong>
                    </td>

                    <td>
                        ${NightMoney.statusBadge(
                            purchase.status
                        )}
                    </td>

                </tr>

            `
            ).join("");
    }

    function openPurchaseModal() {

        const products =
            NightMoneyData.products;

        NightMoney.openModal(
            "Record Purchase",
            `

            <form id="purchaseForm">

                <div class="form-grid">

                    <div class="form-group">

                        <label>Date</label>

                        <input
                            id="purchaseDate"
                            type="date"
                            value="2026-09-28"
                            required
                        >

                    </div>

                    <div class="form-group">

                        <label>Supplier</label>

                        <input
                            id="purchaseSupplier"
                            required
                            placeholder="Supplier name"
                        >

                    </div>

                    <div class="form-group">

                        <label>Product</label>

                        <select id="purchaseProduct">

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
                            id="purchaseQuantity"
                            type="number"
                            min="1"
                            value="1"
                            required
                        >

                    </div>

                    <div class="form-group">

                        <label>Unit Cost</label>

                        <input
                            id="purchaseCost"
                            type="number"
                            min="0"
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
                        type="submit"
                        class="btn btn-primary"
                    >
                        Record Purchase
                    </button>

                </div>

            </form>

            `
        );

        document
            .getElementById("purchaseForm")
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
                                            "purchaseProduct"
                                        )
                                        .value
                                )
                        );

                    const quantity =
                        Number(
                            document
                                .getElementById(
                                    "purchaseQuantity"
                                )
                                .value
                        );

                    const cost =
                        Number(
                            document
                                .getElementById(
                                    "purchaseCost"
                                )
                                .value
                        );

                    product.stock += quantity;

                    purchases.unshift({

                        id: Date.now(),

                        date:
                            document
                                .getElementById(
                                    "purchaseDate"
                                )
                                .value,

                        supplier:
                            document
                                .getElementById(
                                    "purchaseSupplier"
                                )
                                .value,

                        product: product.name,

                        quantity,

                        unitCost: cost,

                        status: "Received"
                    });

                    NightMoney.closeModal();

                    NightMoney.showToast(
                        "Purchase recorded successfully."
                    );

                    render();
                }
            );
    }

    render();

})();