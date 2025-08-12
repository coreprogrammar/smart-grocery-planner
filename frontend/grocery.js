// grocery.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("grocery-form");
  const messageDiv = document.getElementById("message");
  const tableBody = document.querySelector("#grocery-table tbody");

  // Load existing grocery items on page load
  async function loadGroceries() {
    try {
      const res = await fetch("http://localhost:5000/api/groceries");
      const data = await res.json();
      tableBody.innerHTML = "";
      data.forEach((item) => {
        const row = `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.category}</td>
            <td>${item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : "—"}</td>
          </tr>`;
        tableBody.innerHTML += row;
      });
    } catch (err) {
      console.error("Error loading groceries:", err);
      messageDiv.innerText = "Failed to load items.";
      messageDiv.style.color = "red";
    }
  }

  // Call on page load
  loadGroceries();

  // Handle form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);
    const category = document.getElementById("category").value.trim();
    const expiryDate = document.getElementById("expiry").value;

    if (!name || !category || quantity <= 0 || price <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const data = { name, quantity, price, category, expiryDate };

    try {
      const res = await fetch("http://localhost:5000/api/groceries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        messageDiv.innerText = "Item added successfully!";
        messageDiv.style.color = "green";
        form.reset();
        loadGroceries(); // reload table
      } else {
        messageDiv.innerText = "Failed to add item.";
        messageDiv.style.color = "red";
      }
    } catch (err) {
      messageDiv.innerText = "Server error. Please try again.";
      messageDiv.style.color = "red";
      console.error(err);
    }
  });
});
