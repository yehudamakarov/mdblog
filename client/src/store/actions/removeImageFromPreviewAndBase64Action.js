const removeImageFromPreviewAndBase64Action = index => dispatch => {
    dispatch({
        type: 'REMOVE_IMAGE_FROM_PREVIEW_AND_BASE_64',
        payload: index,
    });
};

export default removeImageFromPreviewAndBase64Action;
