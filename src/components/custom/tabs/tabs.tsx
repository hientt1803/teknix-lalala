import React from "react";

interface TabItem {
    label: string;
    icon: React.ReactNode;
    value: string;
}

interface TabProps {
    value: string;
    onChange: (value: string) => void;
    tabs: TabItem[];
}

const CustomTab: React.FC<TabProps> = ({value, onChange, tabs}) => {
    return (
        <div>
            {/* Mobile select dropdown */}
            <div className="sm:hidden">
                <label htmlFor="Tab" className="sr-only">
                    Tab
                </label>
                <select
                    id="Tab"
                    className="w-full rounded-md border-gray-200"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {tabs.map((tab) => (
                        <option key={tab.value} value={tab.value}>
                            {tab.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Desktop tab navigation */}
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav
                        className="-mb-px flex gap-6 transition-colors duration-200"
                        aria-label="Tabs"
                    >
                        {tabs.map((tab) => (
                            <a
                                key={tab.value}
                                href="#"
                                onClick={() => onChange(tab.value)}
                                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium ${
                                    value === tab.value
                                        ? "border-blue-800 text-blue-900"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}
                                aria-current={value === tab.value ? "page" : undefined}
                            >
                                {tab.icon}
                                {tab.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default CustomTab;
