"use client"
import React from "react";
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
} from "recharts";
import { CalendarToday, AccessTime } from "@mui/icons-material";

const BarChart = ({
    data,
    xKey,
    barKeys,
    currentDayColor = "#7147ec", // Default: blue for current day
    previousDayColor = "#DDF3F6", // Default: light gray for previous days
    barRadius = 10,
}) => {
    // Ensure the data is not empty or undefined
    if (!data || data.length === 0) {
        return <div>No data available</div>; // Render a fallback UI when data is not available
    }

    const currentDayIndex = data.length - 1; // Assume the last index represents the current day

    return (
        <div style={{ width: "100%", height: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                    data={data}
                    barCategoryGap="15%" // Increase the gap between categories (groups of bars)
                    barGap={0} // Set to 0 to remove space between individual bars
                    margin={{ top: 10, right: 10, left: -30, bottom: 10 }} // Ensure no clipping
                >
                    {/* Show only solid horizontal grid lines */}
                    <CartesianGrid
                        stroke="#EAEAEA" // Solid color for grid lines
                        vertical={false} // Remove vertical grid lines
                    />

                    {/* X-Axis and Y-Axis without default lines */}
                    <XAxis
                        dataKey={xKey}
                        axisLine={false} // Remove axis line
                        tickLine={false} // Remove ticks
                        tick={{
                            fontSize: 14,
                            fill: "var(--secondary)",
                        }}
                    />

                    <YAxis
                        axisLine={false} // Remove axis line
                        tickLine={false} // Remove ticks
                        tickFormatter={(value) => `${value}h`}
                        tick={{
                            fontSize: 14,
                            fill: "var(--secondary)",
                        }}
                        domain={[0, "dataMax"]}
                        allowDecimals={false}
                    />

                    {/* Tooltip Configuration */}
                    <Tooltip
                        content={({ payload, label }) => {
                            if (!payload || payload.length === 0) return null;

                            const studyHours = payload[0]?.value || 0;
                            return (
                                <div
                                    style={{
                                        background: "#fff", // Lighter hover background color
                                        padding: "10px",
                                        borderRadius: "12px",
                                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                        color: "#858A94",
                                    }}
                                >
                                    <div
                                        style={{ display: "flex", alignItems: "center", gap: 5 }}
                                    >
                                        <CalendarToday style={{ fontSize: "16px" }} />
                                        <span>{label}</span>
                                    </div>
                                    <div
                                        style={{ display: "flex", alignItems: "center", gap: 5 }}
                                    >
                                        <AccessTime style={{ fontSize: "16px" }} />
                                        <span>{studyHours} hours</span>
                                    </div>
                                </div>
                            );
                        }}
                    />

                    {/* Render Bars */}
                    {barKeys.map((key) => (
                        <Bar
                            key={key}
                            dataKey={key}
                            barSize={25} // Adjust the width of the bars for better distribution
                            radius={[barRadius, barRadius, 0, 0]}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        index === currentDayIndex
                                            ? currentDayColor // Current day color
                                            : previousDayColor // Previous day color
                                    }
                                />
                            ))}
                        </Bar>
                    ))}
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChart;
