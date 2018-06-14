import React, { Component } from 'react';

class ImageContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let hash = "";
		let preview = false;
		if (this.props.ActiveFile && ((this.props.ActiveFile.isPaid && !this.props.ActiveFile.hasPaid) && !this.props.ActiveFile.owned)){
			preview = true;
			hash = this.props.buildIPFSShortURL(this.props.Artifact.getLocation(), this.props.Artifact.getThumbnail().getFilename());
		} else {
			if (this.props.Artifact && this.props.ActiveFile){
				hash = this.props.buildIPFSShortURL(this.props.Artifact.getLocation(), this.props.ActiveFile.info.getFilename());
			}
		}

		let url = this.props.buildIPFSURL(hash);

		return (
				<div className="d-flex justify-content-center" style={{height: "100%"}}>
					<img style={{backgroundColor: "#fff", maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'}} src={url} alt="Your image is supposed to be here!" />
				</div>
		);
	}
}

ImageContainer.SUPPORTED_FILE_TYPES = ["jpeg", "jpg", "gif", "png", "svg", "bmp", "ico"]

export default ImageContainer;

