import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Search } from "lucide-react";

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  maxLength: number; // Maximum phone number length (without country code)
}

const COUNTRIES: Country[] = [
  {
    code: "US",
    name: "United States",
    dialCode: "+1",
    flag: "🇺🇸",
    maxLength: 10,
  },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "+44",
    flag: "🇬🇧",
    maxLength: 10,
  },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦", maxLength: 10 },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺", maxLength: 9 },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳", maxLength: 10 },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪", maxLength: 11 },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷", maxLength: 9 },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸", maxLength: 9 },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹", maxLength: 10 },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷", maxLength: 11 },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽", maxLength: 10 },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵", maxLength: 10 },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳", maxLength: 11 },
  {
    code: "KR",
    name: "South Korea",
    dialCode: "+82",
    flag: "🇰🇷",
    maxLength: 10,
  },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬", maxLength: 8 },
  {
    code: "AE",
    name: "United Arab Emirates",
    dialCode: "+971",
    flag: "🇦🇪",
    maxLength: 9,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    dialCode: "+966",
    flag: "🇸🇦",
    maxLength: 9,
  },
  {
    code: "ZA",
    name: "South Africa",
    dialCode: "+27",
    flag: "🇿🇦",
    maxLength: 9,
  },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬", maxLength: 10 },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬", maxLength: 10 },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷", maxLength: 10 },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱", maxLength: 9 },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴", maxLength: 10 },
  { code: "PE", name: "Peru", dialCode: "+51", flag: "🇵🇪", maxLength: 9 },
  {
    code: "NL",
    name: "Netherlands",
    dialCode: "+31",
    flag: "🇳🇱",
    maxLength: 9,
  },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪", maxLength: 9 },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪", maxLength: 9 },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴", maxLength: 8 },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰", maxLength: 8 },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮", maxLength: 9 },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱", maxLength: 9 },
  { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺", maxLength: 10 },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷", maxLength: 10 },
  { code: "IL", name: "Israel", dialCode: "+972", flag: "🇮🇱", maxLength: 9 },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾", maxLength: 10 },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭", maxLength: 9 },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳", maxLength: 10 },
  {
    code: "PH",
    name: "Philippines",
    dialCode: "+63",
    flag: "🇵🇭",
    maxLength: 10,
  },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩", maxLength: 11 },
  {
    code: "NZ",
    name: "New Zealand",
    dialCode: "+64",
    flag: "🇳🇿",
    maxLength: 9,
  },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰", maxLength: 10 },
  {
    code: "BD",
    name: "Bangladesh",
    dialCode: "+880",
    flag: "🇧🇩",
    maxLength: 10,
  },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰", maxLength: 9 },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰", maxLength: 8 },
  { code: "TW", name: "Taiwan", dialCode: "+886", flag: "🇹🇼", maxLength: 9 },
];

interface CountryCodeSelectProps {
  value: Country;
  onChange: (country: Country) => void;
  disabled?: boolean;
}

export default function CountryCodeSelect({
  value,
  onChange,
  disabled = false,
}: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    minWidth: 280, // Minimum width for dropdown
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Update dropdown position when opened
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      // Find the parent input container (the flex container with the input field)
      let parentContainer = buttonRef.current.parentElement;
      while (
        parentContainer &&
        !parentContainer.querySelector('input[type="tel"]')
      ) {
        parentContainer = parentContainer.parentElement;
      }

      const containerRect = parentContainer?.getBoundingClientRect() || rect;

      const dropdownHeight = 300;
      const spaceBelow = window.innerHeight - containerRect.bottom;
      const spaceAbove = containerRect.top;

      // Show dropdown above if not enough space below
      const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

      setDropdownPosition({
        top: showAbove
          ? containerRect.top + window.scrollY - dropdownHeight - 4
          : containerRect.bottom + window.scrollY + 4,
        left: containerRect.left + window.scrollX,
        width: containerRect.width, // Match full container width
        minWidth: 280,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (country: Country) => {
    onChange(country);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="flex items-center gap-1.5 px-3 py-2.5 bg-transparent hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-full"
        >
          <span className="text-lg leading-none">{value.flag}</span>
          <ChevronDown
            size={14}
            className={`text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
            }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-9999 animate-dropdown"
          >
            <div className="p-2.5 border-b border-gray-200">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <Search size={16} className="text-gray-500" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleSelect(country)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition-colors text-left ${
                      value.code === country.code ? "bg-blue-50" : ""
                    }`}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {country.name}
                      </div>
                    </div>
                    <div className="text-sm font-mono text-gray-700 font-semibold">
                      {country.dialCode}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  No countries found
                </div>
              )}
            </div>

          </div>,
          document.body,
        )}
    </>
  );
}

// Export default country for convenience
export const DEFAULT_COUNTRY: Country = COUNTRIES[0]; // United States
