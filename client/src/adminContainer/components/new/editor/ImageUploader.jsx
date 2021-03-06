import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ImagePopover from './ImagePopover';
import {
    imageUploadAction,
    addPreviewAndBase64ImageAction,
    removeImageFromPreviewAndBase64Action,
} from '../../../../store/actions/imageActions';

class ImageUploader extends Component {
    dropzoneStyle = {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        background: '#6ec6ff',
        borderRadius: '4px',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingRight: '16px',
        paddingLeft: '16px',
        color: '#fff',
    };

    dropzoneStyleActive = {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        borderRadius: '4px',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingRight: '16px',
        paddingLeft: '16px',
        background: '#689f38',
        color: '#cfd8dc',
    };
    // TO-DO
    // - Reject anything not an image for imgur

    onDrop = acceptedFiles => {
        const { addPreviewAndBase64ImageAction } = this.props;
        // Loop over each file.
        acceptedFiles.forEach(fileObject => {
            // Make a FileReader
            // eslint-disable-next-line no-undef
            const reader = new FileReader();
            // Tell the FileReader what to do to when it is done with its file
            reader.onload = ({ target: reader }) => {
                // Prepare the Base64
                const base64ToUpload = reader.result
                    .replace('data:image/png;base64,', '')
                    .replace('data:image/jpeg;base64,', '');
                // Make an object for the image where { Filename: Base64 and preview:
                // Preview Url }
                const imageObjectWithPreviewAndBase64 = {
                    [fileObject.name]: base64ToUpload,
                    preview: fileObject.preview,
                };
                // Send that object to the store.
                addPreviewAndBase64ImageAction(imageObjectWithPreviewAndBase64);
            };
            // Do said above for the file on this iteration of the images.
            reader.readAsDataURL(fileObject);
        });
    };

    // Send images from the redux store { Filename: Base64 and preview:
    // Preview Url } to imgur, remove them from the store and be left
    // with redux store with { Filename: Url }
    handleUploadClick = () => {
        const { imageUploadAction, imagesWithPreviewAndBase64 } = this.props;
        imageUploadAction(imagesWithPreviewAndBase64);
    };

    // Remove an image from the redux store and preview pane
    handlePictureRemove = index => {
        const { removeImageFromPreviewAndBase64Action } = this.props;
        removeImageFromPreviewAndBase64Action(index);
    };

    render() {
        const { imagesWithPreviewAndBase64 } = this.props;
        return (
            <Paper elevation={8} style={{ padding: '1%', paddingBottom: '2%' }}>
                <Grid container justify="center" spacing={16}>
                    <Grid item sm={6}>
                        <Dropzone
                            style={this.dropzoneStyle}
                            activeStyle={this.dropzoneStyleActive}
                            onDrop={this.onDrop}
                        >
                            <Typography component="div" variant="button" color="inherit">
                                Drop Images Here
                            </Typography>
                        </Dropzone>
                    </Grid>
                    <Grid item sm={6}>
                        <Button fullWidth variant="contained" color="primary" onClick={this.handleUploadClick}>
                            Upload
                        </Button>
                    </Grid>
                </Grid>
                <hr />
                <Fragment>
                    <Typography variant="title">Images To Upload:</Typography>
                </Fragment>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        overflow: 'hidden',
                    }}
                >
                    <GridList style={{ flexWrap: 'nowrap', transform: 'translateZ(0)' }}>
                        {imagesWithPreviewAndBase64.map((imageObject, index) => (
                            <GridListTile
                                style={{ width: '100%', maxWidth: '770px' }}
                                key={`imageObject_${imageObject.preview}`}
                                rows={2}
                            >
                                <img src={imageObject.preview} alt="" />
                                <GridListTileBar
                                    title={Object.keys(imageObject).find(
                                        imageObjectKey => imageObjectKey !== 'preview'
                                    )}
                                    style={{
                                        background: '#4dabf5',
                                    }}
                                    actionIcon={
                                        <ImagePopover
                                            onClick={() => this.handlePictureRemove(index)}
                                            src={imageObject.preview}
                                        />
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Paper>
        );
    }
}

const mapStateToProps = state => ({
    imagesWithUrl: state.imagesWithUrl,
    imagesWithPreviewAndBase64: state.imagesWithPreviewAndBase64,
});

export default connect(
    mapStateToProps,
    { imageUploadAction, addPreviewAndBase64ImageAction, removeImageFromPreviewAndBase64Action }
)(ImageUploader);
