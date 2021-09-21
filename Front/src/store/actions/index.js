
export const addTodo = (data) => {
	return{
		type: "ADD_TODO",
		payload: {
			//id: new Date().getTime(),
			id: data._id,
			data:data,
		},
	}
}
export const deleteTodo = (id) => {
    
	return{
		type: "DELETE_TODO",
		id
	}
}
export const removeTodo = () => {
	return{
		type: "REMOVE_TODO"
	}
}

