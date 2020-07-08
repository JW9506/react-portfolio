import React, { useState, useEffect } from "react"
import { padzeros } from "../utils"

const TIME_PARTS = ["days", "hours", "minutes", "seconds"] as const
type TIME_PARTS = typeof TIME_PARTS[number]

export default function CountDownTimer() {
  new Date().toLocaleDateString().match(/(\d+)\/(\d+)\/(\d+)/)
  const MONTH = padzeros(RegExp.$1, 2)
  const DAY = padzeros(RegExp.$2, 2)
  const YEAR = RegExp.$3
  const [targetDate, setTargetDate] = useState(`${YEAR}-${MONTH}-${DAY}`)
  const [timer, setTimer] = useState<Record<TIME_PARTS, number>>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  let timeoutId: NodeJS.Timeout
  const updateTimer = () => {
    const targetTimeStamp = new Date(targetDate.replace(/-/g, "/")).getTime()
    const distance = targetTimeStamp - new Date().getTime()
    if (distance < 0) {
      clearInterval(timeoutId)
      setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      return
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    setTimer({ days, hours, minutes, seconds })
  }
  useEffect(() => {
    timeoutId = setInterval(() => {
      updateTimer()
    }, 1000)
    return () => {
      clearInterval(timeoutId)
    }
  }, [targetDate])
  const dateChangeEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const targetDate = new Date(e.target.value.replace(/-/g, "/"))
    targetDate.toLocaleDateString().match(/(\d+)\/(\d+)\/(\d+)/)
    const MONTH = padzeros(RegExp.$1, 2)
    const DAY = padzeros(RegExp.$2, 2)
    const YEAR = RegExp.$3
    setTargetDate(`${YEAR}-${MONTH}-${DAY}`)
  }
  const displayTimer = () =>
    ((TIME_PARTS as any) as TIME_PARTS[]).map((part) => (
      <div key={part} className="text-center">
        <p>{timer[part]}</p>
        <p>{part}</p>
      </div>
    ))
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div>
        <input
          type="date"
          name="time-to"
          id="time-to"
          value={targetDate}
          onChange={dateChangeEvent}
        />
      </div>
      <div className="w-1/2 flex justify-between">{displayTimer()}</div>
    </div>
  )
}
