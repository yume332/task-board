import React, { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../types';
import { STATUS_COLORS, STATUS_OPTIONS } from '../constants';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const NoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const CancelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(task.status);

  useEffect(() => {
    setSelectedStatus(task.status);
  }, [task.status]);

  const isStatusChanged = selectedStatus !== task.status;

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStatusChange(task.id, selectedStatus);
  };
  
  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedStatus(task.status);
  };

  return (
    <li className="bg-white p-4 rounded-lg shadow-md border border-orange-100 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="flex-1 text-lg font-bold text-gray-800 break-words pr-2">{task.name}</h3>
          <div className="flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as TaskStatus)}
              onClick={(e) => e.stopPropagation()}
              className={`flex-shrink-0 px-3 py-1 text-xs font-semibold rounded-full border-transparent focus:border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-colors cursor-pointer ${STATUS_COLORS[selectedStatus]}`}
              aria-label={`タスク「${task.name}」のステータスを変更`}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-white text-black">
                  {option}
                </option>
              ))}
            </select>
            {isStatusChanged && (
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleSave}
                  className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  title="保存"
                  aria-label="ステータスの変更を保存"
                >
                  <SaveIcon />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
                  title="キャンセル"
                  aria-label="ステータスの変更をキャンセル"
                >
                  <CancelIcon />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex items-center">
              <CalendarIcon />
              <span>開始日: {task.startDate}</span>
          </div>
          <div className="flex items-center">
              <CalendarIcon />
              <span>期日: {task.dueDate}</span>
          </div>
        </div>
        {task.remarks && (
          <div className="mt-3 pt-3 border-t border-orange-100">
              <div className="flex items-start text-sm text-gray-700">
                  <NoteIcon />
                  <p className="flex-1 whitespace-pre-wrap font-sans">{task.remarks}</p>
              </div>
          </div>
        )}
      </div>
      <div className="mt-4 pt-3 border-t border-orange-100 flex justify-end items-center space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="flex items-center px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-orange-100 rounded-md transition-colors"
          aria-label={`タスク「${task.name}」を編集`}
        >
          <EditIcon />
          編集
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex items-center px-3 py-1 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
          aria-label={`タスク「${task.name}」を削除`}
        >
          <DeleteIcon />
          削除
        </button>
      </div>
    </li>
  );
};

export default TaskItem;