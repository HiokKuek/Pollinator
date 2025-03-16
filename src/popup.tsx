import "../style.css"

import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

function IndexPopup() {
  const [data, setData] = useState("")
  const [answer, setAnswer] = useState("I am not sure what the answer is")
  const storage = new Storage()

  useEffect(() => {
    // popup.tsx or content.ts
    const helper = async () => {
      const data = await storage.get("openEndedAnswer") // "value"
      setAnswer(data)
    }
    helper()
  }, [])

  const handleClick = async () => {
    await storage.set("openEndedAnswer", data)
    setAnswer(data)
    setData("")
  }

  return (
    <div className="w-[400px] flex flex-col p-6">
      <p className="font-bold text-lg">Welcome! 👋</p>
      <p>Here is your default answer for open ended question:</p>
      <p className="text-lg text-gray-900 py-6 text-center">{answer}</p>

      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border border-gray-300 p-2 mt-2 rounded"
      />
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white p-2 mt-2 rounded w-[200px] self-center">
        Change
      </button>
    </div>
  )
}

export default IndexPopup
