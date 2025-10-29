type Tab = { id: string; label: string };

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (tabId: string) => void;
}

export default function Tabs({ tabs = [], activeTab, onChange }: TabsProps) {
    return (
        <div className="flex border-b mb-4">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`px-4 py-2 -mb-px font-semibold ${activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
