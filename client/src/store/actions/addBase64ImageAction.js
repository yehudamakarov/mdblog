const addBase64ImageAction = (imageObjectWithBase64) => {
    return (dispatch) => {
        dispatch({
            type: 'ADD_BASE_64_IMAGE',
            payload: imageObjectWithBase64,
        })
    }
}

export default addBase64ImageAction;