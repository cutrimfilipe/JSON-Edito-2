# Document Editor — Setup & Uso

## Estrutura do projeto

```
editor/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx                  ← Ponto de entrada React
    ├── App.jsx                   ← Seletor de documentos + EditorEngine
    ├── EditorEngine.jsx          ← Motor de edição (NUNCA modifique)
    └── documents/
        ├── i140-cover-letter.js  ← Documento 1
        └── employment-contract.js← Documento 2 (exemplo)
```

## Como rodar

### Opção A — Local (Vite)

```bash
cd editor
npm install
npm run dev
```

Abre em `http://localhost:5173`.

### Opção B — CodeSandbox

1. Vá em [codesandbox.io](https://codesandbox.io)
2. Crie um novo sandbox → "Import from GitHub" ou "Upload files"
3. Faça upload da pasta `editor/` inteira
4. O CodeSandbox detecta Vite automaticamente e roda

### Opção C — StackBlitz

1. Vá em [stackblitz.com](https://stackblitz.com)
2. Clique "New Project" → "Vite + React"
3. Substitua os arquivos em `src/` pelos deste projeto
4. Rode automaticamente

## Como adicionar um novo documento

### Passo 1 — Crie o arquivo

Crie `src/documents/meu-documento.js`:

```js
const meuDocumento = {
  settings: {
    margins: { top: 72, bottom: 72, left: 80, right: 80 },
    alignment: "justify",
    lineSpacing: 1.5,
    paraSpacing: 4,
  },
  footnotes: [],
  elements: [
    { id: "p1", type: "paragraph", html: "Primeiro parágrafo..." },
    { id: "s1", type: "spacer" },
    { id: "p2", type: "paragraph", html: "Segundo parágrafo..." },
  ],
};
export default meuDocumento;
```

### Passo 2 — Registre no App.jsx

```js
// Adicione o import:
import meuDocumento from "./documents/meu-documento";

// Adicione ao objeto DOCUMENTS:
const DOCUMENTS = {
  i140: { label: "I-140 Cover Letter", data: i140CoverLetter },
  contract: { label: "Contrato de Trabalho", data: employmentContract },
  meuDoc: { label: "Meu Documento", data: meuDocumento },  // ← NOVO
};
```

### Passo 3 — Pronto

O documento aparece automaticamente no dropdown do seletor.

## Formato do documento (referência)

```js
{
  settings: {
    margins: { top, bottom, left, right },  // px
    alignment: "left" | "center" | "right" | "justify",
    lineSpacing: 1.0 a 3.0,  // multiplicador
    paraSpacing: 0 a 40,      // px entre parágrafos
  },

  footnotes: [
    { id: "fn-1", text: "Texto da nota", url: "https://..." | null }
  ],

  elements: [
    // ── Parágrafo ──
    {
      id: "xxx",
      type: "paragraph",
      html: "Texto com <b>negrito</b>, <i>itálico</i>, <u>sublinhado</u>...",
      alignment: "left",       // (opcional) sobrescreve padrão do doc
      lineSpacing: 2.0,        // (opcional) sobrescreve padrão
      spacingAfter: 10,        // (opcional) px após este bloco
    },

    // ── Espaçador ──
    { id: "xxx", type: "spacer" },

    // ── Lista com marcadores ──
    {
      id: "xxx",
      type: "bullet_list",
      items: [
        { id: "i1", html: "Item 1" },
        { id: "i2", html: "Item 2" },
      ]
    },

    // ── Lista numerada ──
    { id: "xxx", type: "numbered_list", items: [...] },

    // ── Tabela ──
    {
      id: "xxx",
      type: "table",
      rows: [
        [{ html: "Cabeçalho 1" }, { html: "Cabeçalho 2" }],
        [{ html: "Dado 1" }, { html: "Dado 2" }],
      ]
    },

    // ── Imagem ──
    {
      id: "xxx",
      type: "image",
      src: "data:image/png;base64,...",
      width: 400,
      height: 300,
      alignment: "center"  // "left" | "center" | "right"
    },
  ]
}
```

### Notas de rodapé no texto

Insira `{{fn:ID}}` no html de qualquer parágrafo:

```
"Texto aqui{{fn:fn-1}}. Continua..."
```

### Placeholders editáveis (azul itálico)

```html
<em style="color:#2E74B5">[Campo a preencher]</em>
```

## O que o EditorEngine faz

| Feature | Como funciona |
|---------|---------------|
| Negrito/Itálico/Sublinhado/Tachado | Toolbar → selecione texto → clique |
| Alinhamento | Toolbar ou configurações por bloco |
| Listas | Toolbar (execCommand) ou menu ⊕ (blocos estruturados) |
| Cor do texto / Realce | Color pickers na toolbar |
| Nota de rodapé | Posicione cursor → clique `fn` → preencha |
| Deletar nota de rodapé | Botão × na seção de rodapés |
| Inserir bloco | Hover sobre gap entre elementos → botão ⊕ |
| Mover bloco | Hover à esquerda → setas ↑↓ |
| Configurar bloco | Hover à esquerda → engrenagem |
| Excluir bloco | Hover à esquerda → lixeira |
| Tabela | Editar células, +/- linhas e colunas |
| Imagem | Upload, redimensionar arrastando, excluir |
| Margens | Botão "Página" na toolbar |
| Ver JSON | Botão "JSON" no cabeçalho |
