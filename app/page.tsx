'use client'

import { useState, useEffect } from 'react'
import {
  BookOpen, Brain, TrendingUp, Calendar, CheckCircle2,
  Target, Clock, Award, Lightbulb, Users, Heart,
  GraduationCap, FileText, BarChart3, Sun, Moon
} from 'lucide-react'

interface Subject {
  name: string
  grade: string
  progress: number
  color: string
}

interface Habit {
  id: number
  name: string
  completed: boolean
  streak: number
}

interface Task {
  id: number
  title: string
  subject: string
  dueDate: string
  completed: boolean
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('overview')

  // Uganda Lower Secondary Curriculum 2026 Subjects
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: 'Mathematics', grade: 'B+', progress: 78, color: 'bg-blue-500' },
    { name: 'English Language', grade: 'A-', progress: 85, color: 'bg-green-500' },
    { name: 'Science', grade: 'B', progress: 72, color: 'bg-purple-500' },
    { name: 'Social Studies', grade: 'A', progress: 88, color: 'bg-yellow-500' },
    { name: 'Religious Education', grade: 'B+', progress: 80, color: 'bg-pink-500' },
    { name: 'Life Skills Education', grade: 'A-', progress: 83, color: 'bg-indigo-500' },
    { name: 'Physical Education', grade: 'A', progress: 90, color: 'bg-red-500' },
    { name: 'Agriculture', grade: 'B+', progress: 76, color: 'bg-lime-500' },
  ])

  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Wake up at 6:00 AM', completed: false, streak: 12 },
    { id: 2, name: 'Morning devotion/prayer', completed: false, streak: 15 },
    { id: 3, name: 'Review notes before class', completed: false, streak: 8 },
    { id: 4, name: 'Complete homework on time', completed: false, streak: 20 },
    { id: 5, name: 'Read for 30 minutes', completed: false, streak: 10 },
    { id: 6, name: 'Exercise/Sports activity', completed: false, streak: 7 },
    { id: 7, name: 'Help with home chores', completed: false, streak: 18 },
    { id: 8, name: 'Sleep by 9:30 PM', completed: false, streak: 9 },
  ])

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Math Assignment - Algebra', subject: 'Mathematics', dueDate: '2026-01-15', completed: false },
    { id: 2, title: 'English Essay - My Future Goals', subject: 'English', dueDate: '2026-01-16', completed: false },
    { id: 3, title: 'Science Project - Water Cycle', subject: 'Science', dueDate: '2026-01-18', completed: false },
    { id: 4, title: 'Social Studies Report', subject: 'Social Studies', dueDate: '2026-01-17', completed: false },
  ])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed, streak: !habit.completed ? habit.streak + 1 : habit.streak } : habit
    ))
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const completedHabits = habits.filter(h => h.completed).length
  const completedTasks = tasks.filter(t => t.completed).length
  const averageProgress = Math.round(subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-uganda-yellow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-uganda-yellow to-uganda-red rounded-lg flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Uganda Student Dashboard</h1>
                <p className="text-sm text-gray-500">Lower Secondary Curriculum 2026</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="text-xs text-gray-500">{currentTime.toLocaleDateString('en-UG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-1 flex space-x-1">
          {['overview', 'subjects', 'habits', 'improvement'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-uganda-yellow text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Average Progress</p>
                  <p className="text-3xl font-bold text-gray-900">{averageProgress}%</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Habits Today</p>
                  <p className="text-3xl font-bold text-gray-900">{completedHabits}/{habits.length}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Tasks Completed</p>
                  <p className="text-3xl font-bold text-gray-900">{completedTasks}/{tasks.length}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Daily Habits */}
            <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Daily Habits Tracker
              </h2>
              <div className="space-y-3">
                {habits.slice(0, 4).map(habit => (
                  <div key={habit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleHabit(habit.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          habit.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        }`}
                      >
                        {habit.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                      <span className={habit.completed ? 'line-through text-gray-500' : 'text-gray-700'}>{habit.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{habit.streak} days</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Upcoming Tasks
              </h2>
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        }`}
                      >
                        {task.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>{task.title}</p>
                        <p className="text-xs text-gray-500">{task.subject} • Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-uganda-yellow to-yellow-400 rounded-xl shadow-md p-6 md:col-span-2 lg:col-span-3">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Daily Motivation
              </h2>
              <p className="text-gray-800 italic">"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela</p>
              <p className="text-gray-700 mt-3 text-sm">Keep pushing forward! Every small effort today builds your future tomorrow. 🇺🇬</p>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${subject.color} rounded-lg flex items-center justify-center`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{subject.name}</h3>
                      <p className="text-sm text-gray-500">Current Grade: {subject.grade}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{subject.progress}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${subject.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'habits' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Habits & Routines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {habits.map(habit => (
                <div key={habit.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border-l-4 border-green-500">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleHabit(habit.id)}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                          habit.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        }`}
                      >
                        {habit.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                      </button>
                      <span className={`font-medium ${habit.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>{habit.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-10">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{habit.streak} day streak</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'improvement' && (
          <div className="space-y-6">
            {/* Study Tips */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-purple-500" />
                Study & Learning Strategies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h3 className="font-bold text-gray-900 mb-2">📚 Active Reading</h3>
                  <p className="text-sm text-gray-700">Take notes while reading. Summarize each chapter in your own words. Ask yourself questions about the material.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-2">🧠 Spaced Repetition</h3>
                  <p className="text-sm text-gray-700">Review material regularly. Study difficult topics 3-4 times per week. Use flashcards for memorization.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h3 className="font-bold text-gray-900 mb-2">👥 Study Groups</h3>
                  <p className="text-sm text-gray-700">Form study groups with classmates. Teach concepts to others. Discuss challenging topics together.</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h3 className="font-bold text-gray-900 mb-2">⏰ Time Management</h3>
                  <p className="text-sm text-gray-700">Create a study schedule. Break tasks into smaller parts. Use the Pomodoro technique (25 min focus, 5 min break).</p>
                </div>
              </div>
            </div>

            {/* Personal Development */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2 text-red-500" />
                Personal Development Goals
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                    Morning Routine
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-7">
                    <li>Wake up early (5:30-6:00 AM) for a productive start</li>
                    <li>Make your bed immediately (builds discipline)</li>
                    <li>Morning devotion/prayer for spiritual growth</li>
                    <li>Light exercise or stretching (10-15 minutes)</li>
                    <li>Healthy breakfast for energy and focus</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                    Academic Excellence
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-7">
                    <li>Attend all classes and arrive on time</li>
                    <li>Sit in front to minimize distractions</li>
                    <li>Ask questions when you don't understand</li>
                    <li>Complete homework before playing or relaxing</li>
                    <li>Review notes the same day you learn them</li>
                    <li>Read beyond textbooks - explore topics deeply</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Character & Values
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-7">
                    <li>Be honest in all your work - no cheating</li>
                    <li>Respect teachers, parents, and classmates</li>
                    <li>Help others who are struggling with studies</li>
                    <li>Practice gratitude daily - appreciate what you have</li>
                    <li>Stay away from negative peer pressure</li>
                    <li>Be responsible for your actions and decisions</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-500" />
                    Social & Life Skills
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-7">
                    <li>Communicate clearly and confidently</li>
                    <li>Listen actively when others speak</li>
                    <li>Participate in school clubs and activities</li>
                    <li>Develop leadership skills through group projects</li>
                    <li>Learn to manage stress and emotions healthily</li>
                    <li>Build positive friendships that encourage growth</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <Moon className="w-5 h-5 mr-2 text-indigo-500" />
                    Evening Routine
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-7">
                    <li>Review what you learned today (15 minutes)</li>
                    <li>Prepare bag and uniform for tomorrow</li>
                    <li>Limited screen time (1 hour maximum)</li>
                    <li>Read a book or educational material</li>
                    <li>Reflect on the day - what went well, what to improve</li>
                    <li>Sleep by 9:30 PM for 8+ hours of rest</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Weekly Goals */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2" />
                Weekly Success Checklist
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Complete all homework assignments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Read at least 3 hours total</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Exercise 4+ times</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Help at home with chores daily</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Review all subject notes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Practice kindness & respect</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-uganda-red mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 font-medium">🇺🇬 Uganda Lower Secondary Curriculum 2026</p>
            <p className="text-sm text-gray-500 mt-1">Building tomorrow's leaders today • Excellence • Integrity • Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
