
import React, { useState, useCallback } from 'react';
import { Task, TaskStatus } from './types';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: 'UIデザインのワイヤーフレーム作成', startDate: '2024-07-20', dueDate: '2024-07-25', status: TaskStatus.IN_PROGRESS, remarks: 'Figmaで作成。主要な画面遷移を含めること。' },
    { id: '2', name: 'APIエンドポイントの仕様確認', startDate: '2024-07-18', dueDate: '2024-07-22', status: TaskStatus.COMPLETED },
    { id: '3', name: 'クライアントとの定例ミーティング', startDate: '2024-07-21', dueDate: '2024-07-21', status: TaskStatus.NOT_STARTED, remarks: 'アジェンダ:\n・進捗報告\n・次スプリントのタスク確認' },
  ]);

  const handleAddTask = useCallback((taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    };
    setTasks(prevTasks => [...prevTasks, newTask].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
  }, []);
  
  return (
    <div className="min-h-screen bg-orange-50 text-gray-800">
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 border-b border-orange-100">
        <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-orange-600">
                タスク管理ツール
            </h1>
            <p className="text-gray-500 mt-1">パステルオレンジの優しいタスク管理ツール</p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <TaskForm onAddTask={handleAddTask} />
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 pb-2 border-b-2 border-orange-200">現在のタスク一覧</h2>
            <TaskList tasks={tasks} />
        </div>
      </main>

      <footer className="text-center py-6 text-orange-400 text-sm mt-8">
        <p>&copy; {new Date().getFullYear()} タスク管理ツール. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
