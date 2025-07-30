import React from "react";
import { catatan } from "./data";

const SPREADSHEET_URL = import.meta.env.VITE_SPREADSHEET_URL;

export default function Header() {
  return (
    <>
      <h1>Form Booking Labkom</h1>
      <h4>SMA MBS Wanasari</h4>

      <div>
        <p>CATATAN</p>
        <ol>
          <li>
            Bapak/Ibu guru bisa melihat list booking di sini ➡️{" "}
            <a href={SPREADSHEET_URL} target="_blank" rel="noopener noreferrer">
              Jadwal Booking Lab. Komputer
            </a>
          </li>

          {catatan.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ol>
      </div>
    </>
  );
}
