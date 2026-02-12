"use client";

import { User } from "@/types";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="max-w-2xl">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Profile Settings</h2>

        <div className="space-y-6">
          {/* Profile Avatar */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-4xl">
              {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {user.name || "User"}
              </h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <hr className="my-8" />

          {/* User Information */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 text-gray-700">
                {user.name || "Not set"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 text-gray-700">
                {user.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 text-gray-700 font-mono text-sm">
                {user._id}
              </div>
            </div>
          </div>

          <hr className="my-8" />

          {/* Account Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Account Information
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                🔒 To update your profile information or change your password,
                contact our support team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-primary-500">∞</div>
          <p className="text-gray-600 text-sm mt-2">Books Shared</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-500">✓</div>
          <p className="text-gray-600 text-sm mt-2">Account Active</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-purple-500">⭐</div>
          <p className="text-gray-600 text-sm mt-2">Member</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
