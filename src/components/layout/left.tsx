import { useState, useEffect } from "react"
import { createProviderGroup, GlazeWmOutput } from "zebar"

const providers = createProviderGroup({
    glazewm: { type: "glazewm" },
})

const Left = () => {
    const [output, setOutput] = useState(providers.outputMap)

    useEffect(() => {
        providers.onOutput(() => setOutput(providers.outputMap));
    }, [])

    return (
        <div className="left">
            {output.glazewm && (
                <div className="workspaces">
                    {output.glazewm.currentWorkspaces.map((workspace: GlazeWmOutput["currentWorkspaces"][number]) => (
                        <button
                            className={`workspace ${workspace.hasFocus && "focused"
                                } ${workspace.isDisplayed && "displayed"}`}
                            onClick={() =>
                                output.glazewm?.runCommand(
                                    `focus --workspace ${workspace.name}`
                                )
                            }
                            key={workspace.name}
                        >
                            {workspace.displayName ?? workspace.name}
                        </button>
                    ))}
                </div>
            )}
        </div>

    )
}

export default Left