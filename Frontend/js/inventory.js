(function () {

    let products = [...NightMoneyData.products];

    function render() {

        const totalItems =
            products.reduce(
                (sum, product) =>
                    sum + product.stock,
                0
            );

        const inventoryValue =
            products.reduce(
                (sum, product) =>
                    sum +
                    product.stock *
                    product.purchasePrice,
                0
            );

        const lowStock =
            products.filter(
                product =>
                    product.stock <= product.minStock
            ).length;

        NightMoney.renderAppShell(`

            ${NightMoney.getPageTitle(
                "Inventory",
                "Manage products, stock levels and inventory value."
            )}

            <section class="stats-grid">

                ${NightMoney.statCard({
                    title: "Total Products",
                    value: NightMoney.formatNumber(products.length),
                    icon: "▤",
                    type: "purple"
                })}

                ${NightMoney.statCard({
                    title: "Total Items",
                    value: NightMoney.formatNumber(totalItems),
                    icon: "▥",
                    type: "green"
                })}

                ${NightMoney.statCard({
                    title: "Inventory Value",
                    value: NightMoney.formatMoney(inventoryValue),
                    icon: "◈",
                    type: "purple"
                })}

                ${NightMoney.statCard({
                    title: "Low Stock",
                    value: NightMoney.formatNumber(lowStock),
                    icon: "!",
                    type: "orange"
                })}

            </section>

            <section class="table-card">

                <div class="table-toolbar">

                    <div>
                        <strong>Product Inventory</strong>
                    </div>

                    <div class="toolbar-actions">

                        <input
                            class="search-input"
                            id="productSearch"
                            placeholder="Search product or SKU..."
                        >

                        <button
                            class="btn btn-primary"
                            id="addProduct"
                        >
                            + Add Product
                        </button>

                    </div>

                </div>

                <div class="table-wrapper">

                    <table>

                        <thead>

                            <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Stock</th>
                                <th>Purchase Price</th>
                                <th>Sale Price</th>
                                <th>Inventory Value</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody id="productBody"></tbody>

                    </table>

                </div>

            </section>

        `);

        renderRows(products);

        document
            .getElementById("productSearch")
            .addEventListener("input", event => {

                const query =
                    event.target.value.toLowerCase();

                renderRows(
                    products.filter(product =>
                        `${product.name}
                         ${product.sku}
                         ${product.category}`
                            .toLowerCase()
                            .includes(query)
                    )
                );
            });

        document
            .getElementById("addProduct")
            .addEventListener(
                "click",
                openAddProduct
            );
    }

    function renderRows(items) {

        const body =
            document.getElementById("productBody");

        body.innerHTML = items.map(product => {

            const isLow =
                product.stock <= product.minStock;

            return `

                <tr>

                    <td>
                        <strong>
                            ${NightMoney.escapeHTML(product.name)}
                        </strong>
                    </td>

                    <td>
                        ${NightMoney.escapeHTML(product.sku)}
                    </td>

                    <td>
                        ${NightMoney.formatNumber(product.stock)}
                    </td>

                    <td>
                        ${NightMoney.formatMoney(
                            product.purchasePrice
                        )}
                    </td>

                    <td>
                        ${NightMoney.formatMoney(
                            product.salePrice
                        )}
                    </td>

                    <td>
                        ${NightMoney.formatMoney(
                            product.stock *
                            product.purchasePrice
                        )}
                    </td>

                    <td>
                        ${NightMoney.statusBadge(
                            isLow
                                ? "Low Stock"
                                : "In Stock"
                        )}
                    </td>

                    <td>

                        <button
                            class="table-action"
                            data-stock-in="${product.id}"
                        >
                            Stock In
                        </button>

                        <button
                            class="table-action"
                            data-stock-out="${product.id}"
                        >
                            Stock Out
                        </button>

                        <button
                            class="table-action"
                            data-delete="${product.id}"
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        }).join("");

        body
            .querySelectorAll("[data-stock-in]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => stockChange(
                        Number(button.dataset.stockIn),
                        "in"
                    )
                );

            });

        body
            .querySelectorAll("[data-stock-out]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => stockChange(
                        Number(button.dataset.stockOut),
                        "out"
                    )
                );

            });

        body
            .querySelectorAll("[data-delete]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button.dataset.delete
                            );

                        products =
                            products.filter(
                                product =>
                                    product.id !== id
                            );

                        render();

                        NightMoney.showToast(
                            "Product removed."
                        );
                    }
                );

            });
    }

    function openAddProduct() {

        NightMoney.openModal(
            "Add Product",
            `

            <form id="productForm">

                <div class="form-grid">

                    <div class="form-group">
                        <label>Product Name</label>
                        <input id="productName" required>
                    </div>

                    <div class="form-group">
                        <label>SKU</label>
                        <input id="productSku" required>
                    </div>

                    <div class="form-group">
                        <label>Category</label>
                        <input id="productCategory" required>
                    </div>

                    <div class="form-group">
                        <label>Initial Stock</label>
                        <input
                            id="productStock"
                            type="number"
                            min="0"
                            value="0"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label>Purchase Price</label>
                        <input
                            id="productPurchase"
                            type="number"
                            min="0"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label>Sale Price</label>
                        <input
                            id="productSale"
                            type="number"
                            min="0"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label>Minimum Stock</label>
                        <input
                            id="productMinimum"
                            type="number"
                            min="0"
                            value="5"
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
                        Create Product
                    </button>

                </div>

            </form>

            `
        );

        document
            .getElementById("productForm")
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    products.push({

                        id: Date.now(),

                        name:
                            document.getElementById(
                                "productName"
                            ).value,

                        sku:
                            document.getElementById(
                                "productSku"
                            ).value,

                        category:
                            document.getElementById(
                                "productCategory"
                            ).value,

                        stock:
                            Number(
                                document.getElementById(
                                    "productStock"
                                ).value
                            ),

                        purchasePrice:
                            Number(
                                document.getElementById(
                                    "productPurchase"
                                ).value
                            ),

                        salePrice:
                            Number(
                                document.getElementById(
                                    "productSale"
                                ).value
                            ),

                        minStock:
                            Number(
                                document.getElementById(
                                    "productMinimum"
                                ).value
                            )
                    });

                    NightMoney.closeModal();

                    NightMoney.showToast(
                        "Product created successfully."
                    );

                    render();
                }
            );
    }

    function stockChange(id, type) {

        const product =
            products.find(
                product => product.id === id
            );

        if (!product) return;

        NightMoney.openModal(
            type === "in"
                ? "Stock In"
                : "Stock Out",

            `

            <form id="stockForm">

                <div class="form-group">

                    <label>
                        ${NightMoney.escapeHTML(product.name)}
                    </label>

                    <input
                        id="stockQuantity"
                        type="number"
                        min="1"
                        required
                        placeholder="Quantity"
                    >

                </div>

                <div class="form-group">

                    <label>Notes</label>

                    <textarea
                        id="stockNotes"
                        rows="3"
                        placeholder="Optional notes..."
                    ></textarea>

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
                        Confirm
                    </button>

                </div>

            </form>

            `
        );

        document
            .getElementById("stockForm")
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    const quantity =
                        Number(
                            document.getElementById(
                                "stockQuantity"
                            ).value
                        );

                    if (
                        type === "out" &&
                        quantity > product.stock
                    ) {

                        NightMoney.showToast(
                            "Insufficient stock.",
                            "error"
                        );

                        return;
                    }

                    product.stock +=
                        type === "in"
                            ? quantity
                            : -quantity;

                    NightMoney.closeModal();

                    NightMoney.showToast(
                        type === "in"
                            ? "Stock increased successfully."
                            : "Stock decreased successfully."
                    );

                    render();
                }
            );
    }

    render();

})();