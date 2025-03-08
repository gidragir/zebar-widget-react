import { useState, useEffect, FC, createElement } from "react"
import { createProviderGroup, GlazeWmOutput, NetworkOutput, BatteryOutput, WeatherOutput } from "zebar"

import { CommonProps } from './types'

import {
    Cpu, Languages, Microchip,
    Sun, Moon, Cloud, CloudSunRain, CloudMoonRain, CloudRain, Snowflake, CloudLightning,
    BatteryWarning, BatteryLow, BatteryMedium, BatteryFull, BatteryCharging,
    WifiOff, WifiLow, WifiHigh, Wifi, EthernetPort,
    LucideProps
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
                icon = [
                    { threshold: 80, icon: Wifi },
                    { threshold: 40, icon: WifiHigh },
                    { threshold: 25, icon: WifiLow },
                ].find(({ threshold }) => signalStrength >= threshold)?.icon || WifiOff;
                break
            default:
                icon = WifiOff
                break
        }

        return icon
    }

    function getBatteryIcon(batteryOutput: BatteryOutput) {
        const chargePercent: number = batteryOutput.chargePercent;

        const icon = [
            { threshold: 90, icon: BatteryFull },
            { threshold: 40, icon: BatteryMedium },
            { threshold: 20, icon: BatteryLow },
        ].find(({ threshold }) => chargePercent > threshold)?.icon || BatteryWarning;
        return icon
    }

    function getWeatherIcon(weatherOutput: WeatherOutput) {
        const icon = [
            { condition: "clear_day", icon: Sun },
            { condition: "clear_night", icon: Moon },
            { condition: "cloudy_day", icon: Cloud },
            { condition: "cloudy_night", icon: Cloud },
            { condition: "light_rain_day", icon: CloudSunRain },
            { condition: "light_rain_night", icon: CloudMoonRain },
            { condition: "heavy_rain_day", icon: CloudRain },
            { condition: "heavy_rain_night", icon: CloudRain },
            { condition: "snow_day", icon: Snowflake },
            { condition: "snow_night", icon: Snowflake },
            { condition: "thunder_day", icon: CloudLightning },
            { condition: "thunder_night", icon: CloudLightning },
        ].find(({ condition }) => weatherOutput.status == condition)?.icon || Sun;

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
                    {output.keyboard.layout.split("-")[1]}
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