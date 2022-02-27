import { Component } from 'react'
import { render } from 'react-dom'
import './style.css'

import Explorer from './Explorer'
import List from './List'

class App extends Component {
  state = {
    active: -1,
    lists: [],
    defaultList: []
  }

  componentDidUpdate(prevProps, prevState) {}

  checkItem = ({
    target: {
      parentNode: {
        parentNode: {
          dataset: { index }
        }
      }
    }
  }) => {
    console.log('starting checkedItem')

    this.setState(
      Object.assign({}, this.state, {
        lists:
          this.state.active !== -1
            ? this.state.lists.map((arr, indexArr) => {
                if (this.state.active === indexArr) {
                  let returnArr = this.state.lists[indexArr]
                    .slice()
                    .map((todo, todoIndex) => {
                      if (todoIndex === +index) {
                        todo.checked = !todo.checked
                      }
                      return todo
                    })
                  console.log(`working on list: ${returnArr}`)
                }
                return arr
              })
            : this.state.lists,
        defaultList:
          this.state.active === -1
            ? this.state.defaultList.map((todo, todoIndex) => {
                if (todoIndex === +index) {
                  todo.checked = !todo.checked
                }
                return todo
              })
            : this.state.defaultList
      })
    )
    console.log('ending checkItem')
  }

  deleteItem = ({
    target: {
      parentNode: {
        parentNode: {
          dataset: { index }
        }
      }
    }
  }) => {
    console.log(`DELETE ITEM START ============`)

    this.setState(
      Object.assign({}, this.state, {
        lists:
          this.state.active !== -1
            ? this.state.lists.map((array, arrayIndex) => {
                if (arrayIndex === this.state.active) {
                  console.log(
                    `pulling out list: ${array}. will delete ${array[+index]}.`
                  )

                  return array.filter((_, itemIndex) => +index !== itemIndex)
                } else {
                  return array
                }
              })
            : this.state.lists,
        defaultList:
          this.state.active === -1
            ? this.state.defaultList.filter((_, i) => +index !== i)
            : this.state.defaultList
      })
    )

    console.log(`DELETE ITEM END ===============`)
  }

  addToList = (info, index) => {
    console.log('adding to list')
    if (index === -1) {
      this.setState(
        Object.assign({}, this.state, {
          defaultList: [
            ...this.state.defaultList,
            {
              description: info,
              checked: false
            }
          ]
        })
      )
    } else {
      this.setState(
        Object.assign({}, this.state, {
          lists: this.state.lists.map((arr, index) => {
            if (index == this.state.active) {
              return [
                ...arr,
                {
                  description: info,
                  checked: false
                }
              ]
            } else {
              return arr
            }
          })
        })
      )
    }
  }

  deleteList = (index) => {
    console.log('deleting list')
    this.setState((state, _) => {
      const prevList = state.lists
      const modifiedList = prevList.filter((_, i) => {
        return i !== 0
      })
      console.log(modifiedList, ' idk wtf is going on')
      return { lists: modifiedList, active: -1 }
    })

    console.log('done')
  }

  createList = (x) => {
    console.log('creating list')
    this.setState(
      Object.assign({}, this.state, {
        lists: [...this.state.lists, []],
        active: this.state.lists.length
      })
    )
  }

  setIndex = (i) => {
    console.log('setting index')
    console.log(`changing active to ${i}`)
    this.setState({ ...this.state, active: i })
  }

  retrieveList = () => {
    console.log('retrieving lists')
    let index = this.state.active
    if (index === -1) return this.state.defaultList
    else {
      console.log(this.state.lists[index])
      return this.state.lists[index]
    }
  }

  render() {
    return (
      <div className='main-wrapper'>
        <header>
          <div>
            <h2>Todo App</h2>
          </div>
        </header>
        <Explorer
          addToList={this.addToList}
          deleteList={this.deleteList}
          createList={this.createList}
          setIndex={this.setIndex}
        />
        <List
          retrieveList={this.retrieveList}
          deleteItem={this.deleteItem}
          checkItem={this.checkItem}
        />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
