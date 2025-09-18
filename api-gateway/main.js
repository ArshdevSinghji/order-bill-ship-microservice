const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/v1", async (req, res) => {
  try {
    const { body } = req;

    if (
      !body.products ||
      !body.customer_id ||
      !body.total_amount ||
      !body.billing_account_id ||
      !body.billing_address
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sales = {
      products: body.products,
      customer_id: body.customer_id,
      total_amount: body.total_amount,
    };

    const salesReponse = await fetch("http://localhost:3000/sales/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sales),
    });

    const salesData = await salesReponse.json();

    if (!salesReponse.ok) {
      return res.status(500).json({ error: "Failed to create sales order" });
    }

    const order_id = salesData.id;

    const bill = {
      order_id: order_id,
      billing_account_id: body.billing_account_id,
      billing_address: body.billing_address,
    };

    const billResponse = await fetch("http://localhost:3001/billing/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bill),
    });

    if (!billResponse.ok) {
      return res.status(500).json({ error: "Failed to create billing" });
    }

    const ship = {
      order_id: order_id,
      billing_address: body.billing_address,
      products: body.products,
    };

    const shipResponse = await fetch("http://localhost:3002/shipping/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ship),
    });

    if (!shipResponse.ok) {
      return res.status(500).json({ error: "Failed to create shipping" });
    }

    res.status(200).json({ message: "Order processed successfully" });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/v1", async (_, res) => {
  try {
    const salesResponse = await fetch("http://localhost:3000/sales/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!salesResponse.ok) {
      return res.status(500).json({ error: "Failed to fetch sales orders" });
    }
    const salesData = await salesResponse.json();
    const sale = {
      sale: salesData,
    };

    const billResponse = await fetch("http://localhost:3001/billing/accounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!billResponse.ok) {
      return res
        .status(500)
        .json({ error: "Failed to fetch billing accounts" });
    }
    const billData = await billResponse.json();
    const billingAccount = {
      billingAccount: billData,
    };

    const shipResponse = await fetch(
      "http://localhost:3002/shipping/products",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!shipResponse.ok) {
      return res
        .status(500)
        .json({ error: "Failed to fetch shipping products" });
    }

    const shipData = await shipResponse.json();
    const shippingProduct = {
      shippingProduct: shipData,
    };

    res.status(200).json({ ...sale, ...billingAccount, ...shippingProduct });
  } catch (error) {
    console.error("Error fetching sales orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
