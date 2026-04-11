import { useState, useEffect, useRef } from "react";

const ls = (k,d) => { try { const v=localStorage.getItem(k); return v?JSON.parse(v):d; } catch(e) { return d; } };
const ss = (k,v) => { try { localStorage.setItem(k,JSON.stringify(v)); } catch(e) {} };

const MENU_DEFAULT = [
  {id:1,name:"Caprese Verde",cat:"Vegetarian",price:27,cost:7.40},
  {id:2,name:"Mediterraneo VG",cat:"Vegetarian",price:22,cost:3.78},
  {id:3,name:"LA TRICOLORE",cat:"Vegetarian",price:26,cost:6.52},
  {id:4,name:"Quattro Formaggi",cat:"Vegetarian",price:29,cost:8.10},
  {id:5,name:"Mortazza Fresca",cat:"Mortadella",price:28,cost:7.70},
  {id:6,name:"ANTICO ROSSO",cat:"Mortadella",price:28,cost:6.95},
  {id:7,name:"Mortazza Rossa",cat:"Mortadella",price:28,cost:6.94},
  {id:8,name:"Mortadella Classica",cat:"Mortadella",price:27,cost:5.81},
  {id:9,name:"LA PARADISO",cat:"Mortadella",price:29,cost:7.18},
  {id:10,name:"Bologna Tartufo",cat:"Milano & Salsiccia",price:31,cost:6.43},
  {id:11,name:"Milano e Sole",cat:"Milano & Salsiccia",price:28,cost:7.38},
  {id:12,name:"Salsiccia Picante",cat:"Milano & Salsiccia",price:29,cost:6.95},
  {id:13,name:"Salsiccia Rustica",cat:"Milano & Salsiccia",price:31,cost:5.73},
  {id:14,name:"Dolce Piccante",cat:"Prosciutto",price:31,cost:9.26},
  {id:15,name:"LA PRIMAVERA",cat:"Prosciutto",price:28,cost:7.68},
  {id:16,name:"Prosciutto Dolce-Salato",cat:"Prosciutto",price:29,cost:9.85},
  {id:17,name:"Prosciutto Royale",cat:"Prosciutto",price:33,cost:8.28},
];

const SUP_DEFAULT = [
  {id:1,name:"შპს ბლექ სი დისტრიბუშენი",contact:"ნინო",tel1:"568-68-60-07",tel2:"",minOrder:null,phones:["568-68-60-07"],phoneLabels:["ნინო"]},
  {id:2,name:"შპს ბლექ სი (სალსიჩა)",contact:"ბლექ სი",tel1:"568-68-60-07",tel2:"",minOrder:null,phones:["568-68-60-07"],phoneLabels:[]},
  {id:3,name:"შპს მამუ (პური)",contact:"მამუ",tel1:"+995 568 68 60 07",tel2:"",minOrder:null,phones:["+995 568 68 60 07"],phoneLabels:[]},
  {id:4,name:"შპს ბლეც სი",contact:"",tel1:"568-68-60-07",tel2:"",minOrder:null,phones:[],phoneLabels:[]},
  {id:5,name:"შპს ჯოია მია (დიეგო)",contact:"დიეგო",tel1:"599-30-55-30",tel2:"577-11-05-62",minOrder:null,phones:["599-30-55-30","577-11-05-62"],phoneLabels:["დიეგო","ოფისი"]},
  {id:6,name:"შპს დიპლომატ ჯორჯია",contact:"",tel1:"შეავსე",tel2:"",minOrder:null,phones:[],phoneLabels:[]},
  {id:7,name:"შპს მაია კო",contact:"მაია",tel1:"შეავსე",tel2:"",minOrder:null,phones:[],phoneLabels:[]},
  {id:8,name:"შპს ჯეო-კოოპი",contact:"",tel1:"შეავსე",tel2:"",minOrder:null,phones:[],phoneLabels:[]},
  {id:9,name:"შპს ფოია მია",contact:"",tel1:"შეავსე",tel2:"",minOrder:null,phones:[],phoneLabels:[]},
  {id:10,name:"შპს ფრუქტი",contact:"",tel1:"შეავსე",tel2:"",minOrder:null,phones:[],phoneLabels:[]},
  {id:11,name:"შპს ლაქტი",contact:"",tel1:"შეავსე",tel2:"",minOrder:null,phones:[],phoneLabels:[]},
  {id:12,name:"შპს საგარეჯო",contact:"",tel1:"შეავსე",tel2:"",minOrder:null,phones:[],phoneLabels:[]},
  {id:13,name:"მაია მოდებაძე (ბაზარი)",contact:"მაია",tel1:"557-20-67-69",tel2:"",minOrder:null,phones:["557-20-67-69"],phoneLabels:["მაია"]},
  {id:19,name:"ბაზარი",contact:"—",tel1:"",tel2:"",minOrder:null,cat:"ბაზარი",phones:[],phoneLabels:[]},
];

const PROD_DEFAULT = [
  {id:"p1",name:"სალიამი მილანო",cat:"ხორცი",unit:"kg",price:36.44,loss:null,vat:false,sid:1,alt:null},
  {id:"p2",name:"სალიამი სალსიჩა",cat:"ხორცი",unit:"kg",price:35.59,loss:null,vat:false,sid:1,alt:null},
  {id:"p3",name:"ლურჯი ობიანი",cat:"რძის პროდ.",unit:"kg",price:37.00,loss:null,vat:false,sid:1,alt:null},
  {id:"p4",name:"ტრუფელის კრემი",cat:"სოუსი",unit:"kg",price:65.44,loss:null,vat:false,sid:5,alt:1},
  {id:"p5",name:"ზეითუნის ზეთი",cat:"სოუსი",unit:"l",price:15.59,loss:null,vat:false,sid:1,alt:null},
  {id:"p6",name:"ბაზილიკი",cat:"ბოსტნეული",unit:"kg",price:80.01,loss:null,vat:false,sid:13,alt:null},
  {id:"p7",name:"რუკოლა",cat:"ბოსტნეული",unit:"kg",price:15.01,loss:null,vat:false,sid:13,alt:null},
  {id:"p8",name:"ჩერი პომიდ.",cat:"ბოსტნეული",unit:"kg",price:8.72,loss:null,vat:false,sid:13,alt:null},
  {id:"p9",name:"მჭება გამ. პომ.",cat:"ბოსტნეული",unit:"kg",price:17.42,loss:null,vat:false,sid:6,alt:null},
  {id:"p10",name:"არტიშოკი",cat:"ბოსტნეული",unit:"kg",price:17.21,loss:null,vat:false,sid:6,alt:null},
  {id:"p11",name:"ბალზამიკო",cat:"სოუსი",unit:"l",price:26.42,loss:null,vat:false,sid:6,alt:null},
  {id:"p12",name:"ზეითისხილი Coopoliva",cat:"სოუსი",unit:"pcs",price:14.3,loss:null,vat:false,sid:8,alt:null},
];

const STAFF_DEFAULT = [
  {id:1,name:"მენეჯერი",salary:3903,role:"manager",phone:"",account:"",pid:"",address:"",note:"",duties:[]},
  {id:2,name:"მზარეული 1",salary:1561,role:"cook",phone:"",account:"",pid:"",address:"",note:"",duties:[]},
  {id:3,name:"მზარეული 2",salary:1561,role:"cook",phone:"",account:"",pid:"",address:"",note:"",duties:[]},
  {id:4,name:"ბარისტა 1",salary:1366,role:"barista",phone:"",account:"",pid:"",address:"",note:"",duties:[]},
  {id:5,name:"ბარისტა 2",salary:1366,role:"barista",phone:"",account:"",pid:"",address:"",note:"",duties:[]},
  {id:6,name:"დამლაგებელი 1",salary:1366,role:"cleaner",phone:"",account:"",pid:"",address:"",note:"",duties:[]},
  {id:7,name:"დამლაგებელი 2",salary:1366,role:"cleaner",phone:"",account:"",pid:"",address:"",note:"",duties:[]},
];

const FC_DEFAULT = [
  {label:"SMM Boost",amount:5085},
  {label:"SMM ხელფასი",amount:3252},
  {label:"ქირა",amount:2797},
  {label:"ელ. ენერგია",amount:1271},
  {label:"წყალი",amount:424},
  {label:"ბუღალტერი",amount:1041},
  {label:"Software",amount:318},
  {label:"დალაგება",amount:169},
  {label:"უსაფრთხოება",amount:70},
  {label:"ინტერნეტი",amount:100},
  {label:"Superfina",amount:127},
  {label:"დეზინფექცია",amount:150},
  {label:"სახარჯი მასალა",amount:500},
  {label:"გაუთვალისწინებელი",amount:1000},
];

const DEL_COM=0.27, DEL_MARKUP=4;
const PROD_CATS=["ყველა","პური","ხორცი","რძის პროდ.","ბოსტნეული","სოუსი","კაკალი","ყავა","დესერტი","საყოფაცხოვრებო"];
const CAT_COL={"პური":"#fb923c","ხორცი":"#f472b6","რძის პროდ.":"#67e8f9","ბოსტნეული":"#4ade80","სოუსი":"#c9a227","კაკალი":"#a78bfa","ყავა":"#fb923c","დესერტი":"#818cf8","საყოფაცხოვრებო":"#34d399"};
const TABS=["📋 დავ.","Dashboard","მენიუ","🧾 პროდუქტები","🛒 შეკვეთები","მომწოდ.","💰 Fixed Costs","🏛 სტრუქტურა","AI"];

export default function App() {
  const [tab,setTab]=useState("📋 დავ.");
  const [menu,setMenu]=useState(()=>ls("foc_menu_v2",MENU_DEFAULT));
  const [products,setProducts]=useState(()=>ls("foc_prod_v5",PROD_DEFAULT));
  const [suppliers,setSuppliers]=useState(()=>ls("foc_sup_v3",SUP_DEFAULT));
  const [staffList,setStaffList]=useState(()=>ls("foc_staff_v1",STAFF_DEFAULT));
  const [fixedCosts,setFixedCosts]=useState(()=>ls("foc_fixed_v1",FC_DEFAULT));
  const [orders,setOrders]=useState(()=>ls("foc_orders_v1",[]));
  const [orderHistory,setOrderHistory]=useState(()=>ls("foc_order_hist_v1",[]));
  const [inventory,setInventory]=useState(()=>ls("foc_inv_v1",{}));
  const [minStocks,setMinStocks]=useState(()=>ls("foc_minstock_v1",{}));
  const [tasks,setTasks]=useState(()=>ls("foc_tasks_v2",[]));
  const [newTask,setNewTask]=useState("");
  const [prodCat,setProdCat]=useState("ყველა");
  const [invSearch,setInvSearch]=useState("");
  const [supSearch,setSupSearch]=useState("");
  const [supFilter,setSupFilter]=useState(null);
  const [supCatFilter,setSupCatFilter]=useState("ყველა");
  const [editingId,setEditingId]=useState(null);
  const [selectedProduct,setSelectedProduct]=useState(null);
  const [selectedStaff,setSelectedStaff]=useState(null);
  const [dashDetail,setDashDetail]=useState(null);
  const [editingCostId,setEditingCostId]=useState(null);
  const [showOrderHistory,setShowOrderHistory]=useState(false);
  const [aiMessages,setAiMessages]=useState([{role:"assistant",text:"გამარჯობა დავით! Focacceria-ს ბიზნეს ასისტენტი ვარ. რა გაინტერესებს?"}]);
  const [aiInput,setAiInput]=useState("");
  const [aiLoading,setAiLoading]=useState(false);
  const [household,setHousehold]=useState(()=>ls("foc_household_v1",[]));
  const [newHouseItem,setNewHouseItem]=useState({name:"",qty:"",unit:"ც",minQty:""});
  const [houseSearch,setHouseSearch]=useState("");
  const [addingProduct,setAddingProduct]=useState(false);
  const [addingSupplier,setAddingSupplier]=useState(false);
  const [nf,setNf]=useState({name:"",cat:"ხორცი",unit:"kg",price:"",loss:"",vat:false,sid:"",sidName:""});
  const [sf,setSf]=useState({name:"",contact:"",tel1:"",tel2:"",minOrder:""});
  const [orderForm,setOrderForm]=useState({item:"",qty:"",unit:"",note:""});
  const [attendance,setAttendance]=useState(()=>ls("foc_attendance_v1",{}));
  const [attMonth,setAttMonth]=useState(new Date().toISOString().slice(0,7));
  const [orgNodes,setOrgNodes]=useState(()=>ls("foc_org_v1",[
    {id:"f1",label:"დამფუძნებელი 1",sublabel:"მენეჯერი",color:"#c9a227",x:120,y:30,comment:""},
    {id:"f2",label:"დამფუძნებელი 2",sublabel:"მენეჯერი",color:"#c9a227",x:360,y:30,comment:""},
    {id:"k",label:"სამზარეულო",sublabel:"",color:"#fb923c",x:60,y:160,comment:""},
    {id:"b",label:"ბარი",sublabel:"",color:"#818cf8",x:240,y:160,comment:""},
    {id:"h",label:"დარბაზი",sublabel:"სტუმრები",color:"#4ade80",x:420,y:160,comment:""},
    {id:"c1",label:"მზარეული 1",sublabel:"",color:"#fb923c",x:30,y:290,comment:""},
    {id:"c2",label:"მზარეული 2",sublabel:"",color:"#fb923c",x:170,y:290,comment:""},
    {id:"bar1",label:"ბარისტა 1",sublabel:"",color:"#818cf8",x:310,y:290,comment:""},
    {id:"bar2",label:"ბარისტა 2",sublabel:"",color:"#818cf8",x:430,y:290,comment:""},
    {id:"cl",label:"დამლაგებელი",sublabel:"საწყობი",color:"#67e8f9",x:200,y:420,comment:""},
  ]));
  const [orgEdges,setOrgEdges]=useState(()=>ls("foc_org_edges_v1",[
    {from:"f1",to:"k"},{from:"f1",to:"b"},{from:"f2",to:"h"},{from:"f2",to:"b"},
    {from:"k",to:"c1"},{from:"k",to:"c2"},{from:"b",to:"bar1"},{from:"b",to:"bar2"},
    {from:"c1",to:"cl"},{from:"bar1",to:"cl"},
  ]));
  const [dragNode,setDragNode]=useState(null);
  const [dragOffset,setDragOffset]=useState({x:0,y:0});
  const [editOrgNode,setEditOrgNode]=useState(null);
  const [orgMode,setOrgMode]=useState("view");
  const [connectFrom,setConnectFrom]=useState(null);
  const [reminderTime,setReminderTime]=useState(()=>localStorage.getItem("foc_reminder")||"09:00");
  const [reminderSaved,setReminderSaved]=useState(false);
  const [notifStatus,setNotifStatus]=useState("default");
  const orgRef=useRef(null);
  const chatRef=useRef(null);
  const timerRef=useRef(null);

  useEffect(()=>{ss("foc_menu_v2",menu);},[menu]);
  useEffect(()=>{ss("foc_prod_v5",products);},[products]);
  useEffect(()=>{ss("foc_sup_v3",suppliers);},[suppliers]);
  useEffect(()=>{ss("foc_staff_v1",staffList);},[staffList]);
  useEffect(()=>{ss("foc_fixed_v1",fixedCosts);},[fixedCosts]);
  useEffect(()=>{ss("foc_orders_v1",orders);},[orders]);
  useEffect(()=>{ss("foc_order_hist_v1",orderHistory);},[orderHistory]);
  useEffect(()=>{ss("foc_attendance_v1",attendance);},[attendance]);
  useEffect(()=>{ss("foc_household_v1",household);},[household]);
  useEffect(()=>{ss("foc_org_v1",orgNodes);},[orgNodes]);
  useEffect(()=>{ss("foc_org_edges_v1",orgEdges);},[orgEdges]);
  useEffect(()=>{ss("foc_tasks_v2",tasks);},[tasks]);
  useEffect(()=>{
    if("Notification"in window)setNotifStatus(Notification.permission);
    timerRef.current=setInterval(()=>{
      const now=new Date();
      const cur=String(now.getHours()).padStart(2,"0")+":"+String(now.getMinutes()).padStart(2,"0");
      if(cur===localStorage.getItem("foc_reminder")&&Notification.permission==="granted"){
        const p=ls("foc_tasks_v2",[]).filter(t=>!t.done);
        if(p.length)new Notification("Focacceria",{body:p.slice(0,3).map(t=>"• "+t.text).join("\n")});
      }
    },60000);
    return()=>clearInterval(timerRef.current);
  },[]);
  useEffect(()=>{
    if(chatRef.current)chatRef.current.scrollIntoView({behavior:"smooth"});
  },[aiMessages]);

  const totalWages=staffList.reduce((s,e)=>s+e.salary,0);
  const totalFixed=totalWages+fixedCosts.reduce((s,c)=>s+(parseFloat(c.amount)||0),0);
  const breakEven=totalFixed/30;
  const avgCOGS=menu.reduce((s,m)=>s+m.cost,0)/menu.length;
  const avgOnsite=menu.reduce((s,m)=>s+m.price,0)/menu.length;
  const avgDelPrice=menu.reduce((s,m)=>s+m.price+DEL_MARKUP,0)/menu.length;
  const avgRevPerSandwich=avgOnsite*0.2+avgDelPrice*(1-DEL_COM)*0.8;
  const grossPerSandwich=avgRevPerSandwich-avgCOGS;
  const breakEvenSandwiches=Math.ceil(breakEven/grossPerSandwich);
  const lowItems=products.filter(p=>{const c=parseFloat(inventory[p.id]||0),mn=parseFloat(minStocks[p.id]||0);return mn>0&&c<=mn;});
  const supName=(id)=>{const s=suppliers.find(x=>x.id===id);return s?s.name:"—";};
  const updateProd=(id,field,val)=>setProducts(p=>p.map(x=>x.id===id?{...x,[field]:val}:x));

  const handleAI=async()=>{
    if(!aiInput.trim()||aiLoading)return;
    const msg=aiInput.trim();setAiInput("");
    setAiMessages(p=>[...p,{role:"user",text:msg}]);
    setAiLoading(true);
    const menuStr=menu.map(m=>m.name+":"+m.price+"₾/COGS"+m.cost+"₾").join(", ");
    const sys="Focacceria ბიზნეს ასისტენტი. თბილისი. მენიუ:"+menuStr+". Break-even:"+breakEvenSandwiches+"სენდვ/დღე. ხარჯი:"+totalFixed+"₾/თვე. პასუხი ქართულად, მოკლე.";
    try{
      const h=aiMessages.slice(-6).map(m=>({role:m.role==="user"?"user":"assistant",content:m.text}));
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:600,system:sys,messages:[...h,{role:"user",content:msg}]})});
      const d=await r.json();
      setAiMessages(p=>[...p,{role:"assistant",text:d.content?.map(b=>b.text||"").join("")||"შეცდომა."}]);
    }catch(e){setAiMessages(p=>[...p,{role:"assistant",text:"კავშირის შეცდომა."}]);}
    setAiLoading(false);
  };

  const C={background:"#1a1510",border:"1px solid #2a2018",borderRadius:12,padding:16,marginBottom:10};
  const inp={background:"#0f0e0c",border:"1px solid #3d2d10",borderRadius:6,padding:"5px 8px",color:"#f5f0e8",fontSize:12,fontFamily:"inherit",outline:"none"};

  return (
<div style={{fontFamily:"Georgia,serif",background:"#0f0e0c",minHeight:"100vh",color:"#f5f0e8"}}>
<style>{`*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#3d2d10;border-radius:2px}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none}input[type=number]{-moz-appearance:textfield}`}</style>

{/* HEADER */}
<div style={{background:"linear-gradient(135deg,#1a1208,#2d1f0a)",borderBottom:"1px solid #3d2d10",padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div>
<div style={{fontSize:9,letterSpacing:4,color:"#c9a227",textTransform:"uppercase"}}>Focacceria · თბილისი</div>
<div style={{fontSize:17,fontWeight:"bold"}}>Business Dashboard</div>
</div>
<div style={{textAlign:"right"}}>
<div style={{fontSize:9,color:"#8a7355"}}>დღეს</div>
<div style={{fontSize:17,color:"#c9a227",fontWeight:"bold"}}>0₾</div>
{lowItems.length>0&&<div style={{fontSize:9,color:"#ef4444"}}>⚠ {lowItems.length} მარაგი</div>}
</div>
</div>

{/* TABS */}
<div style={{display:"flex",overflowX:"auto",borderBottom:"1px solid #2a2018",background:"#0f0e0c"}}>
{TABS.map(t=>(
<button key={t} onClick={()=>setTab(t)} style={{padding:"10px 12px",background:"transparent",border:"none",borderBottom:tab===t?"2px solid #c9a227":"2px solid transparent",color:tab===t?"#c9a227":"#6b5a3e",cursor:"pointer",fontSize:11,fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0}}>
{t}
</button>
))}
</div>

<div style={{padding:12,maxWidth:900,margin:"0 auto"}}>

{/* TASKS TAB */}
{tab==="📋 დავ."&&(
<div>
<div style={C}>
<div style={{fontSize:10,color:"#c9a227",marginBottom:8,letterSpacing:2,textTransform:"uppercase"}}>⏰ REMINDER</div>
<div style={{display:"flex",gap:8,alignItems:"center"}}>
<input type="time" value={reminderTime} onChange={e=>setReminderTime(e.target.value)} style={{...inp,fontSize:13,color:"#c9a227"}}/>
<button onClick={()=>{localStorage.setItem("foc_reminder",reminderTime);setReminderSaved(true);setTimeout(()=>setReminderSaved(false),2000);}} style={{padding:"5px 12px",background:reminderSaved?"#4ade8020":"#c9a22720",border:"1px solid "+(reminderSaved?"#4ade80":"#c9a227"),borderRadius:6,color:reminderSaved?"#4ade80":"#c9a227",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>{reminderSaved?"✓ შენახულია":"შენახვა"}</button>
<button onClick={async()=>{if(!("Notification"in window))return;const p=await Notification.requestPermission();setNotifStatus(p);}} style={{padding:"5px 12px",background:"#2a2018",border:"1px solid #3d2d10",borderRadius:6,color:notifStatus==="granted"?"#4ade80":"#c9a227",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>{notifStatus==="granted"?"🔔 ჩართულია":"🔔 ჩართვა"}</button>
</div>
</div>
<div style={C}>
<div style={{display:"flex",gap:8,marginBottom:10}}>
<input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newTask.trim()){setTasks(p=>[...p,{id:Date.now(),text:newTask.trim(),done:false}]);setNewTask("");}}} placeholder="შეიყვანე დავალება..." style={{...inp,flex:1,padding:"9px 12px"}}/>
<button onClick={()=>{if(newTask.trim()){setTasks(p=>[...p,{id:Date.now(),text:newTask.trim(),done:false}]);setNewTask("");}}} style={{padding:"9px 14px",background:"#c9a227",border:"none",borderRadius:8,color:"#0f0e0c",cursor:"pointer",fontSize:16,fontWeight:"bold",fontFamily:"inherit"}}>+</button>
</div>
{tasks.map(t=>(
<div key={t.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:"1px solid #1f1810"}}>
<input type="checkbox" checked={t.done} onChange={()=>setTasks(p=>p.map(x=>x.id===t.id?{...x,done:!x.done}:x))} style={{accentColor:"#c9a227",width:15,height:15,cursor:"pointer"}}/>
<span style={{flex:1,fontSize:13,color:t.done?"#6b5a3e":"#f5f0e8",textDecoration:t.done?"line-through":"none"}}>{t.text}</span>
<button onClick={()=>setTasks(p=>p.filter(x=>x.id!==t.id))} style={{background:"transparent",border:"none",color:"#6b5a3e",cursor:"pointer",fontSize:14,padding:"0 4px"}}>×</button>
</div>
))}
{tasks.length===0&&<div style={{textAlign:"center",color:"#6b5a3e",fontSize:12,padding:16}}>დავალებები არ არის</div>}
</div>
</div>
)}

{/* DASHBOARD TAB */}
{tab==="Dashboard"&&(
<div>
<div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:9,marginBottom:10}}>
{[
{l:"ყოველთვ. ხარჯი",v:totalFixed.toLocaleString()+"₾",s:"ფიქსირებული",c:"#ef4444",detail:"costs"},
{l:"ბრეიქ-ივენი",v:breakEvenSandwiches+" სენდვ./დღე",s:"≈"+Math.round(breakEvenSandwiches*avgRevPerSandwich)+"₾ შემ.",c:"#fb923c",detail:"breakeven"},
{l:"Delivery / On-site",v:"80% / 20%",s:"Glovo · Wolt · 27% კომ.",c:"#818cf8",detail:"delivery"},
{l:"საშ. მარჟა",v:Math.round(menu.reduce((s,m)=>(m.price-m.cost)/m.price*100+s,0)/menu.length)+"%",s:"delivery: ~70%",c:"#c9a227",detail:"margin"},
].map(k=>(
<div key={k.l} onClick={()=>setDashDetail(dashDetail===k.detail?null:k.detail)} style={{...C,cursor:"pointer",borderColor:dashDetail===k.detail?"#c9a22780":"#2a2018"}}>
<div style={{fontSize:9,color:"#6b5a3e",marginBottom:3,textTransform:"uppercase",letterSpacing:1}}>{k.l}</div>
<div style={{fontSize:20,fontWeight:"bold",color:k.c}}>{k.v}</div>
<div style={{fontSize:9,color:"#8a7355",marginTop:2}}>{k.s}</div>
<div style={{fontSize:9,color:"#6b5a3e",marginTop:3}}>{dashDetail===k.detail?"▲":"▼ დეტ."}</div>
</div>
))}
</div>
{dashDetail==="costs"&&(
<div style={{...C,borderColor:"#ef444440",marginBottom:10}}>
<div style={{fontSize:10,color:"#ef4444",marginBottom:10,letterSpacing:2,textTransform:"uppercase"}}>ყოველთვიური ხარჯი</div>
<div style={{fontSize:12,color:"#8a7355",marginBottom:8}}>ხელფასები: <span style={{color:"#f5f0e8"}}>{totalWages}₾</span></div>
{fixedCosts.map((c,i)=>(
<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid #1a1510",fontSize:12}}>
<span style={{color:"#8a7355"}}>{c.label}</span>
<span style={{color:"#f5f0e8",fontWeight:"bold"}}>{parseFloat(c.amount).toLocaleString()}₾</span>
</div>
))}
<div style={{display:"flex",justifyContent:"space-between",marginTop:8,paddingTop:8,borderTop:"1px solid #3d2d10",fontSize:13}}>
<span style={{color:"#ef4444",fontWeight:"bold"}}>სულ</span>
<span style={{color:"#ef4444",fontWeight:"bold"}}>{totalFixed.toLocaleString()}₾</span>
</div>
<button onClick={()=>setTab("💰 Fixed Costs")} style={{marginTop:10,width:"100%",padding:"6px",background:"#2a2018",border:"1px solid #3d2d10",borderRadius:6,color:"#c9a227",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>✏ Fixed Costs-ში შეცვლა →</button>
</div>
)}
{dashDetail==="breakeven"&&(
<div style={{...C,borderColor:"#fb923c40",marginBottom:10}}>
<div style={{fontSize:10,color:"#fb923c",marginBottom:10,letterSpacing:2,textTransform:"uppercase"}}>ბრეიქ-ივენი</div>
{[{l:"საშ. COGS/სენდვ.",v:avgCOGS.toFixed(2)+"₾"},{l:"საშ. on-site ფასი",v:avgOnsite.toFixed(2)+"₾"},{l:"საშ. delivery ფასი",v:avgDelPrice.toFixed(2)+"₾"},{l:"საშ. შემ./სენდვ. (80/20)",v:avgRevPerSandwich.toFixed(2)+"₾"},{l:"Gross profit/სენდვ.",v:grossPerSandwich.toFixed(2)+"₾"},{l:"ფიქს. ხარჯი/დღე",v:Math.round(breakEven)+"₾"},{l:"Break-even",v:breakEvenSandwiches+" სენდვ./დღე",bold:true}].map(r=>(
<div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #1a1510",fontSize:12}}>
<span style={{color:"#8a7355"}}>{r.l}</span>
<span style={{color:r.bold?"#fb923c":"#f5f0e8",fontWeight:r.bold?"bold":"normal"}}>{r.v}</span>
</div>
))}
</div>
)}
{dashDetail==="delivery"&&(
<div style={{...C,borderColor:"#818cf840",marginBottom:10}}>
<div style={{fontSize:10,color:"#818cf8",marginBottom:10,letterSpacing:2,textTransform:"uppercase"}}>Delivery მარჟა</div>
{[...menu].sort((a,b)=>{const da=((a.price+DEL_MARKUP)*(1-DEL_COM)-a.cost)/((a.price+DEL_MARKUP)*(1-DEL_COM));const db=((b.price+DEL_MARKUP)*(1-DEL_COM)-b.cost)/((b.price+DEL_MARKUP)*(1-DEL_COM));return db-da;}).map(m=>{
const dp=m.price+DEL_MARKUP;const dr=dp*(1-DEL_COM);const dm=Math.round((dr-m.cost)/dr*100);const dmc=dm>=70?"#4ade80":dm>=60?"#c9a227":"#ef4444";
return(<div key={m.id} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #1a1510",fontSize:11}}><span style={{color:"#8a7355"}}>{m.name}</span><span>{m.price}₾ → {dp}₾ · <span style={{color:dmc}}>{dm}%</span></span></div>);
})}
</div>
)}
{dashDetail==="margin"&&(
<div style={{...C,borderColor:"#c9a22740",marginBottom:10}}>
<div style={{fontSize:10,color:"#c9a227",marginBottom:10,letterSpacing:2,textTransform:"uppercase"}}>მარჟა — ყველა სენდვიჩი</div>
{[...menu].sort((a,b)=>(b.price-b.cost)/b.price-(a.price-a.cost)/a.price).map(m=>{
const mg=Math.round((m.price-m.cost)/m.price*100);const mc=mg>75?"#4ade80":mg>65?"#c9a227":"#ef4444";
return(<div key={m.id} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #1a1510",fontSize:11}}><span style={{color:"#8a7355"}}>{m.name}</span><span style={{color:mc,fontWeight:"bold"}}>{mg}%</span></div>);
})}
<button onClick={()=>setTab("მენიუ")} style={{marginTop:10,width:"100%",padding:"6px",background:"#2a2018",border:"1px solid #3d2d10",borderRadius:6,color:"#c9a227",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>✏ მენიუში შეცვლა →</button>
</div>
)}
{lowItems.length>0&&(
<div style={{...C,borderColor:"#ef444440"}}>
<div style={{fontSize:10,color:"#ef4444",marginBottom:8,letterSpacing:2,textTransform:"uppercase"}}>🚨 შეუკვეთე ({lowItems.length})</div>
{lowItems.map(p=>{const s=suppliers.find(x=>x.id===p.sid);return(
<div key={p.id} style={{padding:"7px 0",borderBottom:"1px solid #2a1510"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
<span style={{fontSize:12,fontWeight:"bold",color:"#ef4444"}}>{p.name}</span>
<span style={{fontSize:10,color:"#8a7355"}}>{inventory[p.id]||0}/{minStocks[p.id]||0} {p.unit}</span>
</div>
<div style={{fontSize:11,color:"#c9a227"}}>{s?.name}</div>
</div>
);
})}
</div>
)}
</div>
)}

{/* MENU TAB */}
{tab==="მენიუ"&&(
<div>
{["Vegetarian","Mortadella","Milano & Salsiccia","Prosciutto"].map(cat=>(
<div key={cat} style={C}>
<div style={{fontSize:10,color:"#c9a227",marginBottom:8,letterSpacing:2,textTransform:"uppercase"}}>{cat}</div>
{menu.filter(m=>m.cat===cat).map(m=>{
const mg=(m.price-m.cost)/m.price*100;const mc=mg>75?"#4ade80":mg>65?"#c9a227":"#ef4444";
const dp=m.price+DEL_MARKUP;const dr=dp*(1-DEL_COM);const dmc=Math.round((dr-m.cost)/dr*100);
const isEdit=editingId===("menu_"+m.id);
return(
<div key={m.id} style={{padding:"8px 0",borderBottom:"1px solid #1f1810"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{flex:1}}>
<div style={{fontSize:13,fontWeight:"bold"}}>{m.name}</div>
<div style={{fontSize:10,color:"#6b5a3e",marginTop:2}}>COGS: {m.cost}₾ · <span style={{color:mc}}>{Math.round(mg)}% მარჟა</span> · del: <span style={{color:dmc>0?"#818cf8":"#ef4444"}}>{dmc}%</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:6}}>
{isEdit?(
<div style={{display:"flex",alignItems:"center",gap:4}}>
<input type="number" defaultValue={m.price} onBlur={e=>updateMenu?setMenu(p=>p.map(x=>x.id===m.id?{...x,price:parseFloat(e.target.value)||x.price}:x)):null} style={{...inp,width:56,textAlign:"center",color:"#c9a227"}}/>
<span style={{color:"#c9a227",fontSize:12}}>₾</span>
<input type="number" defaultValue={m.cost} onBlur={e=>setMenu(p=>p.map(x=>x.id===m.id?{...x,cost:parseFloat(e.target.value)||x.cost}:x))} style={{...inp,width:56,textAlign:"center",color:"#fb923c"}}/>
<span style={{color:"#fb923c",fontSize:12}}>₾</span>
<button onClick={()=>setEditingId(null)} style={{padding:"3px 8px",background:"#c9a227",border:"none",borderRadius:5,color:"#0f0e0c",cursor:"pointer",fontSize:10,fontWeight:"bold",fontFamily:"inherit"}}>✓ OK</button>
</div>
):(
<div style={{display:"flex",alignItems:"center",gap:6}}>
<span style={{fontSize:16,fontWeight:"bold",color:"#c9a227"}}>{m.price}₾</span>
<button onClick={()=>setEditingId("menu_"+m.id)} style={{padding:"2px 7px",background:"#2a2018",border:"1px solid #3d2d10",borderRadius:5,color:"#6b5a3e",cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>✏</button>
</div>
)}
</div>
</div>
</div>
);
})}
</div>
))}
</div>
)}

{/* PRODUCTS TAB */}
{tab==="🧾 პროდუქტები"&&(
<div>
{selectedProduct?(
<div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
<button onClick={()=>{const{_orig,...s}=selectedProduct;setProducts(p=>p.map(x=>x.id===s.id?s:x));setSelectedProduct(null);}} style={{padding:"7px 16px",background:"#c9a227",border:"none",borderRadius:7,color:"#0f0e0c",cursor:"pointer",fontSize:12,fontWeight:"bold",fontFamily:"inherit"}}>✓ შენახვა</button>
<button onClick={()=>setSelectedProduct(null)} style={{padding:"7px 16px",background:"transparent",border:"1px solid #3d2d10",borderRadius:7,color:"#6b5a3e",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>← გაუქმება</button>
</div>
<div style={C}>
<div style={{fontSize:10,color:"#6b5a3e",marginBottom:3}}>სახელი</div>
<input value={selectedProduct.name||""} onChange={e=>setSelectedProduct(p=>({...p,name:e.target.value}))} style={{...inp,width:"100%",fontSize:14,fontWeight:"bold",border:"1px solid #c9a227",marginBottom:12,boxSizing:"border-box"}}/>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
<div><div style={{fontSize:10,color:"#6b5a3e",marginBottom:3}}>კატეგორია</div>
<select value={selectedProduct.cat||""} onChange={e=>setSelectedProduct(p=>({...p,cat:e.target.value}))} style={{...inp,width:"100%",boxSizing:"border-box"}}>
{PROD_CATS.filter(c=>c!=="ყველა").map(c=><option key={c} value={c}>{c}</option>)}
</select></div>
<div><div style={{fontSize:10,color:"#6b5a3e",marginBottom:3}}>ერთეული</div>
<select value={selectedProduct.unit||"kg"} onChange={e=>setSelectedProduct(p=>({...p,unit:e.target.value}))} style={{...inp,width:"100%",boxSizing:"border-box"}}>
{["kg","l","pcs","g","ml"].map(u=><option key={u} value={u}>{u}</option>)}
</select></div>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
<div><div style={{fontSize:10,color:"#6b5a3e",marginBottom:3}}>ფასი</div><input type="number" value={selectedProduct.price||""} onChange={e=>setSelectedProduct(p=>({...p,price:parseFloat(e.target.value)||null}))} style={{...inp,width:"100%",boxSizing:"border-box"}}/></div>
<div><div style={{fontSize:10,color:"#6b5a3e",marginBottom:3}}>დანაკარგი %</div><input type="number" value={selectedProduct.loss||""} onChange={e=>setSelectedProduct(p=>({...p,loss:parseFloat(e.target.value)||null}))} style={{...inp,width:"100%",boxSizing:"border-box"}}/></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,background:"#0f0e0c",borderRadius:8,padding:"7px 12px",cursor:"pointer"}} onClick={()=>setSelectedProduct(p=>({...p,vat:!p.vat}))}>
<span style={{fontSize:12,color:"#6b5a3e",flex:1}}>დღგ 18%</span>
<span style={{color:selectedProduct.vat?"#4ade80":"#6b5a3e"}}>{selectedProduct.vat?"კი":"არა"}</span>
</div>
<div style={{fontSize:10,color:"#6b5a3e",marginBottom:3}}>მომწოდებელი</div>
<select value={selectedProduct.sid||""} onChange={e=>setSelectedProduct(p=>({...p,sid:parseInt(e.target.value)||null}))} style={{...inp,width:"100%",boxSizing:"border-box",marginBottom:8}}>
<option value="">— აირჩიე</option>
{suppliers.map(s=><option key={s.id} value={s.id}>#{s.id} {s.name}</option>)}
</select>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
<div><div style={{fontSize:10,color:"#6b5a3e",marginBottom:3}}>მაქვს</div><input type="number" value={inventory[selectedProduct.id]||""} onChange={e=>setInventory(p=>({...p,[selectedProduct.id]:e.target.value}))} style={{...inp,width:"100%",boxSizing:"border-box"}}/></div>
<div><div style={{fontSize:10,color:"#6b5a3e",marginBottom:3}}>მინ. მარაგი</div><input type="number" value={minStocks[selectedProduct.id]||""} onChange={e=>setMinStocks(p=>({...p,[selectedProduct.id]:e.target.value}))} style={{...inp,width:"100%",boxSizing:"border-box"}}/></div>
</div>
</div>
</div>
):(
<div>
{lowItems.length>0&&<div style={{...C,borderColor:"#ef444440",marginBottom:10}}>
<div style={{fontSize:10,color:"#ef4444",marginBottom:8,letterSpacing:2,textTransform:"uppercase"}}>🚨 შეუკვეთე ({lowItems.length})</div>
{lowItems.map(p=>{const s=suppliers.find(x=>x.id===p.sid);return(
<div key={p.id} style={{padding:"6px 0",borderBottom:"1px solid #2a1510",cursor:"pointer"}} onClick={()=>setSelectedProduct({...p,_orig:{...p}})}>
<span style={{fontSize:12,fontWeight:"bold",color:"#ef4444"}}>{p.name} ↗</span>
<span style={{fontSize:10,color:"#c9a227",marginLeft:8}}>{s?.name}</span>
</div>
);
})}
</div>}
<div style={{display:"flex",gap:8,marginBottom:8}}>
<input value={invSearch} onChange={e=>{setInvSearch(e.target.value);setSupFilter(null);}} placeholder="ძებნა..." style={{...inp,flex:1,padding:"9px 12px",boxSizing:"border-box"}}/>
<button onClick={()=>setAddingProduct(true)} style={{padding:"9px 14px",background:"#c9a22720",border:"1px solid #c9a22750",borderRadius:8,color:"#c9a227",cursor:"pointer",fontSize:12,fontWeight:"bold",fontFamily:"inherit"}}>+ პროდუქტი</button>
</div>
<div style={{display:"flex",gap:5,marginBottom:10,flexWrap:"wrap"}}>
{PROD_CATS.map(c=><button key={c} onClick={()=>{setProdCat(c);setSupFilter(null);}} style={{padding:"3px 9px",background:prodCat===c?(CAT_COL[c]||"#c9a227"):"#2a2018",border:"none",borderRadius:20,color:prodCat===c?"#0f0e0c":"#8a7355",cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>{c}</button>)}
</div>
{addingProduct&&(
<div style={{...C,borderColor:"#c9a22750",marginBottom:10}}>
<div style={{fontSize:10,color:"#c9a227",marginBottom:10,letterSpacing:1,textTransform:"uppercase"}}>➕ ახალი პროდუქტი</div>
{(()=>{
const save=()=>{
if(!nf.name.trim())return;
let sid=parseInt(nf.sid)||null;
if(nf.sidName.trim()&&!sid){const newId=Math.max(...suppliers.map(s=>s.id),0)+1;const ns={id:newId,name:nf.sidName.trim(),contact:"—",tel1:"",tel2:"",minOrder:null,phones:[],phoneLabels:[]};setSuppliers(p=>[...p,ns]);sid=newId;}
setProducts(p=>[...p,{id:"p"+Date.now(),name:nf.name.trim(),cat:nf.cat,unit:nf.unit,price:parseFloat(nf.price)||null,loss:parseFloat(nf.loss)||null,vat:nf.vat,sid,alt:null}]);
setNf({name:"",cat:"ხორცი",unit:"kg",price:"",loss:"",vat:false,sid:"",sidName:""});
setAddingProduct(false);
};
return(<div>
<input value={nf.name} onChange={e=>setNf(p=>({...p,name:e.target.value}))} placeholder="სახელი *" style={{...inp,width:"100%",boxSizing:"border-box",marginBottom:8}} autoFocus/>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:8}}>
<select value={nf.cat} onChange={e=>setNf(p=>({...p,cat:e.target.value}))} style={{...inp,boxSizing:"border-box"}}>{PROD_CATS.filter(c=>c!=="ყველა").map(c=><option key={c} value={c}>{c}</option>)}</select>
<select value={nf.unit} onChange={e=>setNf(p=>({...p,unit:e.target.value}))} style={{...inp,boxSizing:"border-box"}}>{["kg","l","pcs","g","ml"].map(u=><option key={u} value={u}>{u}</option>)}</select>
<input type="number" value={nf.price} onChange={e=>setNf(p=>({...p,price:e.target.value}))} placeholder="ფასი₾" style={{...inp,boxSizing:"border-box"}}/>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}>
<input type="number" value={nf.loss} onChange={e=>setNf(p=>({...p,loss:e.target.value}))} placeholder="დანაკარგი%" style={{...inp,boxSizing:"border-box"}}/>
<select value={nf.sid} onChange={e=>setNf(p=>({...p,sid:e.target.value,sidName:""}))} style={{...inp,boxSizing:"border-box"}}>
<option value="">— მომწოდებელი</option>
{suppliers.map(s=><option key={s.id} value={s.id}>#{s.id} {s.name}</option>)}
</select>
</div>
{!nf.sid&&<input value={nf.sidName} onChange={e=>setNf(p=>({...p,sidName:e.target.value}))} placeholder="ახალი მომწოდებლის სახელი..." style={{...inp,width:"100%",boxSizing:"border-box",marginBottom:8}}/>}
<div style={{display:"flex",gap:8}}>
<button onClick={save} style={{flex:1,padding:"8px",background:nf.name.trim()?"#c9a227":"#2a2018",border:"none",borderRadius:7,color:nf.name.trim()?"#0f0e0c":"#6b5a3e",cursor:"pointer",fontSize:12,fontWeight:"bold",fontFamily:"inherit"}}>✓ შენახვა</button>
<button onClick={()=>setAddingProduct(false)} style={{padding:"8px 14px",background:"transparent",border:"1px solid #3d2d10",borderRadius:7,color:"#6b5a3e",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>გაუქმება</button>
</div>
</div>);
})()}
</div>
)}
{prodCat==="საყოფაცხოვრებო"?(
<div style={C}>
<div style={{fontSize:10,color:"#34d399",marginBottom:10,letterSpacing:2,textTransform:"uppercase"}}>🧹 საყოფაცხოვრებო</div>
<div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:6,marginBottom:6}}>
<input value={newHouseItem.name} onChange={e=>setNewHouseItem(p=>({...p,name:e.target.value}))} placeholder="სახელი..." style={{...inp,boxSizing:"border-box"}}/>
<input value={newHouseItem.qty} onChange={e=>setNewHouseItem(p=>({...p,qty:e.target.value}))} placeholder="რაოდ." style={{...inp,boxSizing:"border-box"}}/>
<input value={newHouseItem.unit} onChange={e=>setNewHouseItem(p=>({...p,unit:e.target.value}))} placeholder="ერთ." style={{...inp,boxSizing:"border-box"}}/>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
<input value={newHouseItem.minQty} onChange={e=>setNewHouseItem(p=>({...p,minQty:e.target.value}))} placeholder="მინ. ოდენობა" style={{...inp,boxSizing:"border-box"}}/>
<button onClick={()=>{if(!newHouseItem.name.trim())return;setHousehold(p=>[...p,{id:Date.now(),...newHouseItem,name:newHouseItem.name.trim()}]);setNewHouseItem({name:"",qty:"",unit:"ც",minQty:""}); }} style={{padding:"6px",background:"#34d39920",border:"1px solid #34d39950",borderRadius:6,color:"#34d399",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>+ დამატება</button>
</div>
<input value={houseSearch} onChange={e=>setHouseSearch(e.target.value)} placeholder="ძებნა..." style={{...inp,width:"100%",marginBottom:10,boxSizing:"border-box"}}/>
{household.filter(h=>!houseSearch||h.name.toLowerCase().includes(houseSearch.toLowerCase())).map((h,i)=>{
const isLow=h.minQty&&h.qty&&parseFloat(h.qty)<=parseFloat(h.minQty);
return(<div key={h.id} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 0",borderBottom:"1px solid #1f1810"}}>
<span style={{fontSize:9,color:"#6b5a3e",width:18,textAlign:"center"}}>#{i+1}</span>
<div style={{flex:1}}><div style={{fontSize:12,color:isLow?"#ef4444":"#f5f0e8"}}>{h.name}{isLow?" ⚠":""}</div><div style={{fontSize:9,color:"#6b5a3e"}}>{h.unit}{h.minQty?" · მინ:"+h.minQty:""}</div></div>
<input defaultValue={h.qty} onBlur={e=>setHousehold(p=>p.map(x=>x.id===h.id?{...x,qty:e.target.value}:x))} placeholder="0" style={{width:46,background:"#0f0e0c",border:"1px solid "+(isLow?"#ef4444":"#3d2d10"),borderRadius:5,padding:"4px",color:isLow?"#ef4444":"#34d399",fontSize:12,textAlign:"center",outline:"none"}}/>
<button onClick={()=>setHousehold(p=>p.filter(x=>x.id!==h.id))} style={{background:"transparent",border:"none",color:"#6b5a3e",cursor:"pointer",fontSize:14}}>×</button>
</div>);
})}
</div>
):(
<div style={C}>
{(supFilter?products.filter(p=>p.sid===supFilter||p.alt===supFilter):products.filter(p=>(prodCat==="ყველა"||p.cat===prodCat)&&(!invSearch||p.name.toLowerCase().includes(invSearch.toLowerCase())))).map((p,i)=>{
const s=suppliers.find(x=>x.id===p.sid);const isLow=minStocks[p.id]&&parseFloat(inventory[p.id]||0)<=parseFloat(minStocks[p.id]||0);
return(
<div key={p.id} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 0",borderBottom:"1px solid #1f1810"}}>
<span style={{fontSize:9,color:"#6b5a3e",width:18,textAlign:"center"}}>#{i+1}</span>
<div style={{flex:1,cursor:"pointer"}} onClick={()=>setSelectedProduct({...p,_orig:{...p}})}>
<div style={{fontSize:12,color:isLow?"#ef4444":"#f5f0e8"}}>{p.name}{isLow?" ⚠":""} <span style={{fontSize:10,color:"#6b5a3e"}}>↗</span></div>
<div style={{fontSize:9,color:"#8a7355"}}>{p.unit}{p.price?" · "+p.price+"₾":""}{s?" · "+s.name:""}</div>
</div>
<div style={{display:"flex",gap:5,alignItems:"center"}}>
<div style={{textAlign:"center"}}><div style={{fontSize:8,color:"#6b5a3e",marginBottom:1}}>მაქვს</div>
<input key={"c"+p.id+"_"+(inventory[p.id]||0)} defaultValue={inventory[p.id]||""} onBlur={e=>setInventory(prev=>({...prev,[p.id]:e.target.value}))} placeholder="0" style={{width:44,background:"#0f0e0c",border:"1px solid "+(isLow?"#ef4444":"#3d2d10"),borderRadius:5,padding:"4px",color:isLow?"#ef4444":"#c9a227",fontSize:12,textAlign:"center",outline:"none"}}/></div>
<div style={{textAlign:"center"}}><div style={{fontSize:8,color:"#6b5a3e",marginBottom:1}}>მინ.</div>
<input key={"m"+p.id+"_"+(minStocks[p.id]||0)} defaultValue={minStocks[p.id]||""} onBlur={e=>setMinStocks(prev=>({...prev,[p.id]:e.target.value}))} placeholder="—" style={{width:44,background:"#0f0e0c",border:"1px solid #2a2018",borderRadius:5,padding:"4px",color:"#8a7355",fontSize:12,textAlign:"center",outline:"none"}}/></div>
</div>
</div>
);
})}
</div>
)}
</div>
)}
</div>
)}

{/* ORDERS TAB */}
{tab==="🛒 შეკვეთები"&&(
<div>
<div style={C}>
<div style={{fontSize:10,color:"#c9a227",marginBottom:10,letterSpacing:2,textTransform:"uppercase"}}>ახალი შეკვეთა</div>
{(()=>{
const item=orderForm.item,qty=orderForm.qty,unit=orderForm.unit,note=orderForm.note;
const setItem=v=>setOrderForm(p=>({...p,item:v}));
const setQty=v=>setOrderForm(p=>({...p,qty:v}));
const setUnit=v=>setOrderForm(p=>({...p,unit:v}));
const setNote=v=>setOrderForm(p=>({...p,note:v}));
const allProds=products.map(p=>({label:p.name,unit:p.unit,sid:p.sid,alt:p.alt,price:p.price,loss:p.loss,vat:p.vat}));
const sel=allProds.find(x=>x.label===item);
const sup=sel?.sid?suppliers.find(s=>s.id===sel.sid):null;
const unitPrice=sel?.price?(()=>{const base=parseFloat(sel.price)||0;const net=sel.vat?base/1.18:base;return sel.loss?net/(1-sel.loss/100):net;})():null;
const totalPrice=unitPrice&&qty?parseFloat(qty)*unitPrice:null;
const add=()=>{if(!item||!qty)return;setOrders(p=>[{id:Date.now(),item,qty,unit:unit||sel?.unit||"",note,sid:sel?.sid||null,done:false,received:false,autoAdded:false},...p]);setOrderForm({item:"",qty:"",unit:"",note:""});};
const inpS={background:"#0f0e0c",border:"1px solid #3d2d10",borderRadius:6,padding:"7px 9px",color:"#f5f0e8",fontSize:12,fontFamily:"inherit",outline:"none"};
return(<div>
<div style={{display:"flex",gap:6,marginBottom:7,flexWrap:"wrap"}}>
<input list="prod-list" value={item} onChange={e=>setItem(e.target.value)} placeholder="პროდუქტი..." style={{...inpS,flex:2,minWidth:120}}/>
<datalist id="prod-list">{allProds.map(x=><option key={x.label} value={x.label}/>)}</datalist>
<input value={qty} onChange={e=>setQty(e.target.value)} placeholder="რაოდ." style={{...inpS,width:65}}/>
<input value={unit||sel?.unit||""} onChange={e=>setUnit(e.target.value)} placeholder="ერთ." style={{...inpS,width:52}}/>
</div>
{sel&&unitPrice&&(
<div style={{background:"#0f0e0c",borderRadius:7,padding:"7px 12px",marginBottom:7,fontSize:11,display:"flex",justifyContent:"space-between"}}>
<span style={{color:"#6b5a3e"}}>💰 {unitPrice.toFixed(2)}₾ / {sel.unit||"ერთ."}</span>
{totalPrice&&<span style={{color:"#c9a227",fontWeight:"bold"}}>სულ: {totalPrice.toFixed(2)}₾</span>}
</div>
)}
{sup&&(
<div style={{background:"#0f0e0c",borderRadius:7,padding:"7px 10px",marginBottom:7,fontSize:11}}>
<div style={{color:"#c9a227",fontWeight:"bold",marginBottom:5}}>📦 {sup.name}</div>
{(sup.phones&&sup.phones.length>0?sup.phones:[sup.tel1,sup.tel2].filter(t=>t&&!t.includes("შეავსე")&&t.trim())).map((tel,ti)=>{
const clean=tel.replace(/[^0-9+]/g,"");
const waNum=clean.startsWith("0")?"995"+clean.slice(1):clean.startsWith("+")?clean.slice(1):clean;
const waText=encodeURIComponent("გამარჯობა, შეკვეთა გვსურს:\n\n"+item+", "+qty+" "+(unit||sel?.unit||"")+(note?"\nშენიშვნა: "+note:"")+"\n\nმადლობა,\nFocacceria");
const label=sup.phoneLabels&&sup.phoneLabels[ti]?sup.phoneLabels[ti]:"ნომ."+(ti+1);
return(
<div key={ti} style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}>
<span style={{fontSize:10,color:"#6b5a3e",minWidth:50}}>{label}:</span>
<a href={"https://wa.me/"+waNum+"?text="+waText} target="_blank" rel="noreferrer" style={{flex:1,display:"flex",alignItems:"center",gap:5,padding:"5px 8px",background:"#25D36615",border:"1px solid #25D36640",borderRadius:5,textDecoration:"none"}}>
<span style={{fontSize:12}}>💬</span>
<span style={{color:"#25D366",fontSize:12,fontWeight:"bold"}}>{tel}</span>
<span style={{color:"#6b5a3e",fontSize:10,marginLeft:"auto"}}>WA →</span>
</a>
</div>
);
})}
</div>
)}
<input value={note} onChange={e=>setNote(e.target.value)} placeholder="შენიშვნა..." style={{...inpS,width:"100%",marginBottom:9,boxSizing:"border-box"}}/>
<button onClick={add} disabled={!item||!qty} style={{width:"100%",padding:"9px",background:item&&qty?"#c9a227":"#2a2018",border:"none",borderRadius:9,color:item&&qty?"#0f0e0c":"#6b5a3e",cursor:item&&qty?"pointer":"default",fontSize:12,fontWeight:"bold",fontFamily:"inherit"}}>+ შეკვეთაში დამატება</button>
</div>);
})()}
</div>
{orders.filter(o=>!o.received).length>0&&(
<div>
{(()=>{
const pending=orders.filter(o=>!o.received);
const grouped={};
pending.forEach(o=>{const key=o.sid||"none";if(!grouped[key])grouped[key]={sid:o.sid,orders:[]};grouped[key].orders.push(o);});
return Object.values(grouped).map(group=>{
const s=group.sid?suppliers.find(x=>x.id===group.sid):null;
const buildWA=(ords)=>{
const lines=ords.map(o=>"• "+o.item+", "+o.qty+" "+o.unit+(o.note?" ("+o.note+")":"")+(o.comment?" ["+o.comment+"]":"")).join("\n");
return encodeURIComponent("გამარჯობა, შეკვეთა გვსურს:\n\n"+lines+"\n\nმადლობა,\nFocacceria");
};
return(
<div key={group.sid||"none"} style={{...C,marginBottom:8}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
<div style={{fontSize:13,fontWeight:"bold",color:"#c9a227"}}>{s?s.name:"მომწოდ. დაუსახელებელი"}</div>
{s&&(s.phones&&s.phones.length>0?s.phones:[s.tel1].filter(t=>t&&!t.includes("შეავსე")&&t.trim())).slice(0,1).map((tel,ti)=>{
const clean=tel.replace(/[^0-9+]/g,"");
const waNum=clean.startsWith("0")?"995"+clean.slice(1):clean.startsWith("+")?clean.slice(1):clean;
return(<a key={ti} href={"https://wa.me/"+waNum+"?text="+buildWA(group.orders)} target="_blank" rel="noreferrer" style={{padding:"4px 10px",background:"#25D36620",border:"1px solid #25D36650",borderRadius:6,textDecoration:"none",fontSize:11,color:"#25D366",display:"flex",alignItems:"center",gap:4}}>💬 ყველა ({group.orders.length})</a>);
})}
</div>
{group.orders.map(o=>(
<div key={o.id} style={{padding:"7px 0",borderBottom:"1px solid #1f1810"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
<span style={{fontSize:12,fontWeight:"bold"}}>{o.item}</span>
<div style={{display:"flex",gap:6,alignItems:"center"}}>
<span style={{fontSize:11,color:"#c9a227"}}>{o.qty} {o.unit}</span>
<button onClick={()=>setOrders(p=>p.filter(x=>x.id!==o.id))} style={{background:"transparent",border:"none",color:"#6b5a3e",cursor:"pointer",fontSize:13}}>×</button>
</div>
</div>
{o.note&&<div style={{fontSize:11,color:"#8a7355"}}>{o.note}</div>}
<div style={{display:"flex",gap:8,marginTop:4}}>
<label style={{fontSize:10,color:"#6b5a3e",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
<input type="checkbox" checked={!!o.done} onChange={()=>setOrders(p=>p.map(x=>x.id===o.id?{...x,done:!x.done}:x))} style={{accentColor:"#c9a227"}}/>
დადასტ.
</label>
<label style={{fontSize:10,color:"#6b5a3e",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
<input type="checkbox" checked={!!o.received} onChange={e=>{if(e.target.checked){setOrderHistory(p=>[{...o,receivedAt:Date.now()},...p]);setOrders(p=>p.filter(x=>x.id!==o.id));}}} style={{accentColor:"#4ade80"}}/>
მიღებულია
</label>
</div>
</div>
))}
</div>
);
});
})()}
</div>
)}
{showOrderHistory&&orderHistory.length>0&&(
<div style={C}>
<div style={{fontSize:10,color:"#4ade80",marginBottom:8,letterSpacing:2,textTransform:"uppercase"}}>📜 ისტორია</div>
{orderHistory.slice(0,20).map(o=>(
<div key={o.id} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #1f1810",fontSize:11}}>
<span style={{color:"#6b5a3e"}}>{o.item}</span>
<span style={{color:"#8a7355"}}>{o.qty} {o.unit}</span>
</div>
))}
</div>
)}
<button onClick={()=>setShowOrderHistory(p=>!p)} style={{width:"100%",padding:"8px",background:"transparent",border:"1px solid #2a2018",borderRadius:8,color:showOrderHistory?"#c9a227":"#6b5a3e",cursor:"pointer",fontSize:11,fontFamily:"inherit",marginTop:8}}>{showOrderHistory?"▲ ისტ. დახურვა":"🕐 ისტორია"}</button>
</div>
)}

{/* SUPPLIERS TAB */}
{tab==="მომწოდ."&&(
<div>
{editingId&&editingId.startsWith("sup_detail_")?(()=>{
const sid=parseInt(editingId.replace("sup_detail_",""));
const s=suppliers.find(x=>x.id===sid);
if(!s)return null;
const supProducts=products.filter(p=>p.sid===sid);
const altProducts=products.filter(p=>p.alt===sid);
const phones=s.phones&&s.phones.length>0?s.phones:[s.tel1,s.tel2].filter(t=>t&&t.trim());
return(
<div>
<button onClick={()=>setEditingId(null)} style={{display:"flex",alignItems:"center",gap:5,marginBottom:12,background:"transparent",border:"none",color:"#c9a227",cursor:"pointer",fontSize:12,fontFamily:"inherit",padding:0}}>← უკან</button>
<div style={C}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
<div><div style={{fontSize:9,color:"#6b5a3e",marginBottom:3}}>სახელი</div><input defaultValue={s.name} onBlur={e=>setSuppliers(p=>p.map(x=>x.id===sid?{...x,name:e.target.value}:x))} style={{...inp,width:"100%",fontSize:13,fontWeight:"bold",boxSizing:"border-box"}}/></div>
<div><div style={{fontSize:9,color:"#6b5a3e",marginBottom:3}}>კონტაქტი</div><input defaultValue={s.contact||""} onBlur={e=>setSuppliers(p=>p.map(x=>x.id===sid?{...x,contact:e.target.value}:x))} style={{...inp,width:"100%",boxSizing:"border-box"}}/></div>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
<div><div style={{fontSize:9,color:"#6b5a3e",marginBottom:3}}>კატეგორია</div>
<select defaultValue={s.cat||""} onBlur={e=>setSuppliers(p=>p.map(x=>x.id===sid?{...x,cat:e.target.value}:x))} style={{...inp,width:"100%",boxSizing:"border-box"}}>
<option value="">— ჩვეულებრივი</option>
<option value="ბაზარი">🛒 ბაზარი</option>
</select></div>
<div><div style={{fontSize:9,color:"#6b5a3e",marginBottom:3}}>მინ. შეკვეთა ₾</div><input type="number" defaultValue={s.minOrder||""} onBlur={e=>setSuppliers(p=>p.map(x=>x.id===sid?{...x,minOrder:parseFloat(e.target.value)||null}:x))} placeholder="—" style={{...inp,width:"100%",boxSizing:"border-box"}}/></div>
</div>
<div style={{fontSize:10,color:"#c9a227",marginBottom:8,letterSpacing:1,textTransform:"uppercase"}}>📞 ნომრები</div>
{phones.map((tel,ti)=>{
const clean=tel.replace(/[^0-9+]/g,"");
const waNum=clean.startsWith("0")?"995"+clean.slice(1):clean.startsWith("+")?clean.slice(1):clean;
const labels=s.phoneLabels||[];
const saveLabel=(v)=>{const nl=[...labels];nl[ti]=v;setSuppliers(p=>p.map(x=>x.id===sid?{...x,phoneLabels:nl}:x));};
const saveTel=(v)=>{const np=[...phones];np[ti]=v;setSuppliers(p=>p.map(x=>x.id===sid?{...x,phones:np,tel1:np[0]||"",tel2:np[1]||""}:x));};
return(
<div key={ti} style={{marginBottom:8,background:"#0f0e0c",borderRadius:7,padding:"7px 9px"}}>
<div style={{display:"flex",gap:5,marginBottom:5}}>
<input defaultValue={labels[ti]||""} onBlur={e=>saveLabel(e.target.value)} placeholder="სახელი (მაგ: მაგდა)" style={{...inp,flex:1,fontSize:11}}/>
{ti>0&&<button onClick={()=>{const np=[...phones];[np[ti-1],np[ti]]=[np[ti],np[ti-1]];const nl=[...(s.phoneLabels||[])];[nl[ti-1],nl[ti]]=[nl[ti],nl[ti-1]];setSuppliers(p=>p.map(x=>x.id===sid?{...x,phones:np,phoneLabels:nl,tel1:np[0]||"",tel2:np[1]||""}:x));}} style={{padding:"3px 8px",background:"#2a2018",border:"1px solid #3d2d10",borderRadius:5,color:"#c9a227",cursor:"pointer",fontSize:11}}>↑</button>}
<button onClick={()=>{const np=phones.filter((_,i)=>i!==ti);setSuppliers(p=>p.map(x=>x.id===sid?{...x,phones:np,tel1:np[0]||"",tel2:np[1]||""}:x));}} style={{padding:"3px 6px",background:"transparent",border:"none",color:"#6b5a3e",cursor:"pointer",fontSize:14}}>×</button>
</div>
<div style={{display:"flex",gap:5,alignItems:"center"}}>
<input defaultValue={tel} onBlur={e=>saveTel(e.target.value)} placeholder="5XX-XX-XX-XX" style={{...inp,flex:1,color:"#c9a227"}}/>
<a href={"https://wa.me/"+waNum} target="_blank" rel="noreferrer" style={{padding:"6px 10px",background:"#25D36620",border:"1px solid #25D36650",borderRadius:6,textDecoration:"none",fontSize:13}}>💬</a>
</div>
</div>
);
})}
<button onClick={()=>{const np=[...phones,""];setSuppliers(p=>p.map(x=>x.id===sid?{...x,phones:np}:x));}} style={{padding:"5px 12px",background:"#2a2018",border:"1px dashed #3d2d10",borderRadius:6,color:"#8a7355",cursor:"pointer",fontSize:11,fontFamily:"inherit",marginBottom:2}}>+ ნომრის დამატება</button>
</div>
{supProducts.length>0&&(
<div style={C}>
<div style={{fontSize:10,color:"#c9a227",marginBottom:10,letterSpacing:2,textTransform:"uppercase"}}>📦 პროდუქცია ({supProducts.length})</div>
{supProducts.map((p,i)=>{
const isEditP=editingId===("sup_prod_"+p.id);
const altSup=p.alt?suppliers.find(x=>x.id===p.alt):null;
return(
<div key={p.id} style={{padding:"9px 0",borderBottom:"1px solid #1f1810"}}>
{isEditP?(
<div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:6}}>
<div><div style={{fontSize:9,color:"#6b5a3e",marginBottom:2}}>სახელი</div><input defaultValue={p.name} onBlur={e=>updateProd(p.id,"name",e.target.value)} style={{...inp,width:"100%",boxSizing:"border-box"}}/></div>
<div><div style={{fontSize:9,color:"#6b5a3e",marginBottom:2}}>ფასი ₾</div><input type="number" defaultValue={p.price||""} onBlur={e=>updateProd(p.id,"price",parseFloat(e.target.value)||null)} style={{...inp,width:"100%",boxSizing:"border-box"}}/></div>
<div><div style={{fontSize:9,color:"#6b5a3e",marginBottom:2}}>ერთეული</div><input defaultValue={p.unit} onBlur={e=>updateProd(p.id,"unit",e.target.value)} style={{...inp,width:"100%",boxSizing:"border-box"}}/></div>
<div><div style={{fontSize:9,color:"#6b5a3e",marginBottom:2}}>კატეგ.</div><input defaultValue={p.cat} onBlur={e=>updateProd(p.id,"cat",e.target.value)} style={{...inp,width:"100%",boxSizing:"border-box"}}/></div>
</div>
<div style={{display:"flex",gap:6}}>
<button onClick={()=>setEditingId("sup_detail_"+sid)} style={{flex:1,padding:"6px",background:"#c9a227",border:"none",borderRadius:6,color:"#0f0e0c",cursor:"pointer",fontSize:11,fontWeight:"bold",fontFamily:"inherit"}}>✓ შენახვა</button>
<button onClick={()=>{setProducts(p2=>p2.filter(x=>x.id!==p.id));setEditingId("sup_detail_"+sid);}} style={{padding:"6px 10px",background:"#ef444420",border:"1px solid #ef444450",borderRadius:6,color:"#ef4444",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>🗑</button>
</div>
</div>
):(
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
<div style={{flex:1}}>
<div style={{fontSize:13,fontWeight:"bold",color:"#f5f0e8"}}>{i+1}. {p.name}</div>
<div style={{fontSize:11,color:"#8a7355",marginTop:2}}>{p.unit}{p.price?" · "+p.price+"₾":""}{altSup?" / ალტ:"+altSup.name:""}</div>
</div>
<button onClick={()=>setEditingId("sup_prod_"+p.id)} style={{padding:"3px 9px",background:"#2a2018",border:"1px solid #3d2d10",borderRadius:5,color:"#6b5a3e",cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>✏</button>
</div>
)}
</div>
);
})}
</div>
)}
<div style={{marginTop:10}}>
<button onClick={()=>{const id="p"+Date.now();setProducts(p=>[...p,{id,name:"ახალი პროდუქტი",cat:"ხორცი",unit:"kg",price:null,loss:null,vat:false,sid,alt:null}]);setEditingId("sup_prod_"+id);}} style={{width:"100%",padding:"8px",background:"#2a2018",border:"1px dashed #3d2d10",borderRadius:8,color:"#8a7355",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>+ პროდუქტის დამატება</button>
</div>
</div>
);
})():(
<div>
<input value={supSearch} onChange={e=>setSupSearch(e.target.value)} placeholder="ძებნა..." style={{...inp,width:"100%",padding:"9px 12px",marginBottom:8,boxSizing:"border-box"}}/>
<div style={{display:"flex",gap:5,marginBottom:8}}>
{["ყველა","🛒 ბაზარი"].map(c=><button key={c} onClick={()=>setSupCatFilter(c)} style={{padding:"3px 10px",background:supCatFilter===c?"#c9a227":"#2a2018",border:"none",borderRadius:20,color:supCatFilter===c?"#0f0e0c":"#8a7355",cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>{c}</button>)}
</div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
<div style={{fontSize:10,color:"#c9a227",letterSpacing:2,textTransform:"uppercase"}}>მომწოდებლები</div>
{addingSupplier?null:<button onClick={()=>setAddingSupplier(true)} style={{padding:"4px 12px",background:"#c9a22720",border:"1px solid #c9a22750",borderRadius:6,color:"#c9a227",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>+ მომწოდებელი</button>}
</div>
{addingSupplier&&(
<div style={{...C,borderColor:"#c9a22750",marginBottom:10}}>
<div style={{fontSize:10,color:"#c9a227",marginBottom:10,letterSpacing:1,textTransform:"uppercase"}}>➕ ახალი მომწოდებელი</div>
{(()=>{
const inpS={...inp,width:"100%",boxSizing:"border-box"};
const save=()=>{
if(!sf.name.trim())return;
const newId=Math.max(...suppliers.map(s=>s.id),0)+1;
setSuppliers(p=>[...p,{id:newId,name:sf.name.trim(),contact:sf.contact||"—",tel1:sf.tel1||"",tel2:sf.tel2||"",minOrder:parseFloat(sf.minOrder)||null,phones:sf.tel1?[sf.tel1]:[],phoneLabels:[]}]);
setSf({name:"",contact:"",tel1:"",tel2:"",minOrder:""});
setAddingSupplier(false);
};
return(<div>
<input value={sf.name} onChange={e=>setSf(p=>({...p,name:e.target.value}))} placeholder="სახელი *" style={{...inpS,marginBottom:8}} autoFocus/>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
<input value={sf.contact} onChange={e=>setSf(p=>({...p,contact:e.target.value}))} placeholder="კონტაქტი" style={inpS}/>
<input type="number" value={sf.minOrder} onChange={e=>setSf(p=>({...p,minOrder:e.target.value}))} placeholder="მინ.შეკვ.₾" style={inpS}/>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
<input value={sf.tel1} onChange={e=>setSf(p=>({...p,tel1:e.target.value}))} placeholder="ტელ.1" style={inpS}/>
<input value={sf.tel2} onChange={e=>setSf(p=>({...p,tel2:e.target.value}))} placeholder="ტელ.2" style={inpS}/>
</div>
<div style={{display:"flex",gap:8}}>
<button onClick={save} style={{flex:1,padding:"8px",background:sf.name.trim()?"#c9a227":"#2a2018",border:"none",borderRadius:7,color:sf.name.trim()?"#0f0e0c":"#6b5a3e",cursor:"pointer",fontSize:12,fontWeight:"bold",fontFamily:"inherit"}}>✓ შენახვა</button>
<button onClick={()=>setAddingSupplier(false)} style={{padding:"8px 14px",background:"transparent",border:"1px solid #3d2d10",borderRadius:7,color:"#6b5a3e",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>გაუქმება</button>
</div>
</div>);
})()}
</div>
)}
{suppliers.filter(s=>{
const ms=[s.name,s.contact,s.tel1].some(f=>String(f||"").toLowerCase().includes(supSearch.toLowerCase()));
const mc=supCatFilter==="ყველა"||(supCatFilter==="🛒 ბაზარი"?s.cat==="ბაზარი":true);
return ms&&mc;
}).map(s=>{
const prods=products.filter(p=>p.sid===s.id);
return(
<div key={s.id} style={{...C,padding:"12px 14px",marginBottom:6,cursor:"pointer"}} onClick={()=>setEditingId("sup_detail_"+s.id)}>
<div style={{display:"flex",alignItems:"center",gap:6}}>
<span style={{fontSize:10,color:"#c9a227",fontWeight:"bold",width:24,textAlign:"center"}}>#{s.id}</span>
<div style={{flex:1}}>
<div style={{display:"flex",alignItems:"center",gap:6}}>
<span style={{fontSize:13,fontWeight:"bold",color:s.tel1&&s.tel1.includes("შეავსე")?"#ef4444":"#f5f0e8"}}>{s.name}</span>
{s.cat==="ბაზარი"&&<span style={{fontSize:9,background:"#4ade8020",border:"1px solid #4ade8050",borderRadius:10,padding:"1px 6px",color:"#4ade80"}}>ბაზარი</span>}
</div>
<div style={{fontSize:10,color:"#8a7355",marginTop:2}}>{prods.map(p=>p.name).join(", ")||"—"}</div>
</div>
<div style={{textAlign:"right",flexShrink:0}}>
<div style={{fontSize:11,color:"#c9a227"}}>{s.tel1}</div>
{s.minOrder&&<div style={{fontSize:9,color:"#fb923c"}}>მინ: {s.minOrder}₾</div>}
</div>
<span style={{color:"#6b5a3e",fontSize:12}}>→</span>
</div>
</div>
);
})}
</div>
)}
</div>
)}

{/* FIXED COSTS TAB */}
{tab==="💰 Fixed Costs"&&(
<div>
{selectedStaff?(
<div>
<button onClick={()=>setSelectedStaff(null)} style={{display:"flex",alignItems:"center",gap:5,marginBottom:12,background:"transparent",border:"none",color:"#c9a227",cursor:"pointer",fontSize:12,fontFamily:"inherit",padding:0}}>← უკან</button>
<div style={C}>
<div style={{fontSize:14,fontWeight:"bold",marginBottom:4,color:"#c9a227"}}>{selectedStaff.name}</div>
<div style={{fontSize:12,color:"#8a7355",marginBottom:12}}>{selectedStaff.salary}₾ / თვე</div>
{[{f:"name",l:"სახელი"},{f:"phone",l:"ტელეფონი"},{f:"account",l:"ანგ. ნომ."},{f:"pid",l:"პირ. ნომ."},{f:"address",l:"მისამართი"},{f:"note",l:"შენიშვნა"}].map(({f,l})=>(
<div key={f} style={{marginBottom:8}}>
<div style={{fontSize:9,color:"#6b5a3e",marginBottom:3}}>{l}</div>
<input defaultValue={selectedStaff[f]||""} onBlur={e=>setStaffList(p=>p.map(x=>x.id===selectedStaff.id?{...x,[f]:e.target.value}:x))} style={{...inp,width:"100%",boxSizing:"border-box"}}/>
</div>
))}
<div style={{marginBottom:8}}>
<div style={{fontSize:9,color:"#6b5a3e",marginBottom:3}}>ხელფასი ₾</div>
<input type="number" defaultValue={selectedStaff.salary} onBlur={e=>setStaffList(p=>p.map(x=>x.id===selectedStaff.id?{...x,salary:parseFloat(e.target.value)||x.salary}:x))} style={{...inp,width:"100%",boxSizing:"border-box"}}/>
</div>
</div>
</div>
):(
<div>
<div style={C}>
<div style={{fontSize:10,color:"#c9a227",marginBottom:8,letterSpacing:2,textTransform:"uppercase"}}>👥 პერსონალი</div>
{staffList.map(s=>(
<div key={s.id} onClick={()=>setSelectedStaff(s)} style={{display:"flex",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #1f1810",cursor:"pointer"}}>
<div style={{flex:1}}>
<div style={{fontSize:13,fontWeight:"bold"}}>{s.name}</div>
<div style={{fontSize:10,color:"#8a7355"}}>{s.role}</div>
</div>
<div style={{fontSize:14,color:"#c9a227",fontWeight:"bold"}}>{s.salary}₾</div>
<span style={{color:"#6b5a3e",fontSize:12,marginLeft:8}}>→</span>
</div>
))}
<div style={{display:"flex",justifyContent:"space-between",marginTop:8,paddingTop:8,borderTop:"1px solid #3d2d10"}}>
<span style={{fontSize:11,color:"#8a7355"}}>სულ ხელფასები</span>
<span style={{fontSize:14,color:"#c9a227",fontWeight:"bold"}}>{totalWages}₾</span>
</div>
</div>
<div style={C}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
<div style={{fontSize:10,color:"#c9a227",letterSpacing:2,textTransform:"uppercase"}}>📅 სამუშაო დღეები</div>
<input type="month" value={attMonth} onChange={e=>setAttMonth(e.target.value)} style={{background:"#0f0e0c",border:"1px solid #3d2d10",borderRadius:6,padding:"4px 8px",color:"#c9a227",fontSize:11,fontFamily:"inherit",outline:"none"}}/>
</div>
{(()=>{
const [yr,mn]=attMonth.split("-").map(Number);
const dim=new Date(yr,mn,0).getDate();
const days=Array.from({length:dim},(_,i)=>i+1);
const dn=["კვ","ორ","სამ","ოთხ","ხუთ","პარ","შაბ"];
return(
<div style={{overflowX:"auto"}}>
<table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
<thead><tr>
<th style={{textAlign:"left",padding:"4px 6px",color:"#6b5a3e",fontWeight:"normal",minWidth:70}}>პერს.</th>
{days.map(d=>{const dow=new Date(yr,mn-1,d).getDay();const iw=dow===0||dow===6;return(<th key={d} style={{padding:"2px",color:iw?"#ef4444":"#6b5a3e",fontWeight:"normal",minWidth:20,textAlign:"center"}}><div>{d}</div><div style={{fontSize:7}}>{dn[dow]}</div></th>);})}
<th style={{padding:"4px 4px",color:"#c9a227",fontWeight:"normal",textAlign:"center",minWidth:30}}>სულ</th>
<th style={{padding:"4px 4px",color:"#4ade80",fontWeight:"normal",textAlign:"center",minWidth:44}}>ხელფ.</th>
</tr></thead>
<tbody>
{staffList.map(s=>{
const key=s.id+"_"+attMonth;
const row=attendance[key]||{};
const worked=days.filter(d=>row[d]==="✓").length;
const earned=s.salary?Math.round(worked*(s.salary/26)):0;
return(
<tr key={s.id} style={{borderTop:"1px solid #1f1810"}}>
<td style={{padding:"4px 4px",color:"#c9a227",fontSize:11,fontWeight:"bold"}}>{s.name}</td>
{days.map(d=>{
const dow=new Date(yr,mn-1,d).getDay();const iw=dow===0||dow===6;
const v=row[d]||"";
const next=v===""?"✓":v==="✓"?"✗":v==="✗"?"🏖":"";
const bg=v==="✓"?"#4ade8018":v==="✗"?"#ef444418":v==="🏖"?"#fb923c18":iw?"#1a1008":"transparent";
return(<td key={d} onClick={()=>setAttendance(prev=>({...prev,[key]:{...(prev[key]||{}),[d]:next}}))} style={{padding:"2px",textAlign:"center",cursor:"pointer",background:bg,borderRadius:2,fontSize:10}}>{v||<span style={{color:"#2a2018"}}>·</span>}</td>);
})}
<td style={{padding:"4px",textAlign:"center",color:"#c9a227",fontWeight:"bold",fontSize:11}}>{worked}</td>
<td style={{padding:"4px",textAlign:"center",color:"#4ade80",fontSize:10}}>{earned}₾</td>
</tr>
);
})}
</tbody>
</table>
<div style={{marginTop:8,fontSize:9,color:"#6b5a3e"}}>✓ მუშ. · ✗ არ გამოცხ. · 🏖 შვებ. · დააჭირე შესაცვლელად</div>
</div>
);
})()}
</div>
<div style={C}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
<div style={{fontSize:10,color:"#c9a227",letterSpacing:2,textTransform:"uppercase"}}>📊 Fixed Costs</div>
<button onClick={()=>setFixedCosts(p=>[...p,{label:"ახალი ხარჯი",amount:0}])} style={{padding:"4px 12px",background:"#c9a22720",border:"1px solid #c9a22750",borderRadius:6,color:"#c9a227",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>+ დამატება</button>
</div>
{fixedCosts.map((c,i)=>(
<div key={i} style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:8,alignItems:"center",padding:"7px 0",borderBottom:"1px solid #1a1510"}}>
{editingCostId===i?(
<>
<input defaultValue={c.label} onBlur={e=>setFixedCosts(p=>p.map((x,j)=>j===i?{...x,label:e.target.value}:x))} style={{background:"#0f0e0c",border:"1px solid #c9a227",borderRadius:5,padding:"5px 8px",color:"#f5f0e8",fontSize:12,fontFamily:"inherit",outline:"none"}}/>
<div style={{display:"flex",alignItems:"center",gap:4}}>
<input type="number" defaultValue={c.amount} onBlur={e=>setFixedCosts(p=>p.map((x,j)=>j===i?{...x,amount:parseFloat(e.target.value)||0}:x))} style={{background:"#0f0e0c",border:"1px solid #c9a227",borderRadius:5,padding:"5px",color:"#c9a227",fontSize:12,fontFamily:"inherit",outline:"none",width:72,textAlign:"right"}}/>
<span style={{color:"#c9a227",fontSize:12}}>₾</span>
</div>
<div style={{display:"flex",gap:4}}>
<button onClick={()=>setEditingCostId(null)} style={{padding:"4px 9px",background:"#c9a227",border:"none",borderRadius:5,color:"#0f0e0c",cursor:"pointer",fontSize:12,fontWeight:"bold",fontFamily:"inherit"}}>✓</button>
<button onClick={()=>{setFixedCosts(p=>p.filter((_,j)=>j!==i));setEditingCostId(null);}} style={{padding:"4px 7px",background:"transparent",border:"none",color:"#ef4444",cursor:"pointer",fontSize:14}}>×</button>
</div>
</>
):(
<>
<span style={{color:"#8a7355",fontSize:12}}>{c.label}</span>
<span style={{color:"#f5f0e8",fontSize:13,fontWeight:"bold",textAlign:"right"}}>{parseFloat(c.amount).toLocaleString()}₾</span>
<button onClick={()=>setEditingCostId(i)} style={{padding:"3px 8px",background:"#2a2018",border:"1px solid #3d2d10",borderRadius:5,color:"#6b5a3e",cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>✏</button>
</>
)}
</div>
))}
<div style={{display:"flex",justifyContent:"space-between",padding:"8px 0 4px",borderTop:"1px solid #3d2d10",marginTop:6}}>
<span style={{fontSize:11,color:"#6b5a3e"}}>ხარჯები (ხელფ. გარეშე)</span>
<span style={{fontSize:13,color:"#fb923c",fontWeight:"bold"}}>{fixedCosts.reduce((s,c)=>s+(parseFloat(c.amount)||0),0).toLocaleString()}₾</span>
</div>
<div style={{display:"flex",justifyContent:"space-between",paddingTop:6}}>
<span style={{fontSize:13,color:"#c9a227",fontWeight:"bold"}}>სულ (ხელფასებთან)</span>
<span style={{fontSize:16,color:"#c9a227",fontWeight:"bold"}}>{totalFixed.toLocaleString()}₾</span>
</div>
</div>
</div>
)}
</div>
)}

{/* ORG CHART TAB */}
{tab==="🏛 სტრუქტურა"&&(
<div>
<div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
<div style={{fontSize:10,color:"#8a7355"}}>ორმაგი კლიკი — რედაქტირება</div>
<div style={{marginLeft:"auto",display:"flex",gap:6}}>
<button onClick={()=>{const id="node_"+Date.now();setOrgNodes(p=>[...p,{id,label:"ახალი",sublabel:"",color:"#c9a227",x:200,y:200,comment:""}]);}} style={{padding:"4px 10px",background:"#2a2018",border:"1px solid #3d2d10",borderRadius:6,color:"#c9a227",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>+ კვანძი</button>
<button onClick={()=>setOrgMode(orgMode==="connect"?"view":"connect")} style={{padding:"4px 10px",background:orgMode==="connect"?"#c9a22730":"#2a2018",border:"1px solid "+(orgMode==="connect"?"#c9a227":"#3d2d10"),borderRadius:6,color:orgMode==="connect"?"#c9a227":"#8a7355",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>{orgMode==="connect"?"✓ კავშირი":"🔗 კავშირი"}</button>
<button onClick={()=>setOrgMode(orgMode==="delete_edge"?"view":"delete_edge")} style={{padding:"4px 10px",background:orgMode==="delete_edge"?"#ef444430":"#2a2018",border:"1px solid "+(orgMode==="delete_edge"?"#ef4444":"#3d2d10"),borderRadius:6,color:orgMode==="delete_edge"?"#ef4444":"#8a7355",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>{orgMode==="delete_edge"?"✓ წაშლა":"✂ ხაზი"}</button>
</div>
</div>
{editOrgNode&&(()=>{
const node=orgNodes.find(n=>n.id===editOrgNode);
if(!node)return null;
return(
<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#00000080",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setEditOrgNode(null)}>
<div style={{background:"#1a1510",border:"1px solid "+node.color,borderRadius:12,padding:20,width:290,maxWidth:"90vw",maxHeight:"80vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
<div style={{fontSize:12,color:node.color,marginBottom:12,letterSpacing:2,textTransform:"uppercase"}}>✏ {node.label}</div>
<div style={{marginBottom:8}}><div style={{fontSize:10,color:"#6b5a3e",marginBottom:3}}>სახელი</div><input value={node.label} onChange={e=>setOrgNodes(p=>p.map(n=>n.id===editOrgNode?{...n,label:e.target.value}:n))} style={{width:"100%",background:"#0f0e0c",border:"1px solid "+node.color,borderRadius:6,padding:"7px 10px",color:"#f5f0e8",fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/></div>
<div style={{marginBottom:8}}><div style={{fontSize:10,color:"#6b5a3e",marginBottom:3}}>აღწერა</div><input value={node.sublabel} onChange={e=>setOrgNodes(p=>p.map(n=>n.id===editOrgNode?{...n,sublabel:e.target.value}:n))} style={{width:"100%",background:"#0f0e0c",border:"1px solid #3d2d10",borderRadius:6,padding:"7px 10px",color:"#8a7355",fontSize:12,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/></div>
<div style={{marginBottom:12}}><div style={{fontSize:10,color:"#6b5a3e",marginBottom:3}}>კომენტარი</div><textarea value={node.comment} onChange={e=>setOrgNodes(p=>p.map(n=>n.id===editOrgNode?{...n,comment:e.target.value}:n))} rows={2} style={{width:"100%",background:"#0f0e0c",border:"1px solid #2a2018",borderRadius:6,padding:"7px 10px",color:"#8a7355",fontSize:12,fontFamily:"inherit",outline:"none",resize:"none",boxSizing:"border-box"}}/></div>
<div style={{display:"flex",gap:6,marginBottom:12}}>{["#c9a227","#fb923c","#4ade80","#818cf8","#f472b6","#67e8f9","#ef4444"].map(col=><div key={col} onClick={()=>setOrgNodes(p=>p.map(n=>n.id===editOrgNode?{...n,color:col}:n))} style={{width:24,height:24,borderRadius:"50%",background:col,border:node.color===col?"3px solid #fff":"2px solid transparent",cursor:"pointer"}}/>)}</div>
<div style={{display:"flex",gap:8,marginBottom:12}}>
<button onClick={()=>setEditOrgNode(null)} style={{flex:1,padding:"8px",background:"#c9a227",border:"none",borderRadius:7,color:"#0f0e0c",cursor:"pointer",fontSize:12,fontWeight:"bold",fontFamily:"inherit"}}>✓ შენახვა</button>
<button onClick={()=>{setOrgNodes(p=>p.filter(n=>n.id!==editOrgNode));setOrgEdges(p=>p.filter(e=>e.from!==editOrgNode&&e.to!==editOrgNode));setEditOrgNode(null);}} style={{padding:"8px 14px",background:"#ef444420",border:"1px solid #ef444450",borderRadius:7,color:"#ef4444",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>🗑</button>
</div>
<div style={{paddingTop:10,borderTop:"1px solid #2a2018"}}>
<div style={{fontSize:10,color:"#6b5a3e",marginBottom:6}}>გაერთიანება:</div>
<div style={{display:"flex",flexWrap:"wrap",gap:4}}>
{orgNodes.filter(n=>n.id!==editOrgNode).map(n=>(
<button key={n.id} onClick={()=>{const base=orgNodes.find(x=>x.id===editOrgNode);const merged={...n,label:base.label+"/"+n.label,sublabel:[base.sublabel,n.sublabel].filter(Boolean).join(" · "),comment:[base.comment,n.comment].filter(Boolean).join(" | ")};setOrgNodes(p=>p.filter(x=>x.id!==editOrgNode).map(x=>x.id===n.id?merged:x));setOrgEdges(p=>p.filter(e=>e.from!==editOrgNode&&e.to!==editOrgNode));setEditOrgNode(null);}} style={{padding:"3px 8px",background:n.color+"20",border:"1px solid "+n.color+"50",borderRadius:5,color:n.color,cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>{n.label}</button>
))}
</div>
</div>
</div>
</div>
);
})()}
<div ref={orgRef} style={{position:"relative",width:"100%",height:570,background:"#0a0908",borderRadius:12,border:"1px solid #2a2018",overflow:"hidden",touchAction:"none"}}
onMouseMove={e=>{if(!dragNode)return;const rect=orgRef.current.getBoundingClientRect();setOrgNodes(p=>p.map(n=>n.id===dragNode?{...n,x:Math.max(0,Math.min(rect.width-115,e.clientX-rect.left-dragOffset.x)),y:Math.max(0,Math.min(rect.height-72,e.clientY-rect.top-dragOffset.y))}:n));}}
onMouseUp={()=>setDragNode(null)} onMouseLeave={()=>setDragNode(null)}
onTouchMove={e=>{if(!dragNode)return;const t=e.touches[0];const rect=orgRef.current.getBoundingClientRect();setOrgNodes(p=>p.map(n=>n.id===dragNode?{...n,x:Math.max(0,Math.min(rect.width-115,t.clientX-rect.left-dragOffset.x)),y:Math.max(0,Math.min(rect.height-72,t.clientY-rect.top-dragOffset.y))}:n));}}
onTouchEnd={()=>setDragNode(null)}>
<svg style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:orgMode==="delete_edge"?"auto":"none"}}>
{orgEdges.map((edge,i)=>{
const from=orgNodes.find(n=>n.id===edge.from);
const to=orgNodes.find(n=>n.id===edge.to);
if(!from||!to)return null;
const x1=from.x+57,y1=from.y+36,x2=to.x+57,y2=to.y;
const my=(y1+y2)/2;
return(
<g key={i}>
<path d={"M"+x1+","+y1+" C"+x1+","+(my+15)+" "+x2+","+(my-15)+" "+x2+","+y2} stroke={from.color+"55"} strokeWidth="1.5" fill="none" strokeDasharray="5 3"/>
{orgMode==="delete_edge"&&(<path d={"M"+x1+","+y1+" C"+x1+","+(my+15)+" "+x2+","+(my-15)+" "+x2+","+y2} stroke="transparent" strokeWidth="18" fill="none" style={{cursor:"pointer"}} onClick={()=>setOrgEdges(p=>p.filter((_,j)=>j!==i))}/>)}
{orgMode==="delete_edge"&&(<circle cx={(x1+x2)/2} cy={my} r="8" fill="#ef444430" stroke="#ef444460" style={{cursor:"pointer"}} onClick={()=>setOrgEdges(p=>p.filter((_,j)=>j!==i))}/>)}
{orgMode==="delete_edge"&&(<text x={(x1+x2)/2} y={my+4} textAnchor="middle" fontSize="10" fill="#ef4444" style={{pointerEvents:"none"}}>×</text>)}
</g>
);
})}
</svg>
{orgNodes.map(node=>(
<div key={node.id} style={{position:"absolute",left:node.x,top:node.y,width:114,cursor:orgMode==="connect"?"crosshair":"grab",userSelect:"none",zIndex:dragNode===node.id?10:1}}
onMouseDown={e=>{if(orgMode!=="view")return;e.preventDefault();const rect=orgRef.current.getBoundingClientRect();setDragNode(node.id);setDragOffset({x:e.clientX-rect.left-node.x,y:e.clientY-rect.top-node.y});}}
onTouchStart={e=>{if(orgMode!=="view")return;const t=e.touches[0];const rect=orgRef.current.getBoundingClientRect();setDragNode(node.id);setDragOffset({x:t.clientX-rect.left-node.x,y:t.clientY-rect.top-node.y});}}
onClick={()=>{if(orgMode==="connect"){if(!connectFrom){setConnectFrom(node.id);}else if(connectFrom!==node.id){const exists=orgEdges.some(e=>e.from===connectFrom&&e.to===node.id);if(!exists)setOrgEdges(p=>[...p,{from:connectFrom,to:node.id}]);setConnectFrom(null);setOrgMode("view");}}}
}
onDoubleClick={()=>{if(orgMode==="view")setEditOrgNode(node.id);}}>
<div style={{background:"#1a1510",border:"1.5px solid "+node.color+(connectFrom===node.id?"":"50"),borderTop:"3px solid "+node.color,borderRadius:8,padding:"7px 8px",boxShadow:"0 2px 14px "+node.color+(connectFrom===node.id?"60":"15")}}>
<div style={{fontSize:11,fontWeight:"bold",color:node.color,marginBottom:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{node.label}</div>
{node.sublabel&&<div style={{fontSize:9,color:"#6b5a3e",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{node.sublabel}</div>}
{node.comment&&<div style={{fontSize:9,color:"#8a7355",marginTop:3,borderTop:"1px solid #2a2018",paddingTop:3,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{node.comment}</div>}
</div>
</div>
))}
</div>
</div>
)}

{/* AI TAB */}
{tab==="AI"&&(
<div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 190px)"}}>
<div style={{flex:1,overflowY:"auto",marginBottom:9}}>
{aiMessages.map((m,i)=>(
<div key={i} style={{marginBottom:9,display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
<div style={{maxWidth:"85%",background:m.role==="user"?"#2d1f0a":"#1a1510",border:"1px solid "+(m.role==="user"?"#c9a22760":"#2a2018"),borderRadius:m.role==="user"?"13px 13px 3px 13px":"13px 13px 13px 3px",padding:"9px 12px",fontSize:13,lineHeight:1.6,color:"#f5f0e8",whiteSpace:"pre-wrap"}}>{m.text}</div>
</div>
))}
{aiLoading&&<div style={{display:"flex",gap:4,padding:9}}>{[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#c9a227",animation:"pulse 1.2s infinite",animationDelay:i*0.2+"s"}}/>)}</div>}
<div ref={chatRef}/>
</div>
<div style={{display:"flex",gap:7}}>
<input value={aiInput} onChange={e=>setAiInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAI()} placeholder="კითხვა..." style={{...inp,flex:1,padding:"11px 14px",fontSize:13}}/>
<button onClick={handleAI} disabled={aiLoading||!aiInput.trim()} style={{background:aiLoading||!aiInput.trim()?"#2a2018":"#c9a227",border:"none",borderRadius:10,padding:"11px 16px",color:aiLoading||!aiInput.trim()?"#6b5a3e":"#0f0e0c",cursor:aiLoading||!aiInput.trim()?"default":"pointer",fontSize:14,fontFamily:"inherit"}}>→</button>
</div>
</div>
)}

</div>
</div>
);
}
