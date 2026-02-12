"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser, getStoredToken } from "@/lib/api";
import { User } from "@/types";
import DashboardSidebar from "./DashboardSidebar";
import UserBooks from "./UserBooks";
import UserProfile from "./UserProfile";

type TabType = "books" | "profile";

const DashboardLayout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("books");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getStoredToken();
    const storedUser = getStoredUser();

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    setUser(storedUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-primary-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome, {user.name || user.email}!</p>
          </div>

          {activeTab === "books" && <UserBooks user={user} />}
          {activeTab === "profile" && <UserProfile user={user} />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
