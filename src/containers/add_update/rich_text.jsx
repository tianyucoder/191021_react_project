import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class EditorConvertToHTML extends Component {
  state = {
		editorState: EditorState.createEmpty(),
	}
	
	getRichText = ()=>{
		const { editorState } = this.state;
		return draftToHtml(convertToRaw(editorState.getCurrentContent()))
	}

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          //wrapperClassName="demo-wrapper"
					//editorClassName="demo-editor"
					editorStyle={{border:'1px solid black',minHeight:'200px',paddingLeft:'10px'}}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}