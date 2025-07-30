import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";

const API_URL = import.meta.env.VITE_GS_API_URL;

function App() {
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [jamList, setJamList] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (tanggal) {
      setJamList([{ jam: "", label: "Loading...", status: "loading" }]);
      fetch(`${API_URL}?tanggal=${tanggal}`)
        .then((res) => res.json())
        .then((data) => {
          setJamList(data);
        })
        .catch(() => {
          setJamList([]);
        });
    }
  }, [tanggal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { nama, tanggal, jam };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (result.success) {
      setStatus("✅ Berhasil disimpan!");
      setNama("");
      setTanggal("");
      setJam("");
      setJamList([]);
    } else {
      setStatus("❌ Gagal menyimpan data");
    }
  };

  const renderLabel = (j) => {
    if (j.status === "available") return `Jam ke-${j.jam} (${j.label})`;
    if (j.status === "booked")
      return `Jam ke-${j.jam} (${j.label}) - Sudah dibooking: ${j.by}`;
    if (j.status === "libur") return `Jam ke-${j.jam} (${j.label}) - LIBUR`;
    return j.label;
  };

  return (
    <div className="container">
      <Header />

      <form onSubmit={handleSubmit}>
        <label>Nama:</label>
        <br />
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Tanggal:</label>
        <br />
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Jam:</label>
        <br />
        <select value={jam} onChange={(e) => setJam(e.target.value)} required>
          <option value="">-- Pilih Jam --</option>
          {jamList.map((j, i) => (
            <option key={i} value={j.jam} disabled={j.status !== "available"}>
              {renderLabel(j)}
            </option>
          ))}
        </select>
        <br />
        <br />

        <button type="submit" disabled={!jam || !nama || !tanggal}>
          Kirim
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default App;
