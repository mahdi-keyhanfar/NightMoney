// =========================
// Transaction Data
// =========================

let transactions = [

    {
        id: 1,
        description: "Salary",
        category: "Salary",
        date: "2026-09-19",
        type: "income",
        amount: 4200000
    },

    {
        id: 2,
        description: "Car Maintenance",
        category: "Transport",
        date: "2026-09-18",
        type: "expense",
        amount: 320000
    },

    {
        id: 3,
        description: "Groceries",
        category: "Food",
        date: "2026-09-17",
        type: "expense",
        amount: 145000
    },

    {
        id: 4,
        description: "Freelance Project",
        category: "Business",
        date: "2026-09-16",
        type: "income",
        amount: 850000
    },

    {
        id: 5,
        description: "Shopping",
        category: "Shopping",
        date: "2026-09-15",
        type: "expense",
        amount: 210000
    },

    {
        id: 6,
        description: "Internet Bill",
        category: "Other",
        date: "2026-09-14",
        type: "expense",
        amount: 120000
    },

    {
        id: 7,
        description: "Freelance Work",
        category: "Business",
        date: "2026-09-13",
        type: "income",
        amount: 4000000
    },

    {
        id: 8,
        description: "Fuel",
        category: "Transport",
        date: "2026-09-12",
        type: "expense",
        amount: 240000
    }

];


// =========================
// Elements
// =========================

const transactionList =
    document.getElementById("transactionList");

const searchInput =
    document.getElementById("searchInput");

const typeFilter =
    document.getElementById("typeFilter");

const categoryFilter =
    document.getElementById("categoryFilter");

const clearFilters =
    document.getElementById("clearFilters");

const totalTransactions =
    document.getElementById("totalTransactions");

const totalIncome =
    document.getElementById("totalIncome");

const totalExpenses =
    document.getElementById("totalExpenses");

const netCashFlow =
    document.getElementById("netCashFlow");

const transactionCount =
    document.getElementById("transactionCount");


// =========================
// Format Money
// =========================

function formatMoney(amount) {

    return "$" + amount.toLocaleString("en-US");

}


// =========================
// Render Transactions
// =========================

function renderTransactions(data) {

    transactionList.innerHTML = "";


    data.forEach(function (transaction) {

        const row = document.createElement("tr");


        const amountClass =
            transaction.type === "income"
                ? "amount-income"
                : "amount-expense";


        const amountSign =
            transaction.type === "income"
                ? "+"
                : "-";


        row.innerHTML = `

            <td>
                <span class="transaction-description">
                    ${transaction.description}
                </span>
            </td>

            <td>
                <span class="category">
                    ${transaction.category}
                </span>
            </td>

            <td>
                ${transaction.date}
            </td>

            <td>
                <span class="type ${transaction.type}">
                    ${transaction.type}
                </span>
            </td>

            <td>
                <span class="${amountClass}">
                    ${amountSign}${formatMoney(transaction.amount)}
                </span>
            </td>

            <td>
                <button
                    class="delete-button"
                    onclick="deleteTransaction(${transaction.id})"
                >
                    ×
                </button>
            </td>

        `;


        transactionList.appendChild(row);

    });


    transactionCount.textContent =
        `${data.length} transactions`;

}


// =========================
// Update Summary
// =========================

function updateSummary() {

    const income = transactions
        .filter(item => item.type === "income")
        .reduce((sum, item) => sum + item.amount, 0);


    const expenses = transactions
        .filter(item => item.type === "expense")
        .reduce((sum, item) => sum + item.amount, 0);


    const balance = income - expenses;


    totalTransactions.textContent =
        transactions.length;


    totalIncome.textContent =
        formatMoney(income);


    totalExpenses.textContent =
        formatMoney(expenses);


    netCashFlow.textContent =
        formatMoney(balance);

}


// =========================
// Filters
// =========================

function filterTransactions() {

    const search =
        searchInput.value.toLowerCase();


    const type =
        typeFilter.value;


    const category =
        categoryFilter.value;


    const filtered =
        transactions.filter(function (transaction) {

            const matchesSearch =
                transaction.description
                    .toLowerCase()
                    .includes(search);


            const matchesType =
                type === "all" ||
                transaction.type === type;


            const matchesCategory =
                category === "all" ||
                transaction.category.toLowerCase() === category;


            return (
                matchesSearch &&
                matchesType &&
                matchesCategory
            );

        });


    renderTransactions(filtered);

}


// =========================
// Delete Transaction
// =========================

function deleteTransaction(id) {

    transactions =
        transactions.filter(function (transaction) {

            return transaction.id !== id;

        });


    filterTransactions();

    updateSummary();

}


// =========================
// Filter Events
// =========================

searchInput.addEventListener(
    "input",
    filterTransactions
);


typeFilter.addEventListener(
    "change",
    filterTransactions
);


categoryFilter.addEventListener(
    "change",
    filterTransactions
);


clearFilters.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        typeFilter.value = "all";

        categoryFilter.value = "all";

        renderTransactions(transactions);

    }
);


// =========================
// Modal
// =========================

const modal =
    document.getElementById("transactionModal");

const openModalButton =
    document.getElementById("openModalButton");

const closeModal =
    document.getElementById("closeModal");

const cancelButton =
    document.getElementById("cancelButton");

const transactionForm =
    document.getElementById("transactionForm");


function openModal() {

    modal.classList.add("show");

}


function closeTransactionModal() {

    modal.classList.remove("show");

}


openModalButton.addEventListener(
    "click",
    openModal
);


closeModal.addEventListener(
    "click",
    closeTransactionModal
);


cancelButton.addEventListener(
    "click",
    closeTransactionModal
);


// =========================
// Add Transaction
// =========================

transactionForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const description =
            document.getElementById("description").value;


        const amount =
            Number(
                document.getElementById("amount").value
            );


        const type =
            document.getElementById("transactionType").value;


        const category =
            document.getElementById("category").value;


        const date =
            document.getElementById("date").value;


        const newTransaction = {

            id: Date.now(),

            description: description,

            category:
                category.charAt(0).toUpperCase()
                + category.slice(1),

            date: date,

            type: type,

            amount: amount

        };


        transactions.unshift(
            newTransaction
        );


        transactionForm.reset();

        closeTransactionModal();

        filterTransactions();

        updateSummary();

    }
);


// =========================
// Initial Load
// =========================

renderTransactions(transactions);

updateSummary();