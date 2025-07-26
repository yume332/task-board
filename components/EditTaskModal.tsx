
import React, { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../types';
import { STATUS_OPTIONS } from '../constants';

interface EditTaskModalProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onUpdate, onClose }) => {
  const [name, setName] = useState(task.name);
  const [startDate, setStartDate] = useState(task.startDate);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [remarks, setRemarks] = useState(task.remarks || '');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !startDate || !dueDate) {
      setError('タスク名、開始日、期日は必須です。');
      return;
    }
    setError('');
    onUpdate({
      ...task,
      name,
      startDate,
      dueDate,
      status,
      remarks,
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
      aria-labelledby="edit-task-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-xl shadow-2xl border border-orange-200 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="閉じる"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 id="edit-task-title" className="text-xl font-bold text-gray-700">タスクを編集</h2>
            <div>
                <label htmlFor="edit-taskName" className="block text-sm font-medium text-gray-700 mb-1">タスク名</label>
                <input
                    type="text"
                    id="edit-taskName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="edit-startDate" className="block text-sm font-medium text-gray-700 mb-1">開始日</label>
                    <input
                        type="date"
                        id="edit-startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                    />
                </div>
                <div>
                    <label htmlFor="edit-dueDate" className="block text-sm font-medium text-gray-700 mb-1">期日</label>
                    <input
                        type="date"
                        id="edit-dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 mb-1">ステータス</label>
                <select
                    id="edit-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                >
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="edit-remarks" className="block text-sm font-medium text-gray-700 mb-1">備考</label>
                <textarea
                    id="edit-remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
            </div>
            
            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

            <div className="flex justify-end space-x-3 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                >
                    キャンセル
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                    変更を保存
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
