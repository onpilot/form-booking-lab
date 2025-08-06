import "./App.css";
import Header from "./components/header/Header";
import Form from "./components/form/Form";

function App() {
  return (
    <div className="container p-4">
      <Header />
      <Form />

      {/* <form onSubmit={handleSubmit}>
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
      <p>{status}</p> */}
    </div>
  );
}

export default App;
