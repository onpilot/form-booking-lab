import React from "react";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_GS_API_URL;

export default function Form() {
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
    <div className="container grid w-full place-items-center">
      <div className="my-4 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nama Guru</legend>
            <select
              defaultValue="Pilih Nama Guru"
              className="select select-lg w-full"
              onChange={(e) => setNama(e.target.value)}
            >
              <option disabled={true}>Pilih Nama Guru</option>
              <option>Chrome</option>
              <option>FireFox</option>
            </select>
          </fieldset>

          {/* TODO: CORS ISSUE DAYPICKER */}
          {/* <fieldset className="fieldset">
            <legend className="fieldset-legend">Tanggal</legend>
            <button
              popoverTarget="rdp-popover"
              className="input input-border input-lg w-full"
              style={{ anchorName: "--rdp" }}
            >
              {tanggal ? tanggal.toLocaleDateString() : "Pilih Tanggal"}
            </button>
            <div
              popover="auto"
              id="rdp-popover"
              className="dropdown"
              style={{ positionAnchor: "--rdp" }}
            >
              <DayPicker
                animate
                className="react-day-picker"
                mode="single"
                selected={tanggal}
                onSelect={(e) => {
                  console.log(e);
                  setTanggal(e);
                }}
                footer={
                  tanggal
                    ? `Dipilih: ${tanggal.toLocaleDateString()}`
                    : "Pilih tanggal."
                }
              />
            </div>
          </fieldset> */}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Tanggal</legend>
            <input
              type="date"
              className="input input-lg w-full"
              onChange={(e) => setTanggal(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Jam</legend>
            <select
              defaultValue="Pilih Jam"
              className="select select-lg w-full"
              onChange={(e) => setJam(e.target.value)}
            >
              <option disabled={true}>Pilih Jam</option>
              {jamList.map((j, i) => (
                <option
                  key={i}
                  value={j.jam}
                  disabled={j.status !== "available"}
                >
                  {renderLabel(j)}
                </option>
              ))}
            </select>
          </fieldset>

          <div className="mt-8 grid gap-2">
            <button
              className="btn btn-primary btn-lg w-full"
              type="submit"
              disabled={!jam || !nama || !tanggal}
            >
              Kirim
            </button>
            <p>
              Nama: {nama}, tanggal: {tanggal}, jam: {jam}
            </p>
            <p>Status: {status}</p>
          </div>
        </form>
      </div>
    </div>
  );
}
