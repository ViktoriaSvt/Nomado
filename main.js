document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const nameInput = document.getElementById("plan-name");
  const hotelInput = document.getElementById("hotel-cost");
  const flightInput = document.getElementById("flight-cost");
  const foodInput = document.getElementById("food-cost");
  const funInput = document.getElementById("fun-cost");
  const todoList = document.getElementById("todo-list");
  const accumulatedEl = document.getElementById("accumulated");
  const remainingEl = document.getElementById("remaining");

  const TOTAL_BUDGET = 50000;
  let todos = [];

  function updateTotals() {
    const totalAccumulated = todos.reduce(
      (sum, todo) => sum + todo.hotelCost + todo.flightCost + todo.foodCost + todo.funCost,
      0
    );
    accumulatedEl.textContent = totalAccumulated;
    remainingEl.textContent = TOTAL_BUDGET - totalAccumulated;
  }

  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const container = document.createElement("li");

      const h3 = document.createElement("h3");
      h3.textContent = `Destination: ${todo.name}`;
      container.appendChild(h3);

      const h5 = document.createElement("h5");
      h5.textContent = "Duration: 5 days";
      container.appendChild(h5);

      const ul = document.createElement("ul");

      const liStay = document.createElement("li");
      liStay.textContent = `Stay: ${todo.hotelCost} AUD`;
      ul.appendChild(liStay);

      const liFlight = document.createElement("li");
      liFlight.textContent = `Flight: ${todo.flightCost} AUD`;
      ul.appendChild(liFlight);

      const liFood = document.createElement("li");
      liFood.textContent = `Food: ${todo.foodCost} AUD`;
      ul.appendChild(liFood);

      const liFun = document.createElement("li");
      liFun.textContent = `Fun: ${todo.funCost} AUD`;
      ul.appendChild(liFun);

      container.appendChild(ul);

      const h6 = document.createElement("h6");
      const totalCost = todo.hotelCost + todo.flightCost + todo.foodCost + todo.funCost;
      h6.textContent = `Total: ${totalCost} AUD`;
      container.appendChild(h6);

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "✖️";
      removeBtn.className = "remove-btn";
      removeBtn.addEventListener("click", () => removeTodo(todo.id, container));
      container.appendChild(removeBtn);

      todoList.appendChild(container);
    });
    updateTotals();
  }

  function addTodo(name, hotelCost, flightCost, foodCost, funCost) {
    const newId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    todos = [
      { id: newId, name, hotelCost, flightCost, foodCost, funCost },
      ...todos,
    ];
    renderTodos();
  }

  function removeTodo(id, liElement) {
    liElement.classList.add("removing");
    liElement.addEventListener("transitionend", () => {
      todos = todos.filter((t) => t.id !== id);
      renderTodos();
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const hotelCost = parseInt(hotelInput.value, 10) || 0;
    const flightCost = parseInt(flightInput.value, 10) || 0;
    const foodCost = parseInt(foodInput.value, 10) || 0;
    const funCost = parseInt(funInput.value, 10) || 0;
    if (name) {
      addTodo(name, hotelCost, flightCost, foodCost, funCost);
      form.reset();
    }
  });

  renderTodos();
});
