import React from 'react'
import hljs from 'highlight.js'
import ReactQuill, {Quill} from 'react-quill'
import axios from 'axios'
import store from '.././store'
import {add} from '.././store/post.js'
 //NEW approach: Make use of this image uplaod
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

    componentDidMount(){
      hljs.configure({
        languages: ['javascript', 'ruby', 'python']
      });
  }

    handleChange (html) {
      this.setState({ editorHtml: html });
    }

  render () {
      return (
      <div>
    <form>

        <div id="editor">
          <ReactQuill
            theme={this.state.theme}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Editor.modules}
            formats={Editor.formats}
            bounds={'.app'}
            placeholder={this.props.placeholder}
            selectedId = {this.props.selectedId}
           />
        </div>
      <div id="button-parent">
        <button
            className="btn btn-default" id="post-button" type="button"  onClick={ () => {
              if (!this.props.title){alert('Post needs a title!')}
              else {
                store.dispatch(add(this.state.editorHtml, this.props.title))
              }
                }}>
                    POST
        </button>
        <button
            className="btn btn-default" id="edit-button" type="button"  onClick={ () => {

                    axios.put(`/update/${this.props.selectedId}`, {content: this.state.editorHtml, title: this.props.title, image: this.props.image})
                }}>
                    Update Text
        </button>
      </div>this

    </form>
    </div>
       )
    }
  }

  /*
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */


  Editor.modules = {
    syntax: {
      highlight: text => window.hljs.highlightAuto(text).value,
    },
    toolbar: {
      container: [[{ header: '1'}, {header: '2'}, { font: [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{list: 'ordered'}, {list: 'bullet'},
       {indent: '-1'}, {indent: '+1'}],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  },
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
    'link', 'image', 'video', 'code-block', 'code'
  ]
