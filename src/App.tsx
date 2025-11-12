import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [rows, setRows] = useState([{ key: '', value: '' }])

  const handleAddRow = () => {
    setRows([...rows, { key: '', value: '' }])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data: Record<string, string> = {}
    rows.forEach(row => {
      if (row.key.trim()) {
        data[row.key.trim()] = row.value.trim()
      }
    })
    console.log('Payload JSON:', JSON.stringify(data))
    // Ganti dengan fetch ke API jika diperlukan
    try {
      const response = await fetch('http://localhost:8080/tes-mandiri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      console.log('Response:', await response.json())
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const updateRow = (index: number, field: 'key' | 'value', value: string) => {
    setRows(rows.map((row, i) => i === index ? { ...row, [field]: value } : row))
  }

  return (
    <>
      <h1>Tes Mongo DB</h1>
      <div className="flex flex-row">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={handleAddRow}
            className="bg-green-500 text-white px-4 py-2"
          >
            Add Row
          </button>
          <table id="input-data" className="w-full justify-between">
            <thead>
              <tr>
                <th className="px-4 py-2">Key</th>
                <th className="px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={row.key}
                      onChange={(e) => updateRow(index, 'key', e.target.value)}
                      className="border px-2 py-1"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={row.value}
                      onChange={(e) => updateRow(index, 'value', e.target.value)}
                      className="border px-2 py-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default App
