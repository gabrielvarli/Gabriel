window.addEventListener("load", () => {
  habits = JSON.parse(localStorage.getItem("habits")) || [];
  const nameInput = document.querySelector("#name");
  const newHabitForm = document.querySelector("#new-habit-form");

  const username = localStorage.getItem("username") || "";

  nameInput.value = username;

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  newHabitForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const habit = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
      streak: 0,
    };
    // global variable
    habits.push(habit);

    localStorage.setItem("habits", JSON.stringify(habits));

    // Reset the form
    e.target.reset();

    DisplayHabits();
  });

  DisplayHabits();
});
function DisplayHabits() {
  const habitList = document.querySelector("#habit-list");
  habitList.innerHTML = "";

  habits.forEach((habit) => {
    const habitItem = document.createElement("div");
    habitItem.classList.add("habit-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const counter = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");
    const increaseButton = document.createElement("button");
    const decreseButton = document.createElement("button");
    const resetButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = habit.done;
    span.classList.add("bubble");
    if (habit.category == "priority1") {
      span.classList.add("priority1");
    }
    if (habit.category == "priority2") {
      span.classList.add("priority2");
    }
    if (habit.category == "priority3") {
      span.classList.add("priority3");
    }
    content.classList.add("habit-content");
    counter.classList.add("habit-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");
    increaseButton.classList.add("counter-button");
    decreseButton.classList.add("counter-button");
    resetButton.classList.add("counter-button");

    content.innerHTML = `<input type="text" value="${habit.content}" readonly>`;
    counter.innerHTML = `<input type="text" value="${habit.streak}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";
    increaseButton.innerHTML = "Increase";
    decreseButton.innerHTML = "Decrease";
    resetButton.innerHTML = "Reset";

    label.appendChild(input);
    label.appendChild(span);

    actions.appendChild(increaseButton);
    actions.appendChild(decreseButton);
    actions.appendChild(resetButton);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);

    habitItem.appendChild(label);
    habitItem.appendChild(content);
    habitItem.appendChild(counter);
    habitItem.appendChild(actions);

    habitList.appendChild(habitItem);

    if (habit.done) {
      habitItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      habit.done = e.target.checked;
      localStorage.setItem("habits", JSON.stringify(habits));

      if (habit.done) {
        habitItem.classList.add("done");
      } else {
        habitItem.classList.remove("done");
      }

      DisplayHabits();
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        habit.content = e.target.value;
        localStorage.setItem("habits", JSON.stringify(habits));
        DisplayHabits();
      });
    });
    deleteButton.addEventListener("click", (e) => {
      habits = habits.filter((t) => t != habit);
      localStorage.setItem("habits", JSON.stringify(habits));
      DisplayHabits();
    });
    increaseButton.addEventListener("click", (e) => {
      habit.streak++;
      localStorage.setItem("habits", JSON.stringify(habits));
      DisplayHabits();
    });
    decreseButton.addEventListener("click", (e) => {
      habit.streak--;
      localStorage.setItem("habits", JSON.stringify(habits));
      DisplayHabits();
    });
    resetButton.addEventListener("click", (e) => {
      habit.streak = 0;
      localStorage.setItem("habits", JSON.stringify(habits));
      DisplayHabits();
    });
  });
}

const habitList = document.querySelector("#habit-list");

const sort_priority_button = document.querySelector(".sort-priority");
const sort_streak_button = document.querySelector(".sort-streak");

let desc = false;

sort_priority_button.addEventListener("click", () => {
  habits.sort((a, b) => {
    if (a.category > b.category) {
      return desc ? -1 : 1;
    }
    if (a.category < b.category) {
      return desc ? 1 : -1;
    }
    return 0;
  });
  desc = !desc;
  DisplayHabits();
});
sort_streak_button.addEventListener("click", () => {
  habits.sort((a, b) => {
    if (a.streak > b.streak) {
      return desc ? -1 : 1;
    }
    if (a.streak < b.streak) {
      return desc ? 1 : -1;
    }
    return 0;
  });
  desc = !desc;
  DisplayHabits();
});
