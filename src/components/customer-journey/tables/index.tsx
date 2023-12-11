'use client';
import { FC, useState } from 'react';
import MyChannelsTab from './MyChannelsTab';
import MyCustomersTab from './MyCustomersTab';

interface Tab {
  name: string;
  label: string;
  content: JSX.Element;
}

const tabs: Tab[] = [
  {
    name: 'my-channels',
    label: 'My Channels',
    content: <MyChannelsTab />,
  },
  {
    name: 'my-customers',
    label: 'My Customers',
    content: <MyCustomersTab />,
  },
];

const defaultActiveTab = tabs[0];

const CustomerJourneyTablesWidget: FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(defaultActiveTab);

  const handleChangeTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-extraLightColor w-fit ml-5 -mb-[4.5rem] relative">
        <ul
          className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none"
          role="tablist"
        >
          {tabs.map((tab) => (
            <li className="nav-item" role="presentation" key={tab.name}>
              <a
                href={`#tabs-${tab.name}`}
                className={`inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100 ${
                  activeTab.name === tab.name ? 'active' : ''
                }`}
                id={`tabs-${tab.name}-tab`}
                data-bs-toggle="pill"
                data-bs-target={`#tabs-${tab.name}`}
                role="tab"
                aria-controls={`tabs-${tab.name}`}
                aria-selected={activeTab.name === tab.name}
                onClick={() => handleChangeTab(tab)}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="widget-container p-5 max-h-[700px] flex flex-col mt-4">
        {activeTab.content}
      </div>
    </>
  );
};

export default CustomerJourneyTablesWidget;
