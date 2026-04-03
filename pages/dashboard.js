import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Dashboard(){
  const [data,setData]=useState(null);

  useEffect(()=>{
    fetch("/api/analytics")
    .then(r=>r.json())
    .then(setData);
  },[]);

  if(!data) return <div style={{color:"#fff"}}>Loading...</div>;

  const usage = data.usage;

  const chartData = Object.entries(usage.users).map(([u,c],i)=>({
    name:`U${i+1}`,
    usage:c
  }));

  return (
    <div style={{
      background:"#0a0a0a",
      color:"#fff",
      minHeight:"100vh",
      padding:"30px"
    }}>
      <h1>⚡ Advanced Dashboard</h1>

      <div style={card}>
        <h2>Total Requests</h2>
        <h1>{usage.total}</h1>
      </div>

      <div style={card}>
        <h2>Unique IPs</h2>
        <h1>{usage.unique_ip_count}</h1>
      </div>

      <div style={card}>
        <LineChart width={500} height={250} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line dataKey="usage" />
        </LineChart>
      </div>
    </div>
  );
}

const card = {
  background:"#111",
  padding:"20px",
  margin:"20px 0",
  borderRadius:"10px"
};
