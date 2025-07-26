
import React from 'react';
import { Task } from '../types';
import { STATUS_COLORS } from '../constants';

interface TaskItemProps {
  task: Task;
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


const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <li className="bg-white p-4 rounded-lg shadow-md border border-orange-100 transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-800 break-words pr-4">{task.name}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[task.status]} whitespace-nowrap`}>
          {task.status}
        </span>
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
    </li>
  );
};

export default TaskItem;
