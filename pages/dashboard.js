import { useEffect, useState } from "react";

export default function Dashboard(){
  const [data,setData]=useState(null);

  useEffect(()=>{
    fetch("/api/analytics")
    .then(r=>r.json())
    .then(setData);
  },[]);

  if(!data) return <div>Loading...</div>;

  return (
    <div style={{padding:20,background:"#0a0a0a",color:"#fff",minHeight:"100vh"}}>
      <h1>⚡ Analytics</h1>

      {Object.entries(data.usage).map(([u,c])=>(
        <div key={u} style={{
          display:"flex",
          justifyContent:"space-between",
          padding:"10px",
          borderBottom:"1px solid #222"
        }}>
          <span>{u}</span>
          <span>{c}</span>
        </div>
      ))}
    </div>
  );
}
