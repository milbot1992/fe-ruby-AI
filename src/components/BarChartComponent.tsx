import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
    Label
} from 'recharts';

interface BarChartComponentProps {
    value: number;
    lowerCI: number;
    upperCI: number;
    indicatorName: string; // Added prop for indicator name
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ value, lowerCI, upperCI, indicatorName }) => {
    const data = [{ name: indicatorName, Value: value }];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart 
                data={data}
                margin={{ right: 100, top: 30, bottom: 20 }}
            >
                <XAxis dataKey="name" /> {/* Use 'name' to show Indicator Name dynamically */}
                <YAxis />
                <Tooltip />
                <Bar dataKey="Value" fill="#8884d8" />
                
                <ReferenceLine 
                    y={lowerCI} 
                    stroke="black" 
                    strokeWidth={2} 
                    strokeDasharray="3 3"
                >
                    <Label value="Lower CI" position="right" offset={0} fill="black"/>
                </ReferenceLine>
                
                <ReferenceLine 
                    y={upperCI} 
                    stroke="black" 
                    strokeWidth={2} 
                    strokeDasharray="3 3"
                >
                    <Label value="Upper CI" position="right" offset={0} fill="black" />
                </ReferenceLine>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;
