import { Storage } from "@plasmohq/storage"

export const observerOpenEnded = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "childList") {
      console.log("mutation occured")
      const options = document.querySelector(".component-response-open-ended")
      // Select the textarea and the form
      const textarea = options.querySelector(
        "textarea[name='response']"
      ) as HTMLTextAreaElement
      const submitButton = options.querySelector(
        "input[type='submit']"
      ) as HTMLInputElement
      // Fill in the textarea with "test"
      if (textarea) {
        const helper = async () => {
          const storage = new Storage()
          const data = await storage.get("openEndedAnswer") // "value"
          const valueToFill =
            data !== undefined ? data : "I am not sure what the answer is"

          // Simulate clicking the input box
          textarea.focus()

          // Set the entire value at once
          textarea.value = valueToFill

          // Dispatch the input event to simulate a change
          const event = new Event("input", { bubbles: true })
          textarea.dispatchEvent(event)
        }

        helper()
        // Create and dispatch the input event to simulate a change
        const event = new Event("input", { bubbles: true })
        textarea.dispatchEvent(event) // Dispatch the event to simulate user input
      }
      observerOpenEnded.disconnect()
      if (submitButton) {
        setTimeout(() => {
          submitButton.click()
          submitButton.disabled = true
        }, 2000)
      }
    }
  }
})
