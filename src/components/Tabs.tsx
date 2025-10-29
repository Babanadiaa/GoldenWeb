import { motion, } from "framer-motion";

type Tab = { id: string; label: string };

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (tabId: string) => void;
}

export default function Tabs({ tabs = [], activeTab, onChange }: TabsProps) {
    return (
        <div className="relative flex border-b mb-4">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className="px-4 py-2 -mb-px font-semibold relative z-10 text-gray-500"
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="underline"
                            className="absolute left-0 bottom-0 h-1 bg-gray-500 w-full rounded-t"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
