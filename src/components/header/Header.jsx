import React from "react";

import mbs_logo from "/mbs-logo.png";
import { catatan } from "./data";

const SPREADSHEET_URL = import.meta.env.VITE_SPREADSHEET_URL;

export default function Header() {
  return (
    <div className="grid w-full place-items-center">
      <div className="avatar">
        <div className="w-14 rounded">
          <img
            src={mbs_logo}
            alt="Logo SMA Muhammadiyah Boarding School Wanasari"
          />
        </div>
      </div>
      <h1 className="mt-2 text-3xl font-bold">🖥️ Form Booking LabKom</h1>
      <p className="py-2">SMA Muhammadiyah Boarding School (MBS) Wanasari</p>

      {/* CATATAN */}
      <div className="my-4 max-w-md">
        <div className="bg-base-100 border-base-300 collapse-arrow collapse border">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content text-center">
            👉 Mohon Dibaca Sebelum Booking
          </div>
          <div className="collapse-content bg-primary peer-checked:bg-secondary">
            <ul className="list bg-base-100 rounded-box shadow-md">
              <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                CATATAN:
              </li>

              <li className="list-row">
                <div>📅</div>
                <div>
                  <div className="text-xs opacity-60">
                    Bapak/Ibu guru bisa melihat list booking di{" "}
                    <a
                      href={SPREADSHEET_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary"
                    >
                      ➡️ Jadwal Booking Lab. Komputer
                    </a>
                  </div>
                </div>
              </li>

              {catatan.map((a, i) => (
                <li key={i} className="list-row">
                  <div>{a.icon}</div>
                  <div>
                    <div className="text-xs opacity-60">{a.text}</div>
                  </div>
                </li>
              ))}

              <li className="list-row">
                <div>
                  <div> Terima kasih 😇</div>
                  <div className="text-xs font-semibold uppercase opacity-60">
                    KOORDINATOR LAB.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
