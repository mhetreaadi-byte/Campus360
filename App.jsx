
import { useState, useEffect } from 'react'
function DeadlinePage({
  deadlines,
  showDeadlineForm,
  setShowDeadlineForm,
  newDeadline,
  setNewDeadline,
  addDeadline,
}) {
  return (
    <section className="feature-page">

      <div className="feature-header">
        <div>
          <h1>Deadlines</h1>
          <p>Never miss an important submission.</p>
        </div>

        <button
  className="primary-button"
  onClick={() => setShowDeadlineForm(true)}
>
  + Add Deadline
</button>
      </div>

{showDeadlineForm && (
  <div className="deadline-form">

    <div className="form-header">
      <div>
        <h2>Add New Deadline</h2>
        <p>Keep track of your academic tasks.</p>
      </div>

      <button
        className="close-button"
        onClick={() => setShowDeadlineForm(false)}
      >
        ✕
      </button>
    </div>

    <div className="form-grid">

      <div className="form-group">
        <label>Assignment Name</label>

        <input
          type="text"
          placeholder="e.g. AI-ML Lab Assignment"
          value={newDeadline.title}
          onChange={(e) =>
            setNewDeadline({
              ...newDeadline,
              title: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Subject</label>

        <input
          type="text"
          placeholder="e.g. Machine Learning"
          value={newDeadline.course}
          onChange={(e) =>
            setNewDeadline({
              ...newDeadline,
              course: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Due Date</label>

        <input
          type="date"
          value={newDeadline.due}
          onChange={(e) =>
            setNewDeadline({
              ...newDeadline,
              due: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Priority</label>

        <select
          value={newDeadline.priority}
          onChange={(e) =>
            setNewDeadline({
              ...newDeadline,
              priority: e.target.value,
            })
          }
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

    </div>

    <div className="form-actions">

      <button
        className="secondary-button"
        onClick={() => setShowDeadlineForm(false)}
      >
        Cancel
      </button>

      <button
  className="primary-button"
  onClick={addDeadline}
>
  Add Deadline
</button>

    </div>

  </div>
)}
      <div className="deadline-summary">
        <div>
          <span>Pending tasks</span>
          <strong>{deadlines.length}</strong>
        </div>

        <div>
          <span>High priority</span>
          <strong>
            {deadlines.filter(
              (deadline) => deadline.priority === 'High'
            ).length}
          </strong>
        </div>

        <div>
          <span>Upcoming</span>
          <strong>{deadlines.length}</strong>
        </div>
      </div>

      <div className="deadline-panel">

        <h2>Upcoming Deadlines</h2>

        <p className="section-description">
          Your academic tasks, all in one place.
        </p>

        {deadlines.map((deadline) => (
          <div className="deadline-item" key={deadline.id}>

            <div className={`deadline-dot ${deadline.priority.toLowerCase()}`}>
            </div>

            <div className="deadline-info">
              <strong>{deadline.title}</strong>
              <span>{deadline.course}</span>
            </div>

            <div className="deadline-due">
              <strong>{deadline.due}</strong>
              <span>{deadline.priority} priority</span>
            </div>

          </div>
        ))}

      </div>

    </section>
  )
}
function QueueLessPage({
  queues,
  joinedQueues,
  setJoinedQueues,
}) {
  const isQueueJoined = (queueId) => {
    return joinedQueues.some(
      (queue) => queue.id === queueId
    )
  }

  const joinQueue = (queue) => {
    if (isQueueJoined(queue.id)) {
      return
    }

    const queueToJoin = {
      ...queue,
      position: queue.people + 1,
    }

    setJoinedQueues([
      ...joinedQueues,
      queueToJoin,
    ])
  }

  const leaveQueue = (queueId) => {
    setJoinedQueues(
      joinedQueues.filter(
        (queue) => queue.id !== queueId
      )
    )
  }

  return (
    <section className="feature-page">

      <div className="feature-header">
        <div>
          <h1>QueueLess</h1>
          <p>Skip the physical line. Know your wait time.</p>
        </div>
      </div>

      {joinedQueues.length > 0 && (
        <div className="joined-queue-banner">

          <div>
            <strong>
              You're in {joinedQueues.length} queue
              {joinedQueues.length > 1 ? 's' : ''}! 🎟️
            </strong>

            <p>
              {joinedQueues
                .map(
                  (queue) =>
                    `${queue.icon} ${queue.name}`
                )
                .join(' • ')}
            </p>
          </div>

          <div className="joined-queue-info">

            {joinedQueues.map((queue) => (
              <div key={queue.id}>
                <strong>
                  {queue.name} — Position #{queue.position}
                </strong>

                <span>
                  {queue.people} people ahead • Estimated wait: {queue.waitTime} min
                </span>
              </div>
            ))}

          </div>

        </div>
      )}

      <div className="queue-grid">

        {queues.map((queue) => {

          const alreadyJoined = isQueueJoined(queue.id)

          return (
            <div
              className="queue-card"
              key={queue.id}
            >

              <div className="queue-card-top">

                <div className="queue-icon">
                  {queue.icon}
                </div>

                <div>
                  <h2>{queue.name}</h2>
                  <p>Campus service</p>
                </div>

              </div>

              <div className="queue-stats">

                <div>
                  <strong>{queue.people}</strong>
                  <span>People waiting</span>
                </div>

                <div>
                  <strong>~{queue.waitTime} min</strong>
                  <span>Estimated wait</span>
                </div>

              </div>

              <button
                className={
                  alreadyJoined
                    ? "secondary-button queue-button"
                    : "primary-button queue-button"
                }
                onClick={() =>
                  alreadyJoined
                    ? leaveQueue(queue.id)
                    : joinQueue(queue)
                }
              >
                {alreadyJoined
                  ? 'Leave Queue'
                  : 'Join Queue'}
              </button>

            </div>
          )
        })}

      </div>

    </section>
  )
}
function CampusSharePage({
  resources,
  resourceSearch,
  setResourceSearch,
  showResourceForm,
  setShowResourceForm,
  newResource,
  setNewResource,
  addResource,
}) {
  return (
    <section className="feature-page">

      {/* Header */}
      <div className="feature-header">
        <div>
          <h1>CampusShare</h1>
          <p>Find and share useful resources with your campus.</p>
        </div>

        <button
  className="primary-button"
  onClick={() => setShowResourceForm(true)}
>
  + Share Resource
</button>
      </div>
{showResourceForm && (
  <div className="resource-form">

    <div className="form-header">
      <div>
        <h2>Share a Resource</h2>
        <p>Help another student find something useful.</p>
      </div>

      <button
        className="close-button"
        onClick={() => setShowResourceForm(false)}
      >
        ✕
      </button>
    </div>

    <div className="form-grid">

      <div className="form-group">
        <label>Resource Name</label>

        <input
          type="text"
          placeholder="e.g. Engineering Mathematics Book"
          value={newResource.name}
          onChange={(event) =>
            setNewResource({
              ...newResource,
              name: event.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Category</label>

        <select
          value={newResource.category}
          onChange={(event) =>
            setNewResource({
              ...newResource,
              category: event.target.value,
            })
          }
        >
          <option value="Books">Books</option>
          <option value="Notes">Notes</option>
          <option value="Equipment">Equipment</option>
        </select>
      </div>

      <div className="form-group">
        <label>Year</label>

        <select
          value={newResource.year}
          onChange={(event) =>
            setNewResource({
              ...newResource,
              year: event.target.value,
            })
          }
        >
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>
      </div>

      <div className="form-group form-full">
        <label>Description</label>

        <textarea
          placeholder="Briefly describe the resource..."
          value={newResource.description}
          onChange={(event) =>
            setNewResource({
              ...newResource,
              description: event.target.value,
            })
          }
        />
      </div>

    </div>

    <div className="form-actions">

      <button
        className="secondary-button"
        onClick={() => setShowResourceForm(false)}
      >
        Cancel
      </button>

      <button
        className="primary-button"
        onClick={addResource}
      >
        Share Resource
      </button>

    </div>

  </div>
      )}
      {/* Search */}
      <div className="resource-search">
        <span>🔍</span>

        <input
  type="text"
  placeholder="Search books, notes, calculators..."
  value={resourceSearch}
  onChange={(event) => setResourceSearch(event.target.value)}
/>
      </div>

      {/* Categories */}
      <div className="resource-filters">
        <button className="filter-button active">
          All
        </button>

        <button className="filter-button">
          📚 Books
        </button>

        <button className="filter-button">
          📝 Notes
        </button>

        <button className="filter-button">
          🧮 Equipment
        </button>
      </div>

      {/* Resource Grid */}
      <div className="resource-grid">

        {resources
  .filter((resource) =>
    `${resource.name} ${resource.category} ${resource.description}`
      .toLowerCase()
      .includes(resourceSearch.toLowerCase())
  )
  .map((resource) => (
          <div
            className="resource-card"
            key={resource.id}
          >

            <div className="resource-icon">
              {resource.icon}
            </div>

            <div className="resource-content">

              <span className="resource-category">
                {resource.category}
              </span>

              <h2>{resource.name}</h2>

              <p>{resource.description}</p>

              <div className="resource-footer">

                <span>
                  🎓 {resource.year}
                </span>

                <button className="text-button">
                  View Resource
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  )
}
function CampusFixPage({
  issues,
  showIssueForm,
  setShowIssueForm,
  newIssue,
  setNewIssue,
  addIssue,
}) {
  return (
    <section className="feature-page">

      {/* Header */}
      <div className="feature-header">
        <div>
          <h1>CampusFix</h1>
          <p>Report campus problems and track their status.</p>
        </div>

        <button
  className="primary-button"
  onClick={() => setShowIssueForm(true)}
>
  + Report Issue
</button>
      </div>
{showIssueForm && (
  <div className="resource-form">

    <div className="form-header">
      <div>
        <h2>Report a Campus Issue</h2>
        <p>Help the campus team identify and solve problems.</p>
      </div>

      <button
        className="close-button"
        onClick={() => setShowIssueForm(false)}
      >
        ✕
      </button>
    </div>

    <div className="form-grid">

      <div className="form-group">
        <label>Issue Title</label>

        <input
          type="text"
          placeholder="e.g. Broken classroom projector"
          value={newIssue.title}
          onChange={(event) =>
            setNewIssue({
              ...newIssue,
              title: event.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Location</label>

        <input
          type="text"
          placeholder="e.g. Room 204"
          value={newIssue.location}
          onChange={(event) =>
            setNewIssue({
              ...newIssue,
              location: event.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Category</label>

        <select
          value={newIssue.category}
          onChange={(event) =>
            setNewIssue({
              ...newIssue,
              category: event.target.value,
            })
          }
        >
          <option value="Maintenance">Maintenance</option>
          <option value="Facilities">Facilities</option>
          <option value="Electrical">Electrical</option>
          <option value="Cleanliness">Cleanliness</option>
        </select>
      </div>

      <div className="form-group form-full">
        <label>Description</label>

        <textarea
          placeholder="Describe the problem..."
          value={newIssue.description}
          onChange={(event) =>
            setNewIssue({
              ...newIssue,
              description: event.target.value,
            })
          }
        />
      </div>

    </div>

    <div className="form-actions">

      <button
        className="secondary-button"
        onClick={() => setShowIssueForm(false)}
      >
        Cancel
      </button>

      <button
        className="primary-button"
        onClick={addIssue}
      >
        Submit Issue
      </button>

    </div>

  </div>
)}
      {/* Issue Summary */}
      <div className="issue-summary">

        <div className="summary-card">
          <span>🟡</span>
          <div>
            <strong>
              {issues.filter((issue) => issue.status === 'Pending').length}
            </strong>
            <p>Pending</p>
          </div>
        </div>

        <div className="summary-card">
          <span>🔵</span>
          <div>
            <strong>
              {issues.filter((issue) => issue.status === 'In Progress').length}
            </strong>
            <p>In Progress</p>
          </div>
        </div>

        <div className="summary-card">
          <span>🟢</span>
          <div>
            <strong>
              {issues.filter((issue) => issue.status === 'Resolved').length}
            </strong>
            <p>Resolved</p>
          </div>
        </div>

      </div>

      {/* Issues */}
      <div className="issues-section">

        <div className="panel-header">
          <div>
            <h2>Reported Issues</h2>
            <p>Track the problems reported around campus.</p>
          </div>
        </div>

        <div className="issues-list">

          {issues.map((issue) => (

            <div
              className="issue-card"
              key={issue.id}
            >

              <div className="issue-card-left">

                <div className="issue-icon">
                  🔧
                </div>

                <div className="issue-info">

                  <div className="issue-title-row">
                    <h3>{issue.title}</h3>

                    <span
                      className={`issue-status ${issue.status
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      {issue.status}
                    </span>
                  </div>

                  <p>{issue.description}</p>

                  <div className="issue-meta">
                    <span>📍 {issue.location}</span>
                    <span>🏷️ {issue.category}</span>
                    <span>🎫 #{issue.id}</span>
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}
function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard')
  const [showDeadlineForm, setShowDeadlineForm] = useState(false)
  const [newDeadline, setNewDeadline] = useState({
  title: '',
  course: '',
  due: '',
  priority: 'Medium',
})
  const [deadlines, setDeadlines] = useState(() => {
  const savedDeadlines = localStorage.getItem('campus360_deadlines')

  return savedDeadlines
    ? JSON.parse(savedDeadlines)
    : [
  {
    id: 1,
    title: 'DBMS Assignment',
    course: 'Database Management Systems',
    due: 'Due tomorrow',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Python Assignment',
    course: 'Python Programming',
    due: 'Due in 3 days',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'DSA Practical',
    course: 'Data Structures',
    due: 'Due in 7 days',
    priority: 'Low',
    }
]
})
const [queues, setQueues] = useState([
  {
    id: 1,
    name: 'Canteen',
    icon: '🍔',
    people: 14,
    waitTime: 12,
  },
  {
    id: 2,
    name: 'College Office',
    icon: '🏢',
    people: 8,
    waitTime: 18,
  },
  {
    id: 3,
    name: 'Library',
    icon: '📚',
    people: 3,
    waitTime: 5,
  },
])

const [joinedQueues, setJoinedQueues] = useState(() => {
  const savedJoinedQueues = localStorage.getItem('campus360_joined_queues')

  return savedJoinedQueues
    ? JSON.parse(savedJoinedQueues)
    : []
})
useEffect(() => {
  localStorage.setItem(
    'campus360_joined_queues',
    JSON.stringify(joinedQueues)
  )
}, [joinedQueues])
const [resources, setResources] = useState(() => {
  const savedResources = localStorage.getItem('campus360_resources')

  return savedResources
    ? JSON.parse(savedResources)
    : [
  {
    id: 1,
    name: 'Engineering Mathematics Textbook',
    category: 'Books',
    description: 'First-year engineering mathematics reference book.',
    year: '1st Year',
    icon: '📚',
  },
  {
    id: 2,
    name: 'Physics Notes',
    category: 'Notes',
    description: 'Complete handwritten notes for Engineering Physics.',
    year: '1st Year',
    icon: '📝',
  },
  {
    id: 3,
    name: 'Scientific Calculator',
    category: 'Equipment',
    description: 'Calculator available for temporary academic use.',
    year: '2nd Year',
    icon: '🧮',
    }
]
})
const [resourceSearch, setResourceSearch] = useState('')
const [issues, setIssues] = useState(() => {
  const savedIssues = localStorage.getItem('campus360_issues')

  return savedIssues
    ? JSON.parse(savedIssues)
    : [
  {
    id: 1024,
    title: 'Broken Classroom Projector',
    location: 'Room 204',
    category: 'Maintenance',
    description: 'Projector is not displaying properly.',
    status: 'Pending',
  },
  {
    id: 1023,
    title: 'Water Cooler Not Working',
    location: 'Block B',
    category: 'Facilities',
    description: 'Water cooler is not functioning.',
    status: 'In Progress',
  },
  {
    id: 1022,
    title: 'Library Light Not Working',
    location: 'Library - 2nd Floor',
    category: 'Electrical',
    description: 'One of the lights is not working properly.',
    status: 'Resolved',
    }
]
})
const [showIssueForm, setShowIssueForm] = useState(false)

const [newIssue, setNewIssue] = useState({
  title: '',
  location: '',
  category: 'Maintenance',
  description: '',
})
const [showResourceForm, setShowResourceForm] = useState(false)

const [newResource, setNewResource] = useState({
  name: '',
  category: 'Books',
  description: '',
  year: '1st Year',
})
const addDeadline = () => {
  if (
    !newDeadline.title.trim() ||
    !newDeadline.course.trim() ||
    !newDeadline.due
  ) {
    alert('Please fill in all deadline details.')
    return
  }

  const deadlineToAdd = {
    id: Date.now(),
    title: newDeadline.title,
    course: newDeadline.course,
    due: `Due ${newDeadline.due}`,
    priority: newDeadline.priority,
  }

  setDeadlines([...deadlines, deadlineToAdd])

  setNewDeadline({
    title: '',
    course: '',
    due: '',
    priority: 'Medium',
  })

  setShowDeadlineForm(false)
}
useEffect(() => {
  localStorage.setItem(
    'campus360_deadlines',
    JSON.stringify(deadlines)
  )
}, [deadlines])
const addResource = () => {
  if (
    !newResource.name.trim() ||
    !newResource.description.trim()
  ) {
    alert('Please fill in the resource details.')
    return
  }

  const resourceToAdd = {
    id: Date.now(),
    name: newResource.name,
    category: newResource.category,
    description: newResource.description,
    year: newResource.year,
    icon:
      newResource.category === 'Books'
        ? '📚'
        : newResource.category === 'Notes'
        ? '📝'
        : '🧮',
  }

  setResources([...resources, resourceToAdd])

  setNewResource({
    name: '',
    category: 'Books',
    description: '',
    year: '1st Year',
  })

  setShowResourceForm(false)
}
useEffect(() => {
  localStorage.setItem(
    'campus360_resources',
    JSON.stringify(resources)
  )
}, [resources])
const addIssue = () => {
  if (
    !newIssue.title.trim() ||
    !newIssue.location.trim() ||
    !newIssue.description.trim()
  ) {
    alert('Please fill in all issue details.')
    return
  }

  const issueToAdd = {
    id: 1021 + issues.length + 1,
    title: newIssue.title,
    location: newIssue.location,
    category: newIssue.category,
    description: newIssue.description,
    status: 'Pending',
  }

  setIssues([issueToAdd, ...issues])

  setNewIssue({
    title: '',
    location: '',
    category: 'Maintenance',
    description: '',
  })

  setShowIssueForm(false)
}
useEffect(() => {
  localStorage.setItem(
    'campus360_issues',
    JSON.stringify(issues)
  )
}, [issues])
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">C</div>
          <span>Campus360</span>
        </div>

        <nav className="navigation">
          <button
  className={`nav-item ${currentPage === 'Dashboard' ? 'active' : ''}`}
  onClick={() => setCurrentPage('Dashboard')}
>
  🏠
  <span>Dashboard</span>
</button>

          <button
  className={`nav-item ${currentPage === 'Deadlines' ? 'active' : ''}`}
  onClick={() => setCurrentPage('Deadlines')}
>
  📚
  <span>Deadlines</span>
</button>

          <button
  className={`nav-item ${currentPage === 'QueueLess' ? 'active' : ''}`}
  onClick={() => setCurrentPage('QueueLess')}
>
  🎟️
  <span>QueueLess</span>
</button>
          <button
  className={`nav-item ${currentPage === 'CampusShare' ? 'active' : ''}`}
  onClick={() => setCurrentPage('CampusShare')}
>
  📦
  <span>CampusShare</span>
</button>

          <button
  className={`nav-item ${currentPage === 'CampusFix' ? 'active' : ''}`}
  onClick={() => setCurrentPage('CampusFix')}
>
  🔧
  <span>CampusFix</span>
</button>
          <button
  className={`nav-item ${currentPage === 'Canteen' ? 'active' : ''}`}
  onClick={() => setCurrentPage('Canteen')}
>
  🍔
  <span>Canteen</span>
</button>
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
            ⚙️
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Top Bar */}
        <header className="topbar">
          <div>
            <h2>Dashboard</h2>
          </div>

          <div className="user-area">
            <button className="notification">🔔</button>

            <div className="user-profile">
              <div className="avatar">A</div>

              <div>
                <strong>Student</strong>
                <small>Campus User</small>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        {currentPage === 'Dashboard' && (
  <section className="dashboard">

          <div className="welcome">
            <h1>Good morning, Student 👋</h1>
            <p>Here's what's happening around your campus today.</p>
          </div>

          {/* Overview Cards */}
          <div className="cards">

            <div className="card">
              <div className="card-icon">📚</div>

              <div className="card-content">
                <p>My Deadlines</p>
                <h3>{deadlines.length}</h3>
                <span>Tasks pending</span>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">🎟️</div>

              <div className="card-content">
                <p>QueueLess</p>
                <h3>12 min</h3>
                <span>Current wait time</span>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">📦</div>

              <div className="card-content">
                <p>CampusShare</p>
                <h3>{resources.length}</h3>
                <span>Available resources</span>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">🔧</div>

              <div className="card-content">
                <p>CampusFix</p>
                <h3>
  {issues.filter((issue) => issue.status !== 'Resolved').length}
</h3>
                <span>Active issue</span>
              </div>
            </div>

          </div>

          {/* Lower Section */}
          <div className="dashboard-grid">

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Upcoming Deadlines</h2>
                  <p>Your next academic tasks</p>
                </div>

                <button className="text-button">
                  View all
                </button>
              </div>

              {deadlines.slice(0, 3).map((deadline) => (
  <div className="task" key={deadline.id}>

    <div
      className={`task-status ${
        deadline.priority?.toLowerCase() || 'medium'
      }`}
    ></div>

    <div className="task-info">
      <strong>{deadline.title}</strong>

      <span>
        {deadline.due
  ? deadline.due
  : 'Deadline upcoming'}
      </span>
    </div>

    <span
      className={`priority ${
        deadline.priority === 'High'
          ? 'high-text'
          : deadline.priority === 'Low'
          ? 'low-text'
          : 'medium-text'
      }`}
    >
      {deadline.priority || 'Medium'}
    </span>

  </div>
))}

              </div>

              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h2>Queue Status</h2>
                    <p>Current campus queues</p>
                  </div>

                  <button
                    className="text-button"
                    onClick={() => setCurrentPage('QueueLess')}
                  >
                    QueueLess
                  </button>
                </div>

                {joinedQueues.length === 0 ? (

  <div className="queue-item">
    <div>
      <strong>No active queues</strong>
      <span>You haven't joined any queue yet.</span>
    </div>

    <button
      className="text-button"
      onClick={() => setCurrentPage('QueueLess')}
    >
      Join a Queue
    </button>
  </div>

) : (

  joinedQueues.map((queue) => (

    <div
      className="queue-item"
      key={queue.id}
    >

      <div>
        <strong>
          {queue.icon} {queue.name}
        </strong>

        <span>
          {queue.people} people ahead
        </span>
      </div>

      <strong>
        {queue.waitTime} min
      </strong>

    </div>

  ))

)}
              </div>

            </div>
          </section>
        )}

        {currentPage === 'Deadlines' && (
          <DeadlinePage
            deadlines={deadlines}
            showDeadlineForm={showDeadlineForm}
            setShowDeadlineForm={setShowDeadlineForm}
            newDeadline={newDeadline}
            setNewDeadline={setNewDeadline}
            addDeadline={addDeadline}
          />
        )}

       {currentPage === 'QueueLess' && (
  <QueueLessPage
    queues={queues}
    joinedQueues={joinedQueues}
    setJoinedQueues={setJoinedQueues}
  />
)}

        {currentPage === 'CampusShare' && (
          <CampusSharePage
            resources={resources}
            resourceSearch={resourceSearch}
            setResourceSearch={setResourceSearch}
            showResourceForm={showResourceForm}
            setShowResourceForm={setShowResourceForm}
            newResource={newResource}
            setNewResource={setNewResource}
            addResource={addResource}
          />
        )}

        {currentPage === 'CampusFix' && (
          <CampusFixPage
            issues={issues}
            showIssueForm={showIssueForm}
            setShowIssueForm={setShowIssueForm}
            newIssue={newIssue}
            setNewIssue={setNewIssue}
            addIssue={addIssue}
          />
        )}

       {currentPage === 'Canteen' && (
  <QueueLessPage
    queues={queues.filter(
      (queue) => queue.name === 'Canteen'
    )}
    joinedQueues={joinedQueues}
    setJoinedQueues={setJoinedQueues}
  />
)}

      </main>
    </div>
  )
}

export default App