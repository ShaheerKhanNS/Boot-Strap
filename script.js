const submitBtn = document.getElementById("submit");
const tbodyEl = document.querySelector("tbody");

const clearField = () => {
  document.getElementById("price").value =
    document.getElementById("description").value =
    document.getElementById("category").value =
      "";
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const parentNode = document.getElementById("table");
  const id = Date.now();
  if (price && description && category) {
    parentNode.innerHTML += `<tr id=${id}>
    <td id=${id}_price>${price}</td>
    <td id=${id}_description>${description}</td>
    <td id=${id}_category>${category}</td>
    <td>
    <button id="edit" data-set=${id} class="btn btn-outline-dark"onclick="editRow(this)">Edit</button>
    </td>
    <td>
    <button id="delete"  data-set=${id} class="btn deleteBtn btn-outline-danger" onclick="deleteRow(this)">Delete</button>
    </td>
    </tr>`;
    clearField();

    const obj = {
      id,
      price,
      description,
      category,
    };

    localStorage.setItem(id, JSON.stringify(obj));
  }
});

const deleteRow = (el) => {
  const id = el.dataset.set;
  el.closest("tr").remove();
  localStorage.removeItem(id);
};

const editRow = (el) => {
  const id = el.dataset.set;
  const price = document.getElementById(`${id}_price`).textContent;
  const description = document.getElementById(`${id}_description`).textContent;
  const category = document.getElementById(`${id}_category`).textContent;

  document.getElementById("price").value = price;
  document.getElementById("description").value = description;
  document.getElementById("category").value = category;

  const row = document.getElementById(id);
  row.remove();
  localStorage.removeItem(id);
};

// tbodyEl.addEventListener("click", onDelete);
// tbodyEl.addEventListener("click", onEdit);

window.addEventListener("DOMContentLoaded", () => {
  const parentNode = document.getElementById("table");
  console.log("Dom Loaded");
  Object.keys(localStorage).forEach((key) => {
    ({ id, price, description, category } = JSON.parse(
      localStorage.getItem(key)
    ));
    parentNode.innerHTML += `<tr id=${id}>
    <td id=${id}_price>${price}</td>
    <td id=${id}_description>${description}</td>
    <td id=${id}_category>${category}</td>
    <td>
    <button id="edit" data-set=${id} class="btn btn-outline-dark"onclick="editRow(this)">Edit</button>
    </td>
    <td>
    <button id="delete"  data-set=${id} class="btn deleteBtn btn-outline-danger" onclick="deleteRow(this)">Delete</button>
    </td>
    </tr>`;
  });
});

const clearLocalStorage = () => {
  localStorage.clear();
};

// clearLocalStorage();
