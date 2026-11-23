import React, { useState } from 'react';
import {
  Building2,
  Search,
  Plus,
  RotateCcw,
  MoreHorizontal,
  Home,
  Users,
  Shield,
  X,
  Sparkles,
} from 'lucide-react';
import { initialHostelRooms } from '../data/mockData';
import { HostelRoom } from '../types';

export const HostelPage: React.FC = () => {
  const [rooms, setRooms] = useState<HostelRoom[]>(initialHostelRooms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    roomNumber: '',
    block: 'Block A (Boys)',
    type: 'Double AC' as HostelRoom['type'],
    capacity: 2,
    monthlyRent: 8500,
    warden: 'Mr. S. K. Roy',
  });

  const blocks = ['All', 'Block A (Boys)', 'Block B (Girls)'];
  const types = ['All', 'Single AC', 'Double AC', 'Double Non-AC', 'Triple Non-AC'];

  const filteredRooms = rooms.filter((r) => {
    const matchesSearch =
      r.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.warden.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBlock = selectedBlock === 'All' || r.block === selectedBlock;
    const matchesType = selectedType === 'All' || r.type === selectedType;
    return matchesSearch && matchesBlock && matchesType;
  });

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.roomNumber) return;

    const newRoom: HostelRoom = {
      id: Date.now(),
      roomNumber: formData.roomNumber,
      block: formData.block,
      type: formData.type,
      capacity: Number(formData.capacity),
      occupied: 0,
      monthlyRent: Number(formData.monthlyRent),
      warden: formData.warden,
      status: 'Available',
    };

    setRooms([newRoom, ...rooms]);
    setIsAllocateModalOpen(false);
    setFormData({
      roomNumber: '',
      block: 'Block A (Boys)',
      type: 'Double AC',
      capacity: 2,
      monthlyRent: 8500,
      warden: 'Mr. S. K. Roy',
    });
    showToast(`Room ${newRoom.roomNumber} added to ${newRoom.block}.`);
  };

  const handleToggleOccupy = (id: number) => {
    setRooms(
      rooms.map((r) => {
        if (r.id === id) {
          if (r.occupied < r.capacity) {
            const nextOcc = r.occupied + 1;
            return {
              ...r,
              occupied: nextOcc,
              status: nextOcc === r.capacity ? 'Full' : 'Available',
            };
          } else {
            return {
              ...r,
              occupied: 0,
              status: 'Available',
            };
          }
        }
        return r;
      })
    );
    showToast('Room occupancy updated.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalCapacity = rooms.reduce((acc, curr) => acc + curr.capacity, 0);
  const occupiedCount = rooms.reduce((acc, curr) => acc + curr.occupied, 0);
  const vacantBeds = totalCapacity - occupiedCount;

  return (
    <div className="p-5 space-y-4 max-w-[1400px] mx-auto select-none">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#141033] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-slide-up border border-purple-500/30">
          <Sparkles size={14} className="text-[#a78bfa]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#fef9ee] text-[#d97706] flex items-center justify-center font-bold shadow-sm">
            <Home size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
              Hostel & Accommodation
            </h1>
            <p className="text-slate-500 text-xs">
              Manage student residential blocks, room allocations, wardens and bed capacity
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAllocateModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#4f39f6] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#4338ca] transition-all cursor-pointer"
        >
          <Plus size={15} />
          <span>+ Add / Allocate Room</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#f5f1fe] rounded-2xl p-4 border border-[#e9e1fc] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6]">
              <Building2 size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Total Capacity</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              {totalCapacity} Beds
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10.5px] text-slate-400">across 2 residential blocks</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f0fbf5] rounded-2xl p-4 border border-[#d4f6e3] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669]">
              <Users size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Occupied Beds</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              {occupiedCount}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
                {Math.round((occupiedCount / (totalCapacity || 1)) * 100)}% Rate
              </span>
              <span className="text-[10.5px] text-slate-400">active residents</span>
            </div>
          </div>
        </div>

        <div className="bg-[#fef9ee] rounded-2xl p-4 border border-[#feeec8] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706]">
              <Home size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Vacant Beds</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              {vacantBeds}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#fef3c7] text-[#b45309] text-[10.5px] font-bold rounded">
                Available
              </span>
              <span className="text-[10.5px] text-slate-400">ready for allocation</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f0f8ff] rounded-2xl p-4 border border-[#daf0ff] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
              <Shield size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Hostel Wardens</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              4 On Duty
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#eff6ff] text-[#2563eb] text-[10.5px] font-bold rounded">
                24/7 Support
              </span>
              <span className="text-[10.5px] text-slate-400">medical & security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by room number or warden..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={selectedBlock}
            onChange={(e) => setSelectedBlock(e.target.value)}
            className="px-3 py-1.5 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            {blocks.map((b) => (
              <option key={b} value={b}>
                Block: {b}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                Type: {t}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedBlock('All');
              setSelectedType('All');
            }}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Room Table */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3ff] text-[11px] font-bold text-slate-600 border-b border-slate-200/80">
                <th className="py-2.5 px-3">Room No</th>
                <th className="py-2.5 px-3">Hostel Block</th>
                <th className="py-2.5 px-3">Room Type</th>
                <th className="py-2.5 px-3">Occupancy</th>
                <th className="py-2.5 px-3">Monthly Rent</th>
                <th className="py-2.5 px-3">Assigned Warden</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredRooms.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-800 font-mono text-xs">
                    {r.roomNumber}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 font-medium">{r.block}</td>
                  <td className="py-2.5 px-3 text-slate-600">{r.type}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">
                        {r.occupied} / {r.capacity}
                      </span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            r.occupied === r.capacity
                              ? 'bg-red-400'
                              : r.occupied > 0
                              ? 'bg-[#4f39f6]'
                              : 'bg-emerald-400'
                          }`}
                          style={{
                            width: `${(r.occupied / r.capacity) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">
                    ₹ {r.monthlyRent.toLocaleString('en-IN')}/mo
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{r.warden}</td>
                  <td className="py-2.5 px-3">
                    {r.status === 'Available' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ecfdf5] text-[#059669]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                        Available
                      </span>
                    )}
                    {r.status === 'Full' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#eff6ff] text-[#2563eb]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                        Occupied Full
                      </span>
                    )}
                    {r.status === 'Maintenance' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fffbeb] text-[#d97706]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                        Maintenance
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleToggleOccupy(r.id)}
                        className="px-2.5 py-1 rounded-lg text-[10.5px] font-semibold bg-[#f5f1fe] text-[#4f39f6] hover:bg-[#ede9fe] transition-colors"
                      >
                        {r.occupied < r.capacity ? '+ Allocate' : 'Vacate'}
                      </button>
                      <button className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-[#f8f9fd] border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing 1 to {filteredRooms.length} of {rooms.length} hostel rooms
          </span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-lg bg-[#4f39f6] text-white font-bold flex items-center justify-center">
              1
            </button>
          </div>
        </div>
      </div>

      {/* Add / Allocate Modal */}
      {isAllocateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg border border-slate-200 shadow-2xl p-6 relative animate-pop">
            <button
              onClick={() => setIsAllocateModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#fef9ee] text-[#d97706] flex items-center justify-center">
                <Home size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Add New Hostel Room</h2>
                <p className="text-xs text-slate-500">
                  Register room specifications and warden in-charge
                </p>
              </div>
            </div>

            <form onSubmit={handleAddRoom} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Room Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. A-301"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hostel Block
                  </label>
                  <select
                    value={formData.block}
                    onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  >
                    <option value="Block A (Boys)">Block A (Boys)</option>
                    <option value="Block B (Girls)">Block B (Girls)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Room Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as HostelRoom['type'],
                      })
                    }
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  >
                    <option value="Single AC">Single AC</option>
                    <option value="Double AC">Double AC</option>
                    <option value="Double Non-AC">Double Non-AC</option>
                    <option value="Triple Non-AC">Triple Non-AC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bed Capacity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    required
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Rent (₹)
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    required
                    value={formData.monthlyRent}
                    onChange={(e) =>
                      setFormData({ ...formData, monthlyRent: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hostel Warden
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.warden}
                    onChange={(e) => setFormData({ ...formData, warden: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAllocateModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4f39f6] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#4338ca] transition-all"
                >
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
