import React from 'react';

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

const CustomTab: React.FC<TabProps> = ({ value, onChange, tabs }) => {
  return (
    <div>
      {/* Mobile select dropdown */}
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">
          Tab
        </label>
        <select
          id="Tab"
          className="w-full rounded-md border-neutral-200 dark:border-neutral-700"
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {tabs.map(tab => (
            <option className="py-3" key={tab.value} value={tab.value}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop tab navigation */}
      <div className="hidden sm:block">
        <div className="border-b border-neutral-200">
          <nav
            className="-mb-px flex gap-6 transition-colors duration-200"
            aria-label="Tabs"
          >
            {tabs.map(tab => (
              <a
                key={tab.value}
                href="#"
                onClick={() => onChange(tab.value)}
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium ${
                  value === tab.value
                    ? 'border-blue-800 text-blue-900 dark:border-blue-600 dark:text-blue-700'
                    : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 dark:text-neutral-300'
                }`}
                aria-current={value === tab.value ? 'page' : undefined}
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
