import React from 'react'
import RichText from './RichText.jsx'

function Table({ table }) {
  return (
    <div className="table-wrap">
      <table className="codex-table">
        <thead>
          <tr>{table.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}><RichText>{c}</RichText></td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Codex({ mission }) {
  return (
    <div className="codex">
      <p className="briefing"><span className="quote-mark">“</span>{mission.briefing}</p>
      {mission.codex.map((block, i) => (
        <section className="codex-block" key={i}>
          <h3>{block.h}</h3>
          {block.intro && <p className="codex-intro"><RichText>{block.intro}</RichText></p>}
          {block.items && (
            <ul>
              {block.items.map((it, j) => (
                <li key={j}><RichText>{it}</RichText></li>
              ))}
            </ul>
          )}
          {block.table && <Table table={block.table} />}
        </section>
      ))}
    </div>
  )
}
