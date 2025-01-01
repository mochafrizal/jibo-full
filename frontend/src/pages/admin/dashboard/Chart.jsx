import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ postData, productData }) => {
    const [viewMode, setViewMode] = useState('monthly');

    const processData = useMemo(() => {
        const dataMap = new Map();

        productData?.products?.forEach(product => {
            const date = new Date(product.createdAt);
            const key = viewMode === 'monthly'
                ? date.toLocaleString('default', { month: 'short', year: 'numeric' })
                : date.toISOString().split('T')[0];

            if (!dataMap.has(key)) {
                dataMap.set(key, { date: key, Products: 0, Posts: 0 });
            }
            dataMap.get(key).Products += 1;
        });

        postData?.posts?.forEach(post => {
            const date = new Date(post.createdAt);
            const key = viewMode === 'monthly'
                ? date.toLocaleString('default', { month: 'short', year: 'numeric' })
                : date.toISOString().split('T')[0];

            if (!dataMap.has(key)) {
                dataMap.set(key, { date: key, Products: 0, Posts: 0 });
            }
            dataMap.get(key).Posts += 1;
        });

        return Array.from(dataMap.values())
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [postData, productData, viewMode]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-lg">
                    <p className="text-gray-200 font-medium mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const formatXAxis = (value) => {
        if (viewMode === 'daily') {
            const date = new Date(value);
            return date.toLocaleDateString('default', { month: 'short', day: 'numeric' });
        }
        return value;
    };

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-end space-x-2 px-4">
                <button
                    onClick={() => setViewMode('daily')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'daily'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                >
                    Daily
                </button>
                <button
                    onClick={() => setViewMode('monthly')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'monthly'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                >
                    Monthly
                </button>
            </div>

            <div className="w-full h-72 bg-gray-900 p-4 rounded-xl">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={processData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="date"
                            stroke="#9CA3AF"
                            tick={{ fill: '#9CA3AF' }}
                            tickFormatter={formatXAxis}
                            angle={viewMode === 'daily' ? -45 : 0}
                            textAnchor={viewMode === 'daily' ? 'end' : 'middle'}
                            height={60}
                        />
                        <YAxis
                            stroke="#9CA3AF"
                            tick={{ fill: '#9CA3AF' }}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Legend
                            wrapperStyle={{
                                color: '#9CA3AF'
                            }}
                        />
                        <Bar
                            dataKey="Products"
                            fill="#60A5FA"
                            radius={[4, 4, 0, 0]}
                            isAnimationActive={false}
                        />
                        <Bar
                            dataKey="Posts"
                            fill="#F87171"
                            radius={[4, 4, 0, 0]}
                            isAnimationActive={false}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;