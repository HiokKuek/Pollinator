import type { PlasmoCSConfig } from "plasmo"

import { observerOpenEnded } from "~observers/observerOpenEnded"

// Import observers
import { observerMCQ } from "./observers/observerMCQ"

export const config: PlasmoCSConfig = {
  matches: ["https://pollev.com/*"],
  all_frames: true
}
const observePollChanges = () => {
  const turboFrame = document.querySelector("#active_tab_content")

  if (!turboFrame) {
    console.warn("No turbo-frame found, polling might not be ready.")
    return
  }

  observerMCQ.observe(turboFrame, { childList: true, subtree: true })

  observerOpenEnded.observe(turboFrame, { childList: true, subtree: true })

  console.log("⏳ Watching for Poll Activation...")
}

observePollChanges()
