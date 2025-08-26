/* =========================================================
   Part 2: JavaScript Functions — scope, parameters, return
   ========================================================= */

/**
 * Global scope example: this variable is visible to all functions below.
 * We'll also show local scope within functions.
 */
let globalUseCount = 0;

/**
 * Pure function: takes parameters and returns a value.
 * Demonstrates parameters + return (no side effects).
 */
function sum(a, b) {
  // Local scope: 'a', 'b', and 'total' live only inside this function
  const total = Number(a) + Number(b);
  return total;
}

/**
 * Utility function with parameters + return:
 * Safely parse a numeric input string. Returns { ok: boolean, value: number }.
 */
function parseNumber(input) {
  const value = parseFloat(input);
  if (Number.isNaN(value)) {
    return { ok: false, value: NaN };
  }
  return { ok: true, value };
}

/**
 * Event handler for the sum form.
 * Uses the sum(...) function and updates the DOM.
 */
const sumForm = document.getElementById("sumForm");
const sumResult = document.getElementById("sumResult");

sumForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Each function call increments a global usage counter (demonstrates global scope)
  globalUseCount++;

  const n1 = document.getElementById("num1").value.trim();
  const n2 = document.getElementById("num2").value.trim();

  const p1 = parseNumber(n1);
  const p2 = parseNumber(n2);

  if (!p1.ok || !p2.ok) {
    sumResult.textContent = "Please enter valid numbers.";
    sumResult.style.color = "#b91c1c";
    return;
  }

  const total = sum(p1.value, p2.value);
  sumResult.textContent = `Sum: ${total}  (You’ve calculated ${globalUseCount} time(s))`;
  sumResult.style.color = "#111";
});

/* =========================================================
   Part 3: Combine CSS Animations with JS triggers
   ========================================================= */

/**
 * Reusable helper that adds an animation class and removes it
 * after the animation ends (so you can trigger it again).
 * @param {HTMLElement} el 
 * @param {string} className 
 */
function runAnimation(el, className) {
  // Guard: if element missing, just exit
  if (!el) return;
  el.classList.add(className);
  // Remove class when animation finishes
  el.addEventListener(
    "animationend",
    () => el.classList.remove(className),
    { once: true }
  );
}

// Animate the box on button click
const animateBtn = document.getElementById("animateBtn");
const box = document.getElementById("box");

animateBtn.addEventListener("click", () => {
  runAnimation(box, "bounce-once");
});

/* =========================================================
   Modal open/close with CSS animations
   ========================================================= */
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

function openModal() {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  // Simple close (hide). You could add an exit animation class if desired.
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

// Also close when clicking outside the dialog
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

/* =========================================================
   Part 1: CSS-only spinner is controlled by checkbox in HTML
   (No JS required — included here as a note in the codebase.)
   ========================================================= */
