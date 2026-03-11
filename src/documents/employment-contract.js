/**
 * employment-contract.js
 * Documento: Contrato de Trabalho (exemplo para demonstrar troca de documentos)
 */
const employmentContract = {
  settings: {
    margins: { top: 72, bottom: 72, left: 80, right: 80 },
    alignment: "justify",
    lineSpacing: 1.5,
    paraSpacing: 4,
  },
  footnotes: [
    {
      id: "fn-clt",
      text: "Consolidação das Leis do Trabalho, Decreto-Lei nº 5.452/1943.",
      url: null,
    },
  ],
  elements: [
    {
      id: "title",
      type: "paragraph",
      alignment: "center",
      html: '<b style="font-size:14pt">CONTRATO INDIVIDUAL DE TRABALHO POR PRAZO INDETERMINADO</b>',
    },
    { id: "s01", type: "spacer" },
    {
      id: "parties-header",
      type: "paragraph",
      html: "Pelo presente instrumento particular, as partes abaixo qualificadas celebram o presente <b>Contrato Individual de Trabalho</b>, que se regerá pelas cláusulas e condições a seguir estipuladas, bem como pelas disposições da CLT{{fn:fn-clt}} e legislação complementar aplicável:",
    },
    { id: "s02", type: "spacer" },
    {
      id: "employer",
      type: "paragraph",
      html: '<b>EMPREGADOR:</b> <em style="color:#2E74B5">[Razão Social da Empresa]</em>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº <em style="color:#2E74B5">[XX.XXX.XXX/XXXX-XX]</em>, com sede em <em style="color:#2E74B5">[Endereço completo]</em>, doravante denominada <b>EMPREGADOR</b>.',
    },
    { id: "s03", type: "spacer" },
    {
      id: "employee",
      type: "paragraph",
      html: '<b>EMPREGADO:</b> <em style="color:#2E74B5">[Nome Completo]</em>, <em style="color:#2E74B5">[nacionalidade]</em>, <em style="color:#2E74B5">[estado civil]</em>, portador(a) do RG nº <em style="color:#2E74B5">[XXXXXXX]</em> e CPF nº <em style="color:#2E74B5">[XXX.XXX.XXX-XX]</em>, residente em <em style="color:#2E74B5">[Endereço completo]</em>, doravante denominado(a) <b>EMPREGADO</b>.',
    },
    { id: "s04", type: "spacer" },
    {
      id: "clause-title-1",
      type: "paragraph",
      html: "<b>CLÁUSULA PRIMEIRA — DO OBJETO</b>",
    },
    {
      id: "clause-1",
      type: "paragraph",
      html: 'O EMPREGADO exercerá a função de <em style="color:#2E74B5">[Cargo/Função]</em>, comprometendo-se a desempenhar com zelo, dedicação e competência as atribuições inerentes ao cargo.',
    },
    { id: "s05", type: "spacer" },
    {
      id: "clause-title-2",
      type: "paragraph",
      html: "<b>CLÁUSULA SEGUNDA — DA REMUNERAÇÃO</b>",
    },
    {
      id: "clause-2",
      type: "paragraph",
      html: 'O EMPREGADO receberá remuneração mensal bruta de R$ <em style="color:#2E74B5">[X.XXX,XX]</em> (<em style="color:#2E74B5">[valor por extenso]</em>), sujeita aos descontos legais, paga até o 5º dia útil do mês subsequente.',
    },
    { id: "s06", type: "spacer" },
    {
      id: "clause-title-3",
      type: "paragraph",
      html: "<b>CLÁUSULA TERCEIRA — DA JORNADA DE TRABALHO</b>",
    },
    {
      id: "clause-3",
      type: "paragraph",
      html: 'A jornada de trabalho será de <em style="color:#2E74B5">[XX]</em> horas semanais, de segunda a sexta-feira, das <em style="color:#2E74B5">[HH:MM]</em> às <em style="color:#2E74B5">[HH:MM]</em>, com intervalo de <em style="color:#2E74B5">[X]</em> hora(s) para refeição.',
    },
    { id: "s07", type: "spacer" },
    {
      id: "clause-title-4",
      type: "paragraph",
      html: "<b>CLÁUSULA QUARTA — DOS BENEFÍCIOS</b>",
    },
    {
      id: "benefits",
      type: "bullet_list",
      items: [
        { id: "b1", html: "Vale-transporte nos termos da Lei nº 7.418/85;" },
        { id: "b2", html: 'Vale-refeição no valor de R$ <em style="color:#2E74B5">[XXX,XX]</em> por dia útil trabalhado;' },
        { id: "b3", html: "Plano de saúde após o período de experiência;" },
        { id: "b4", html: "Seguro de vida em grupo." },
      ],
    },
    { id: "s08", type: "spacer" },
    {
      id: "clause-title-5",
      type: "paragraph",
      html: "<b>CLÁUSULA QUINTA — DO PERÍODO DE EXPERIÊNCIA</b>",
    },
    {
      id: "clause-5",
      type: "paragraph",
      html: "Os primeiros 45 (quarenta e cinco) dias do presente contrato serão considerados como período de experiência, podendo ser prorrogado por igual período, conforme art. 445, parágrafo único, da CLT.",
    },
    { id: "s09", type: "spacer" },
    {
      id: "closing",
      type: "paragraph",
      html: 'E por estarem assim justas e contratadas, as partes assinam o presente instrumento em 2 (duas) vias de igual teor e forma, na presença de 2 (duas) testemunhas.',
    },
    { id: "s10", type: "spacer" },
    {
      id: "place-date",
      type: "paragraph",
      alignment: "right",
      html: '<em style="color:#2E74B5">[Cidade]</em>, <em style="color:#2E74B5">[dia]</em> de <em style="color:#2E74B5">[mês]</em> de <em style="color:#2E74B5">[ano]</em>.',
    },
    { id: "s11", type: "spacer" },
    { id: "s12", type: "spacer" },
    {
      id: "sig-table",
      type: "table",
      rows: [
        [{ html: "<b>EMPREGADOR</b>" }, { html: "<b>EMPREGADO</b>" }],
        [{ html: "<br><br>_______________________________" }, { html: "<br><br>_______________________________" }],
        [
          { html: '<em style="color:#2E74B5">[Nome / Cargo]</em>' },
          { html: '<em style="color:#2E74B5">[Nome Completo]</em>' },
        ],
      ],
    },
    { id: "s13", type: "spacer" },
    {
      id: "witnesses",
      type: "paragraph",
      html: "<b>Testemunhas:</b>",
    },
    {
      id: "wit-list",
      type: "numbered_list",
      items: [
        { id: "w1", html: 'Nome: <em style="color:#2E74B5">[_______________]</em> — CPF: <em style="color:#2E74B5">[_______________]</em>' },
        { id: "w2", html: 'Nome: <em style="color:#2E74B5">[_______________]</em> — CPF: <em style="color:#2E74B5">[_______________]</em>' },
      ],
    },
  ],
};

export default employmentContract;
