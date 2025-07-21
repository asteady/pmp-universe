'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Settings, LogOut, User, Key, ChevronDown, ArrowLeft } from 'lucide-react';

interface User {
  name: string;
  title: string;
  company: string;
  permission: 'Super Admin' | 'Client';
  email: string;
}

interface UserProfileProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentUser: User;
  onLoginAsUser?: (user: User) => void;
  isClientView?: boolean;
  onToggleClientView?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  isDarkMode,
  onToggleTheme,
  currentUser,
  onLoginAsUser,
  isClientView = false,
  onToggleClientView
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginAsUserOpen, setIsLoginAsUserOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock users for demo
  const mockUsers: User[] = [
    {
      name: 'Crystal Kay-Hut',
      title: 'VP Programmatic Activation',
      company: 'Agent Steady Ventures',
      permission: 'Client',
      email: 'crystal@agentsteady.com'
    },
    {
      name: 'Mallory Martin',
      title: 'Senior Media Buyer',
      company: 'Third Street Digital',
      permission: 'Client',
      email: 'mallory.martin+TEGNA@thirdstreetdigital.com'
    },
    {
      name: 'Johnny Shiver',
      title: 'Programmatic Director',
      company: 'Coventry',
      permission: 'Client',
      email: 'jshiver@coventry.com'
    }
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(mockUsers);
    }
  }, [searchQuery]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleEnterClientUniverse = () => {
    if (selectedUser && onLoginAsUser) {
      onLoginAsUser(selectedUser);
      setIsLoginAsUserOpen(false);
      setSearchQuery('');
      setSelectedUser(null);
    }
  };

  const handleCancel = () => {
    setIsLoginAsUserOpen(false);
    setSearchQuery('');
    setSelectedUser(null);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleTheme}
        className={`p-2 rounded-full transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-[#69101A] to-[#121B30] text-[#FFEF00] hover:shadow-lg hover:shadow-[#FFEF00]/20' 
            : 'bg-gradient-to-r from-[#F8F8FF] to-[#C8BCD1] text-[#FF3CAC] hover:shadow-lg hover:shadow-[#FF3CAC]/20'
        }`}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      {/* Return to Super Admin View Toggle (always show in client view) */}
      {isClientView && onToggleClientView && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleClientView}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] text-[#121B30] rounded-lg hover:shadow-lg hover:shadow-[#00FFB7]/30 transition-all duration-300"
          >
            <ArrowLeft size={16} />
            <span className="text-sm font-medium">Return to Super Admin</span>
          </motion.button>
        </motion.div>
      )}

      {/* Log in as User Button (only for Super Admin) */}
      {currentUser.permission === 'Super Admin' && !isClientView && onLoginAsUser && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsLoginAsUserOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#FF3CAC] to-[#C77DFF] text-white rounded-lg hover:shadow-lg hover:shadow-[#FF3CAC]/30 transition-all duration-300"
        >
          <Key size={16} />
          <span className="text-sm font-medium">Log in as user</span>
        </motion.button>
      )}

      {/* Profile Section */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-3 bg-gradient-to-r from-[#121B30] to-[#69101A] rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#1B6CA8]/30"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-[#FF3CAC] to-[#C77DFF] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-white font-bold text-sm leading-tight">{currentUser.name}</span>
            <span className="text-[#C8BCD1] text-xs">{currentUser.permission}</span>
          </div>
          <ChevronDown 
            size={16} 
            className={`text-[#C8BCD1] transition-transform duration-200 ${
              isProfileOpen ? 'rotate-180' : ''
            }`} 
          />
        </motion.button>

        {/* Profile Popup */}
        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 bg-gradient-to-br from-[#121B30] to-[#69101A] rounded-xl border border-[#1B6CA8]/30 shadow-2xl z-50"
            >
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-white font-bold text-lg">{currentUser.name}</h3>
                  <p className="text-[#C8BCD1] text-sm">{currentUser.permission}</p>
                  <p className="text-[#F8F8FF] text-sm font-medium">{currentUser.title}</p>
                  <p className="text-[#A239CA] text-sm">{currentUser.company}</p>
                </div>
                
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-[#C8BCD1] hover:bg-[#1B6CA8]/20 rounded-lg transition-colors duration-200">
                    <User size={16} />
                    <span className="text-sm">Update user image</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-[#C8BCD1] hover:bg-[#1B6CA8]/20 rounded-lg transition-colors duration-200">
                    <Settings size={16} />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-[#FF3131] hover:bg-[#FF3131]/10 rounded-lg transition-colors duration-200">
                    <LogOut size={16} />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Login as User Modal */}
      <AnimatePresence>
        {isLoginAsUserOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-[#121B30] to-[#69101A] rounded-xl p-6 w-96 max-w-[90vw] border border-[#1B6CA8]/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Login as Specific User</h3>
                <button
                  onClick={handleCancel}
                  className="text-[#C8BCD1] hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1B6CA8]/20 border border-[#1B6CA8]/30 rounded-lg text-white placeholder-[#C8BCD1] focus:outline-none focus:border-[#00FFB7] transition-colors"
                />
              </div>
              
              <div className="max-h-60 overflow-y-auto space-y-2">
                {filteredUsers.map((user, index) => (
                  <motion.button
                    key={user.email}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleUserSelect(user)}
                    className={`w-full text-left p-3 rounded-lg transition-colors border ${
                      selectedUser?.email === user.email
                        ? 'bg-[#00FFB7]/20 border-[#00FFB7] text-white'
                        : 'bg-[#1B6CA8]/10 hover:bg-[#1B6CA8]/20 border-transparent hover:border-[#1B6CA8]/30'
                    }`}
                  >
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-[#C8BCD1] text-sm">{user.title}</div>
                    <div className="text-[#A239CA] text-sm">{user.company}</div>
                    <div className="text-[#F8F8FF] text-xs">{user.email}</div>
                  </motion.button>
                ))}
              </div>
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 bg-[#1B6CA8]/20 text-white rounded-lg hover:bg-[#1B6CA8]/30 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnterClientUniverse}
                  disabled={!selectedUser}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] text-[#121B30] font-medium rounded-lg hover:shadow-lg hover:shadow-[#00FFB7]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enter Client's Universe
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile; 