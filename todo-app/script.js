/* ============================================
   TO-DO LIST APPLICATION - MAIN SCRIPT
   ============================================ */

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storageKey = 'todoList_tasks';
        
        this.initializeElements();
        this.loadTodos();
        this.attachEventListeners();
        this.render();
    }

    // ============= INITIALIZATION =============

    initializeElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.totalCount = document.getElementById('totalCount');
        this.activeCount = document.getElementById('activeCount');
        this.completedCount = document.getElementById('completedCount');
    }

    attachEventListeners() {
        // Add todo on button click
        this.addBtn.addEventListener('click', () => this.addTodo());
        
        // Add todo on Enter key
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });

        // Clear buttons
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());

        // Focus on input when page loads
        this.todoInput.focus();
    }

    // ============= LOCAL STORAGE =============

    saveTodos() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    }

    loadTodos() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                this.todos = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading todos:', e);
                this.todos = [];
            }
        }
    }

    // ============= TODO OPERATIONS =============

    addTodo() {
        const text = this.todoInput.value.trim();

        // Validation
        if (!text) {
            this.showNotification('Please enter a task!', 'warning');
            this.todoInput.focus();
            return;
        }

        if (text.length > 200) {
            this.showNotification('Task is too long! (Max 200 characters)', 'warning');
            return;
        }

        // Check for duplicates
        if (this.todos.some(todo => todo.text.toLowerCase() === text.toLowerCase())) {
            this.showNotification('This task already exists!', 'warning');
            return;
        }

        // Create new todo
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(newTodo);
        this.saveTodos();
        this.todoInput.value = '';
        this.todoInput.focus();
        this.render();
        this.showNotification('Task added successfully! ✅', 'success');
    }

    deleteTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            const deletedTodo = this.todos[index];
            this.todos.splice(index, 1);
            this.saveTodos();
            this.render();
            this.showNotification(`"${deletedTodo.text}" deleted ✓`, 'info');
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear', 'warning');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
            this.showNotification(`${completedCount} task(s) cleared ✓`, 'success');
        }
    }

    clearAll() {
        if (this.todos.length === 0) {
            this.showNotification('No tasks to clear', 'warning');
            return;
        }

        if (confirm(`Delete all ${this.todos.length} task(s)? This cannot be undone.`)) {
            this.todos = [];
            this.saveTodos();
            this.render();
            this.showNotification('All tasks cleared ✓', 'success');
        }
    }

    // ============= FILTERING & STATS =============

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    updateStats() {
        const total = this.todos.length;
        const active = this.todos.filter(t => !t.completed).length;
        const completed = this.todos.filter(t => t.completed).length;

        this.totalCount.textContent = total;
        this.activeCount.textContent = active;
        this.completedCount.textContent = completed;
    }

    // ============= RENDERING =============

    render() {
        this.updateStats();
        this.renderTodos();
        this.updateActionButtons();
    }

    renderTodos() {
        const filteredTodos = this.getFilteredTodos();
        this.todoList.innerHTML = '';

        if (filteredTodos.length === 0) {
            this.emptyState.classList.add('show');
            this.todoList.style.display = 'none';
            return;
        }

        this.emptyState.classList.remove('show');
        this.todoList.style.display = 'block';

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    data-id="${todo.id}"
                >
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="delete-btn" data-id="${todo.id}">Delete</button>
            `;

            // Add event listeners
            const checkbox = li.querySelector('.checkbox');
            const deleteBtn = li.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

            this.todoList.appendChild(li);
        });
    }

    updateActionButtons() {
        const hasCompleted = this.todos.some(t => t.completed);
        const hasAll = this.todos.length > 0;

        this.clearCompletedBtn.disabled = !hasCompleted;
        this.clearAllBtn.disabled = !hasAll;
    }

    // ============= UTILITIES =============

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            info: '#3b82f6'
        };
        return colors[type] || colors.info;
    }

    // ============= EXPORT/IMPORT =============

    exportTodos() {
        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    importTodos(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    // Merge or replace
                    if (confirm('Replace existing tasks or merge with current ones?')) {
                        this.todos = imported;
                    } else {
                        this.todos = [...this.todos, ...imported];
                    }
                    this.saveTodos();
                    this.render();
                    this.showNotification('Tasks imported successfully! ✅', 'success');
                }
            } catch (error) {
                this.showNotification('Error importing tasks', 'danger');
            }
        };
        reader.readAsText(file);
    }
}

// ============= INITIALIZE APP =============

let todoApp;

document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoApp();
    
    // Add keyboard shortcuts info
    console.log('To-Do List App loaded!');
    console.log('Keyboard shortcuts:');
    console.log('- Enter: Add todo');
    console.log('- Delete: Remove todo');
});

// ============= KEYBOARD SHORTCUTS =============

document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+E to export
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        todoApp.exportTodos();
    }

    // Escape to clear input
    if (e.key === 'Escape' && document.activeElement === todoApp.todoInput) {
        todoApp.todoInput.value = '';
    }
});

// ============= ANIMATIONS STYLES =============

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);