import { useEffect, useState } from "react";

export default function Dashboard(){

  const [data,setData] = useState(null);

  async function load(){
    const res = await fetch("/api/analytics");
    const json = await res.json();
    setData(json);
  }

  useEffect(()=>{
    load();

    // 🔥 auto refresh every 3 sec
    const i = setInterval(load,3000);

    return ()=>clearInterval(i);
  },[]);

  if(!data) return <div style={{color:"#fff"}}>Loading...</div>;

  const usage = data.usage;

  return (
    <div style={{
      background:"#0a0a0a",
      color:"#fff",
      minHeight:"100vh",
      padding:"20px"
    }}>
      <h1>⚡ Live Dashboard</h1>

      <div style={card}>
        <h2>Total Requests</h2>
        <h1>{usage.total}</h1>
      </div>

      <div style={card}>
        <h2>Unique IPs</h2>
        <h1>{usage.unique_ip_count}</h1>
      </div>

      <div style={card}>
        <h2>Users</h2>
        {Object.entries(usage.users).map(([u,c])=>(
          <div key={u}>{u} → {c}</div>
        ))}
      </div>

    </div>
  );
}

const card = {
  background:"#111",
  padding:"15px",
  margin:"10px 0",
  borderRadius:"10px"
};
