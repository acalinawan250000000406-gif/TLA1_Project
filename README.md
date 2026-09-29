AI Assistance & Code Defense

1. What I used AI for
I used AI as a coding assistant while refactoring my Vanilla JS income ledger into React. Specifically, it helped me with:
- Converting my old DOM manipulation logic (`insertAdjacentHTML`, `document.getElementById`) into declarative React components and hooks.
- Structuring a single object state (`formData`) to handle all form inputs cleanly instead of creating multiple separate state variables.
- Adding the calculation logic using array `.reduce()` to compute the total projected income on the fly.
- Troubleshooting React JSX syntax details, like replacing standard HTML attributes (`class`, `for`) with `className` and `htmlFor`.

2. How the React state and logic actually work

State Management (`useState`):
  Instead of manually grabbing values from HTML input elements on submit, the app tracks inputs and ledger records through two main states:
  - `formData`: An object that updates on every keystroke via the `onChange` handler to hold current input values (`name`, `desc`, `amount`).
  - `categories`: An array storing all submitted category objects.

Adding Categories:
  When `handleAddCategory` runs, it creates a new object with a unique ID using `crypto.randomUUID()`. It then updates the state immutably using the spread operator (`setCategories([...categories, newCategory])`), avoiding direct mutation of the original array.

Declarative Rendering: 
  Instead of manually inserting string templates into the DOM, React handles rendering automatically when `categories` changes. The component maps over the array (`categories.map()`) and returns a dynamic `<tr>` for each entry.

Deleting Categories:
  Clicking "Delete" calls `handleDelete(id)`. This uses `.filter()` to return a new array excluding the selected item's ID. Updating `categories` with this filtered array causes React to instantly remove that row from the screen.

Derived State (Total Income): 
  The total income amount isn't stored in a separate `useState`. Instead, it is derived dynamically on each render by summing up `cat.amount` using `.reduce()`. This guarantees the total always matches the current state without extra state sync bugs.
