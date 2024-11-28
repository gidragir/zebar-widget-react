import { useState, useEffect, FC } from "react"
import { createProviderGroup } from "zebar"
import { Workspace } from "glazewm"

import { CommonProps } from './types'

import { Grid2x2 } from "lucide-react"

const providers = createProviderGroup({
    glazewm: { type: "glazewm" },
})

const Left: FC<CommonProps> = ({ icon_size }) => {
    const [output, setOutput] = useState(providers.outputMap)

    useEffect(() => {
        providers.onOutput(() => setOutput(providers.outputMap));
    }, [])

    return (
        <div className="left">
            <Grid2x2 size={icon_size}/>
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