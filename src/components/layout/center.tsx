import { useState, useEffect } from "react"
import { createProviderGroup } from "zebar"

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
            {output.date?.formatted}
        </div>
    )
}

export default Center