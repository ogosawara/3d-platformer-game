# To-Do List Application

A modern, feature-rich to-do list application with local storage functionality. Manage your tasks efficiently with a beautiful and responsive interface.

## ✨ Features

- ✅ **Add, Edit, and Delete Tasks** - Full task management
- 💾 **Local Storage** - Tasks persist between browser sessions
- 🔍 **Filter Tasks** - View All, Active, or Completed tasks
- 📊 **Statistics** - Track total, active, and completed tasks
- 🎨 **Beautiful UI** - Modern design with smooth animations
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⌨️ **Keyboard Shortcuts** - Press Enter to add tasks
- 🔔 **Notifications** - Get feedback on actions
- 🛡️ **Input Validation** - Prevent duplicates and invalid entries
- 🌙 **Dark-Friendly** - Easy on the eyes with gradient background

## 🚀 Quick Start

1. **Open the application:**
   - Simply open `todo-app/index.html` in your web browser
   - No server or installation required

2. **Add a task:**
   - Type in the input field
   - Click "Add Task" or press Enter
   - Your task is automatically saved

3. **Manage tasks:**
   - Check the checkbox to mark as completed
   - Click "Delete" to remove a task
   - Use filters to view specific tasks

4. **Clear tasks:**
   - "Clear Completed" - removes all finished tasks
   - "Clear All" - removes all tasks (with confirmation)

## 🎯 Usage

### Basic Operations

```
Add Task: Type text + Press Enter or Click "Add Task"
Complete Task: Click the checkbox
Delete Task: Click the "Delete" button
Filter Tasks: Click "All", "Active", or "Completed"
```

### Keyboard Shortcuts

- **Enter** - Add a new task
- **Escape** - Clear the input field
- **Ctrl+Shift+E** - Export tasks as JSON

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --success-color: #10b981;
    --danger-color: #ef4444;
    /* ... more variables ... */
}
```

### Storage Key
Change the storage key in `script.js`:

```javascript
this.storageKey = 'todoList_tasks'; // Change this
```

## 💾 Local Storage Details

### Storage Format

Tasks are stored as a JSON array in `localStorage`:

```javascript
[
    {
        id: 1234567890,
        text: "Buy groceries",
        completed: false,
        createdAt: "2024-01-15T10:30:00.000Z"
    },
    {
        id: 1234567891,
        text: "Complete project",
        completed: true,
        createdAt: "2024-01-15T11:00:00.000Z"
    }
]
```

### Storage Size
- Each task takes approximately 100-200 bytes
- Browser local storage typically allows 5-10 MB
- This means you can store 25,000-50,000 tasks

### Accessing Storage

View your tasks in the browser console:

```javascript
JSON.parse(localStorage.getItem('todoList_tasks'))
```

Clear all data:

```javascript
localStorage.clear()
```

## 📋 File Structure

```
todo-app/
├── index.html      # HTML structure
├── styles.css      # CSS styling
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## 🔒 Data Persistence

Your tasks are automatically saved to browser local storage in real-time:

- ✅ Tasks saved immediately after adding
- ✅ Tasks saved when completing/uncompleting
- ✅ Tasks saved when deleting
- ✅ Data persists across browser sessions
- ✅ Data persists across browser restarts

## 🌐 Browser Compatibility

| Browser | Support |
|---------|----------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| Opera   | ✅ Full |
| IE 11   | ⚠️ Partial |

## 📝 Task Properties

Each task contains:

- **id** - Unique identifier (timestamp)
- **text** - Task description
- **completed** - Boolean status
- **createdAt** - ISO timestamp

## 🎯 Tips & Tricks

1. **Backup Your Tasks**
   - Export tasks by pressing Ctrl+Shift+E
   - Save the JSON file as backup

2. **Organize Better**
   - Use task names like: `[Category] Task description`
   - Example: `[Work] Complete quarterly report`

3. **Focus Mode**
   - Use "Active" filter to focus on pending tasks
   - Use "Completed" filter to see your achievements

4. **Keyboard Friendly**
   - Press Tab to navigate between elements
   - Press Enter to add tasks
   - Press Escape to clear input

## 🚫 Limitations

- Single list per browser (not synced across devices)
- Data cleared if browser storage is cleared
- No cloud backup (data stored locally only)
- No task categories or tags

## 🔐 Privacy

- All data stored locally on your device
- No data sent to any server
- No tracking or analytics
- 100% private

## 📱 Mobile Tips

- Use full-screen mode for better experience
- Add to home screen for app-like experience
- Use landscape mode for wider interface

## 🐛 Troubleshooting

### Tasks not saving?
- Check if local storage is enabled
- Try clearing cache and reloading
- Check browser console for errors

### Lost tasks?
- Check if local storage was cleared
- Try restoring from browser history
- Create a backup for future use

## 🚀 Future Features

- [ ] Task categories/tags
- [ ] Priority levels
- [ ] Due dates
- [ ] Recurring tasks
- [ ] Cloud sync
- [ ] Dark mode toggle
- [ ] Multiple lists
- [ ] Task search

## 📄 License

Free to use and modify for personal and commercial projects.

## 👨‍💻 Created by

To-Do List App - Modern Task Management

---

**Enjoy managing your tasks! 📝✨**