import { useState, useEffect } from "react"
import { createProviderGroup, startPreset } from "zebar"

import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const providers = createProviderGroup({
    date: { type: "date", formatting: "EEE d MMM t" },
})

const Center = () => {
    const [output, setOutput] = useState(providers.outputMap)

    useEffect(() => {
        providers.onOutput(() => setOutput(providers.outputMap));
    }, [])

    return (
        <div className="center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {output.date?.formatted}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pt-1" align="start">

                    <Calendar
                        mode="single"
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Center