import { useState } from 'react'
import styles from './App.module.css'

let nextId = 1

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  function addTask() {
    const text = input.trim()
    if (!text) return
    setTasks([...tasks, { id: nextId++, text, done: false }])
    setInput('')
  }

  function toggleTask(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className={styles.board}>
      <h1 className={styles.title}>Task Board</h1>

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="タスクを入力..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.addButton} onClick={addTask}>
          追加
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className={styles.empty}>タスクがありません</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map(task => (
            <li key={task.id} className={`${styles.item} ${task.done ? styles.done : ''}`}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className={styles.text}>{task.text}</span>
              <button
                className={styles.deleteButton}
                onClick={() => deleteTask(task.id)}
                aria-label="削除"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className={styles.summary}>
        {tasks.filter(t => !t.done).length} / {tasks.length} 件未完了
      </p>
    </div>
  )
}
