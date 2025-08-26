"use client"

import { useState, useEffect } from "react"
import { useRef } from 'react';

interface CurrentTimeProps {
  selectedTimezone: string
  timezones: Array<{ timezone: string; country?: string; countrie?: string; offset: number }>
  className?: string
}
let time = 0; 

export function CurrentTime({ selectedTimezone, timezones, className }: CurrentTimeProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getTimeInTimezone = (date: Date, timezone: string): string => {
    const timezoneData = timezones.find(tz => tz.timezone === timezone)
    const offset = timezoneData?.offset || 0
    
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000)
    const targetTime = new Date(utcTime + (offset * 3600000))
    
    const hours = targetTime.getHours().toString().padStart(2, '0')
    const minutes = targetTime.getMinutes().toString().padStart(2, '0')
    const seconds = targetTime.getSeconds().toString().padStart(2, '0')

    let timeChange = targetTime.getMinutes() / 60;
    time = targetTime.getHours() + timeChange;
    console.log(time)
    return `${hours}:${minutes}:${seconds}`
  }


  const timeString = getTimeInTimezone(currentTime, selectedTimezone)

  return (
    <div className={`text-2xl font-mono font-bold text-center ${className}`}>
      {timeString}
    </div>
  )
} 


export function getTime(): number {
  return time
  } 