import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsFeed = ({ state }) => {
  const [articles, setArticles] = useState(null);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = `${year}-${month}-${day}`;

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?qInTitle=coronavirus%20${state.location}&from=${today}&apiKey=76ad746b4ebb4949af32ea577842aa21`
      )
      .then(res => setArticles(res.data.articles));
  }, [state.location]);
  return (
    articles &&
    articles.map((article, i) => {
      return (
        <div key={i}>
          {article.urlToImage && (
            <div className='article-item light'>
              <img
                src={article.urlToImage}
                alt={article.description}
                className='article-img'
              />
              <div className='article-text'>
                <a href={article.url} target='_blank'>
                  <p>
                    {article.title.length > 75
                      ? article.title.substr(0, 72) + "..."
                      : article.title}
                  </p>
                </a>
                <div className='article-footer'>
                  <span>{article.source.name}</span>
                  <span className='right'>
                    {new Date(article.publishedAt).toLocaleTimeString("en", {
                      timeStyle: "short",
                      hour12: true
                    })}
                  </span>
                </div>{" "}
              </div>{" "}
            </div>
          )}
        </div>
      );
    })
  );
};

export default NewsFeed;