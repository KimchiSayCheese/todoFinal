const List = ({ retrieveList, deleteItem, checkItem }) => {
  return (
    <div className='list-wrapper'>
      <ul className={`list-item-container`}>
        {retrieveList().map((item, index) => {
          return (
            <li
              className={`list-item ${
                item.checked === true ? 'cross-out' : ''
              }`}
              data-index={index}
              key={`${
                item.length !== 0 ? item.description.replaceAll(' ', '') : ''
              }-${index}`}
            >
              {item.description}
              <div className='list-item-options'>
                <button
                  onClick={(e) => {
                    checkItem(e)
                  }}
                >
                  Complete
                </button>
                <button
                  onClick={(e) => {
                    deleteItem(e)
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default List
