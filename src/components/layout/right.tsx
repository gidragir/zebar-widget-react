import { useState, useEffect, FC, createElement } from "react"
import { createProviderGroup, GlazeWmOutput, NetworkOutput, BatteryOutput, WeatherOutput } from "zebar"

import { CommonProps } from './types'

import {
    Cpu, Languages, Microchip,
    Sun, Moon, Cloud, CloudSunRain, CloudMoonRain, CloudRain, Snowflake, CloudLightning,
    BatteryWarning, BatteryLow, BatteryMedium, BatteryFull, BatteryCharging,
    WifiOff, WifiLow, WifiHigh, Wifi, EthernetPort
} from "lucide-react"

import "@/style/icons.css"

const providers = createProviderGroup({
    glazewm: { type: "glazewm" },
    network: { type: "network" },
    cpu: { type: "cpu" },
    battery: { type: "battery" },
    memory: { type: "memory" },
    keyboard: { type: "keyboard" },
    weather: { type: "weather" },
})

const Right: FC<CommonProps> = ({ icon_size }) => {
    const [output, setOutput] = useState(providers.outputMap)

    useEffect(() => {
        providers.onOutput(() => setOutput(providers.outputMap));
    }, [])

    function getNetworkIcon(networkOutput: NetworkOutput) {
        const signalStrength = networkOutput.defaultGateway?.signalStrength ?? 0
        let icon = WifiOff

        switch (networkOutput.defaultInterface?.type) {
            case "ethernet":
                icon = EthernetPort
                break
            case "wifi":
                if (signalStrength >= 80) {
                    icon = Wifi
                    break
                } else if (signalStrength >= 40) {
                    icon = WifiHigh
                    break
                } else if (signalStrength >= 25) {
                    icon = WifiLow
                    break
                } else {
                    icon = EthernetPort
                    break
                }
            default:
                icon = WifiOff
                break
        }

        return icon
    }

    function getBatteryIcon(batteryOutput: BatteryOutput) {
        const chargePercent: number = batteryOutput.chargePercent
        let icon = BatteryWarning
        if (chargePercent > 90)
            icon = BatteryFull
        if (chargePercent > 40)
            icon = BatteryMedium
        if (chargePercent > 20)
            icon = BatteryLow
        return icon
    }

    function getWeatherIcon(weatherOutput: WeatherOutput) {
        let icon = Sun
        switch (weatherOutput.status) {
            case "clear_day":
                icon = Sun
                break
            case "clear_night":
                icon = Moon
                break
            case "cloudy_day":
                icon = Cloud
                break
            case "cloudy_night":
                icon = Cloud
                break
            case "light_rain_day":
                icon = CloudSunRain
                break
            case "light_rain_night":
                icon = CloudMoonRain
                break
            case "heavy_rain_day":
                icon = CloudRain
                break
            case "heavy_rain_night":
                icon = CloudRain
                break
            case "snow_day":
                icon = Snowflake
                break
            case "snow_night":
                icon = Snowflake
                break
            case "thunder_day":
                icon = CloudLightning
                break
            case "thunder_night":
                icon = CloudLightning
                break
        }

        return icon
    }

    return (
        <div className="right">
            {output.glazewm && (
                <>
                    {output.glazewm.bindingModes.map((bindingMode: GlazeWmOutput["bindingModes"][number]) => (
                        <button className="binding-mode" key={bindingMode.name}>
                            {bindingMode.displayName ?? bindingMode.name}
                        </button>
                    ))}

                    <button
                        className={`tiling-direction nf ${output.glazewm.tilingDirection === "horizontal"
                            ? "nf-md-swap_horizontal"
                            : "nf-md-swap_vertical"
                            }`}
                        onClick={() =>
                            output.glazewm?.runCommand("toggle-tiling-direction")
                        }
                    ></button>
                </>
            )}

            {output.network && (
                <div className="icon-value-container">
                    {createElement(getNetworkIcon(output.network), { className: "lucide-icon", size: icon_size })}
                    {output.network.defaultGateway?.ssid}
                </div>
            )}
            
            {output.cpu && (
                <div className="icon-value-container">
                    <Cpu className="lucide-icon" size={icon_size} />

                    {/* Change the text color if the CPU usage is high. */}
                    <span className={output.cpu.usage > 85 ? "high-usage" : ""}>
                        {Math.round(output.cpu.usage)}%
                    </span>
                </div>
            )}

            {output.memory && (
                <div className="icon-value-container">
                    <Microchip className="lucide-icon" size={icon_size} />
                    {Math.round(output.memory.usage)}%
                </div>
            )}

            {output.keyboard && (
                <div className="icon-value-container">
                    <Languages className="lucide-icon" size={icon_size} />
                    {output.keyboard.layout}
                </div>
            )}

            {output.battery && (
                <div className="icon-value-container">
                    {output.battery.isCharging && (
                        <BatteryCharging className="lucide-icon" size={icon_size} />
                    )}
                    {createElement(getBatteryIcon(output.battery), { className: "lucide-icon", size: icon_size })}
                    {Math.round(output.battery.chargePercent)}%
                </div>
            )}

            {output.weather && (
                <div className="icon-value-container">
                    {createElement(getWeatherIcon(output.weather), { className: "lucide-icon", size: icon_size })}
                    {Math.round(output.weather.celsiusTemp)}°C
                </div>
            )}
        </div>

    )
}

export default Right