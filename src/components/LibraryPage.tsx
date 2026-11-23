import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  RotateCcw,
  MoreHorizontal,
  Bookmark,
  AlertCircle,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';
import { initialBooks } from '../data/mockData';
import { BookRecord } from '../types';

export const LibraryPage: React.FC = () => {
  const [books, setBooks] = useState<BookRecord[]>(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Book Form State
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Computer Science',
    shelf: 'CS-A-01',
    totalCopies: 10,
    availableCopies: 10,
  });

  const categories = ['All', 'Computer Science', 'Algorithms', 'Software Engineering', 'Mechanical', 'Electronics'];
  const statuses = ['All', 'Available', 'Reserved', 'Out of Stock'];

  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isbn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || b.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.isbn) return;

    const newBook: BookRecord = {
      id: Date.now(),
      isbn: formData.isbn,
      title: formData.title,
      author: formData.author,
      category: formData.category,
      shelf: formData.shelf,
      totalCopies: Number(formData.totalCopies),
      availableCopies: Number(formData.availableCopies),
      status: Number(formData.availableCopies) > 0 ? 'Available' : 'Out of Stock',
    };

    setBooks([newBook, ...books]);
    setIsAddModalOpen(false);
    setFormData({
      title: '',
      author: '',
      isbn: '',
      category: 'Computer Science',
      shelf: 'CS-A-01',
      totalCopies: 10,
      availableCopies: 10,
    });
    showToast(`Book "${newBook.title}" successfully added to catalog.`);
  };

  const handleQuickIssue = (id: number) => {
    setBooks(
      books.map((b) => {
        if (b.id === id && b.availableCopies > 0) {
          const newAvail = b.availableCopies - 1;
          return {
            ...b,
            availableCopies: newAvail,
            status: newAvail === 0 ? 'Out of Stock' : b.status,
          };
        }
        return b;
      })
    );
    showToast('Book copy issued successfully.');
  };

  const handleQuickReturn = (id: number) => {
    setBooks(
      books.map((b) => {
        if (b.id === id && b.availableCopies < b.totalCopies) {
          const newAvail = b.availableCopies + 1;
          return {
            ...b,
            availableCopies: newAvail,
            status: 'Available',
          };
        }
        return b;
      })
    );
    showToast('Book returned to library inventory.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalCopiesCount = books.reduce((acc, curr) => acc + curr.totalCopies, 0);
  const availableCopiesCount = books.reduce((acc, curr) => acc + curr.availableCopies, 0);
  const issuedCopiesCount = totalCopiesCount - availableCopiesCount;

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
          <div className="w-10 h-10 rounded-xl bg-[#f5f1fe] text-[#4f39f6] flex items-center justify-center font-bold shadow-sm">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
              Central Library
            </h1>
            <p className="text-slate-500 text-xs">
              Manage book inventory, catalogs, circulation and student borrowings
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#4f39f6] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#4338ca] transition-all cursor-pointer"
        >
          <Plus size={15} />
          <span>+ Add Book</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#f5f1fe] rounded-2xl p-4 border border-[#e9e1fc] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6]">
              <BookOpen size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Total Books</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              {books.length} Titles
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
                ▲ +8.5%
              </span>
              <span className="text-[10.5px] text-slate-400">new additions</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f0fbf5] rounded-2xl p-4 border border-[#d4f6e3] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669]">
              <Layers size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Available Copies</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              {availableCopiesCount}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
                ● In Shelf
              </span>
              <span className="text-[10.5px] text-slate-400">ready to borrow</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f0f8ff] rounded-2xl p-4 border border-[#daf0ff] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
              <Bookmark size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Issued Copies</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              {issuedCopiesCount}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#eff6ff] text-[#2563eb] text-[10.5px] font-bold rounded">
                Active Loans
              </span>
              <span className="text-[10.5px] text-slate-400">across 4 departments</span>
            </div>
          </div>
        </div>

        <div className="bg-[#fef9ee] rounded-2xl p-4 border border-[#feeec8] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706]">
              <AlertCircle size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Total Stock</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              {totalCopiesCount}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#fef3c7] text-[#b45309] text-[10.5px] font-bold rounded">
                98.4%
              </span>
              <span className="text-[10.5px] text-slate-400">stock verification</span>
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
            placeholder="Search by title, author or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>

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
              setSelectedCategory('All');
              setSelectedStatus('All');
            }}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3ff] text-[11px] font-bold text-slate-600 border-b border-slate-200/80">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">ISBN</th>
                <th className="py-2.5 px-3">Book Title & Author</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Shelf</th>
                <th className="py-2.5 px-3">Copies (Avail / Total)</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredBooks.map((b, idx) => (
                <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 text-slate-400 font-medium">{idx + 1}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">{b.isbn}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">{b.title}</span>
                      <span className="text-[10.5px] text-slate-400">By {b.author}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 font-medium">{b.category}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[10.5px] rounded-md font-semibold">
                      {b.shelf}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">
                        {b.availableCopies} / {b.totalCopies}
                      </span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            b.availableCopies > 0 ? 'bg-[#4f39f6]' : 'bg-red-400'
                          }`}
                          style={{
                            width: `${(b.availableCopies / b.totalCopies) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    {b.status === 'Available' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ecfdf5] text-[#059669]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                        Available
                      </span>
                    )}
                    {b.status === 'Reserved' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#eff6ff] text-[#2563eb]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                        Reserved
                      </span>
                    )}
                    {b.status === 'Out of Stock' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef2f2] text-[#dc2626]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleQuickIssue(b.id)}
                        disabled={b.availableCopies === 0}
                        className={`px-2 py-1 rounded-lg text-[10.5px] font-semibold transition-colors ${
                          b.availableCopies > 0
                            ? 'bg-[#f5f1fe] text-[#4f39f6] hover:bg-[#ede9fe]'
                            : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                        }`}
                      >
                        Issue
                      </button>
                      <button
                        onClick={() => handleQuickReturn(b.id)}
                        disabled={b.availableCopies === b.totalCopies}
                        className={`px-2 py-1 rounded-lg text-[10.5px] font-semibold transition-colors ${
                          b.availableCopies < b.totalCopies
                            ? 'bg-[#f0fbf5] text-[#059669] hover:bg-[#d1fae5]'
                            : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                        }`}
                      >
                        Return
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
            Showing 1 to {filteredBooks.length} of {books.length} book titles
          </span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-lg bg-[#4f39f6] text-white font-bold flex items-center justify-center">
              1
            </button>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-200 text-slate-600 font-medium flex items-center justify-center">
              2
            </button>
          </div>
        </div>
      </div>

      {/* Add Book Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg border border-slate-200 shadow-2xl p-6 relative animate-pop">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#ede9fe] text-[#4f39f6] flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Add New Book</h2>
                <p className="text-xs text-slate-500">
                  Enter catalog details and copy counts
                </p>
              </div>
            </div>

            <form onSubmit={handleAddBook} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Book Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artificial Intelligence: A Modern Approach"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Author(s)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Stuart Russell, Peter Norvig"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ISBN Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="978-0134610993"
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Algorithms">Algorithms</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Shelf Rack Location
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="CS-A-09"
                    value={formData.shelf}
                    onChange={(e) => setFormData({ ...formData, shelf: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Copies
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.totalCopies}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalCopies: Number(e.target.value),
                        availableCopies: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Available in Shelf
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={formData.totalCopies}
                    required
                    value={formData.availableCopies}
                    onChange={(e) =>
                      setFormData({ ...formData, availableCopies: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4f39f6] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#4338ca] transition-all"
                >
                  Save Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
