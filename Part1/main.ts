// Type definitions
type Category = "Electronics" | "Furniture" | "Clothing" | "Tools" | "Miscellaneous";
type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";
type Popular = "Yes" | "No";

// Item interface
interface Item {
    id: string;          // Unique
    name: string;
    category: Category;
    quantity: number;
    price: number;
    supplier: string;
    stockStatus: StockStatus;
    popularItem: Popular;
    comment?: string;    // Optional
}

// ---------- Global Data ----------
let inventory: Item[] = [];

// Initialize sample data (for demonstration)
function initSampleData(): void {
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
function escapeHtml(str: string): string {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Render inventory list as a table
function renderInventory(itemsToShow: Item[] | null = null): void {
    const outputDiv = document.getElementById("outputArea");
    if (!outputDiv) return;

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
function displayMessage(msg: string): void {
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
        if (msgDiv) msgDiv.innerHTML = "";
    }, 3000);
}

// Clear the add/edit form
function clearForm(): void {
    (document.getElementById("itemId") as HTMLInputElement).value = "";
    (document.getElementById("itemName") as HTMLInputElement).value = "";
    (document.getElementById("category") as HTMLSelectElement).value = "Electronics";
    (document.getElementById("quantity") as HTMLInputElement).value = "";
    (document.getElementById("price") as HTMLInputElement).value = "";
    (document.getElementById("supplier") as HTMLInputElement).value = "";
    (document.getElementById("stockStatus") as HTMLSelectElement).value = "In Stock";
    (document.getElementById("popularItem") as HTMLSelectElement).value = "No";
    (document.getElementById("comment") as HTMLInputElement).value = "";
}

// ---------- CRUD Operations ----------
function addItem(): void {
    const idInput = document.getElementById("itemId") as HTMLInputElement;
    const nameInput = document.getElementById("itemName") as HTMLInputElement;
    const categorySelect = document.getElementById("category") as HTMLSelectElement;
    const quantityInput = document.getElementById("quantity") as HTMLInputElement;
    const priceInput = document.getElementById("price") as HTMLInputElement;
    const supplierInput = document.getElementById("supplier") as HTMLInputElement;
    const stockSelect = document.getElementById("stockStatus") as HTMLSelectElement;
    const popularSelect = document.getElementById("popularItem") as HTMLSelectElement;
    const commentInput = document.getElementById("comment") as HTMLInputElement;

    const id = idInput.value.trim();
    const name = nameInput.value.trim();
    const category = categorySelect.value as Category;
    const quantity = Number(quantityInput.value);
    const price = Number(priceInput.value);
    const supplier = supplierInput.value.trim();
    const stockStatus = stockSelect.value as StockStatus;
    const popularItem = popularSelect.value as Popular;
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

    const newItem: Item = { id, name, category, quantity, price, supplier, stockStatus, popularItem, comment };
    inventory.push(newItem);
    displayMessage(`✅ Item "${name}" added successfully.`);
    clearForm();
    renderInventory();
}

function updateItemByName(): void {
    const nameInput = document.getElementById("itemName") as HTMLInputElement;
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

    const idInput = document.getElementById("itemId") as HTMLInputElement;
    const categorySelect = document.getElementById("category") as HTMLSelectElement;
    const quantityInput = document.getElementById("quantity") as HTMLInputElement;
    const priceInput = document.getElementById("price") as HTMLInputElement;
    const supplierInput = document.getElementById("supplier") as HTMLInputElement;
    const stockSelect = document.getElementById("stockStatus") as HTMLSelectElement;
    const popularSelect = document.getElementById("popularItem") as HTMLSelectElement;
    const commentInput = document.getElementById("comment") as HTMLInputElement;

    const newId = idInput.value.trim();
    const newCategory = categorySelect.value as Category;
    const newQuantity = Number(quantityInput.value);
    const newPrice = Number(priceInput.value);
    const newSupplier = supplierInput.value.trim();
    const newStock = stockSelect.value as StockStatus;
    const newPopular = popularSelect.value as Popular;
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
    inventory[index] = {
        ...inventory[index],
        id: newId,
        category: newCategory,
        quantity: newQuantity,
        price: newPrice,
        supplier: newSupplier,
        stockStatus: newStock,
        popularItem: newPopular,
        comment: newComment
    };
    displayMessage(`✅ Item "${targetName}" updated successfully.`);
    clearForm();
    renderInventory();
}

function deleteItemByName(): void {
    const deleteInput = document.getElementById("deleteName") as HTMLInputElement;
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
    } else {
        displayMessage("Deletion cancelled.");
    }
}

function searchItems(): void {
    const searchInput = document.getElementById("searchName") as HTMLInputElement;
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) {
        displayMessage("🔍 Please enter a search keyword.");
        return;
    }
    const results = inventory.filter(item => item.name.toLowerCase().includes(keyword));
    if (results.length === 0) {
        displayMessage(`No items found containing "${keyword}".`);
        renderInventory([]);
    } else {
        displayMessage(`🔍 Found ${results.length} item(s).`);
        renderInventory(results);
    }
}

function clearSearch(): void {
    (document.getElementById("searchName") as HTMLInputElement).value = "";
    renderInventory();
    displayMessage("Search cleared. Showing all items.");
}

function showAllItems(): void {
    renderInventory();
    displayMessage(`📋 Showing all ${inventory.length} items.`);
}

function showPopularItems(): void {
    const popular = inventory.filter(item => item.popularItem === "Yes");
    if (popular.length === 0) {
        displayMessage("⭐ No popular items marked.");
        renderInventory([]);
    } else {
        displayMessage(`⭐ Showing ${popular.length} popular item(s).`);
        renderInventory(popular);
    }
}

// ---------- Event Binding ----------
document.addEventListener("DOMContentLoaded", () => {
    renderInventory();
    document.getElementById("addBtn")?.addEventListener("click", addItem);
    document.getElementById("updateBtn")?.addEventListener("click", updateItemByName);
    document.getElementById("deleteBtn")?.addEventListener("click", deleteItemByName);
    document.getElementById("searchBtn")?.addEventListener("click", searchItems);
    document.getElementById("clearSearchBtn")?.addEventListener("click", clearSearch);
    document.getElementById("showAllBtn")?.addEventListener("click", showAllItems);
    document.getElementById("showPopularBtn")?.addEventListener("click", showPopularItems);
});