import React, { Component } from 'react';
import './App.css';

var myNews = [
  
    {
        author: 'Саша Печкин',
        text: 'В  четверг,  четвертого  числа...'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю,  что $ должен  стоить  35  рублей!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать.  Лучший  сайт  - http://localhost:3000'
    }

];



class News extends Component { 
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
    render() {
        var author = this.props.data.author,
            text = this.props.data.text;


        return(
            <div  className="article">
                <p  className="news__author">{author}:</p>
                <p  className="news__text">{text}</p>
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
