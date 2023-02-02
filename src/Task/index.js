import {Component} from 'react'

import {v4} from 'uuid'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Task extends Component {
  state = {task: '', tag: tagsList[0].optionId, array: [], activeTag: 'initial'}

  onChange = e => {
    this.setState({task: e.target.value})
  }

  change = e => {
    this.setState({tag: e.target.value})
  }

  onClick = () => {
    const {task, tag, array} = this.state
    this.setState({array: [...array, {id: v4(), Task: task, Tag: tag}]})
  }

  onClickActiveTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'initial'
          : event.target.value,
    }))
  }

  renderCreateTask = () => {
    const {task, tag} = this.state

    return (
      <div>
        <h1>Create a Task App</h1>

        <form>
          <label htmlFor="task">Task</label>
          <input
            type="text"
            id="task"
            onChange={this.onChange}
            value={task}
            placeholder="Enter the task here"
          />
          <label htmlFor="tag">Tags</label>
          <select onChange={this.change} value={tag}>
            {tagsList.map(each => (
              <option>{each.optionId}</option>
            ))}
          </select>
          <button type="button" onClick={this.onClick}>
            Add Task
          </button>
        </form>
      </div>
    )
  }

  renderList() {
    const {array, activeTag} = this.state
    const filterTaskList =
      activeTag === 'initial'
        ? array
        : array.filter(each => each.Tag === activeTag)

    return (
      <ul>
        {filterTaskList.map(each => (
          <li key={each.id}>
            <p>{each.Task}</p>
            <p>{each.Tag}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderAddTask() {
    const {array, activeTag} = this.state

    return (
      <div>
        <h1>Tags</h1>
        <ul>
          {tagsList.map(each => {
            const isActive = activeTag === each.optionId
            return (
              <li key={each.optionId}>
                <button
                  type="button"
                  value={each.optionId}
                  onClick={this.onClickActiveTag}
                  // eslint-disable-next-line react/no-unknown-property
                  isActive={isActive}
                >
                  {each.displayText}
                </button>
              </li>
            )
          })}
        </ul>

        <div>
          <h1>Tasks</h1>
          <ul>
            {array.length === 0 ? (
              <p>No Tasks Added Yet </p>
            ) : (
              this.renderList()
            )}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderCreateTask()}
        {this.renderAddTask()}
      </div>
    )
  }
}

export default Task
