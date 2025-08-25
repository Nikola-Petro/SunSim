"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IoSunnyOutline } from "react-icons/io5";
import { CurrentTime } from "@/components/current-time"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IoMoonOutline } from "react-icons/io5";
import { useState, useEffect } from 'react'

export default function Home() {
  const [selectedTimezone, setSelectedTimezone] = React.useState('UTC')

  const [bgColor, setbgColor] = useState("bg-amber-400")


  const tzs = [
    { timezone: 'GMT', country: 'Greenwhich Mean', offset: 0 },
    { timezone: 'EST', country: 'Eastern', offset: -5 },
    { timezone: 'UTC', country: 'Universal', offset: 0 },
    { timezone: 'IST', country: 'India', offset: 5.5 },
    { timezone: 'CST', country: 'China', offset: 8 },
    { timezone: 'JST', country: 'Japan', offset: 9 },
    { timezone: 'AST', country: 'Arabia', offset: 3 },
    { timezone: 'PT', country: 'Pacific', offset: -8 },
    { timezone: 'CET', country: 'Central European', offset: 2 }
  ]
  useEffect(() => {
    if (selectedTimezone == 'JST')
    {
      setbgColor("bg-blue-950")
    }
    else
    {
      setbgColor("bg-amber-400")
    }
  }, [selectedTimezone])

  return (
    <div className={`${bgColor} grid items-center justify-items-center min-h-screen bg-amber-400`}>

      <Card className="w-full max-w-sm rounded-full bg-transparent justify-items-center">
        <CardHeader>
          <CardTitle className="grid justify-items-center py-8">
            
             {selectedTimezone === 'JST' ? <IoMoonOutline className="text-4xl text-blue-700 mb-5"/>:<IoSunnyOutline className="text-5xl text-orange-600 mb-5" />}
            
            Sun Simulation
          </CardTitle>
          <CardDescription className="mx-4 text-center ">
            Select your Time Zone or set the sun &quot;rise&quot; based on your alarm.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid justify-items-center">
            <CurrentTime selectedTimezone={selectedTimezone} timezones={tzs} />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 pb-4">

          <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Time Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Zones</SelectLabel>
                {tzs.map((item, index) => (
                  <SelectItem key={index} value={item.timezone}>
                    <p>{item.timezone}</p>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardFooter>
      </Card>
    </div>
  );
}
