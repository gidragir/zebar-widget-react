import { useState, useEffect, FC } from "react"
import { createProviderGroup } from "zebar"

import { CommonProps } from './types'

import { CalendarIcon } from "lucide-react"


const providers = createProviderGroup({
    date: { type: "date", formatting: "EEE d MMM t" },
})

const Center: FC<CommonProps> = ({ icon_size }) => {
    const [output, setOutput] = useState(providers.outputMap)

    useEffect(() => {
        providers.onOutput(() => setOutput(providers.outputMap));
    }, [])

    return (
        <div className="center">
            <div className="icon-value-container">
                <CalendarIcon className="lucide-icon" size={icon_size} />
                {output.date?.formatted}
            </div>
        </div>
    )
}

export default Center