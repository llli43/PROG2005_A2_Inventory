"use strict";
// ---------- Global Data ----------
let inventory = [];
// Initialize sample data (for demonstration)
function initSampleData() {
    if (inventory.length === 0) {
        inventory.push({
            id: "1001",
            name: "Gaming Laptop",
            category: "Electronics",
            quantity: 15,
            price: 1299.99,
            supplier: "TechSupply Co.",
            stockStatus: "In Stock",
            popularItem: "Yes",
            comment: "High demand"
        });
        inventory.push({
            id: "1002",
            name: "Office Chair",
            category: "Furniture",
            quantity: 3,
            price: 249.50,
            supplier: "Furniture World",
            stockStatus: "Low Stock",
            popularItem: "No",
            comment: ""
        });
        inventory.push({
            id: "1003",
            name: "Hammer",
            category: "Tools",
            quantity: 0,
            price: 12.99,
            supplier: "ToolMasters",
            stockStatus: "Out of Stock",
            popularItem: "No",
        });
    }
}
initSampleData();
// Helper: Escape HTML to prevent XSS
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function (m) {
        if (m === '&')
            return '&amp;';
        if (m === '<')
            return '&lt;';
        if (m === '>')
            return '&gt;';
        return m;
    });
}
// Render inventory list as a table
function renderInventory(itemsToShow = null) {
    const outputDiv = document.getElementById("outputArea");
    if (!outputDiv)
        return;
    const displayItems = itemsToShow !== null ? itemsToShow : inventory;
    if (displayItems.length === 0) {
        outputDiv.innerHTML = "<p>📭 No items to display.</p>";
        return;
    }
    let html = `<table border="0" cellpadding="8">
        <thead>
            <tr>
                <th>ID</th><th>Name</th><th>Category</th><th>Qty</th>
                <th>Price</th><th>Supplier</th><th>Stock</th><th>Popular</th><th>Comment</th>
            </tr>
        </thead><tbody>`;
    for (let item of displayItems) {
        html += `<tr>
            <td>${escapeHtml(item.id)}</td>
            <td>${escapeHtml(item.name)}</td>
            <td>${escapeHtml(item.category)}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${escapeHtml(item.supplier)}</td>
            <td>${escapeHtml(item.stockStatus)}</td>
            <td>${escapeHtml(item.popularItem)}</td>
            <td>${escapeHtml(item.comment || '')}</td>
        </tr>`;
    }
    html += `</tbody></table>`;
    outputDiv.innerHTML = html;
}
// Display temporary message using innerHTML (instead of alert)
function displayMessage(msg) {
    let msgDiv = document.getElementById("messageArea");
    if (!msgDiv) {
        msgDiv = document.createElement("div");
        msgDiv.id = "messageArea";
        msgDiv.style.padding = "10px";
        msgDiv.style.margin = "10px 0";
        msgDiv.style.borderRadius = "12px";
        msgDiv.style.backgroundColor = "#eef2ff";
        const outputDiv = document.getElementById("outputArea");
        if (outputDiv && outputDiv.parentNode) {
            outputDiv.parentNode.insertBefore(msgDiv, outputDiv);
        }
    }
    msgDiv.innerHTML = `<span>${msg}</span>`;
    setTimeout(() => {
        if (msgDiv)
            msgDiv.innerHTML = "";
    }, 3000);
}
// Clear the add/edit form
function clearForm() {
    document.getElementById("itemId").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("category").value = "Electronics";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
    document.getElementById("supplier").value = "";
    document.getElementById("stockStatus").value = "In Stock";
    document.getElementById("popularItem").value = "No";
    document.getElementById("comment").value = "";
}
// ---------- CRUD Operations ----------
function addItem() {
    const idInput = document.getElementById("itemId");
    const nameInput = document.getElementById("itemName");
    const categorySelect = document.getElementById("category");
    const quantityInput = document.getElementById("quantity");
    const priceInput = document.getElementById("price");
    const supplierInput = document.getElementById("supplier");
    const stockSelect = document.getElementById("stockStatus");
    const popularSelect = document.getElementById("popularItem");
    const commentInput = document.getElementById("comment");
    const id = idInput.value.trim();
    const name = nameInput.value.trim();
    const category = categorySelect.value;
    const quantity = Number(quantityInput.value);
    const price = Number(priceInput.value);
    const supplier = supplierInput.value.trim();
    const stockStatus = stockSelect.value;
    const popularItem = popularSelect.value;
    const comment = commentInput.value.trim() || undefined;
    // Validation
    if (!id || !name || !supplier) {
        displayMessage("❌ ID, Name, and Supplier are required.");
        return;
    }
    if (isNaN(quantity) || quantity < 0) {
        displayMessage("❌ Quantity must be a non-negative number.");
        return;
    }
    if (isNaN(price) || price < 0) {
        displayMessage("❌ Price must be a non-negative number.");
        return;
    }
    // Check unique ID
    if (inventory.some(item => item.id === id)) {
        displayMessage(`❌ Item ID "${id}" already exists. Use a unique ID.`);
        return;
    }
    const newItem = { id, name, category, quantity, price, supplier, stockStatus, popularItem, comment };
    inventory.push(newItem);
    displayMessage(`✅ Item "${name}" added successfully.`);
    clearForm();
    renderInventory();
}
function updateItemByName() {
    const nameInput = document.getElementById("itemName");
    const targetName = nameInput.value.trim();
    if (!targetName) {
        displayMessage("❌ Please enter the Item Name to update.");
        return;
    }
    const index = inventory.findIndex(item => item.name.toLowerCase() === targetName.toLowerCase());
    if (index === -1) {
        displayMessage(`❌ No item found with name "${targetName}".`);
        return;
    }
    const idInput = document.getElementById("itemId");
    const categorySelect = document.getElementById("category");
    const quantityInput = document.getElementById("quantity");
    const priceInput = document.getElementById("price");
    const supplierInput = document.getElementById("supplier");
    const stockSelect = document.getElementById("stockStatus");
    const popularSelect = document.getElementById("popularItem");
    const commentInput = document.getElementById("comment");
    const newId = idInput.value.trim();
    const newCategory = categorySelect.value;
    const newQuantity = Number(quantityInput.value);
    const newPrice = Number(priceInput.value);
    const newSupplier = supplierInput.value.trim();
    const newStock = stockSelect.value;
    const newPopular = popularSelect.value;
    const newComment = commentInput.value.trim() || undefined;
    if (!newId || !newSupplier) {
        displayMessage("❌ ID and Supplier are required for update.");
        return;
    }
    if (isNaN(newQuantity) || newQuantity < 0 || isNaN(newPrice) || newPrice < 0) {
        displayMessage("❌ Quantity and Price must be valid numbers ≥ 0.");
        return;
    }
    // Check ID conflict with other items
    if (newId !== inventory[index].id && inventory.some(item => item.id === newId)) {
        displayMessage(`❌ ID "${newId}" is already used by another item.`);
        return;
    }
    // Perform update
    inventory[index] = Object.assign(Object.assign({}, inventory[index]), { id: newId, category: newCategory, quantity: newQuantity, price: newPrice, supplier: newSupplier, stockStatus: newStock, popularItem: newPopular, comment: newComment });
    displayMessage(`✅ Item "${targetName}" updated successfully.`);
    clearForm();
    renderInventory();
}
function deleteItemByName() {
    const deleteInput = document.getElementById("deleteName");
    const targetName = deleteInput.value.trim();
    if (!targetName) {
        displayMessage("❌ Please enter the Item Name to delete.");
        return;
    }
    const index = inventory.findIndex(item => item.name.toLowerCase() === targetName.toLowerCase());
    if (index === -1) {
        displayMessage(`❌ No item found with name "${targetName}".`);
        return;
    }
    const confirmMsg = `Are you sure you want to delete "${inventory[index].name}" (ID: ${inventory[index].id})?`;
    if (confirm(confirmMsg)) {
        inventory.splice(index, 1);
        displayMessage(`🗑️ Item "${targetName}" deleted.`);
        deleteInput.value = "";
        renderInventory();
    }
    else {
        displayMessage("Deletion cancelled.");
    }
}
function searchItems() {
    const searchInput = document.getElementById("searchName");
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) {
        displayMessage("🔍 Please enter a search keyword.");
        return;
    }
    const results = inventory.filter(item => item.name.toLowerCase().includes(keyword));
    if (results.length === 0) {
        displayMessage(`No items found containing "${keyword}".`);
        renderInventory([]);
    }
    else {
        displayMessage(`🔍 Found ${results.length} item(s).`);
        renderInventory(results);
    }
}
function clearSearch() {
    document.getElementById("searchName").value = "";
    renderInventory();
    displayMessage("Search cleared. Showing all items.");
}
function showAllItems() {
    renderInventory();
    displayMessage(`📋 Showing all ${inventory.length} items.`);
}
function showPopularItems() {
    const popular = inventory.filter(item => item.popularItem === "Yes");
    if (popular.length === 0) {
        displayMessage("⭐ No popular items marked.");
        renderInventory([]);
    }
    else {
        displayMessage(`⭐ Showing ${popular.length} popular item(s).`);
        renderInventory(popular);
    }
}
// ---------- Event Binding ----------
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b, _c, _d, _e, _f, _g;
    renderInventory();
    (_a = document.getElementById("addBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addItem);
    (_b = document.getElementById("updateBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", updateItemByName);
    (_c = document.getElementById("deleteBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", deleteItemByName);
    (_d = document.getElementById("searchBtn")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", searchItems);
    (_e = document.getElementById("clearSearchBtn")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", clearSearch);
    (_f = document.getElementById("showAllBtn")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", showAllItems);
    (_g = document.getElementById("showPopularBtn")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", showPopularItems);
});
