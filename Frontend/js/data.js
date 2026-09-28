const NightMoneyData = {

    products: [
        {
            id: 1,
            name: "Engine Oil 5W-30",
            sku: "EO-530-001",
            stock: 42,
            minStock: 15,
            purchasePrice: 1850000,
            salePrice: 2450000,
            category: "Lubricants"
        },
        {
            id: 2,
            name: "Performance Brake Pads",
            sku: "BP-220-004",
            stock: 8,
            minStock: 10,
            purchasePrice: 4200000,
            salePrice: 5900000,
            category: "Brake System"
        },
        {
            id: 3,
            name: "Premium Air Filter",
            sku: "AF-110-008",
            stock: 31,
            minStock: 12,
            purchasePrice: 950000,
            salePrice: 1450000,
            category: "Filters"
        },
        {
            id: 4,
            name: "Iridium Spark Plug",
            sku: "SP-IR-102",
            stock: 64,
            minStock: 20,
            purchasePrice: 620000,
            salePrice: 980000,
            category: "Ignition"
        },
        {
            id: 5,
            name: "LED Headlight Kit",
            sku: "LED-550-002",
            stock: 5,
            minStock: 8,
            purchasePrice: 6800000,
            salePrice: 8900000,
            category: "Accessories"
        },
        {
            id: 6,
            name: "Ceramic Detailing Kit",
            sku: "CDK-300-001",
            stock: 17,
            minStock: 5,
            purchasePrice: 3200000,
            salePrice: 4800000,
            category: "Detailing"
        }
    ],

    transactions: [
        {
            id: 1,
            date: "2026-09-28",
            description: "Engine Oil Sale",
            type: "income",
            category: "Product Sales",
            amount: 14700000,
            method: "Card",
            status: "Completed"
        },
        {
            id: 2,
            date: "2026-09-27",
            description: "Brake Pad Purchase",
            type: "expense",
            category: "Inventory",
            amount: 16800000,
            method: "Bank Transfer",
            status: "Completed"
        },
        {
            id: 3,
            date: "2026-09-26",
            description: "Car Detailing Service",
            type: "income",
            category: "Services",
            amount: 12500000,
            method: "Cash",
            status: "Completed"
        },
        {
            id: 4,
            date: "2026-09-25",
            description: "Workshop Rent",
            type: "expense",
            category: "Rent",
            amount: 18500000,
            method: "Bank Transfer",
            status: "Completed"
        },
        {
            id: 5,
            date: "2026-09-24",
            description: "Performance Tuning",
            type: "income",
            category: "Services",
            amount: 22000000,
            method: "Card",
            status: "Completed"
        },
        {
            id: 6,
            date: "2026-09-23",
            description: "Advertising Campaign",
            type: "expense",
            category: "Advertising",
            amount: 7200000,
            method: "Card",
            status: "Completed"
        }
    ],

    sales: [
        {
            id: 1,
            date: "2026-09-28",
            product: "Engine Oil 5W-30",
            quantity: 6,
            salePrice: 2450000,
            cost: 1850000
        },
        {
            id: 2,
            date: "2026-09-27",
            product: "Premium Air Filter",
            quantity: 9,
            salePrice: 1450000,
            cost: 950000
        },
        {
            id: 3,
            date: "2026-09-26",
            product: "Iridium Spark Plug",
            quantity: 12,
            salePrice: 980000,
            cost: 620000
        },
        {
            id: 4,
            date: "2026-09-25",
            product: "LED Headlight Kit",
            quantity: 2,
            salePrice: 8900000,
            cost: 6800000
        }
    ],

    purchases: [
        {
            id: 1,
            date: "2026-09-27",
            supplier: "Auto Parts Distribution Co.",
            product: "Performance Brake Pads",
            quantity: 4,
            unitCost: 4200000,
            status: "Received"
        },
        {
            id: 2,
            date: "2026-09-24",
            supplier: "Motor Oil Supply",
            product: "Engine Oil 5W-30",
            quantity: 30,
            unitCost: 1850000,
            status: "Received"
        },
        {
            id: 3,
            date: "2026-09-20",
            supplier: "Auto Lighting Group",
            product: "LED Headlight Kit",
            quantity: 6,
            unitCost: 6800000,
            status: "Received"
        }
    ]
};