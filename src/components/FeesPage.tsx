import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Search,
  RotateCcw,
  ChevronDown,
  Plus,
  X,
  Download,
} from 'lucide-react';
import { FeeTransaction } from '../types';
import { initialFeeTransactions } from '../data/mockData';

export const FeesPage: React.FC = () => {
  const [transactions, setTransactions] = useState<FeeTransaction[]>(initialFeeTransactions);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedFeeType, setSelectedFeeType] = useState('All Fee Types');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // New fee transaction form
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [feeType, setFeeType] = useState<FeeTransaction['feeType']>('Tuition Fee');
  const [amount, setAmount] = useState('65000');
  const [paymentMode, setPaymentMode] = useState<FeeTransaction['paymentMode']>('Online');

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.studentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.invoiceNo.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.studentId.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesType = selectedFeeType === 'All Fee Types' || t.feeType === selectedFeeType;
    const matchesStat = selectedStatus === 'All Statuses' || t.status === selectedStatus;

    return matchesSearch && matchesType && matchesStat;
  });

  const handleReset = () => {
    setSearchFilter('');
    setSelectedFeeType('All Fee Types');
    setSelectedStatus('All Statuses');
  };

  const handleCollectFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentId.trim()) return;

    const newTx: FeeTransaction = {
      id: Date.now(),
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: studentId.trim(),
      studentName: studentName.trim(),
      department,
      amount: parseInt(amount) || 25000,
      feeType,
      paymentMode,
      date: '23 Nov 2026',
      status: 'Paid',
    };

    setTransactions([newTx, ...transactions]);
    setIsAddModalOpen(false);
    setStudentName('');
    setStudentId('');
  };

  const feeTypes = ['All Fee Types', 'Tuition Fee', 'Hostel Fee', 'Exam Fee', 'Transport Fee', 'Library Fee'];
  const statuses = ['All Statuses', 'Paid', 'Pending', 'Overdue'];

  return (
    <div className="p-5 space-y-3.5 max-w-[1400px] mx-auto select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669] shadow-[0_2px_8px_rgba(16,185,129,0.12)] shrink-0">
            <CreditCard size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-[22px] font-extrabold text-[#0f172a] tracking-tight leading-tight">
              Fees & Finance
            </h1>
            <p className="text-[12px] text-slate-500 font-medium">
              Tuition fee invoices, hostel charges, online transactions, and outstanding dues
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#4f39f6] hover:bg-[#4338ca] text-white rounded-xl text-[12.5px] font-bold shadow-[0_4px_12px_rgba(79,57,246,0.3)] transition-all active:scale-95"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Collect Fee</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="relative bg-[#f0fbf5] rounded-2xl p-4 border border-[#d4f6e3] shadow-[0_2px_6px_rgba(16,185,129,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669] shrink-0">
              <CreditCard size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Total Collected</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              ₹ 2.84 Cr
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">78% of ₹ 3.64 Cr budgeted</div>
          </div>
        </div>

        <div className="relative bg-[#fef9ee] rounded-2xl p-4 border border-[#feeec8] shadow-[0_2px_6px_rgba(217,119,6,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706] shrink-0">
              <AlertCircle size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Pending Dues</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              ₹ 80.2 L
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">142 students with dues</div>
          </div>
        </div>

        <div className="relative bg-[#f5f1fe] rounded-2xl p-4 border border-[#e9e1fc] shadow-[0_2px_6px_rgba(79,57,246,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6] shrink-0">
              <TrendingUp size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Today's Collection</span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              ₹ 4.85 L
            </div>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
              ▲ +14%
            </span>
          </div>
        </div>

        <div className="relative bg-[#f0f8ff] rounded-2xl p-4 border border-[#daf0ff] shadow-[0_2px_6px_rgba(2,132,199,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] shrink-0">
              <DollarSign size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Digital Gateway Ratio</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              88.4%
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">UPI & NetBanking settled</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={14} />
          </div>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by invoice no, student name or ID..."
            className="w-full pl-8 pr-3 py-1.5 bg-white text-[12px] text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <button
              onClick={() => {
                setShowTypeDropdown(!showTypeDropdown);
                setShowStatusDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11.5px] font-medium text-slate-700 transition-colors shadow-sm"
            >
              <span>{selectedFeeType}</span>
              <ChevronDown size={12} className="text-slate-400 ml-0.5" />
            </button>
            {showTypeDropdown && (
              <div className="absolute left-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop">
                {feeTypes.map((ft) => (
                  <button
                    key={ft}
                    onClick={() => {
                      setSelectedFeeType(ft);
                      setShowTypeDropdown(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-[11.5px] ${
                      selectedFeeType === ft
                        ? 'bg-[#f5f3ff] text-[#4f39f6] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {ft}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown);
                setShowTypeDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11.5px] font-medium text-slate-700 transition-colors shadow-sm"
            >
              <span>{selectedStatus}</span>
              <ChevronDown size={12} className="text-slate-400 ml-0.5" />
            </button>
            {showStatusDropdown && (
              <div className="absolute left-0 mt-1 w-32 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedStatus(s);
                      setShowStatusDropdown(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-[11.5px] ${
                      selectedStatus === s
                        ? 'bg-[#f5f3ff] text-[#4f39f6] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-[#f5f3ff] border border-[#d8d2fb] text-[#4f39f6] rounded-lg text-[11.5px] font-semibold transition-colors shadow-sm"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3ff] border-b border-slate-200/60 text-[11px] font-bold text-slate-500">
                <th className="py-2.5 px-3.5 w-10 text-slate-400">#</th>
                <th className="py-2.5 px-3.5">Invoice No</th>
                <th className="py-2.5 px-3.5">Student Name</th>
                <th className="py-2.5 px-3.5">Department</th>
                <th className="py-2.5 px-3.5">Fee Category</th>
                <th className="py-2.5 px-3.5">Amount</th>
                <th className="py-2.5 px-3.5">Payment Mode</th>
                <th className="py-2.5 px-3.5">Date</th>
                <th className="py-2.5 px-3.5">Status</th>
                <th className="py-2.5 px-3.5 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {filteredTransactions.map((tx, index) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group cursor-default">
                  <td className="py-2.5 px-3.5 text-slate-400 font-medium">{index + 1}</td>
                  <td className="py-2.5 px-3.5 font-mono font-medium text-slate-600 text-[11.5px]">
                    {tx.invoiceNo}
                  </td>
                  <td className="py-2.5 px-3.5 font-bold text-slate-800">{tx.studentName}</td>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-600">{tx.department}</td>
                  <td className="py-2.5 px-3.5 text-slate-600">{tx.feeType}</td>
                  <td className="py-2.5 px-3.5 font-bold text-[#0f172a]">₹ {tx.amount.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3.5 text-slate-500">{tx.paymentMode}</td>
                  <td className="py-2.5 px-3.5 text-slate-500">{tx.date}</td>
                  <td className="py-2.5 px-3.5">
                    {tx.status === 'Paid' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#ecfdf5] text-[#059669]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                        Paid
                      </span>
                    )}
                    {tx.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#fffbeb] text-[#d97706]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                        Pending
                      </span>
                    )}
                    {tx.status === 'Overdue' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#fff5f5] text-[#dc2626]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                        Overdue
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3.5 text-center">
                    <button
                      title="Download receipt"
                      className="p-1 rounded text-slate-400 hover:text-[#4f39f6] hover:bg-slate-100 transition-colors"
                    >
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Fee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-[#f8f9fd] to-[#f4f2ff] border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#4f39f6] flex items-center justify-center text-white">
                  <CreditCard size={16} />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Collect Academic Fee</h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleCollectFee} className="p-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Student Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3 py-1.5 text-[12.5px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Student ID</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="AIMT240001"
                    className="w-full px-3 py-1.5 text-[12.5px] font-mono rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Fee Type</label>
                  <select
                    value={feeType}
                    onChange={(e) => setFeeType(e.target.value as FeeTransaction['feeType'])}
                    className="w-full px-2.5 py-1.5 text-[12px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  >
                    <option value="Tuition Fee">Tuition Fee</option>
                    <option value="Hostel Fee">Hostel Fee</option>
                    <option value="Exam Fee">Exam Fee</option>
                    <option value="Transport Fee">Transport Fee</option>
                    <option value="Library Fee">Library Fee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-1.5 text-[12.5px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Payment Mode</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value as FeeTransaction['paymentMode'])}
                    className="w-full px-2.5 py-1.5 text-[12px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  >
                    <option value="Online">Online / UPI</option>
                    <option value="Bank Transfer">Bank Transfer (NEFT)</option>
                    <option value="Cash">Cash Counter</option>
                    <option value="Cheque">Demand Draft / Cheque</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-[12px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>
              </div>
              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 text-[12px] text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-[12px] font-bold text-white bg-[#4f39f6] hover:bg-[#4338ca] rounded-lg shadow"
                >
                  Confirm & Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
