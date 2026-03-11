/**
 * ╔════════════════════════════════════════════════════════════════════════╗
 * ║  EditorEngine.jsx — Motor de edição reutilizável                      ║
 * ║                                                                       ║
 * ║  NÃO MODIFIQUE ESTE ARQUIVO para novos documentos.                   ║
 * ║  Ele recebe qualquer documento via prop `initialData`.                ║
 * ║                                                                       ║
 * ║  Uso:                                                                 ║
 * ║    import DocumentEditor from './EditorEngine';                       ║
 * ║    <DocumentEditor initialData={meuDoc} onStateChange={fn} />        ║
 * ╚════════════════════════════════════════════════════════════════════════╝
 */
import { useState, useRef, useCallback, useEffect } from "react";

// ─── Utilities ───────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 8);
const FONT = "'Times New Roman', Times, serif";
const pill = {
  background: "#fafafa", border: "1px solid #ddd", borderRadius: 4,
  padding: "2px 10px", fontSize: 11, cursor: "pointer", color: "#555",
};
const labelSt = {
  display: "block", fontSize: 10, fontWeight: 600, color: "#777",
  marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5,
};

// ─── Icons ───────────────────────────────────────────────────────────────────
const V = ({ children, s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);
const IC = {
  bold:    <V><path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"/><path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/></V>,
  italic:  <V><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></V>,
  under:   <V><path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></V>,
  strike:  <V><line x1="4" y1="12" x2="20" y2="12"/><path d="M17.5 7.5c0-2-1.5-3.5-5.5-3.5s-5.5 1.5-5.5 3.5"/><path d="M6.5 16.5c0 2 1.5 3.5 5.5 3.5s5.5-1.5 5.5-3.5"/></V>,
  alL:     <V><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></V>,
  alC:     <V><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></V>,
  alJ:     <V><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></V>,
  alR:     <V><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></V>,
  trash:   <V><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></V>,
  image:   <V><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></V>,
  table:   <V><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></V>,
  list:    <V><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></V>,
  chevU:   <V s={13}><path d="M18 15l-6-6-6 6"/></V>,
  chevD:   <V s={13}><path d="M6 9l6 6 6-6"/></V>,
  gear:    <V s={13}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></V>,
};

// ─── Footnote helpers ────────────────────────────────────────────────────────
const FN_RE = /\{\{fn:([^}]+)\}\}/g;

function injectFn(html, fns) {
  if (!html) return "";
  return html.replace(new RegExp(FN_RE.source, "g"), (_, id) => {
    const n = fns.findIndex((f) => f.id === id);
    return `<sup data-fn="${id}" contenteditable="false" class="ed-fn">[${n >= 0 ? n + 1 : "?"}]</sup>`;
  });
}

function extractFn(dom) {
  if (!dom) return "";
  const c = dom.cloneNode(true);
  c.querySelectorAll("sup[data-fn]").forEach((s) =>
    s.replaceWith(`{{fn:${s.getAttribute("data-fn")}}}`)
  );
  return c.innerHTML;
}

// ─── RichEditable ────────────────────────────────────────────────────────────
function RichEditable({ html, footnotes, onChange, style = {} }) {
  const ref = useRef(null);
  const local = useRef(html);
  const fnRef = useRef(footnotes);
  fnRef.current = footnotes;

  useEffect(() => {
    if (ref.current) ref.current.innerHTML = injectFn(html, fnRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = injectFn(html, footnotes);
    local.current = html;
  }, [html, footnotes]);

  const onInput = useCallback(() => {
    if (!ref.current) return;
    const h = extractFn(ref.current);
    local.current = h;
    onChange(h);
  }, [onChange]);

  return (
    <div ref={ref} contentEditable suppressContentEditableWarning onInput={onInput}
      style={{ outline: "none", minHeight: "1.1em", cursor: "text", fontFamily: FONT, ...style }} />
  );
}

// ─── ResizableImage ──────────────────────────────────────────────────────────
function ResizableImage({ src, width, height, onResize, onDelete, alignment }) {
  const [drag, setDrag] = useState(false);
  const orig = useRef(null);

  const onDown = useCallback((e) => {
    e.preventDefault();
    orig.current = { x: e.clientX, w: width, h: height };
    setDrag(true);
  }, [width, height]);

  useEffect(() => {
    if (!drag) return;
    const mv = (e) => {
      const dx = e.clientX - orig.current.x;
      const r = orig.current.h / orig.current.w;
      const nw = Math.max(40, orig.current.w + dx);
      onResize(Math.round(nw), Math.round(nw * r));
    };
    const up = () => setDrag(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); };
  }, [drag, onResize]);

  const jc = alignment === "center" ? "center" : alignment === "right" ? "flex-end" : "flex-start";
  return (
    <div style={{ display: "flex", justifyContent: jc, padding: "4px 0" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img src={src} alt="" draggable={false}
          style={{ width, height, display: "block", borderRadius: 2, border: "1px solid #d0d0d0" }} />
        <div onMouseDown={onDown} style={{
          position: "absolute", right: -5, bottom: -5, width: 12, height: 12,
          background: "#2E74B5", borderRadius: "50%", cursor: "nwse-resize",
          border: "2px solid #fff", boxShadow: "0 1px 3px rgba(0,0,0,.3)",
        }} />
        <button onClick={onDelete} style={{
          position: "absolute", top: -7, right: -7, width: 20, height: 20,
          background: "#d9534f", color: "#fff", border: "none", borderRadius: "50%",
          fontSize: 12, lineHeight: 1, cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,.3)",
        }}>×</button>
      </div>
    </div>
  );
}

// ─── EditableTable ───────────────────────────────────────────────────────────
function EditableTable({ element, onChange, onDelete }) {
  const { rows } = element;
  const nc = rows[0]?.length || 2;
  const setCell = (r, c, h) =>
    onChange({ ...element, rows: rows.map((row, ri) => row.map((cl, ci) => (ri === r && ci === c ? { ...cl, html: h } : cl))) });
  const addRow = () => onChange({ ...element, rows: [...rows, Array.from({ length: nc }, () => ({ html: "" }))] });
  const delRow = (i) => { if (rows.length > 1) onChange({ ...element, rows: rows.filter((_, ri) => ri !== i) }); };
  const addCol = () => onChange({ ...element, rows: rows.map((r2) => [...r2, { html: "" }]) });
  const delCol = (i) => { if (nc > 1) onChange({ ...element, rows: rows.map((r2) => r2.filter((_, ci) => ci !== i)) }); };

  return (
    <div style={{ margin: "4px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: FONT, fontSize: "10.5pt" }}>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((c, ci) => (
                <td key={ci} contentEditable suppressContentEditableWarning
                  style={{
                    border: "1px solid #b0b0b0", padding: "5px 8px", outline: "none",
                    verticalAlign: "top", minWidth: 50,
                    ...(ri === 0 ? { fontWeight: 600, background: "#f4f6f8" } : {}),
                  }}
                  onBlur={(e) => setCell(ri, ci, e.currentTarget.innerHTML)}
                  dangerouslySetInnerHTML={{ __html: c.html }} />
              ))}
              <td style={{ border: "none", width: 22, padding: 0, verticalAlign: "middle" }}>
                <button onClick={() => delRow(ri)}
                  style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 15, fontWeight: 700, padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#d9534f")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
                >−</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", gap: 2, marginTop: 1 }}>
        {rows[0]?.map((_, ci) => (
          <div key={ci} style={{ flex: 1, textAlign: "center" }}>
            <button onClick={() => delCol(ci)}
              style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 15, fontWeight: 700, padding: 0 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d9534f")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
            >−</button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
        <button onClick={addRow} style={pill}>+ Linha</button>
        <button onClick={addCol} style={pill}>+ Coluna</button>
        <div style={{ flex: 1 }} />
        <button onClick={onDelete} style={{ ...pill, color: "#d9534f", borderColor: "#d9534f" }}>Excluir tabela</button>
      </div>
    </div>
  );
}

// ─── InsertGap ───────────────────────────────────────────────────────────────
function InsertGap({ onInsert }) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const items = [
    ["paragraph", "¶", "Parágrafo"],
    ["bullet_list", "•", "Lista com marcadores"],
    ["numbered_list", "1.", "Lista numerada"],
    ["table", IC.table, "Tabela"],
    ["image", IC.image, "Imagem"],
    ["spacer", "↕", "Espaçador"],
  ];

  return (
    <div ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { if (!open) setHover(false); }}
      style={{
        height: hover || open ? 18 : 4,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "height .12s", position: "relative", zIndex: open ? 30 : 5,
      }}>
      {(hover || open) && (
        <button onClick={() => setOpen((v) => !v)} style={{
          width: 18, height: 18, borderRadius: "50%",
          border: "1.5px solid " + (open ? "#2E74B5" : "#ccc"),
          background: open ? "#2E74B5" : "#fff",
          color: open ? "#fff" : "#bbb",
          cursor: "pointer", fontSize: 12, lineHeight: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 0, transition: "all .1s",
        }}>+</button>
      )}
      {open && (
        <div style={{
          position: "absolute", top: 22, background: "#fff", borderRadius: 8,
          boxShadow: "0 6px 24px rgba(0,0,0,.15)", border: "1px solid #e4e4e4",
          padding: 4, minWidth: 180, zIndex: 31,
        }}>
          {items.map(([type, icon, label]) => (
            <button key={type} onClick={() => { onInsert(type); setOpen(false); setHover(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
                border: "none", background: "transparent", cursor: "pointer",
                borderRadius: 5, fontSize: 12, color: "#333", width: "100%", textAlign: "left",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f4f8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <span style={{ width: 18, display: "flex", justifyContent: "center", color: "#2E74B5", fontSize: 13, fontWeight: 700 }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ElementWrap ─────────────────────────────────────────────────────────────
function ElementWrap({ children, idx, total, onMoveUp, onMoveDown, onDelete, onSettings }) {
  const [hover, setHover] = useState(false);
  const sc = {
    width: 22, height: 22, borderRadius: 3, border: "1px solid #e0e0e0",
    background: "#fff", cursor: "pointer", display: "flex", alignItems: "center",
    justifyContent: "center", color: "#999", padding: 0,
  };
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: "relative", paddingLeft: 32, marginLeft: -32 }}>
      <div style={{
        position: "absolute", left: 0, top: 0,
        display: "flex", flexDirection: "column", gap: 1,
        opacity: hover ? 1 : 0, transition: "opacity .12s",
        pointerEvents: hover ? "auto" : "none",
      }}>
        {idx > 0 && <button onClick={onMoveUp} style={sc}>{IC.chevU}</button>}
        {idx < total - 1 && <button onClick={onMoveDown} style={sc}>{IC.chevD}</button>}
        <button onClick={onSettings} style={sc}>{IC.gear}</button>
        <button onClick={onDelete} style={{ ...sc, color: "#c0392b" }}>{IC.trash}</button>
      </div>
      {children}
    </div>
  );
}

// ─── BlockSettings ───────────────────────────────────────────────────────────
function BlockSettings({ element, onUpdate, onClose, defaults }) {
  const a = element.alignment || defaults.alignment;
  const ls = element.lineSpacing ?? defaults.lineSpacing;
  const sa = element.spacingAfter ?? defaults.paraSpacing;
  return (
    <div onClick={(e) => e.stopPropagation()} style={{
      position: "absolute", right: -245, top: 0, width: 225, background: "#fff",
      borderRadius: 8, boxShadow: "0 6px 24px rgba(0,0,0,.14)", padding: 14,
      zIndex: 20, border: "1px solid #e4e4e4", fontSize: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontWeight: 700 }}>Configurações</span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "#999", padding: 0 }}>×</button>
      </div>
      <span style={labelSt}>Alinhamento</span>
      <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
        {[["left", IC.alL], ["center", IC.alC], ["justify", IC.alJ], ["right", IC.alR]].map(([v, ic]) => (
          <button key={v} onClick={() => onUpdate({ ...element, alignment: v })} style={{
            ...pill, flex: 1, display: "flex", justifyContent: "center", padding: "4px 0",
            background: a === v ? "#2E74B5" : "#f8f8f8", color: a === v ? "#fff" : "#555",
            border: a === v ? "1px solid #2E74B5" : "1px solid #ddd",
          }}>{ic}</button>
        ))}
      </div>
      <span style={labelSt}>Entrelinhas: {Number(ls).toFixed(1)}×</span>
      <input type="range" min="1" max="3" step="0.1" value={ls}
        onChange={(e) => onUpdate({ ...element, lineSpacing: +e.target.value })}
        style={{ width: "100%", accentColor: "#2E74B5", marginBottom: 8 }} />
      <span style={labelSt}>Espaço após: {sa}px</span>
      <input type="range" min="0" max="40" step="1" value={sa}
        onChange={(e) => onUpdate({ ...element, spacingAfter: +e.target.value })}
        style={{ width: "100%", accentColor: "#2E74B5" }} />
    </div>
  );
}

// ─── PageSettings ────────────────────────────────────────────────────────────
function PageSettings({ settings, onChange, onClose }) {
  const m = settings.margins;
  const set = (k, v) => onChange({ ...settings, margins: { ...m, [k]: Math.max(0, v) } });
  const ml = { top: "Superior", bottom: "Inferior", left: "Esquerda", right: "Direita" };
  return (
    <div onClick={(e) => e.stopPropagation()} style={{
      position: "fixed", top: 56, right: 16, width: 240, background: "#fff",
      borderRadius: 10, boxShadow: "0 10px 40px rgba(0,0,0,.18)", padding: 16,
      zIndex: 100, border: "1px solid #e0e0e0",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>Página</span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 17, color: "#999" }}>×</button>
      </div>
      <span style={labelSt}>Margens (px)</span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
        {["top", "bottom", "left", "right"].map((k) => (
          <div key={k}>
            <span style={{ fontSize: 10, color: "#999" }}>{ml[k]}</span>
            <input type="number" value={m[k]} min={0} onChange={(e) => set(k, +e.target.value)}
              style={{ width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: 4, padding: "4px 6px", fontSize: 12, outline: "none" }} />
          </div>
        ))}
      </div>
      <span style={labelSt}>Entrelinhas: {Number(settings.lineSpacing).toFixed(1)}×</span>
      <input type="range" min="1" max="3" step="0.1" value={settings.lineSpacing}
        onChange={(e) => onChange({ ...settings, lineSpacing: +e.target.value })}
        style={{ width: "100%", accentColor: "#2E74B5", marginBottom: 8 }} />
      <span style={labelSt}>Espaço entre §: {settings.paraSpacing}px</span>
      <input type="range" min="0" max="40" step="1" value={settings.paraSpacing}
        onChange={(e) => onChange({ ...settings, paraSpacing: +e.target.value })}
        style={{ width: "100%", accentColor: "#2E74B5", marginBottom: 8 }} />
      <span style={labelSt}>Alinhamento padrão</span>
      <div style={{ display: "flex", gap: 3 }}>
        {[["left", "Esq"], ["center", "Centro"], ["justify", "Just."], ["right", "Dir"]].map(([v, lb]) => (
          <button key={v} onClick={() => onChange({ ...settings, alignment: v })} style={{
            ...pill, flex: 1, fontSize: 10,
            background: settings.alignment === v ? "#2E74B5" : "#f8f8f8",
            color: settings.alignment === v ? "#fff" : "#555",
            border: settings.alignment === v ? "1px solid #2E74B5" : "1px solid #ddd",
          }}>{lb}</button>
        ))}
      </div>
    </div>
  );
}

// ─── FootnoteDialog ──────────────────────────────────────────────────────────
function FootnoteDialog({ onAdd, onCancel }) {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const r = useRef(null);
  useEffect(() => { setTimeout(() => r.current?.focus(), 50); }, []);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.3)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 12, padding: 22, width: "min(370px, 92vw)",
        boxShadow: "0 16px 48px rgba(0,0,0,.2)",
      }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Nova nota de rodapé</div>
        <span style={labelSt}>Texto da nota *</span>
        <textarea ref={r} value={text} onChange={(e) => setText(e.target.value)} rows={3}
          placeholder="Ex: See 8 C.F.R. § 204.5(h)(3)."
          style={{ width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: 6, padding: "7px 10px", fontSize: 12, fontFamily: FONT, resize: "vertical", outline: "none" }} />
        <span style={{ ...labelSt, marginTop: 8 }}>URL (opcional)</span>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..."
          style={{ width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: 6, padding: "6px 10px", fontSize: 12, outline: "none" }} />
        <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={pill}>Cancelar</button>
          <button disabled={!text.trim()} onClick={() => onAdd(text.trim(), url.trim())} style={{
            ...pill, background: text.trim() ? "#2E74B5" : "#ccc", color: "#fff",
            border: "1px solid " + (text.trim() ? "#2E74B5" : "#ccc"),
          }}>Inserir</button>
        </div>
      </div>
    </div>
  );
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────
function Toolbar({ onInsertFootnote, onPageSettings }) {
  const exec = (cmd) => (e) => { e.preventDefault(); document.execCommand(cmd, false, null); };
  const tb = {
    background: "transparent", border: "1px solid transparent", borderRadius: 4,
    padding: "5px 7px", cursor: "pointer", display: "flex", alignItems: "center",
    justifyContent: "center", color: "#555", flexShrink: 0, gap: 3,
  };
  const sp = { width: 1, height: 18, background: "#e8e8e8", margin: "0 2px", flexShrink: 0 };
  const btn = (k, ic, t, h) => <button key={k} title={t} onMouseDown={h || exec(k)} style={tb}>{ic}</button>;

  return (
    <div style={{
      maxWidth: 820, margin: "0 auto 6px", background: "#fff", borderRadius: 8,
      boxShadow: "0 1px 8px rgba(0,0,0,.06)", border: "1px solid #eaeaea",
      position: "sticky", top: 4, zIndex: 50,
      overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 1, padding: "2px 4px", minWidth: "max-content" }}>
        {btn("bold", IC.bold, "Negrito (Ctrl+B)")}
        {btn("italic", IC.italic, "Itálico (Ctrl+I)")}
        {btn("underline", IC.under, "Sublinhado (Ctrl+U)")}
        {btn("strikeThrough", IC.strike, "Tachado")}
        <div style={sp} />
        {btn("justifyLeft", IC.alL, "Esquerda")}
        {btn("justifyCenter", IC.alC, "Centro")}
        {btn("justifyFull", IC.alJ, "Justificado")}
        {btn("justifyRight", IC.alR, "Direita")}
        <div style={sp} />
        {btn("insertUnorderedList", IC.list, "Marcadores")}
        {btn("insertOrderedList",
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace" }}>1.</span>,
          "Numeração", exec("insertOrderedList"))}
        <div style={sp} />
        <label title="Cor do texto" style={{ ...tb, position: "relative", overflow: "hidden" }}>
          <span style={{ fontFamily: "serif", fontWeight: 700, fontSize: 13 }}>A</span>
          <input type="color" style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
            onChange={(e) => document.execCommand("foreColor", false, e.target.value)} />
        </label>
        <label title="Realce" style={{ ...tb, position: "relative", overflow: "hidden" }}>
          <span style={{ fontSize: 11, background: "#fff176", borderRadius: 2, padding: "0 3px", fontWeight: 600 }}>ab</span>
          <input type="color" defaultValue="#fff176" style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
            onChange={(e) => document.execCommand("hiliteColor", false, e.target.value)} />
        </label>
        <div style={sp} />
        <button title="Nota de rodapé" onMouseDown={(e) => { e.preventDefault(); onInsertFootnote(); }} style={tb}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "serif" }}>fn</span>
        </button>
        <div style={{ flex: 1, minWidth: 8 }} />
        <button onClick={onPageSettings} style={{ ...tb, gap: 4, fontSize: 11, padding: "3px 8px", color: "#666" }}>
          {IC.gear} Página
        </button>
      </div>
    </div>
  );
}

// ─── Main DocumentEditor ─────────────────────────────────────────────────────
export default function DocumentEditor({ initialData, onStateChange }) {
  const [elements, setElements] = useState(initialData.elements);
  const [footnotes, setFootnotes] = useState(initialData.footnotes || []);
  const [settings, setSettings] = useState(initialData.settings);
  const [showPS, setShowPS] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [settId, setSettId] = useState(null);
  const [fnDlg, setFnDlg] = useState(false);
  const [savedR, setSavedR] = useState(null);
  const fileRef = useRef(null);
  const imgI = useRef(null);

  // Reset when initialData changes (document swap)
  useEffect(() => {
    setElements(initialData.elements);
    setFootnotes(initialData.footnotes || []);
    setSettings(initialData.settings);
    setSettId(null);
    setShowPS(false);
    setFnDlg(false);
  }, [initialData]);

  useEffect(() => {
    onStateChange?.({ elements, footnotes, settings });
  }, [elements, footnotes, settings]);

  const updEl = (id, p) => setElements((prev) => prev.map((el) => (el.id === id ? (typeof p === "function" ? p(el) : { ...el, ...p }) : el)));
  const delEl = (id) => { setElements((prev) => prev.filter((el) => el.id !== id)); setSettId(null); };
  const moveEl = (id, dir) => setElements((prev) => {
    const i = prev.findIndex((el) => el.id === id);
    const ni = i + dir;
    if (i < 0 || ni < 0 || ni >= prev.length) return prev;
    const a = [...prev]; [a[i], a[ni]] = [a[ni], a[i]]; return a;
  });
  const insertAt = (idx, el) => setElements((prev) => { const a = [...prev]; a.splice(idx, 0, el); return a; });

  const handleInsert = (idx, type) => {
    const id = uid();
    if (type === "paragraph") return insertAt(idx, { id, type: "paragraph", html: "" });
    if (type === "bullet_list") return insertAt(idx, { id, type: "bullet_list", items: [{ id: uid(), html: "Item 1" }, { id: uid(), html: "Item 2" }] });
    if (type === "numbered_list") return insertAt(idx, { id, type: "numbered_list", items: [{ id: uid(), html: "Item 1" }, { id: uid(), html: "Item 2" }] });
    if (type === "table") return insertAt(idx, { id, type: "table", rows: [[{ html: "Col 1" }, { html: "Col 2" }, { html: "Col 3" }], [{ html: "" }, { html: "" }, { html: "" }]] });
    if (type === "image") { imgI.current = idx; fileRef.current?.click(); return; }
    if (type === "spacer") return insertAt(idx, { id, type: "spacer" });
  };

  const handleImg = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const w = Math.min(img.width, 480);
        const h = Math.round((w / img.width) * img.height);
        insertAt(imgI.current ?? elements.length, { id: uid(), type: "image", src: ev.target.result, width: w, height: h, alignment: "center" });
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const addItem = (elId) => updEl(elId, (el) => ({ ...el, items: [...el.items, { id: uid(), html: "Novo item" }] }));
  const delItem = (elId, i) => updEl(elId, (el) => ({ ...el, items: el.items.filter((_, j) => j !== i) }));
  const updItem = (elId, i, html) => updEl(elId, (el) => ({ ...el, items: el.items.map((it, j) => (j === i ? { ...it, html } : it)) }));

  const onFnTb = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) { alert("Posicione o cursor no texto onde deseja inserir a nota."); return; }
    setSavedR(sel.getRangeAt(0).cloneRange());
    setFnDlg(true);
  };

  const addFn = (text, url) => {
    const newId = "fn-" + uid();
    const newList = [...footnotes, { id: newId, text, url: url || null }];
    setFootnotes(newList);
    if (savedR) {
      try {
        const sel = window.getSelection();
        sel.removeAllRanges();
        const range = savedR;
        range.collapse(false);
        const sup = document.createElement("sup");
        sup.setAttribute("data-fn", newId);
        sup.contentEditable = "false";
        sup.className = "ed-fn";
        sup.textContent = `[${newList.length}]`;
        range.insertNode(sup);
        range.setStartAfter(sup);
        range.collapse(true);
        sel.addRange(range);
        let parent = sup.parentElement;
        while (parent && parent.contentEditable !== "true") parent = parent.parentElement;
        if (parent) parent.dispatchEvent(new Event("input", { bubbles: true }));
      } catch (err) { console.warn("Footnote insert error:", err); }
    }
    setFnDlg(false);
    setSavedR(null);
  };

  const delFn = useCallback((fnId) => {
    setFootnotes((prev) => prev.filter((f) => f.id !== fnId));
    setElements((prev) =>
      prev.map((el) => {
        if (el.html) { const c = el.html.replaceAll(`{{fn:${fnId}}}`, ""); if (c !== el.html) return { ...el, html: c }; }
        if (el.items) return { ...el, items: el.items.map((it) => { const c = it.html.replaceAll(`{{fn:${fnId}}}`, ""); return c !== it.html ? { ...it, html: c } : it; }) };
        return el;
      })
    );
    setTimeout(() => {
      document.querySelectorAll(`sup[data-fn="${fnId}"]`).forEach((el) => {
        let parent = el.parentElement;
        while (parent && parent.contentEditable !== "true") parent = parent.parentElement;
        el.remove();
        if (parent) parent.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }, 0);
  }, []);

  const bs = (el) => ({
    fontFamily: FONT, fontSize: "11pt",
    textAlign: el.alignment || settings.alignment,
    lineHeight: el.lineSpacing || settings.lineSpacing,
    marginBottom: (el.spacingAfter ?? settings.paraSpacing) + "px",
  });

  const renderEl = (el, idx) => {
    const st = bs(el);
    let content;
    switch (el.type) {
      case "spacer":
        return <div key={el.id}><InsertGap onInsert={(t) => handleInsert(idx, t)} /><div style={{ height: "0.6em" }} /></div>;
      case "paragraph":
        content = <RichEditable html={el.html} footnotes={footnotes} onChange={(h) => updEl(el.id, { html: h })} style={st} />;
        break;
      case "bullet_list":
      case "numbered_list": {
        const Tag = el.type === "bullet_list" ? "ul" : "ol";
        content = (
          <div>
            <Tag style={{ ...st, paddingLeft: 28, margin: 0 }}>
              {el.items.map((item, i) => (
                <li key={item.id} style={{ marginBottom: 2, position: "relative", paddingRight: 20 }}>
                  <div contentEditable suppressContentEditableWarning
                    style={{ outline: "none", fontFamily: FONT, fontSize: "11pt" }}
                    onBlur={(e) => updItem(el.id, i, e.currentTarget.innerHTML)}
                    dangerouslySetInnerHTML={{ __html: item.html }} />
                  <button onClick={() => delItem(el.id, i)}
                    style={{ position: "absolute", right: 0, top: 3, background: "none", border: "none", color: "#d0d0d0", cursor: "pointer", fontSize: 13, padding: 0 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#d9534f")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#d0d0d0")}>×</button>
                </li>
              ))}
            </Tag>
            <button onClick={() => addItem(el.id)} style={{ ...pill, marginTop: 4, fontSize: 10, color: "#999" }}>+ Item</button>
          </div>
        );
        break;
      }
      case "table":
        content = <EditableTable element={el} onChange={(u) => updEl(el.id, u)} onDelete={() => delEl(el.id)} />;
        break;
      case "image":
        content = <ResizableImage src={el.src} width={el.width} height={el.height}
          alignment={el.alignment || "center"} onResize={(w, h) => updEl(el.id, { width: w, height: h })} onDelete={() => delEl(el.id)} />;
        break;
      default: return null;
    }

    return (
      <div key={el.id}>
        <InsertGap onInsert={(t) => handleInsert(idx, t)} />
        <ElementWrap idx={idx} total={elements.length}
          onMoveUp={() => moveEl(el.id, -1)} onMoveDown={() => moveEl(el.id, 1)}
          onDelete={() => delEl(el.id)} onSettings={() => setSettId(settId === el.id ? null : el.id)}>
          <div style={{ position: "relative" }}>
            {content}
            {settId === el.id && <BlockSettings element={el} defaults={settings} onUpdate={(u) => updEl(el.id, u)} onClose={() => setSettId(null)} />}
          </div>
        </ElementWrap>
      </div>
    );
  };

  const mg = settings.margins;

  return (
    <div style={{ minHeight: "100vh", background: "#e8e8e8", padding: "12px 8px 60px" }}>
      <style>{`
        [contenteditable]:focus { background: #fffef5 !important; border-radius: 2px; }
        ::selection { background: #b3d4fc; }
        .ed-fn { color: #2E74B5; font-weight: 600; font-size: .72em; cursor: default; user-select: none; vertical-align: super; }
      `}</style>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImg} />
      <Toolbar onInsertFootnote={onFnTb} onPageSettings={() => setShowPS((v) => !v)} />
      {showPS && <PageSettings settings={settings} onChange={setSettings} onClose={() => setShowPS(false)} />}
      {fnDlg && <FootnoteDialog onAdd={addFn} onCancel={() => { setFnDlg(false); setSavedR(null); }} />}

      <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 700, fontSize: 12, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Document</span>
          <span style={{ fontSize: 10, color: "#aaa", fontStyle: "italic" }}>edite · formate · ⊕ insira</span>
          <div style={{ flex: 1 }} />
          <button onClick={() => setShowJson((v) => !v)} style={{
            fontSize: 11, background: showJson ? "#1a1a2e" : "#fff",
            color: showJson ? "#fff" : "#555", border: "1px solid #ccc",
            borderRadius: 5, padding: "3px 12px", cursor: "pointer",
          }}>{showJson ? "Ocultar JSON" : "JSON"}</button>
        </div>

        <div style={{
          background: "#fff", boxShadow: "0 2px 20px rgba(0,0,0,.12)", borderRadius: 1,
          paddingTop: mg.top, paddingBottom: mg.bottom, paddingLeft: mg.left, paddingRight: mg.right,
          minHeight: 1056, position: "relative", transition: "padding .2s", overflow: "visible",
        }}>
          {elements.map(renderEl)}
          <InsertGap onInsert={(t) => handleInsert(elements.length, t)} />

          {footnotes.length > 0 && (
            <div style={{ marginTop: 44, borderTop: "1px solid #c0c0c0", paddingTop: 8, fontFamily: FONT, fontSize: "9pt", color: "#555", lineHeight: 1.5 }}>
              {footnotes.map((fn, i) => (
                <div key={fn.id} style={{ display: "flex", alignItems: "flex-start", gap: 4, marginBottom: 2 }}>
                  <sup style={{ color: "#2E74B5", flexShrink: 0 }}>[{i + 1}]</sup>
                  <div style={{ flex: 1 }}>
                    <span contentEditable suppressContentEditableWarning style={{ outline: "none", fontSize: "9pt" }}
                      onBlur={(e) => setFootnotes((p) => p.map((f) => (f.id === fn.id ? { ...f, text: e.currentTarget.innerText } : f)))}
                    >{fn.text}</span>
                    {fn.url && <>
                      {" "}
                      <span contentEditable suppressContentEditableWarning
                        style={{ outline: "none", fontSize: "9pt", color: "#2E74B5" }}
                        onBlur={(e) => setFootnotes((p) => p.map((f) => (f.id === fn.id ? { ...f, url: e.currentTarget.innerText } : f)))}
                      >{fn.url}</span>
                    </>}
                  </div>
                  <button onClick={() => delFn(fn.id)} title="Remover"
                    style={{ background: "none", border: "none", color: "#d0d0d0", cursor: "pointer", fontSize: 14, padding: "0 4px", flexShrink: 0, lineHeight: 1 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#d9534f")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#d0d0d0")}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {showJson && (
          <div style={{ background: "#1a1a2e", borderRadius: 6, padding: 20, overflowX: "auto" }}>
            <pre style={{ margin: 0, color: "#a8ff78", fontSize: 10, lineHeight: 1.5, fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {JSON.stringify({ settings, elements, footnotes }, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
