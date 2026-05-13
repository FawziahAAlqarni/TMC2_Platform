import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = "https://supabase-dev.pm-mngdp.xyz";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const waves = ["\u0627\u0644\u062d\u0632\u0645\u0629 \u0627\u0644\u0635\u0641\u0631\u064a\u0629", "\u0627\u0644\u062d\u0632\u0645\u0629 \u0627\u0644\u0623\u0648\u0644\u0649", "\u0627\u0644\u062d\u0632\u0645\u0629 \u0627\u0644\u062b\u0627\u0646\u064a\u0629", "\u0627\u0644\u062d\u0632\u0645\u0629 \u0627\u0644\u062b\u0627\u0644\u062b\u0629"];
const levels = ["N-1", "N-2", "N-3"];

const SystemInput = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tolerence");
  const [loading, setLoading] = useState(false);
  const [tolForm, setTolForm] = useState({ InitiativeID: "", "Impacted BU": "", Wave: "\u0627\u0644\u062d\u0632\u0645\u0629 \u0627\u0644\u062b\u0627\u0646\u064a\u0629", "OverAll Impact": "" });
  const [buForm, setBuForm] = useState({ p_n1: "", p_n2: "", p_n3: "", p_code: "", p_bu: "", p_id: "", p_level: "N-1", p_emp_no: "" });
  const [tolRecords, setTolRecords] = useState([]);
  const [buRecords, setBuRecords] = useState([]);
  const [impactRecords, setImpactRecords] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  // فلاتر جدول Tolerence
  const [tolSearch, setTolSearch] = useState("");
  const [tolWaveFilter, setTolWaveFilter] = useState("");
  const [tolSort, setTolSort] = useState("newest");

  // فلاتر جدول BU
  const [buSearch, setBuSearch] = useState("");
  const [buSort, setBuSort] = useState("newest");

  // فلاتر جدول Impact Analysis
  const [impactSearch, setImpactSearch] = useState("");
  const [impactSort, setImpactSort] = useState("newest");

  const [impactForm, setImpactForm] = useState({
    InitiativeID: "", Source: "", program: "", Portfolio: "", title: "", owner: "",
    Nature_on_Impact: "", Sector: "", Impacted_BU: "", Impact_Justification: "",
    Culture: "", Skills: "", Skills_Description: "", Org_Design: "", Org_Design_Description: "",
    Technology: "", Technology_Description: "", Processes: "", Processes_Description: "",
    OverAll_Impact: "", Risk: "", Risk_mitigation: ""
  });

  const fetchTol = useCallback(async () => {
    setDataLoading(true);
    const { data } = await supabase.rpc("get_change_tolerence");
    if (data) setTolRecords(data);
    setDataLoading(false);
  }, []);

  const fetchBU = useCallback(async () => {
    setDataLoading(true);
    const { data } = await supabase.rpc("get_bu_hierarchy");
    if (data) setBuRecords(data);
    setDataLoading(false);
  }, []);

  const fetchImpact = useCallback(async () => {
    setDataLoading(true);
    const { data } = await supabase.rpc("get_impact_analysis");
    if (data) setImpactRecords(data);
    setDataLoading(false);
  }, []);

  useEffect(() => {
    if (activeTab === "tolerence") fetchTol();
    else if (activeTab === "bu") fetchBU();
    else fetchImpact();
  }, [activeTab, fetchTol, fetchBU, fetchImpact]);

  const handleSaveTol = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.rpc("insert_change_tolerence", {
      p_initiative_id: tolForm.InitiativeID,
      p_impacted_bu: tolForm["Impacted BU"],
      p_wave: tolForm.Wave,
      p_overall_impact: tolForm["OverAll Impact"],
    });
    if (error) alert("\u062e\u0637\u0623: " + error.message);
    else { alert("\u2705 \u062a\u0645 \u0627\u0644\u062d\u0641\u0638!"); setTolForm({ InitiativeID: "", "Impacted BU": "", Wave: "\u0627\u0644\u062d\u0632\u0645\u0629 \u0627\u0644\u062b\u0627\u0646\u064a\u0629", "OverAll Impact": "" }); fetchTol(); }
    setLoading(false);
  };

  const handleSaveImpact = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.rpc("insert_impact_analysis", {
      p_initiative_id: impactForm.InitiativeID, p_source: impactForm.Source, p_program: impactForm.program,
      p_portfolio: impactForm.Portfolio, p_title: impactForm.title, p_owner: impactForm.owner,
      p_nature: impactForm.Nature_on_Impact, p_sector: impactForm.Sector, p_impacted_bu: impactForm.Impacted_BU,
      p_impact_justification: impactForm.Impact_Justification, p_culture: impactForm.Culture,
      p_skills: impactForm.Skills, p_skills_desc: impactForm.Skills_Description,
      p_org_design: impactForm.Org_Design, p_org_design_desc: impactForm.Org_Design_Description,
      p_technology: impactForm.Technology, p_technology_desc: impactForm.Technology_Description,
      p_processes: impactForm.Processes, p_processes_desc: impactForm.Processes_Description,
      p_overall_impact: impactForm.OverAll_Impact, p_risk: impactForm.Risk, p_risk_mitigation: impactForm.Risk_mitigation,
    });
    if (error) alert("خطأ: " + error.message);
    else {
      alert("✅ تم الحفظ!");
      setImpactForm({ InitiativeID: "", Source: "", program: "", Portfolio: "", title: "", owner: "", Nature_on_Impact: "", Sector: "", Impacted_BU: "", Impact_Justification: "", Culture: "", Skills: "", Skills_Description: "", Org_Design: "", Org_Design_Description: "", Technology: "", Technology_Description: "", Processes: "", Processes_Description: "", OverAll_Impact: "", Risk: "", Risk_mitigation: "" });
      fetchImpact();
    }
    setLoading(false);
  };

  const handleSaveBU = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.rpc("insert_bu_hierarchy", {
      p_n1: buForm.p_n1, p_n2: buForm.p_n2, p_n3: buForm.p_n3,
      p_code: buForm.p_code, p_bu: buForm.p_bu, p_id: buForm.p_id,
      p_level: buForm.p_level, p_emp_no: parseFloat(buForm.p_emp_no) || 0,
    });
    if (error) alert("\u062e\u0637\u0623: " + error.message);
    else { alert("\u2705 \u062a\u0645 \u0627\u0644\u062d\u0641\u0638!"); setBuForm({ p_n1: "", p_n2: "", p_n3: "", p_code: "", p_bu: "", p_id: "", p_level: "N-1", p_emp_no: "" }); fetchBU(); }
    setLoading(false);
  };

  return (
    <div style={{ direction: "rtl", padding: "20px", fontFamily: "Arial", background: "#FFFBEE", minHeight: "100vh" }}>
      <button onClick={() => navigate("/")} style={S.backBtn}>{"\u2190 \u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0631\u0626\u064a\u0633\u064a\u0629"}</button>
      <h1 style={{ color: "#006C35" }}>{"\u0625\u062f\u062e\u0627\u0644 \u0628\u064a\u0627\u0646\u0627\u062a - Change"}</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
        {[["tolerence", "Change - Tolerence"], ["bu", "BUs Hierarchy"], ["impact", "Impact Analysis"]].map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...S.tabBtn, background: activeTab === tab ? "#006C35" : "#e6f4ec", color: activeTab === tab ? "white" : "#006C35" }}>
            {label}
          </button>
        ))}
      </div>

      {/* ===== إحصائيات Change Tolerence ===== */}
      {activeTab === "tolerence" && tolRecords.length > 0 && (() => {
        const waveCounts = waves.reduce((a, w) => ({ ...a, [w]: tolRecords.filter(r => r.wave === w).length }), {});
        const avgImpact = (tolRecords.reduce((s, r) => s + parseFloat(r.overall_impact || 0), 0) / tolRecords.length).toFixed(2);
        const uniqueBUs = new Set(tolRecords.map(r => r.impacted_bu)).size;
        return (
          <div style={S.statsGrid}>
            <div style={S.statCard}><div style={S.statNum}>{tolRecords.length}</div><div style={S.statLbl}>إجمالي السجلات</div></div>
            <div style={S.statCard}><div style={S.statNum}>{uniqueBUs}</div><div style={S.statLbl}>وحدات أعمال متأثرة</div></div>
            <div style={S.statCard}><div style={S.statNum}>{avgImpact}%</div><div style={S.statLbl}>متوسط التأثير</div></div>
            {waves.map(w => (
              <div key={w} style={{ ...S.statCard, background: "#f0faf4" }}>
                <div style={S.statNum}>{waveCounts[w] || 0}</div>
                <div style={S.statLbl}>{w}</div>
              </div>
            ))}
          </div>
        );
      })()}

      {activeTab === "tolerence" && (
        <>
          <form onSubmit={handleSaveTol} style={S.form}>
            <h3 style={S.formTitle}>{"\u0625\u0636\u0627\u0641\u0629 \u0633\u062c\u0644 - Change Tolerence"}</h3>
            <div style={S.grid2}>
              <div>
                <label style={S.label}>InitiativeID *</label>
                <input style={S.input} required value={tolForm.InitiativeID} placeholder="SO.1.1" onChange={e => setTolForm({ ...tolForm, InitiativeID: e.target.value })} />
              </div>
              <div>
                <label style={S.label}>Impacted BU *</label>
                <input style={S.input} required value={tolForm["Impacted BU"]} onChange={e => setTolForm({ ...tolForm, "Impacted BU": e.target.value })} />
              </div>
              <div>
                <label style={S.label}>{"\u0627\u0644\u062d\u0632\u0645\u0629 (Wave)"}</label>
                <select style={S.input} value={tolForm.Wave} onChange={e => setTolForm({ ...tolForm, Wave: e.target.value })}>
                  {waves.map(w => <option key={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label style={S.label}>OverAll Impact % *</label>
                <input style={S.input} required type="number" step="0.001" min="0" max="100" value={tolForm["OverAll Impact"]} placeholder="15.000" onChange={e => setTolForm({ ...tolForm, "OverAll Impact": e.target.value })} />
              </div>
            </div>
            <button type="submit" style={S.submitBtn} disabled={loading}>{loading ? "..." : "\uD83D\uDCBE \u062d\u0641\u0638"}</button>
          </form>

          <div style={S.tableBox}>
            <div style={S.tableHdr}>
              <h3 style={{ margin: 0, color: "#006C35" }}>{"\uD83D\uDCCA \u0627\u0644\u0633\u062c\u0644\u0627\u062a \u0627\u0644\u0645\u062e\u0632\u0646\u0629 - Change Tolerence"}</h3>
              <button onClick={fetchTol} style={S.refreshBtn}>{"\uD83D\uDD04 \u062a\u062d\u062f\u064a\u062b"}</button>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "14px", flexWrap: "wrap", alignItems: "center" }}>
              <input
                style={{ ...S.filterInput, flex: "1", minWidth: "160px" }}
                placeholder="🔍 Impacted BU"
                value={tolSearch}
                onChange={e => setTolSearch(e.target.value)}
              />
              <select style={S.filterInput} value={tolWaveFilter} onChange={e => setTolWaveFilter(e.target.value)}>
                <option value="">{"\u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0632\u0645"}</option>
                {waves.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
              <select style={S.filterInput} value={tolSort} onChange={e => setTolSort(e.target.value)}>
                <option value="newest">{"\u25bc \u0627\u0644\u0623\u062d\u062f\u062b \u0623\u0648\u0644\u0627"}</option>
                <option value="oldest">{"\u25b2 \u0627\u0644\u0623\u0642\u062f\u0645 \u0623\u0648\u0644\u0627"}</option>
              </select>
            </div>
            {dataLoading ? <p style={{ padding: "16px", color: "#666" }}>{"\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644..."}</p> : (() => {
              let rows = [...tolRecords];
              if (tolSort === "newest") rows.reverse();
              if (tolWaveFilter) rows = rows.filter(r => r.wave === tolWaveFilter);
              if (tolSearch.trim()) { const q = tolSearch.trim().toLowerCase(); rows = rows.filter(r => (r.impacted_bu||'').toLowerCase().includes(q)); }
              return rows.length === 0 ? <p style={{ padding: "16px", color: "#999" }}>{"\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c"}</p> : (
                <div style={{ overflowX: "auto" }}>
                  <table style={S.table}>
                    <thead><tr>{["InitiativeID", "Impacted BU", "Wave", "OverAll Impact"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
                    <tbody>{rows.map((r, i) => <tr key={i} style={{ background: i % 2 ? "#f7f9fc" : "#fff" }}><td style={S.td}>{r.initiative_id}</td><td style={S.td}>{r.impacted_bu}</td><td style={S.td}>{r.wave}</td><td style={S.td}>{r.overall_impact}</td></tr>)}</tbody>
                  </table>
                  <p style={{ color: "#888", fontSize: "13px", margin: "8px 0 0" }}>{"\u0625\u062c\u0645\u0627\u0644\u064a: "}{rows.length}{tolRecords.length !== rows.length ? ` (${"\u0645\u0646"} ${tolRecords.length})` : ""}</p>
                </div>
              );
            })()}
          </div>
        </>
      )}

      {/* ===== إحصائيات BUs Hierarchy ===== */}
      {activeTab === "bu" && buRecords.length > 0 && (() => {
        const lvlCounts = levels.reduce((a, l) => ({ ...a, [l]: buRecords.filter(r => r.lvl === l).length }), {});
        const totalEmp = buRecords.reduce((s, r) => s + parseFloat(r.emp_no || 0), 0);
        const uniqueN1 = new Set(buRecords.map(r => r.n1).filter(Boolean)).size;
        return (
          <div style={S.statsGrid}>
            <div style={S.statCard}><div style={S.statNum}>{buRecords.length}</div><div style={S.statLbl}>إجمالي السجلات</div></div>
            <div style={S.statCard}><div style={S.statNum}>{uniqueN1}</div><div style={S.statLbl}>وحدات N-1 فريدة</div></div>
            <div style={S.statCard}><div style={S.statNum}>{totalEmp.toLocaleString()}</div><div style={S.statLbl}>إجمالي الموظفين</div></div>
            {levels.map(l => (
              <div key={l} style={{ ...S.statCard, background: "#f0faf4" }}>
                <div style={S.statNum}>{lvlCounts[l] || 0}</div>
                <div style={S.statLbl}>المستوى {l}</div>
              </div>
            ))}
          </div>
        );
      })()}

      {activeTab === "bu" && (
        <>
          <form onSubmit={handleSaveBU} style={S.form}>
            <h3 style={S.formTitle}>{"\u0625\u0636\u0627\u0641\u0629 \u0633\u062c\u0644 - BUs Hierarchy"}</h3>
            <div style={S.grid2}>
              {[["p_n1", "Business Units N-1", false], ["p_n2", "Business Units N-2", false], ["p_n3", "Business Units N-3", false], ["p_code", "CODE", true], ["p_bu", "BU", true], ["p_id", "ID", true]].map(([k, lbl, req]) => (
                <div key={k}>
                  <label style={S.label}>{lbl}{req ? " *" : ""}</label>
                  <input style={S.input} required={req} value={buForm[k]} onChange={e => setBuForm({ ...buForm, [k]: e.target.value })} />
                </div>
              ))}
              <div>
                <label style={S.label}>Level</label>
                <select style={S.input} value={buForm.p_level} onChange={e => setBuForm({ ...buForm, p_level: e.target.value })}>
                  {levels.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label style={S.label}>Emp. No.</label>
                <input style={S.input} type="number" min="0" value={buForm.p_emp_no} onChange={e => setBuForm({ ...buForm, p_emp_no: e.target.value })} />
              </div>
            </div>
            <button type="submit" style={S.submitBtn} disabled={loading}>{loading ? "..." : "\uD83D\uDCBE \u062d\u0641\u0638"}</button>
          </form>

          <div style={S.tableBox}>
            <div style={S.tableHdr}>
              <h3 style={{ margin: 0, color: "#006C35" }}>{"\uD83D\uDCCA \u0627\u0644\u0633\u062c\u0644\u0627\u062a \u0627\u0644\u0645\u062e\u0632\u0646\u0629 - BUs Hierarchy"}</h3>
              <button onClick={fetchBU} style={S.refreshBtn}>{"\uD83D\uDD04 \u062a\u062d\u062f\u064a\u062b"}</button>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "14px", flexWrap: "wrap", alignItems: "center" }}>
              <input
                style={{ ...S.filterInput, flex: "1", minWidth: "160px" }}
                placeholder="🔍 بحث في السجلات..."
                value={buSearch}
                onChange={e => setBuSearch(e.target.value)}
              />
              <select style={S.filterInput} value={buSort} onChange={e => setBuSort(e.target.value)}>
                <option value="newest">{"\u25bc \u0627\u0644\u0623\u062d\u062f\u062b \u0623\u0648\u0644\u0627"}</option>
                <option value="oldest">{"\u25b2 \u0627\u0644\u0623\u0642\u062f\u0645 \u0623\u0648\u0644\u0627"}</option>
              </select>
            </div>
            {dataLoading ? <p style={{ padding: "16px", color: "#666" }}>{"\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644..."}</p> : (() => {
              let rows = [...buRecords];
              if (buSort === "newest") rows.reverse();
              if (buSearch.trim()) { const q = buSearch.trim().toLowerCase(); rows = rows.filter(r => [r.n1,r.n2,r.n3,r.code,r.bu,r.id,r.lvl].some(v => (v||'').toLowerCase().includes(q))); }
              return rows.length === 0 ? <p style={{ padding: "16px", color: "#999" }}>{"\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c"}</p> : (
                <div style={{ overflowX: "auto" }}>
                  <table style={S.table}>
                    <thead><tr>{["N-1", "N-2", "N-3", "CODE", "BU", "ID", "Level", "Emp. No."].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
                    <tbody>{rows.map((r, i) => <tr key={i} style={{ background: i % 2 ? "#f7f9fc" : "#fff" }}><td style={S.td}>{r.n1}</td><td style={S.td}>{r.n2}</td><td style={S.td}>{r.n3}</td><td style={S.td}>{r.code}</td><td style={S.td}>{r.bu}</td><td style={S.td}>{r.id}</td><td style={S.td}>{r.lvl}</td><td style={S.td}>{r.emp_no}</td></tr>)}</tbody>
                  </table>
                  <p style={{ color: "#888", fontSize: "13px", margin: "8px 0 0" }}>{"\u0625\u062c\u0645\u0627\u0644\u064a: "}{rows.length}{buRecords.length !== rows.length ? ` (${"\u0645\u0646"} ${buRecords.length})` : ""}</p>
                </div>
              );
            })()}
          </div>
        </>
      )}
      {/* ===== إحصائيات Impact Analysis ===== */}
      {activeTab === "impact" && impactRecords.length > 0 && (() => {
        const avgImpact = (impactRecords.reduce((s, r) => s + parseFloat(r.overall_impact || 0), 0) / impactRecords.length).toFixed(2);
        const uniqueBUs = new Set(impactRecords.map(r => r.impacted_bu).filter(Boolean)).size;
        const uniqueInit = new Set(impactRecords.map(r => r.initiative_id).filter(Boolean)).size;
        const sectorCounts = impactRecords.reduce((a, r) => { if (r.sector) a[r.sector] = (a[r.sector] || 0) + 1; return a; }, {});
        const topSectors = Object.entries(sectorCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
        const highImpact = impactRecords.filter(r => parseFloat(r.overall_impact || 0) >= 70).length;
        return (
          <div style={S.statsGrid}>
            <div style={S.statCard}><div style={S.statNum}>{impactRecords.length}</div><div style={S.statLbl}>إجمالي السجلات</div></div>
            <div style={S.statCard}><div style={S.statNum}>{uniqueInit}</div><div style={S.statLbl}>مبادرات فريدة</div></div>
            <div style={S.statCard}><div style={S.statNum}>{uniqueBUs}</div><div style={S.statLbl}>وحدات أعمال متأثرة</div></div>
            <div style={S.statCard}><div style={S.statNum}>{avgImpact}%</div><div style={S.statLbl}>متوسط التأثير الكلي</div></div>
            <div style={{ ...S.statCard, background: highImpact > 0 ? "#fff4f4" : "#f0faf4" }}>
              <div style={{ ...S.statNum, color: highImpact > 0 ? "#c0392b" : "#006C35" }}>{highImpact}</div>
              <div style={S.statLbl}>تأثير عالي (≥70%)</div>
            </div>
            {topSectors.map(([sec, cnt]) => (
              <div key={sec} style={{ ...S.statCard, background: "#f0faf4" }}>
                <div style={S.statNum}>{cnt}</div>
                <div style={S.statLbl}>{sec}</div>
              </div>
            ))}
          </div>
        );
      })()}

      {activeTab === "impact" && (
        <>
          <form onSubmit={handleSaveImpact} style={S.form}>
            <h3 style={S.formTitle}>إضافة سجل - Impact Analysis</h3>
            <div style={S.grid2}>
              {[
                ["InitiativeID", "Initiative ID *", true, "SO.1.1"],
                ["Source", "Source", false, ""],
                ["program", "Program", false, ""],
                ["Portfolio", "Portfolio", false, ""],
                ["title", "Title", false, ""],
                ["owner", "Owner", false, ""],
                ["Nature_on_Impact", "Nature on Impact", false, ""],
                ["Sector", "Sector", false, ""],
                ["Impacted_BU", "Impacted BU *", true, ""],
                ["Impact_Justification", "Impact Justification", false, ""],
                ["Culture", "Culture", false, "0.0"],
                ["Skills", "Skills", false, "0.0"],
                ["Skills_Description", "Skills Description", false, ""],
                ["Org_Design", "Org Design", false, "0.0"],
                ["Org_Design_Description", "Org Design Description", false, ""],
                ["Technology", "Technology", false, "0.0"],
                ["Technology_Description", "Technology Description", false, ""],
                ["Processes", "Processes", false, "0.0"],
                ["Processes_Description", "Processes Description", false, ""],
                ["OverAll_Impact", "OverAll Impact *", true, "0.0"],
                ["Risk", "Risk", false, ""],
                ["Risk_mitigation", "Risk Mitigation", false, ""],
              ].map(([k, lbl, req, ph]) => (
                <div key={k}>
                  <label style={S.label}>{lbl}</label>
                  <input style={S.input} required={req} placeholder={ph} value={impactForm[k]} onChange={e => setImpactForm({ ...impactForm, [k]: e.target.value })} />
                </div>
              ))}
            </div>
            <button type="submit" style={S.submitBtn} disabled={loading}>{loading ? "..." : "💾 حفظ"}</button>
          </form>

          <div style={S.tableBox}>
            <div style={S.tableHdr}>
              <h3 style={{ margin: 0, color: "#006C35" }}>📊 السجلات المخزنة - Impact Analysis</h3>
              <button onClick={fetchImpact} style={S.refreshBtn}>🔄 تحديث</button>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "14px", flexWrap: "wrap", alignItems: "center" }}>
              <input
                style={{ ...S.filterInput, flex: "1", minWidth: "160px" }}
                placeholder="🔍 Impacted BU"
                value={impactSearch}
                onChange={e => setImpactSearch(e.target.value)}
              />
              <select style={S.filterInput} value={impactSort} onChange={e => setImpactSort(e.target.value)}>
                <option value="newest">▼ الأحدث أولاً</option>
                <option value="oldest">▲ الأقدم أولاً</option>
              </select>
            </div>
            {dataLoading ? <p style={{ padding: "16px", color: "#666" }}>جاري التحميل...</p> : (() => {
              let rows = [...impactRecords];
              if (impactSort === "newest") rows.reverse();
              if (impactSearch.trim()) { const q = impactSearch.trim().toLowerCase(); rows = rows.filter(r => (r.impacted_bu||'').toLowerCase().includes(q)); }
              return rows.length === 0 ? <p style={{ padding: "16px", color: "#999" }}>لا توجد نتائج</p> : (
                <div style={{ overflowX: "auto" }}>
                  <table style={S.table}>
                    <thead><tr>{["InitiativeID","Source","Program","Portfolio","Title","Owner","Nature","Sector","Impacted BU","Justification","Culture","Skills","Skills Desc","Org Design","Org Desc","Technology","Tech Desc","Processes","Proc Desc","OverAll Impact","Risk","Risk Mitigation"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
                    <tbody>{rows.map((r, i) => (
                      <tr key={i} style={{ background: i % 2 ? "#f7f9fc" : "#fff" }}>
                        {[r.initiative_id,r.source,r.program,r.portfolio,r.title,r.owner,r.nature,r.sector,r.impacted_bu,r.impact_justification,r.culture,r.skills,r.skills_desc,r.org_design,r.org_design_desc,r.technology,r.technology_desc,r.processes,r.processes_desc,r.overall_impact,r.risk,r.risk_mitigation].map((v,j) => <td key={j} style={S.td}>{v}</td>)}
                      </tr>
                    ))}</tbody>
                  </table>
                  <p style={{ color: "#888", fontSize: "13px", margin: "8px 0 0" }}>إجمالي: {rows.length}{impactRecords.length !== rows.length ? ` (من ${impactRecords.length})` : ""}</p>
                </div>
              );
            })()}
          </div>
        </>
      )}
    </div>
  );
};

const S = {
  backBtn: { background: "#006C35", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "20px", fontSize: "14px" },
  tabBtn: { border: "none", borderRadius: "8px", padding: "12px 22px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", fontFamily: "Arial" },
  form: { background: "white", padding: "28px", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "24px" },
  formTitle: { color: "#006C35", marginTop: 0, marginBottom: "20px", borderBottom: "2px solid #d4edda", paddingBottom: "10px" },
  label: { display: "block", color: "#555", fontSize: "13px", marginBottom: "4px", fontWeight: "bold" },
  input: { width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box", fontFamily: "Arial" },
  submitBtn: { background: "#006C35", color: "white", border: "none", borderRadius: "8px", padding: "12px 32px", cursor: "pointer", fontSize: "15px", fontWeight: "bold" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" },
  tableBox: { background: "white", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: "20px" },
  tableHdr: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  refreshBtn: { background: "#e6f4ec", color: "#006C35", border: "none", borderRadius: "6px", padding: "8px 16px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" },
  filterInput: { padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "13px", fontFamily: "Arial", background: "#f7faf8" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "14px" },
  th: { background: "#006C35", color: "white", padding: "10px 14px", textAlign: "right", whiteSpace: "nowrap" },
  td: { padding: "10px 14px", borderBottom: "1px solid #eee", textAlign: "right", whiteSpace: "nowrap" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "14px", marginBottom: "24px" },
  statCard: { background: "white", borderRadius: "12px", padding: "16px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", textAlign: "center", borderTop: "4px solid #006C35" },
  statNum: { fontSize: "28px", fontWeight: "bold", color: "#006C35", marginBottom: "4px" },
  statLbl: { fontSize: "12px", color: "#666", fontWeight: "bold" },
};

export default SystemInput;
