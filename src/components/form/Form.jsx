import React from "react";
import { useEffect, useState } from "react";

import DATA_GURU from "./data-guru.json";

const API_URL = import.meta.env.VITE_GS_API_URL;

export default function Form() {
  const [guru, setGuru] = useState("");
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
    const payload = { guru, tanggal, jam };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        setStatus("✅ Berhasil disimpan!");
        setGuru("");
        setTanggal("");
        setJam("");
        setJamList([]);
      } else {
        setStatus("❌ Gagal menyimpan data");
      }
    } catch (error) {
      console.log({ error });
      setStatus("❌ Terjadi kesalahan saat mengirim data");
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
              onChange={(e) => setGuru(e.target.value)}
            >
              <option disabled={true} className="text-xs">
                Pilih Nama Guru
              </option>
              {DATA_GURU.map((dg, i) => (
                <option
                  key={i}
                  value={dg.kode}
                  // disabled={dg.status !== "available"}
                >
                  {dg.nama}
                </option>
              ))}
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
            {/* Hanya bisa pilih tanggal sekarang dan tanggal H+2. */}
            <input
              type="date"
              className="input input-lg w-full"
              min={new Date().toISOString().split("T")[0]} // hari ini
              max={
                new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // H+2
                  .toISOString()
                  .split("T")[0]
              }
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
              <option disabled={true} className="text-xs">
                {tanggal ? "Pilih Jam" : "Pilih tanggal terlebih dahulu"}
              </option>
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
              disabled={!jam || !guru || !tanggal}
            >
              Kirim
            </button>
            <p>
              Kode Guru: {guru}, tanggal: {tanggal}, jam: {jam}
            </p>
            <p>Status: {status}</p>
          </div>
        </form>
      </div>
    </div>
  );
}
