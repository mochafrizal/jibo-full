import React from 'react';
import { formatWaktu } from '../../../utility/formatWaktu';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

// Format data blog menjadi format yang sesuai dengan Recharts
const formatData = (blogs) => {
    return blogs.map((blog) => ({
        name: formatWaktu(blog.createdAt), // Tanggal atau waktu dari blog
        post: blog.title.length,          // Panjang judul blog
        pv: blog.pageView || 0,           // Page view blog
        amt: blog.amt || 0,               // Nilai tambahan jika ada
    }));
};

const BlogsChart = ({ blogs }) => {
    const data = formatData(blogs);

    return (
        <div className="p-6 bg-bgprimary rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Blog Chart</h2>
            <div className="h-80">
                {/* ResponsiveContainer untuk membuat grafik responsif */}
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="post" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div >
    );
};

export default BlogsChart;
