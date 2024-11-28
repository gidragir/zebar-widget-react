import { useState, useEffect } from "react"
import { createProviderGroup } from "zebar"
import { Workspace } from "glazewm"

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
            <i className="logo nf nf-fa-windows"></i>
            {output.glazewm && (
                <div className="workspaces">
                    {output.glazewm.currentWorkspaces.map((workspace: Workspace) => (
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