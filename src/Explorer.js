import { useState } from 'react'

const Explorer = ({ addToList, createList, deleteList, setIndex }) => {
  const [task, setTask] = useState('')
  const [catInput, setCatInput] = useState('')
  const [cat, setCat] = useState([])
  const [catText, setCatText] = useState('default')

  return (
    <div className='explorer'>
      <div className='label-wrapper'>
        <label htmlFor='add-task'>
          <p className='label-text'>Add Task</p>
          <input
            placeholder={'ie. buy potatoes'}
            value={task}
            onChange={(e) => {
              setTask(e.target.value)
            }}
            className='input-field'
            type={'text'}
            id='add-task'
            onKeyPress={(e) => {
              if (e.key === 'Enter' && task !== '') {
                addToList(task, cat.indexOf(catText))
                setTask('')
              }
            }}
          />
          <button
            className='explorer-btn'
            name='task-add'
            id='task-add'
            onClick={() => {
              if (task !== '') {
                addToList(task, cat.indexOf(catText))
                setTask('')
              }
            }}
          >
            Add Task
          </button>
        </label>
      </div>
      <div className='label-wrapper'>
        <label htmlFor='add-cat'>
          <p className='label-text'>Add Todo Category</p>
          <input
            placeholder='ie. College Work'
            value={catInput}
            onChange={(e) => setCatInput(e.target.value)}
            onKeyPress={(e) => {
              const catField = catInput
              if (e.key === 'Enter') {
                if (
                  catField.length !== 0 &&
                  catField.toUpperCase() !== 'DEFAULT' &&
                  !cat.includes(catField)
                ) {
                  setCat([...cat, catField])
                  setCatText(catField)
                  createList(catInput)
                  setCatInput('')
                }
              }
            }}
            className='input-field'
            type={'text'}
            id='add-cat'
          />
          <button
            className='explorer-btn'
            onClick={(e) => {
              if (
                catInput.length !== 0 &&
                catInput.toUpperCase() !== 'DEFAULT' &&
                !cat.includes(catInput)
              ) {
                setCat([...cat, catInput])
                setCatText(catInput)
                createList(catInput)
                setCatInput('')
              }
            }}
          >
            Add Category
          </button>
        </label>
      </div>
      <div className='label-wrapper'>
        <label htmlFor='sel-cat'>
          <p className='label-text'>Select Todo Category</p>
          <select
            className='input-field'
            value={catText}
            onChange={(e) => {
              setCatText(e.target.value)
              setIndex(cat.indexOf(e.target.value))
            }}
          >
            <option key='default' data-index={0}>
              default
            </option>

            {cat.map((cat, i) => {
              return (
                <option key={cat} data-index={i + 1}>
                  {cat}
                </option>
              )
            })}
          </select>
          <button
            className='explorer-btn'
            onClick={() => {
              const selected = catText
              if (selected !== 'default') {
                const index = cat.indexOf(selected)

                cat.splice(index, 1)
                setCat([...cat])
                setCatText('default')

                deleteList(index)
              }
            }}
          >
            Delete
          </button>
        </label>
      </div>
    </div>
  )
}

export default Explorer
