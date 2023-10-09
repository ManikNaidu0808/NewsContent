import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps ={
        country:'in',
        pageSize : 9,
        category: 'general'
    }
    static defaultProps ={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }


    constructor(){
        super();
        console.log("I am a constructor from News component");
        this.state = {
            articles:[],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dfe5abbbc9734c31b89635ce448f7399&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults})
    }

    handlePrevClick = async ()=>{
        console.log("handlePrevClick")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dfe5abbbc9734c31b89635ce448f7399&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page -1,
            articles:parsedData.articles
        })
    }

    handleNextClick = async ()=>{
        console.log("handleNextClick");

        if(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        }
        else{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dfe5abbbc9734c31b89635ce448f7399&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page +1,
            articles:parsedData.articles
        })
    }
    }


    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>Daily News - Top Headlines</h2>
                <div className='row'>
                {this.state.articles.map((element)=>{
                    return <div className='col-md-4'  key={element.url}>
                     <NewsItem title={element.title?element.title.slice(0, 73):""} description={element.description?element.description.slice(0, 80):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                 </div>
                })}    
                </div>
                <div className="container d-flex justify-content-evenly">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>

        )
    }
}

export default News