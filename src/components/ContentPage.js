import React, { Component } from 'react';

import ContentContainer from './ContentContainer.js'
import ContentInfo from './ContentInfo.js'
import IssoCommentBox from './isso/IssoCommentBox.js'
import IssoComments from './isso/IssoComments.js'
import ContentCard from './ContentCard.js'

class ContentPage extends Component {
    render() {
        return (
            <div className="content-page-container">
                <ContentContainer
                    Artifact={this.props.Artifact}
                    ArtifactState={this.props.ArtifactState}
                    ActiveFile={this.props.ActiveFile}
                    // For AudioContainer
                    VolumeControls={this.props.VolumeControls}
                    FilePlaylist={this.props.FilePlaylist}
                    active={this.props.active}
                    // Dispatch function for AudioContainer
                    updateFileCurrentTime={this.props.updateFileCurrentTime}
                    isPlayableFile={this.props.isPlayableFile}
                    isSeekableFile={this.props.isSeekableFile}
                    updateFileDuration={this.props.updateFileDuration}
                    setVolume={this.props.setVolume}
                    setMute={this.props.setMute}
                    playlistNext={this.props.playlistNext}
                    isPlayingFile={this.props.isPlayingFile}
                    setCurrentFile={this.props.setCurrentFile}
                    // For Payment Buttons
                    payForFileFunc={this.props.payForFileFunc}
                    buyFileFunc={this.props.buyFileFunc}
                />
                <div className="container-fluid content-page">
                    <div className="margin-container" style={{marginLeft: "7%", marginRight: "7%"}}>
                        <div className="row" style={{marginTop: "30px"}}>
                            <div id="media-info" className="content-info col-12 col-md-9" >
                                <ContentInfo
                                    Artifact={this.props.Artifact}
                                    ArtifactState={this.props.ArtifactState}
                                    ActiveFile={this.props.ActiveFile}
                                    FilePlaylist={this.props.FilePlaylist}
                                    payForFileFunc={this.props.payForFileFunc}
                                    buyFileFunc={this.props.buyFileFunc}
                                    isPlayingFile={this.props.isPlayingFile}
                                    setCurrentFile={this.props.setCurrentFile}
                                />
                                <br />
                                {(this.props.Artifact && this.props.Artifact.txid !== "") ?
                                    <div>
                                        <IssoCommentBox  addComment={this.props.addComment} url={this.props.Artifact.txid} />
                                        <IssoComments
                                            Artifact={this.props.Artifact}
                                            ArtifactState={this.props.ArtifactState}
                                            comments={this.props.ArtifactState.comments}
                                        />
                                    </div>
                                    : ""}
                            </div>
                            <div id='suggested' className="suggested-content col-12 col-md-3 mt-4">
                                <h5>Suggested Content</h5>
                                {this.props.ArtifactList ? (this.props.ArtifactList.items.map(function(content, i){
                                    return <ContentCard
                                        key={i}
                                        artifact={content}
                                        styleContentCard={"small"}
                                    />
                                })) : (null)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContentPage;