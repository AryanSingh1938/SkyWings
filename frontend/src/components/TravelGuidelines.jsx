import { useState, useEffect } from "react";
import {
  Luggage,
  Clock,
  ShieldCheck,
  UtensilsCrossed,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  X,
  FileText,
  Plane,
  Sparkles,
  Info,
  HeartHandshake,
  ShieldAlert,
} from "lucide-react";

export const GUIDELINES_DATA = {
  baggage: {
    id: "baggage",
    title: "Cabin Baggage Rules",
    subtitle: "7kg Cabin + 15kg Check-in Allowance",
    badge: "Baggage Policy",
    icon: Luggage,
    accent: "blue",
    summary:
      "Guidelines on weight limits, dimensions, and restricted items for hand baggage and check-in luggage.",
    sections: [
      {
        heading: "Cabin / Hand Baggage (7 kg)",
        points: [
          "1 piece of hand luggage up to 7 kg (Max dimensions: 55 cm × 35 cm × 25 cm) to fit comfortably in overhead lockers.",
          "1 additional small personal item (laptop bag, lady's purse, or duty-free bag) allowed free of charge.",
          "Must fit under the seat in front of you if overhead compartments are full.",
        ],
      },
      {
        heading: "Domestic & International Check-in Baggage",
        points: [
          "Domestic Flights: 15 kg per passenger in Economy class (1 piece standard).",
          "International Flights: 25 kg to 35 kg allowance depending on destination route and fare tier.",
          "Excess baggage can be pre-purchased online up to 6 hours before departure for up to 30% discount.",
        ],
      },
      {
        heading: "Critical Restricted Items & Safety Rules",
        points: [
          "Power banks, spare lithium-ion batteries, and e-cigarettes are STRICTLY PROHIBITED in check-in baggage and MUST be carried in hand luggage.",
          "Liquids, aerosols, and gels in cabin baggage must not exceed 100 ml per container and must be packed in a clear resealable pouch.",
          "Scissors, knives, lighters, and blunt tools will be confiscated at security screening checkpoints.",
        ],
      },
    ],
  },
  checkin: {
    id: "checkin",
    title: "Web Check-In Window",
    subtitle: "Opens 48h and Closes 60m Prior to Departure",
    badge: "Check-in Timelines",
    icon: Clock,
    accent: "cyan",
    summary:
      "Avoid long airport queues by completing online check-in, selecting seats, and downloading your digital boarding pass.",
    sections: [
      {
        heading: "Web Check-In Schedules",
        points: [
          "Domestic Flights: Opens 48 hours before scheduled flight departure and closes 60 minutes prior.",
          "International Flights: Opens 48 hours before scheduled flight departure and closes 75 minutes prior.",
          "Available 24/7 on website and mobile browsers with your PNR or booking reference.",
        ],
      },
      {
        heading: "Step-by-Step Check-In Procedure",
        points: [
          "Enter your Booking ID and passenger last name.",
          "Confirm passenger health & safety declaration.",
          "Select preferred seating (Window, Aisle, or Extra Legroom) and add special meal requests.",
          "Download or save mobile boarding pass with QR code directly on your phone or Apple/Google Wallet.",
        ],
      },
      {
        heading: "Airport Bag Drop & Gate Timings",
        points: [
          "If traveling with check-in bags: Proceed to the dedicated 'Express Bag Drop' counter at least 60 minutes before departure.",
          "If traveling with cabin baggage only: Proceed directly to airport security screening with your mobile boarding pass.",
          "Boarding gates close strictly 25 minutes prior to domestic flights and 30 minutes prior to international flights.",
        ],
      },
    ],
  },
  idproof: {
    id: "idproof",
    title: "Airport Entry Identification",
    subtitle: "Mandatory Government Photo IDs & Visa Verification",
    badge: "Entry Requirements",
    icon: ShieldCheck,
    accent: "emerald",
    summary:
      "Official government photo identification documents mandatory for entry at departure airport gates and check-in counters.",
    sections: [
      {
        heading: "Approved Photo IDs for Domestic Flights (India)",
        points: [
          "Aadhaar Card (Physical PVC card or official m-Aadhaar app on smartphone).",
          "Valid Passport (Original physical copy).",
          "Voter Identity Card (EPIC).",
          "Driving License (Physical smart card issued by RTO or DigiLocker verified).",
          "PAN Card issued by the Income Tax Department.",
          "Service Photo Identity Card issued by Central / State Government / Public Sector Undertakings.",
          "Student Photo Identity Card issued by recognized government schools and universities.",
        ],
      },
      {
        heading: "Rules for Infants & Children (Under 18)",
        points: [
          "Infants (under 2 years): Valid Birth Certificate or Passport showing date of birth is mandatory.",
          "Children under 18 traveling with parents: School photo ID, Aadhaar card, or Birth Certificate.",
        ],
      },
      {
        heading: "International Travel Documents",
        points: [
          "Original Passport with at least 6 months validity from the date of return arrival.",
          "Valid Destination Visa (Sticker Visa / e-Visa printout / OCI Card).",
          "Transit visa if transiting through countries that require immigration clearance.",
        ],
      },
    ],
  },
  meals: {
    id: "meals",
    title: "In-Flight Special Meals & Assistance",
    subtitle: "Dietary Requests, Wheelchairs & Special Care",
    badge: "Onboard Hospitality",
    icon: UtensilsCrossed,
    accent: "amber",
    summary:
      "Chef-curated special dietary meal requests, wheelchair assistance, and specialized care for passengers with special needs.",
    sections: [
      {
        heading: "Special Dietary Meal Options (Pre-book 24h prior)",
        points: [
          "AVML — Asian / Indian Vegetarian Meal: Flavorsome vegetarian preparation cooked with Indian spices and dairy.",
          "VGML — Strict Vegan Meal: Completely plant-based, dairy-free, and egg-free wholesome ingredients.",
          "MOML — Halal Certified Meal: Prepared strictly following Halal culinary standards.",
          "HNML — Hindu Non-Vegetarian: Specially prepared without beef, veal, or pork.",
          "VJML — Jain Vegetarian Meal: Cooked strictly without root vegetables (no onion, garlic, or potatoes).",
          "DBML / GFML: Low-glycemic diabetic and certified gluten-intolerant friendly meals.",
        ],
      },
      {
        heading: "Passenger Wheelchair & Mobility Assistance",
        points: [
          "Complimentary wheelchair assistance from the airport check-in counter to aircraft seat.",
          "Ramp and aisle wheelchairs available for passengers who cannot navigate aircraft stairs.",
          "Personal mobility aids and wheelchairs checked in free of charge with priority handling.",
        ],
      },
      {
        heading: "Expectant Mothers & Unaccompanied Minors",
        points: [
          "Expectant Mothers: Air travel permitted up to 28 weeks without medical certificate; medical fit-to-fly certificate required between 28 and 36 weeks.",
          "Unaccompanied Minors (Age 5 to 12): Dedicated airline staff supervision from check-in counter to receiving guardian at arrival terminal.",
          "Infant Bassinets: Can be reserved for infants under 10 kg on select Boeing / Airbus aircraft.",
        ],
      },
    ],
  },
};

export default function TravelGuidelines({ initialSelectedId = "baggage" }) {
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const [modalItem, setModalItem] = useState(null);

  // Sync if hash changes or initial changes
  useEffect(() => {
    if (initialSelectedId && GUIDELINES_DATA[initialSelectedId]) {
      setSelectedId(initialSelectedId);
    }
  }, [initialSelectedId]);

  const activeGuideline = GUIDELINES_DATA[selectedId] || GUIDELINES_DATA.baggage;
  const ActiveIcon = activeGuideline.icon;

  return (
    <section id="travel-guidelines" className="scroll-mt-24 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700 mb-3 shadow-sm">
            <Info size={14} className="text-blue-600" />
            <span>Essential Passenger Guidelines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Important Travel Guidelines & Rules
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Click on any of the four key travel topics below to review complete airline regulations, baggage allowances, entry IDs, and onboard services.
          </p>
        </div>

        {/* 4 Clickable Guideline Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {Object.values(GUIDELINES_DATA).map((item) => {
            const Icon = item.icon;
            const isSelected = selectedId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedId(item.id);
                }}
                className={`flex flex-col justify-between p-5 rounded-3xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/70 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/30"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl transition ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 font-display leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>{isSelected ? "Currently Viewing" : "Click to View Info"}</span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${isSelected ? "rotate-90" : ""}`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Information Display Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-900/5 transition-all animate-in fade-in duration-200">
          {/* Card Title Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
                <ActiveIcon size={26} />
              </div>
              <div>
                <span className="inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-1">
                  {activeGuideline.badge}
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-display">
                  {activeGuideline.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {activeGuideline.subtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModalItem(activeGuideline)}
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-blue-200 bg-blue-50/80 px-4 py-2.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition shadow-sm"
            >
              <FileText size={15} />
              <span>Open Printable / Full View</span>
            </button>
          </div>

          {/* Detailed Sections Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {activeGuideline.sections.map((sec, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 font-display mb-3 pb-2 border-b border-slate-200 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                    <span>{sec.heading}</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {sec.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="text-xs text-slate-600 leading-relaxed flex items-start gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice Banner */}
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 flex items-start gap-3 text-xs text-amber-900">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Passenger Notice:</span> Regulations are enforced according to DGCA (Directorate General of Civil Aviation) & IATA international safety standards. Please reach airport security with valid boarding passes.
            </div>
          </div>
        </div>
      </div>

      {/* Full Details Modal (When user clicks Open Full View) */}
      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalItem(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              title="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                <modalItem.icon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 font-display">
                  {modalItem.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {modalItem.subtitle}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {modalItem.sections.map((sec, idx) => (
                <div key={idx} className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <h4 className="font-bold text-sm text-slate-900 mb-2">
                    {sec.heading}
                  </h4>
                  <ul className="space-y-2">
                    {sec.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="text-xs text-slate-700 leading-relaxed flex items-start gap-2"
                      >
                        <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setModalItem(null)}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
              >
                Close Guideline Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

