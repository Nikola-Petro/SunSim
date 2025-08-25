"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  format?: "12h" | "24h"
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Select time",
  disabled = false,
  className,
  format = "24h",
}: TimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedTime, setSelectedTime] = React.useState(value || "")
  const [hours, setHours] = React.useState("00")
  const [minutes, setMinutes] = React.useState("00")
  const [period, setPeriod] = React.useState<"AM" | "PM">("AM")

  React.useEffect(() => {
    if (value) {
      setSelectedTime(value)
      const [timeHours, timeMinutes] = value.split(":")
      if (format === "12h") {
        const hour = parseInt(timeHours)
        const isPM = hour >= 12
        setHours(hour === 0 ? "12" : hour > 12 ? (hour - 12).toString().padStart(2, "0") : timeHours)
        setMinutes(timeMinutes)
        setPeriod(isPM ? "PM" : "AM")
      } else {
        setHours(timeHours)
        setMinutes(timeMinutes)
      }
    }
  }, [value, format])

  const handleTimeChange = (newHours: string, newMinutes: string, newPeriod?: "AM" | "PM") => {
    let finalHours = newHours
    let finalPeriod = newPeriod || period

    if (format === "12h") {
      let hour = parseInt(newHours)
      if (finalPeriod === "PM" && hour !== 12) {
        hour += 12
      } else if (finalPeriod === "AM" && hour === 12) {
        hour = 0
      }
      finalHours = hour.toString().padStart(2, "0")
    }

    const timeString = `${finalHours}:${newMinutes}`
    setSelectedTime(timeString)
    setHours(newHours)
    setMinutes(newMinutes)
    if (newPeriod) setPeriod(newPeriod)
    
    onChange?.(timeString)
  }

  const generateTimeOptions = () => {
    const options = []
    const maxHour = format === "12h" ? 12 : 24
    const startHour = format === "12h" ? 1 : 0

    for (let h = startHour; h < maxHour; h++) {
      for (let m = 0; m < 60; m += 15) {
        const hour = h.toString().padStart(2, "0")
        const minute = m.toString().padStart(2, "0")
        const displayHour = format === "12h" ? (h === 0 ? "12" : h).toString() : hour
        const displayMinute = minute
        const timeString = `${hour}:${minute}`
        
        options.push({
          value: timeString,
          label: format === "12h" 
            ? `${displayHour}:${displayMinute} ${h >= 12 ? "PM" : "AM"}`
            : `${displayHour}:${displayMinute}`
        })
      }
    }
    return options
  }

  const timeOptions = generateTimeOptions()

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedTime && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {selectedTime ? (
            format === "12h" 
              ? `${hours}:${minutes} ${period}`
              : selectedTime
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <div className="space-y-3">
            <div className="space-y-3">
              <div className="text-sm font-medium text-center text-muted-foreground">
                Manual Input
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Input
                  type="number"
                  min={format === "12h" ? 1 : 0}
                  max={format === "12h" ? 12 : 23}
                  value={hours}
                  onChange={(e) => {
                    const val = e.target.value.padStart(2, "0")
                    handleTimeChange(val, minutes)
                  }}
                  className="w-20 text-center text-lg font-mono"
                  placeholder="00"
                />
                <span className="text-2xl font-bold text-muted-foreground">:</span>
                <Input
                  type="number"
                  min={0}
                  max={59}
                  value={minutes}
                  onChange={(e) => {
                    const val = e.target.value.padStart(2, "0")
                    handleTimeChange(hours, val)
                  }}
                  className="w-20 text-center text-lg font-mono"
                  placeholder="00"
                />
                {format === "12h" && (
                  <div className="flex space-x-1">
                    <Button
                      variant={period === "AM" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTimeChange(hours, minutes, "AM")}
                      className="w-10 h-8"
                    >
                      AM
                    </Button>
                    <Button
                      variant={period === "PM" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTimeChange(hours, minutes, "PM")}
                      className="w-10 h-8"
                    >
                      PM
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-center text-muted-foreground">
                Quick Select
              </div>
              <div className="grid grid-cols-3 gap-1 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {timeOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs hover:bg-accent"
                    onClick={() => {
                      const [h, m] = option.value.split(":")
                      if (format === "12h") {
                        const hour = parseInt(h)
                        const isPM = hour >= 12
                        const displayHour = hour === 0 ? "12" : hour > 12 ? (hour - 12).toString().padStart(2, "0") : h
                        handleTimeChange(displayHour, m, isPM ? "PM" : "AM")
                      } else {
                        handleTimeChange(h, m)
                      }
                      setIsOpen(false)
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
} 