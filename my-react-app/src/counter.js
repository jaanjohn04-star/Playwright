// Jaan John
// Taking a static HTML/CSS mockup,  rebuilding it as a component-based React app with Vite
// Added real-time search filtering using React state and hooks, 
// Structured everything into reusable components to set up a foundation for expansion, 
// Converted design prototype into working software

export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
