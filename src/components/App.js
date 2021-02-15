import React, { useState, useRef, useEffect } from "react";
import TodoList from './TodoList'
import "./../styles/App.css";

function App() {
	const [inputList, setInputList] = useState("")
	const [saveInputList, setSaveInputList] = useState("")
	const [editIndex, setEditIndex] = useState(-1)
	const [stopFirstTime, setStopFirstTime] = useState(false)
	const [items, setItems] = useState([])
	const inputRef = useRef(null)
	const editRef = useRef(null)

	useEffect(() => {
		inputRef.current.focus()
	}, [items])

	useEffect(() => {
		if(stopFirstTime) editRef.current.focus()
		else setStopFirstTime(true)
	}, [saveInputList])

	const inputEvents = (event) => {
		setInputList(event.target.value)
	}

	const editSaveList = (event) => {
		setSaveInputList(event.target.value)
	}

	const addItem = () => {
		if(inputList !== "") {
			const newTodoObj = {
				value: inputList,
				isEditing: false
			}
			setItems(oldItems => [...oldItems, newTodoObj])
			setInputList("")
		}
	}

	const deleteItem = (id) => {
		setItems(oldItems => {
			return oldItems .filter((element, index) => index !== id)
		})
	}

	const editItem = (id) => {
		setEditIndex(id)
		const copiedList = [...items]
		const edit_element = copiedList.filter((element, index) => index === id)
		edit_element[0].isEditing = true
		setItems(copiedList)
		setSaveInputList(edit_element[0].value)
	}

	const updateInputList = () => {
		const copiedList = [...items]
		const edit_element = copiedList.filter((element, index) => index === editIndex)
		if(saveInputList !== "") {
			edit_element[0].value = saveInputList
			edit_element[0].isEditing = false
			setItems(copiedList)
		}
	}

	return (
		<div id="main">
			<div className="center_div">
				<br/>
				<h1>ToDo List</h1>
				<br/>
				<input id="task" ref={inputRef} value={inputList} onChange={inputEvents} type="text" placeholder="Add a item" />
				<button id="btn" onClick={addItem}> + </button>

				<ol>
					{items.map((item, index) => (
						<TodoList key={index} item={item} id={index} deleteItem={deleteItem} editItem={editItem} editSaveList={editSaveList} saveInputList={saveInputList} updateInputList={updateInputList} editRef={editRef} />
					))}
				</ol>
			</div>
		</div>
	);
}


export default App;
