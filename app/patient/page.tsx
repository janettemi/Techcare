"use client";
import BloodPressureChart from "@/component/Chart";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev"

// Helper to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

function Patients() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const username = process.env.NEXT_PUBLIC_API_USERNAME;
        const password = process.env.NEXT_PUBLIC_API_PASSWORD;

        // Encode credentials for Basic Auth
        const basicAuth = "Basic " + (typeof window !== 'undefined' ? window.btoa(`${username}:${password}`) : Buffer.from(`${username}:${password}`).toString('base64'));
        const res = await fetch(API_URL, {
          headers: {
            Authorization: basicAuth,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();

        // Find Jessica Taylor in the returned data
        const jessica = Array.isArray(json)
          ? json.find((p: any) => p.name === "Jessica Taylor")
          : json;
        setData(jessica);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!data) return <div className="p-8">No data found.</div>;

  // Get latest diagnosis history (assume last entry is latest)
  const latestHistory = data.diagnosis_history[data.diagnosis_history.length - 1];
  const vitals = [
    {
      icon: "/icons/respiratory rate.png",
      label: "Respiratory Rate",
      value: `${latestHistory.respiratory_rate.value} bpm`,
      status: latestHistory.respiratory_rate.levels,
      bg: "#E0F3FA",
    },
    {
      icon: "/icons/temperature.png",
      label: "Temperature",
      value: `${latestHistory.temperature.value}°F`,
      status: latestHistory.temperature.levels,
      bg: "#FFE6E9",
    },
    {
      icon: "/icons/HeartBPM.png",
      label: "Heart Rate",
      value: `${latestHistory.heart_rate.value} bpm`,
      status: latestHistory.heart_rate.levels,
      bg: "#FFE6E9",
    },
  ];

  // Diagnostic list
  const diagnosisList = data.diagnostic_list.map((d: any) => ({
    diagnosis: d.name,
    description: d.description,
    status: d.status,
  }));

  // Lab results (show up to 5, fill with placeholders if needed)
  const labResults = [
    ...data.lab_results,
    ...["Radiology Reports", "X-Rays", "Urine Test"].filter(l => !data.lab_results.includes(l)),
  ].slice(0, 5);

  // Profile info
  const profileInfo = [
    {
      icon: "/icons/calendar.png",
      label: "Date Of Birth",
      value: formatDate(data.date_of_birth),
    },
    {
      icon: "/icons/FemaleIcon.png",
      label: "Gender",
      value: data.gender,
    },
    {
      icon: "/icons/PhoneIcon.png",
      label: "Contact Info.",
      value: data.phone_number,
    },
    {
      icon: "/icons/PhoneIcon.png",
      label: "Emergency Contacts",
      value: data.emergency_contact,
    },
    {
      icon: "/icons/InsuranceIcon.png",
      label: "Insurance Provider",
      value: data.insurance_type,
    },
  ];

  return (
    <div className="flex justify-around p-4 relative">
      {/* Left Panel - Only Jessica Taylor */}
      <aside className="absolute top-[122px] left-[18px] w-[367px] h-[300px] bg-white rounded-[16px] shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center p-4">
          <p className="font-bold text-lg text-gray-800">Patient</p>
        </div>
        <div className="flex justify-between items-center gap-2 p-4">
          <div className="flex items-center gap-4">
            <Image src={data.profile_picture} alt={data.name} width={48} height={48} className="rounded-full" />
            <div>
              <p className="font-bold text-gray-800">{data.name}</p>
              <p className="text-sm text-gray-500">{data.gender}, {data.age}</p>
            </div>
          </div>
        </div>
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
            {diagnosisList.map((item: any, index: number) => (
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
            <Image src={data.profile_picture} alt={data.name} width={200} height={200} />
            <p className="text-2xl text-black font-bold">{data.name}</p>
          </div>
        </div>

        <div className="mt-4">
          {profileInfo.map((item, idx) => (
            <div key={idx} className="flex gap-4 p-4 items-center">
              <div className="w-[20px] h-[20px] flex items-center justify-center bg-gray shadow rounded-full">
                <Image src={item.icon} alt={item.label} width={24} height={24} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-base text-black font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="w-[220px] h-[41px] rounded-full bg-[#01F0D0] font-bold text-sm cursor-pointer hover:opacity-80">
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
          {labResults.map((label: string, index: number) => (
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

export default Patients
