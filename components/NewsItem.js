import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let { title, description, imageUrl, newsUrl,author,date } = this.props
        return (
            <div className='my-3'>
                <div className="card">
                    {/* <img src={!imageUrl ? "https://i.ytimg.com/vi/LhfHrA99SK8/maxresdefault.jpg" : imageUrl} className="card-img-top" alt="..." width="200" height="150" /> */}
                    <img src={!imageUrl ? "https://i.ibb.co/y5zhSJc/news.png": imageUrl} className="card-img-top" alt="..." width="200" height="150" />
                    <div className="card-body">
                        <h5 className="card-title" >{title}... </h5>
                        <p className="card-text" >{description}...</p>
                        <p class="card-text"><small class="text-body-secondary">By {!author?"unknown":author} on {new Date(date).toDateString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target='_blank' className="btn byn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem