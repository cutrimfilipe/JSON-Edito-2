/**
 * ╔════════════════════════════════════════════════════════════════════════╗
 * ║  App.jsx                                                              ║
 * ║                                                                       ║
 * ║  Conecta o EditorEngine a qualquer documento.                        ║
 * ║                                                                       ║
 * ║  PARA ADICIONAR UM NOVO DOCUMENTO:                                   ║
 * ║    1. Crie um arquivo em  src/documents/meu-novo-doc.js              ║
 * ║    2. Importe aqui:  import meuDoc from './documents/meu-novo-doc'   ║
 * ║    3. Adicione ao objeto DOCUMENTS abaixo                            ║
 * ║    4. Pronto — ele aparece no seletor automaticamente                ║
 * ╚════════════════════════════════════════════════════════════════════════╝
 */
import { useState, useCallback } from "react";
import DocumentEditor from "./EditorEngine";

// ── Importe seus documentos aqui ─────────────────────────────────────────────
import i140CoverLetter from "./documents/i140-cover-letter";
import employmentContract from "./documents/employment-contract";

// ── Registre-os aqui (chave = id interno, label = o que aparece no seletor) ──
const DOCUMENTS = {
  i140: {
    label: "I-140 Cover Letter (EB-1A)",
    data: i140CoverLetter,
  },
  contract: {
    label: "Contrato de Trabalho (CLT)",
    data: employmentContract,
  },
  // Adicione mais aqui:
  // meuDoc: {
  //   label: "Meu Documento",
  //   data: meuDocImportado,
  // },
};

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [docKey, setDocKey] = useState("i140");

  const handleStateChange = useCallback((state) => {
    // Aqui você pode:
    // - Salvar no localStorage
    // - Enviar para uma API
    // - Atualizar um estado global
    // console.log("Document updated:", state);
  }, []);

  return (
    <div>
      {/* ── Seletor de documento ── */}
      <div
        style={{
          maxWidth: 820,
          margin: "12px auto 0",
          padding: "0 8px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <label
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#666",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Documento:
        </label>
        <select
          value={docKey}
          onChange={(e) => setDocKey(e.target.value)}
          style={{
            padding: "5px 12px",
            fontSize: 13,
            border: "1px solid #ccc",
            borderRadius: 6,
            background: "#fff",
            cursor: "pointer",
            outline: "none",
            color: "#333",
            minWidth: 200,
          }}
        >
          {Object.entries(DOCUMENTS).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <span style={{ fontSize: 10, color: "#aaa", fontStyle: "italic" }}>
          troque aqui para carregar outro documento
        </span>
      </div>

      {/* ── Editor ── */}
      <DocumentEditor
        key={docKey}
        initialData={DOCUMENTS[docKey].data}
        onStateChange={handleStateChange}
      />
    </div>
  );
}
