export const observerMCQ = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    // if (mutation.type === "childList") {
    //   mutation.addedNodes.forEach((node) => {
    //     if (!(node instanceof Element)) return

    //     if (node.querySelector(".component-response-multiple-choice")) {
    const options = document.querySelector(".component-list")
    const optionsLength = options ? options.children.length : 0
    const randomIndex = Math.floor(Math.random() * optionsLength)
    const randomChild = options ? options.children[randomIndex] : null

    if (options) {
      const button = randomChild.querySelector(
        ".component-response-multiple-choice__option__vote"
      )
      if (button instanceof HTMLElement) {
        // Simulate user pressing the button
        button.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }))
        button.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }))

        // Simulate the actual click
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))

        // Extract the text content after the click
        setTimeout(() => {
          const value = button
            .querySelector(".component-response-multiple-choice__option__value")
            ?.textContent?.trim()
          console.log(value + " has been selected")
          // Show the custom alert message with auto-close after 10s
        }, 100) // Delay ensures DOM updates after the click
      }
    }
    // }
    //   })
    // }
  }
})

// Show a custom modal alert message that auto-closes after 10 seconds
function showAlertMessage(value: string) {
  // Create the modal element
  const alertModal = document.createElement("div")
  alertModal.id = "customAlert"
  alertModal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 10px;
      z-index: 9999;
      text-align: center;
    `
  alertModal.innerHTML = `
      <h2>${value} has been selected</h2>
      <p>The action has been successfully processed. Please refresh the page to see the update.</p>
    `

  // Append the modal to the body
  document.body.appendChild(alertModal)

  // Automatically close the modal after 10 seconds
  setTimeout(() => {
    if (alertModal) {
      alertModal.style.display = "none" // Hide the modal
    }
  }, 10000) // Close after 10 seconds
}
