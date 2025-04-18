"use client";

import BloodPressureChart from "@/component/Chart";
import Image from "next/image";
import React from "react";

// Sample patient data
const patients = [
  { name: "Emily Williams", age: 18, gender: "Female", avatar: "/icons/Layer 8.png" },
  { name: "Ryan Johnson", age: 45, gender: "Male", avatar: "/icons/Layer1.png" },
  { name: "Brandon Mitchell", age: 36, gender: "Male", avatar: "/icons/Layer 3.png" },
  { name: "Jessica Taylor", age: 28, gender: "Female", avatar: "/icons/Layer6.png" },
  { name: "Samantha Johnson", age: 56, gender: "Female", avatar: "/icons/Layer 2.png" },
  { name: "Ashley Martinez", age: 18, gender: "Female", avatar: "/icons/Layer6.png" },
  { name: "Olivia Brown", age: 18, gender: "Female", avatar: "/icons/Layer6.png" },
  { name: "Tyler Davis", age: 18, gender: "Male", avatar: "/icons/Layer6.png" },
  { name: "Kevin Anderson", age: 18, gender: "Female", avatar: "/icons/Layer6.png" },
  { name: "Dylan Thompson", age: 18, gender: "Male", avatar: "/icons/Layer6.png" },
  { name: "Nathan Evans", age: 18, gender: "Male", avatar: "/icons/Layer6.png" },
  { name: "Mike Nolan", age: 18, gender: "Male", avatar: "/icons/Layer6.png" },
];

const vitals = [
  {
    icon: "/icons/respiratory rate.png",
    label: "Respiratory Rate",
    value: "20 bpm",
    status: "Normal",
    bg: "#E0F3FA",
  },
  {
    icon: "/icons/temperature.png",
    label: "Temperature",
    value: "98.6°F",
    status: "Normal",
    bg: "#FFE6E9",
  },
  {
    icon: "/icons/HeartBPM.png",
    label: "Heart Rate",
    value: "78 bpm",
    status: "Lower than Average",
    bg: "#FFE6E9",
  },
];

const diagnosisList = [
  {
    diagnosis: "Hypertension",
    description: "Chronic high blood pressure",
    status: "Under Observation",
  },
  {
    diagnosis: "Type 2 Diabetes",
    description: "Insulin resistance and elevated blood sugar",
    status: "Cured",
  },
  {
    diagnosis: "Asthma",
    description: "Recurrent episodes of bronchial constriction",
    status: "Inactive",
  },
];

function Patients() {
  return (
    <div className="flex justify-around p-4 relative">
      {/* Left Panel - Patient List */}
      <aside className="absolute top-[122px] left-[18px] w-[367px] h-[1054px] bg-white rounded-[16px] shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center p-4">
          <p className="font-bold text-lg text-gray-800">Patients</p>
          <Image src="/icons/search.png" alt="search" width={20} height={20} />
        </div>

        {patients.map((patient, idx) => (
          <div key={idx} className="flex justify-between items-center gap-2 p-4">
            <div className="flex items-center gap-4">
              <Image src={patient.avatar} alt={patient.name} width={48} height={48} className="rounded-full" />
              <div>
                <p className="font-bold text-gray-800">{patient.name}</p>
                <p className="text-sm text-gray-500">{patient.gender}, {patient.age}</p>
              </div>
            </div>
            <Image src="/icons/more2.png" alt="More options" width={20} height={20} />
          </div>
        ))}
      </aside>

      {/* Middle Panel - Diagnosis History and Vitals */}
      <main className="flex flex-col gap-6 absolute top-[122px] left-[417px] w-[766px]">
        <section className="bg-white rounded-[16px] p-4">
          <p className="font-bold text-lg text-gray-800">Diagnosis History</p>

          <div className="mt-10 w-full h-[298px] bg-[#F4F0FE] rounded-[12px] p-4">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-gray-800">Blood Pressure</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:opacity-80">
                <span>Last 6 months</span>
                <Image src="/icons/expand.png" alt="Expand" width={6} height={11} />
              </div>
            </div>
            <BloodPressureChart />
          </div>

          <div className="flex justify-between mt-5">
            {vitals.map((item, idx) => (
              <div key={idx} className="w-[228px] h-[242px] p-4 rounded-[12px]" style={{ backgroundColor: item.bg }}>
                <div className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center">
                  <Image src={item.icon} alt={item.label} width={64} height={64} />
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
                </div>
                <p className="mt-4 text-sm text-gray-500">{item.status}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Diagnostic List */}
        <section className="w-full h-[349px] bg-white rounded-[16px] p-4 relative">
          <p className="font-bold text-lg text-gray-800 mb-4">Diagnostic List</p>

          <div className="w-[726] h-[48px] bg-[#F6F7F8] rounded-[24px] px-6 flex justify-between items-center text-sm font-semibold text-gray-700 absolute left-[20px] top-[93px]">
            <span>Problem/Diagnosis</span>
            <span>Description</span>
            <span>Status</span>
          </div>

          <div className="absolute top-[149px] left-[20px] w-[726px] flex flex-col gap-3">
            {diagnosisList.map((item, index) => (
              <div key={index} className="w-full h-[48px] px-6 flex justify-between items-center bg-white text-sm text-gray-700">
                <span>{item.diagnosis}</span>
                <span>{item.description}</span>
                <span>{item.status}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Right Panel - Patient Info */}
      <aside
        className="absolute bg-white rounded-[16px] p-4"
        style={{ top: "108px", left: "1216px", width: "367px", height: "740px" }}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <Image src="/icons/Layer 2@2x.png" alt="Profile" width={200} height={200} />
            <p className="text-2xl font-bold">Jessica Taylor</p>
          </div>
        </div>

        <div className="mt-4">
          {[
            {
              icon: "/icons/calendar.png",
              label: "Date Of Birth",
              value: "August 23, 1996",
            },
            {
              icon: "/icons/FemaleIcon.png",
              label: "Gender",
              value: "Female",
            },
            {
              icon: "/icons/PhoneIcon.png",
              label: "Contact Info.",
              value: "(415) 555-1234",
            },
            {
              icon: "/icons/PhoneIcon.png",
              label: "Emergency Contacts",
              value: "(415) 555-5678",
            },
            {
              icon: "/icons/InsuranceIcon.png",
              label: "Insurance Provider",
              value: "Sunrise Health Assurance",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 p-4 items-center">
              <div className="w-[20px] h-[20px] flex items-center justify-center bg-gray shadow rounded-full">
                <Image src={item.icon} alt={item.label} width={24} height={24} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-base font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="w-[220px] h-[41px] rounded-full bg-[#01F0D0] font-bold text-sm">
            Show All Information
          </button>
        </div>
      </aside>

      <aside
        className="absolute bg-white rounded-[16px] p-4"
        style={{ top: "880px", left: "1215px", width: "367px", height: "296px" }}
      >
        <p className="font-bold text-lg text-gray-800 mb-4">Lab Results</p>
        <div className="grid grid-rows-5 gap-4 mt-5">
          {["Blood Tests", "CT Scans", "Radiology Reports", "X-Rays", "Urine Test"].map((label, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_auto] items-center"
            >
              <p className="text-gray-700 text-sm">{label}</p>
              <Image
                src="/icons/download_FILL0_wght300_GRAD0_opsz24 (1).png"
                alt="Download"
                width={20}
                height={20}
              />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default Patients;
