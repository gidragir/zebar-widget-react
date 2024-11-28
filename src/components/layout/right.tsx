import { useState, useEffect } from "react"
import { createProviderGroup, NetworkOutput, BatteryOutput, WeatherOutput } from "zebar"
import { BindingModeConfig } from "glazewm"

import { Cpu, Languages, Microchip } from "lucide-react"

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

const Right = () => {
    const icon_size: number = 15
    
    const [output, setOutput] = useState(providers.outputMap)

    useEffect(() => {
        providers.onOutput(() => setOutput(providers.outputMap));
    }, [])

    function getNetworkIcon(networkOutput: NetworkOutput) {
        const signalStrength = networkOutput.defaultGateway?.signalStrength ?? 0

        switch (networkOutput.defaultInterface?.type) {
            case "ethernet":
                return <i className="nf nf-md-ethernet_cable"></i>;
            case "wifi":
                if (signalStrength >= 80) {
                    return <i className="nf nf-md-wifi_strength_4"></i>;
                } else if (signalStrength >= 65) {
                    return <i className="nf nf-md-wifi_strength_3"></i>;
                } else if (signalStrength >= 40) {
                    return <i className="nf nf-md-wifi_strength_2"></i>;
                } else if (signalStrength >= 25) {
                    return <i className="nf nf-md-wifi_strength_1"></i>;
                } else {
                    return <i className="nf nf-md-wifi_strength_outline"></i>;
                }
            default:
                return <i className="nf nf-md-wifi_strength_off_outline"></i>;
        }
    }

    // Get icon to show for how much of the battery is charged.
    function getBatteryIcon(batteryOutput: BatteryOutput) {
        const chargePercent: number = batteryOutput.chargePercent
        if (chargePercent > 90)
            return <i className="nf nf-fa-battery_4"></i>;
        if (chargePercent > 70)
            return <i className="nf nf-fa-battery_3"></i>;
        if (chargePercent > 40)
            return <i className="nf nf-fa-battery_2"></i>;
        if (chargePercent > 20)
            return <i className="nf nf-fa-battery_1"></i>;
        return <i className="nf nf-fa-battery_0"></i>;
    }

    // Get icon to show for current weather status.
    function getWeatherIcon(weatherOutput: WeatherOutput) {
        switch (weatherOutput.status) {
            case "clear_day":
                return <i className="nf nf-weather-day_sunny"></i>;
            case "clear_night":
                return <i className="nf nf-weather-night_clear"></i>;
            case "cloudy_day":
                return <i className="nf nf-weather-day_cloudy"></i>;
            case "cloudy_night":
                return <i className="nf nf-weather-night_alt_cloudy"></i>;
            case "light_rain_day":
                return <i className="nf nf-weather-day_sprinkle"></i>;
            case "light_rain_night":
                return <i className="nf nf-weather-night_alt_sprinkle"></i>;
            case "heavy_rain_day":
                return <i className="nf nf-weather-day_rain"></i>;
            case "heavy_rain_night":
                return <i className="nf nf-weather-night_alt_rain"></i>;
            case "snow_day":
                return <i className="nf nf-weather-day_snow"></i>;
            case "snow_night":
                return <i className="nf nf-weather-night_alt_snow"></i>;
            case "thunder_day":
                return <i className="nf nf-weather-day_lightning"></i>;
            case "thunder_night":
                return <i className="nf nf-weather-night_alt_lightning"></i>;
        }
    }

    return (
        <div className="right">
            {output.glazewm && (
                <>
                    {output.glazewm.bindingModes.map((bindingMode: BindingModeConfig) => (
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
                    {getNetworkIcon(output.network)}
                    {output.network.defaultGateway?.ssid}
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

            {output.cpu && (
                <div className="icon-value-container">
                    <Cpu className="lucide-icon" size={icon_size} />

                    {/* Change the text color if the CPU usage is high. */}
                    <span className={output.cpu.usage > 85 ? "high-usage" : ""}>
                        {Math.round(output.cpu.usage)}%
                    </span>
                </div>
            )}

            {output.battery && (
                <div className="icon-value-container">
                    {/* Show icon for whether battery is charging. */}
                    {output.battery.isCharging && (
                        <i className="nf nf-md-power_plug charging-icon"></i>
                    )}
                    {getBatteryIcon(output.battery)}
                    {Math.round(output.battery.chargePercent)}%
                </div>
            )}

            {output.weather && (
                <div className="icon-value-container">
                    {getWeatherIcon(output.weather)}
                    {Math.round(output.weather.celsiusTemp)}°C
                </div>
            )}
        </div>

    )
}

export default Right