"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api";
import { User } from "@/types";
import { BookOpen, LogOut, Home } from "lucide-react";

type TabType = "books";

interface DashboardSidebarProps {
  user: User;
}

const DashboardSidebar = ({ user }: DashboardSidebarProps) => {
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  const menuItems = [
    {
      id: "books",
      label: "My Books",
      icon: BookOpen,
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <div className="text-2xl font-bold text-primary-500">eLib</div>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">
            {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {user.name || "User"}
            </p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 bg-primary-50 text-primary-600 font-medium border-l-4 border-primary-500"
            >
              <IconComponent size={20} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all font-medium"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Back to Home */}
      <div className="p-4 border-t border-gray-200">
        <Link href="/">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all font-medium">
            <Home size={20} />
            <span>Back to Home</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
