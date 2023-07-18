import React, { useState, useEffect } from 'react';
import NewsFilter from '../components/NewsFilter';

const news_url_template = "https://hacker-news.firebaseio.com/v0/item/{storyId}.json"
const topStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json?limitToFirst=15&orderBy=\"$key\""

const Container = () => {

    const [ news, setNews ] = useState([]);
    const [ filteredNews, setFilteredNews ] = useState([]);
    const [ filter, setFilter ] = useState();


    useEffect(() => {
        fetch(topStoriesUrl)
        .then(response => response.json())
        .then(urlIds => {
            const urls = urlIds.map(urlId => news_url_template.replace('{storyId}', urlId))
            const promises = urls.map(url =>
            fetch(url)
            .then(res => res.json())
        );
        Promise.all(promises).then(all_content => {
            setNews(all_content)
            setFilteredNews(all_content)
        });
        })
    }, [] )

    useEffect(() => {
        if (filter === '') {
            setFilteredNews(news)
        } else {
            let filtered = news.filter((one_news) => one_news['title'].toLowerCase().includes(filter.toLowerCase()))
            setFilteredNews(filtered);
        }
    }, [filter])

    return (
        <div>
           <NewsFilter setFilterCallback={(filter, setFilter)}/>
           <br/>
           {filter && <p>You are searching for: {filter}</p>}
           <hr/>
           {filteredNews.map(one_news => <p><a href={one_news['url']}>{one_news['title']}</a></p>)}
        </div>
    )
};

export default Container
