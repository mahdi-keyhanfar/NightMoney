// =========================
// Cash Flow Chart
// =========================

const cashFlow = document.getElementById("cashFlowChart");

new Chart(cashFlow, {

    type: "line",

    data: {

        labels: [
            "Sep 13",
            "Sep 14",
            "Sep 15",
            "Sep 16",
            "Sep 17",
            "Sep 18",
            "Sep 19"
        ],

        datasets: [

            {
                label: "Income",

                data: [
                    500,
                    1200,
                    800,
                    4200,
                    1000,
                    850,
                    870
                ],

                borderColor: "#00D4A8",

                backgroundColor: "rgba(0, 212, 168, 0.08)",

                fill: true,

                tension: 0.4
            },

            {
                label: "Expenses",

                data: [
                    250,
                    450,
                    300,
                    600,
                    450,
                    320,
                    500
                ],

                borderColor: "#FF5C5C",

                backgroundColor: "rgba(255, 92, 92, 0.05)",

                fill: true,

                tension: 0.4
            }

        ]
    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                labels: {
                    color: "#7C8A9A",
                    font: {
                        size: 10
                    }
                }
            }

        },

        scales: {

            x: {
                grid: {
                    color: "#1B2633"
                },

                ticks: {
                    color: "#7C8A9A"
                }
            },

            y: {
                grid: {
                    color: "#1B2633"
                },

                ticks: {
                    color: "#7C8A9A"
                }
            }

        }
    }

});


// =========================
// Expense Chart
// =========================

const expenseChart = document.getElementById("expenseChart");

new Chart(expenseChart, {

    type: "doughnut",

    data: {

        labels: [
            "Housing",
            "Food",
            "Transport",
            "Other"
        ],

        datasets: [

            {
                data: [
                    32,
                    24,
                    18,
                    26
                ],

                backgroundColor: [
                    "#00D4A8",
                    "#00A985",
                    "#087F6B",
                    "#1B2633"
                ],

                borderWidth: 0
            }

        ]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        cutout: "72%",

        plugins: {

            legend: {
                display: false
            }

        }

    }

});