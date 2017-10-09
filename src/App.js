import React, { Component } from 'react';
import './App.css';

var myNews = [
  
    {   
        author: 'Саша Печкин',
        text: 'В  четверг,  четвертого  числа...',
        bigText:  'в  четыре  с четвертью часа  четыре  чёрненьких  чумазеньких чертёнка  чертили чёрными чернилами чертёж.'

    },
    {
        author: 'Просто Вася',
        text: 'Считаю,  что $ должен  стоить  35  рублей!',
        bigText:  'А  евро  42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать.  Лучший  сайт  - http://localhost:3000',
        bigText:  'На самом деле  платно, просто  нужно прочитать очень длинное лицензионное  соглашение'
    }

];



class News extends Component { 
  propTypes: {
    data: React.PropTypes.array.isRequired
  }


  render() {
      var data = this.props.data;
      var newsTemplate;

        if(data.length > 0) {

          newsTemplate = data.map(function(item, index) {
              return (
                  <div key={index}>
                    <Arcticle data = {item} />
                  </div>
                 );
              });
        } else { 
          newsTemplate = <p>There are no news</p>        
        }
    return(
      <div className="news">
          {newsTemplate} 
          <strong className = { 'news_count ' + (data.length > 0 ? ' ':'none') }> Всего новостей: {data.length}</strong>  
      </div>
      );
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
                  <a href="#" onClick={this.readmoreClick} className= {"news__readMore " + (visible ? 'none':'')}>More</a>
                  <p className= {"news__bigText " + (visible ?'':'none')}>{bigText}</p>
              </div>
              );
      }
}






class App extends Component {
  render() {
    return (
      <div className = "app">
          <h3>News</h3>
          <News data = {myNews} />       
      </div>
    );
  }
}


export default App;
