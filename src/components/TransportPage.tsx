import React, { useState } from 'react';
import {
  Bus,
  Search,
  Plus,
  RotateCcw,
  MoreHorizontal,
  MapPin,
  Phone,
  Clock,
  X,
  Sparkles,
} from 'lucide-react';
import { initialTransportRoutes } from '../data/mockData';
import { TransportRoute } from '../types';

export const TransportPage: React.FC = () => {
  const [routes, setRoutes] = useState<TransportRoute[]>(initialTransportRoutes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    routeNumber: '',
    routeName: '',
    busNumber: '',
    driverName: '',
    driverPhone: '',
    stopsCount: 10,
    totalCapacity: 50,
  });

  const statuses = ['All', 'On Time', 'Delayed', 'Maintenance'];

  const filteredRoutes = routes.filter((r) => {
    const matchesSearch =
      r.routeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.busNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || r.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.routeNumber || !formData.routeName || !formData.busNumber) return;

    const newRoute: TransportRoute = {
      id: Date.now(),
      routeNumber: formData.routeNumber,
      routeName: formData.routeName,
      busNumber: formData.busNumber,
      driverName: formData.driverName,
      driverPhone: formData.driverPhone,
      stopsCount: Number(formData.stopsCount),
      totalCapacity: Number(formData.totalCapacity),
      assignedStudents: 0,
      status: 'On Time',
    };

    setRoutes([newRoute, ...routes]);
    setIsAddRouteModalOpen(false);
    setFormData({
      routeNumber: '',
      routeName: '',
      busNumber: '',
      driverName: '',
      driverPhone: '',
      stopsCount: 10,
      totalCapacity: 50,
    });
    showToast(`Bus Route ${newRoute.routeNumber} successfully added to fleet.`);
  };

  const handleToggleStatus = (id: number) => {
    setRoutes(
      routes.map((r) => {
        if (r.id === id) {
          const nextStatus =
            r.status === 'On Time'
              ? 'Delayed'
              : r.status === 'Delayed'
              ? 'Maintenance'
              : 'On Time';
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
    showToast('Route live status updated.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalAssignedStudents = routes.reduce((acc, curr) => acc + curr.assignedStudents, 0);
  const totalFleetCapacity = routes.reduce((acc, curr) => acc + curr.totalCapacity, 0);

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
          <div className="w-10 h-10 rounded-xl bg-[#f0f8ff] text-[#0284c7] flex items-center justify-center font-bold shadow-sm">
            <Bus size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
              Campus Transport
            </h1>
            <p className="text-slate-500 text-xs">
              Monitor university bus routes, drivers, student transit passes and GPS schedules
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddRouteModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#4f39f6] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#4338ca] transition-all cursor-pointer"
        >
          <Plus size={15} />
          <span>+ Add New Route</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#f5f1fe] rounded-2xl p-4 border border-[#e9e1fc] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6]">
              <Bus size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Active Bus Fleet</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              {routes.length} Buses
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
                ● 100% Operational
              </span>
              <span className="text-[10.5px] text-slate-400">Delhi-NCR routes</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f0fbf5] rounded-2xl p-4 border border-[#d4f6e3] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669]">
              <MapPin size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Boarding Students</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              {totalAssignedStudents}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
                {Math.round((totalAssignedStudents / (totalFleetCapacity || 1)) * 100)}% Capacity
              </span>
              <span className="text-[10.5px] text-slate-400">subscribed</span>
            </div>
          </div>
        </div>

        <div className="bg-[#fef9ee] rounded-2xl p-4 border border-[#feeec8] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706]">
              <Clock size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">On-Time Accuracy</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              98.2%
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
                ▲ +1.4%
              </span>
              <span className="text-[10.5px] text-slate-400">average punctuality</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f0f8ff] rounded-2xl p-4 border border-[#daf0ff] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
              <Phone size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Transit Helpdesk</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              Live GPS
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#eff6ff] text-[#2563eb] text-[10.5px] font-bold rounded">
                Active Telemetry
              </span>
              <span className="text-[10.5px] text-slate-400">driver direct line</span>
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
            placeholder="Search by route, driver name or bus number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                Status: {s}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('All');
            }}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3ff] text-[11px] font-bold text-slate-600 border-b border-slate-200/80">
                <th className="py-2.5 px-3">Route #</th>
                <th className="py-2.5 px-3">Route Corridor & Coverage</th>
                <th className="py-2.5 px-3">Vehicle Reg</th>
                <th className="py-2.5 px-3">Driver & Contact</th>
                <th className="py-2.5 px-3">Passenger Load</th>
                <th className="py-2.5 px-3">Live Status</th>
                <th className="py-2.5 px-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredRoutes.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 bg-[#f5f1fe] text-[#4f39f6] font-bold font-mono text-[11px] rounded-md">
                      {r.routeNumber}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">{r.routeName}</span>
                      <span className="text-[10.5px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} />
                        {r.stopsCount} Designated Metro & Road Stops
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-700">
                    {r.busNumber}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">{r.driverName}</span>
                      <span className="text-[10.5px] text-slate-500 font-mono">{r.driverPhone}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">
                        {r.assignedStudents} / {r.totalCapacity}
                      </span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4f39f6]"
                          style={{
                            width: `${(r.assignedStudents / r.totalCapacity) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    {r.status === 'On Time' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ecfdf5] text-[#059669]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                        On Time
                      </span>
                    )}
                    {r.status === 'Delayed' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fffbeb] text-[#d97706]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                        Delayed +15m
                      </span>
                    )}
                    {r.status === 'Maintenance' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef2f2] text-[#dc2626]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                        Maintenance
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleToggleStatus(r.id)}
                        className="px-2.5 py-1 rounded-lg text-[10.5px] font-semibold bg-[#f8f9fd] text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                      >
                        Update Status
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
            Showing 1 to {filteredRoutes.length} of {routes.length} transit routes
          </span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-lg bg-[#4f39f6] text-white font-bold flex items-center justify-center">
              1
            </button>
          </div>
        </div>
      </div>

      {/* Add Route Modal */}
      {isAddRouteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg border border-slate-200 shadow-2xl p-6 relative animate-pop">
            <button
              onClick={() => setIsAddRouteModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#f0f8ff] text-[#0284c7] flex items-center justify-center">
                <Bus size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Add New Bus Route</h2>
                <p className="text-xs text-slate-500">
                  Register bus driver and route stops corridor
                </p>
              </div>
            </div>

            <form onSubmit={handleAddRoute} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Route Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. R-06"
                    value={formData.routeNumber}
                    onChange={(e) => setFormData({ ...formData, routeNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bus License Plate
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="UP-16-BT-4035"
                    value={formData.busNumber}
                    onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Route Corridor & End Destinations
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Vihar ISBT to AIMT Campus via NH-24"
                  value={formData.routeName}
                  onChange={(e) => setFormData({ ...formData, routeName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Driver Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.driverName}
                    onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Driver Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98110 54326"
                    value={formData.driverPhone}
                    onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Intermediate Stops
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.stopsCount}
                    onChange={(e) => setFormData({ ...formData, stopsCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bus Seating Capacity
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="80"
                    required
                    value={formData.totalCapacity}
                    onChange={(e) =>
                      setFormData({ ...formData, totalCapacity: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddRouteModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4f39f6] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#4338ca] transition-all"
                >
                  Save Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
