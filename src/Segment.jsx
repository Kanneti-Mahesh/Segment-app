// import React, { useState } from "react";
// import "./App.css";

// // Each schema now has a unique "value"
// const SCHEMAS = [
//   { label: "First Name", value: "first_name", type: "user" },
//   { label: "Last Name", value: "last_name", type: "user" },
//   { label: "Gender", value: "gender", type: "group" },
//   { label: "Age", value: "age", type: "user" },
//   { label: "Account Name", value: "account_name", type: "group" },
//   { label: "City", value: "city", type: "user" },
//   { label: "State", value: "state", type: "group" }
// ];

// export default function Segment() {
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [selected, setSelected] = useState([]);
//   const [dropdowns, setDropdowns] = useState([]);
//   const webhook = "https://webhook.site/67233419-adb4-4951-ac39-f343d61b2bae";
//   const unused = () => SCHEMAS.filter(s => !selected.includes(s.value));
//   const getColor = t => (t === "user" ? "#20c830" : "#e43d8c");

//   return (
//     <div className="split-layout">
//       <div className="left-panel">
//         <button className="save-btn" onClick={() => setOpen(true)}>
//           Save segment
//         </button>
//       </div>
//       {open && (
//         <div className="right-modal">
//           <div className="modal-header">
//             <span className="back-arrow" onClick={() => setOpen(false)}>←</span>
//             <span className="modal-title">Saving Segment</span>
//           </div>
//           <div className="modal-content">
//             <label className="input-label">Enter the Name of the Segment</label>
//             <input
//               className="popup-input"
//               placeholder="Name of the segment"
//               value={name}
//               onChange={e => setName(e.target.value)}
//             />
//             <div className="modal-hint">
//               To save your segment, you need to add the schemas to build the query
//               <div>
//                 <span style={{ color: "#20c830", marginRight: 6 }}>● User Traits</span>
//                 <span style={{ color: "#e43d8c", marginLeft: 10 }}>● Group Traits</span>
//               </div>
//             </div>
//             <div className="schemas-box">
//               {dropdowns.map((d, i) => {
//                 const curSchema = SCHEMAS.find(s => s.value === d);
//                 return (
//                   <div className="schema-row" key={d + '-' + i}>
//                     <span className="schema-dot" style={{ background: getColor(curSchema?.type) }} />
//                     <select
//                       value={d}
//                       className="popup-select"
//                       onChange={e => {
//                         const cp = [...selected];
//                         cp[i] = e.target.value;
//                         setSelected(cp);
//                         const dd = [...dropdowns];
//                         dd[i] = e.target.value;
//                         setDropdowns(dd);
//                       }}
//                     >
//                       {SCHEMAS
//                         .filter(s => !selected.includes(s.value) || s.value === d)
//                         .map(s => (
//                           <option key={s.value} value={s.value}>{s.label}</option>
//                         ))
//                       }
//                     </select>
//                     <button
//                       className="remove-schema"
//                       onClick={() => {
//                         setDropdowns(dropdowns.filter((_, idx) => idx !== i));
//                         setSelected(selected.filter((_, idx) => idx !== i));
//                       }}
//                     >
//                       –
//                     </button>
//                   </div>
//                 );
//               })}
//               <div className="schema-row">
//                 <span className="schema-dot" />
//                 <select id="main" defaultValue="" className="popup-select">
//                   <option value="" disabled>
//                     Add schema to segment
//                   </option>
//                   {unused().map(s => (
//                     <option key={s.value} value={s.value}>{s.label}</option>
//                   ))}
//                 </select>
//                 <span
//                   className="add-link"
//                   onClick={() => {
//                     const v = document.getElementById("main").value;
//                     if (v && !selected.includes(v)) {
//                       setSelected([...selected, v]);
//                       setDropdowns([...dropdowns, v]);
//                       document.getElementById("main").selectedIndex = 0;
//                     }
//                   }}
//                 >
//                   +Add new schema
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="modal-footer">
//             <button
//               className="save-segment-btn"
//               onClick={async () => {
//                 await fetch(webhook, {
//                   method: "POST",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify({
//                     segment_name: name,
//                     schema: selected.map(v => {
//                       const s = SCHEMAS.find(x => x.value === v);
//                       return { [v]: s.label };
//                     })
//                   })
//                 });
//                 setOpen(false);
//                 setName("");
//                 setSelected([]);
//                 setDropdowns([]);
//               }}
//             >
//               Save the Segment
//             </button>
//             <button className="cancel-btn" onClick={() => setOpen(false)}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState } from "react";
import "./App.css";

const SCHEMAS = [
  { label: "First Name", value: "first_name", type: "user" },
  { label: "Last Name", value: "last_name", type: "user" },
  { label: "Gender", value: "gender", type: "group" },
  { label: "Age", value: "age", type: "user" },
  { label: "Account Name", value: "account_name", type: "group" },
  { label: "City", value: "city", type: "user" },
  { label: "State", value: "state", type: "group" }
];

export default function Segment() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);
  const [dropdowns, setDropdowns] = useState([]);
  const webhook = "https://webhook.site/67233419-adb4-4951-ac39-f343d61b2bae";
  const unused = () => SCHEMAS.filter(s => !selected.includes(s.value));
  const getColor = t => (t === "user" ? "#20c830" : "#e43d8c");

  return (
    <div className="main-split">
      <div className={open ? "left-dimmed" : "left-clean"}>
        <button className="save-btn" onClick={() => setOpen(true)}>
          Save segment
        </button>
      </div>
      {open && (
        <div className="modal-container">
          <div className="modal-header">
            <span className="back-arrow" onClick={() => setOpen(false)}>←</span>
            <span className="modal-title">Saving Segment</span>
          </div>
          <div className="modal-content">
            <label className="input-label">Enter the Name of the Segment</label>
            <input
              className="popup-input"
              placeholder="Name of the segment"
              value={name}
              onChange={e => setName(e.target.value)}
            />
                      {/* Modal description here */}
                      <div className="modal-description">
                          To save your segment, you need to add the schemas to build the query
                      </div>
                      
            <div className="schema-legend">
              <span className="legend-item user">● User Traits</span>
              <span className="legend-item group">● Group Traits</span>
            </div>
            <div className="schemas-box">
              {dropdowns.map((d, i) => {
                const curSchema = SCHEMAS.find(s => s.value === d);
                return (
                  <div className="schema-row" key={d + "-" + i}>
                    <span
                      className="schema-dot"
                      style={{ background: getColor(curSchema?.type) }}
                    />
                    <select
                      value={d}
                      className="popup-select"
                      onChange={e => {
                        const cp = [...selected];
                        cp[i] = e.target.value;
                        setSelected(cp);
                        const dd = [...dropdowns];
                        dd[i] = e.target.value;
                        setDropdowns(dd);
                      }}
                    >
                      {SCHEMAS.filter(
                        s => !selected.includes(s.value) || s.value === d
                      ).map(s => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <button
                      className="remove-schema"
                      onClick={() => {
                        setDropdowns(dropdowns.filter((_, idx) => idx !== i));
                        setSelected(selected.filter((_, idx) => idx !== i));
                      }}
                    >
                      –
                    </button>
                  </div>
                );
              })}
              <div className="schema-row">
                <span className="schema-dot" />
                <select id="main" defaultValue="" className="popup-select">
                  <option value="" disabled>
                    Add schema to segment
                  </option>
                  {unused().map(s => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <span
                className="add-link"
                onClick={() => {
                  const v = document.getElementById("main").value;
                  if (v && !selected.includes(v)) {
                    setSelected([...selected, v]);
                    setDropdowns([...dropdowns, v]);
                    document.getElementById("main").selectedIndex = 0;
                  }
                }}
              >
                +Add new schema
              </span>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="save-segment-btn"
              onClick={async () => {
                await fetch(webhook, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    segment_name: name,
                    schema: selected.map(v => {
                      const s = SCHEMAS.find(x => x.value === v);
                      return { [v]: s.label };
                    })
                  })
                });
                setOpen(false);
                setName("");
                setSelected([]);
                setDropdowns([]);
              }}
            >
              Save the Segment
            </button>
            <button className="cancel-btn" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
