import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import my_news from './resourses.js'


var {EventEmitter} = require('fbemitter');

window.ee = new EventEmitter();

class News extends React.PureComponent {
    render () {
      const { data } = this.props
      const { length } = data

      return(
        <div className='news'>
          { length && data.map((item, index) => (
            <div key={ index }>
            <Arcticle data={ item } />
            </div>
              ))
            ||
            <p>There are no news</p> 
          }
          <strong
            className = { `news_count ${ !length && 'none' }` }>
            Total News: { length }
          </strong>
        </div>
      )
    }
}

class Arcticle extends Component {

  state = { visible: false };
  readmoreClick = (e) => {
  e.preventDefault();
  this.setState({visible: true});
    };


      render() {
        var author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;

            return(
              <div  className="article">
                  <p  className="news__author">{author}:</p>
                  <p  className="news__text">{text}</p>

                  <a href="#"
                   onClick={this.readmoreClick}
                   className= {"news__readMore " + (visible ? 'none':'')}>
                   More
                   </a>
                  
                  <p className= {"news__bigText " + (visible ?'':'none')}>{bigText}</p>
                   <Likes />
                  
              </div>
              );
      }
}

class Add extends Component {

    state = {
        agreeNotChecked:  true,
        authorIsEmpty:  true,
        textIsEmpty:  true
    }

        componentDidMount()  {
        ReactDOM.findDOMNode(this.refs.author).focus();
    }

    onBtnClickHandler = (e) => {
          e.preventDefault();
          var textEl  = ReactDOM.findDOMNode(this.refs.text);
          var author  = ReactDOM.findDOMNode(this.refs.author).value;
          var text  = textEl.value;


          var item = [{
            author: author,
            text: text,
            bigText: '...'

          }];
          window.ee.emit('News.add', item);

          textEl.value  = '';
          this.setState({textIsEmpty: true});


          //ReactDOM.findDOMNode(this.refs.text).value = '';
          //ReactDOM.findDOMNode(this.refs.author).value = '';
    }
    onCheckRuleClick = (e) => {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    }

    onFieldChange = (fieldName, e) => {
        if(e.target.value.trim().length > 0) {
            this.setState({['' + fieldName]: false})
        } else {
            this.setState({['' + fieldName]: true})
        }
    }

    render() {
     
      const {agreeNotChecked , authorIsEmpty ,textIsEmpty ,} = this.state;
        
        return(
          <form className="add cf">
          <input 
            type='text'
            className="add__author"
            onChange = {this.onFieldChange.bind(this, 'authorIsEmpty')}
            defaultValue=''
            placeholder="your name"
            ref='author'
          />
          <textarea
            className="add__text"
            onChange = {this.onFieldChange.bind(this, 'textIsEmpty')}
            defaultValue=''
            placeholder='news text'
            ref='text'
          ></textarea>
          <label className='add__checkrule'>
            <input type='checkbox' ref='checkrule' onChange = {this.onCheckRuleClick}/>I confirm the rules
          </label>
          <button
            className='add__btn'
            onClick={this.onBtnClickHandler}
            ref='alert_button'
            disabled ={agreeNotChecked  ||  authorIsEmpty ||  textIsEmpty}
            >
            Add News
          </button>
          </form>
      );
    }
}

class Likes extends Component {

  constructor(props) {
      super(props);
      this.state = {like: 0};

      this.onIncrease = this.onIncrease.bind(this);
      this.onDecrease = this.onDecrease.bind(this);
  }

  onIncrease() {
      this.setState(prevState => ({
        like: prevState.like + 1
      }))
  }
  onDecrease() {
      this.setState(prevState => ({
        like: prevState.like - 1
      }))
  }

  render() {
      return(
        <div className="add__Likes">
        <button className="btn_like" onClick={this.onIncrease}>like</button>
        <p>Likes:{this.state.like}</p>
        <button className="btn_like" onClick={this.onDecrease}>dislike</button>
        </div>
        );
  }

}

class App extends Component {
  state = {
    news: my_news
   }

  componentDidMount=()=> {
   var self = this;
   window.ee.addListener('News.add', function(item) {
   var nextNews = item.concat(self.state.news);
   self.setState({news: nextNews});
    });

    }
    componentWillUnmount=()=> {
        window.ee.removeListener('News.add');
    }
 render() {
    return (
      <div className = "app">
      <Add/>
          <h3>News</h3>
          
          <News data = {this.state.news} />       
      </div>
    );
  }
}


export default App;
