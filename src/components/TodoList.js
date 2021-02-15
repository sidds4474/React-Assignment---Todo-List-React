import React from 'react'

const TodoList = ({item, id, deleteItem, editItem, editSaveList, saveInputList, updateInputList, editRef}) => {
    if(item.isEditing) {
        return (
            <div className="edit_list">
                <input ref={editRef} value={saveInputList} onChange={editSaveList} className="editTask"></input>
                <button className="saveTask" onClick={updateInputList}>Save</button>
            </div>
        )
    }
    
    return (
        <div className="todo_style">
            <i className="fa fa-times delete" aria-hidden="true" onClick={() => deleteItem(id)} />
            <li className="list">{item.value}</li>
            <i className="fas fa-edit edit" aria-hidden="true" onClick={() => editItem(id)}></i>
        </div>
    )
}

export default TodoList
