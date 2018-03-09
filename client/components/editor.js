import React from 'react'
import ReactQuill from 'react-quill'
import axios from 'axios'
import store from '.././store'
import {add} from '.././store/post.js'

/*
 * Simple editor component that takes placeholder text as a prop
 */
export default class Editor extends React.Component {
    constructor (props) {
      super(props)
      this.state = { editorHtml: '', theme: 'snow' }
      this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps (newProps){
        if (newProps.text !== this.props.text){
            this.setState({editorHtml: newProps.text})
        }
    }

    handleChange (html) {
        this.setState({ editorHtml: html });
    }

    render () {
        console.log(this.props, 'editor props')
        console.log(this.state.editorHtml, 'editor html')
      return (
    <form>
        <div id="editor">
          <ReactQuill
            ref={(quillNode) => { this.quillNode = quillNode; }}
            theme={this.state.theme}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Editor.modules}
            formats={Editor.formats}
            bounds={'.app'}
            placeholder={this.props.placeholder}
           />
        </div>
        <button
            className="field adminButton" type="button"  onClick={ () => {
               let editor = this.quillNode.getEditor()
               let text = editor.getText()
               store.dispatch(add(text, this.props.title))
                }}>
                    POST
        </button>
        <button
            className="field adminButton" type="button"  onClick={ () => {
                let editor = this.quillNode.getEditor()
                let text = editor.getText()
                    axios.put(`/update/${this.props.selectedId}`, {content: text})
                }}>
                    Edit Text
        </button>

    </form>
       )
    }
  }

  /*
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  Editor.modules = {
    toolbar: [
      [{ header: '1'}, {header: '2'}, { font: [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{list: 'ordered'}, {list: 'bullet'},
       {indent: '-1'}, {indent: '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]
