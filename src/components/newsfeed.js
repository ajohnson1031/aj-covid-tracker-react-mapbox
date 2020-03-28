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
    state.worldTotal >= 1000000 &&
      // state.nkey &&
      axios
        .get(
          `https://newsapi.org/v2/everything?qInTitle=coronavirus%20${state.location}&from=${today}&apiKey=${state.nkey}`
        )
        .then(res => setArticles(res.data.articles));
  }, [state.location, state.nkey]);
  return articles && articles.length > 0 ? (
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
                <a href={article.url} target='_blank' rel='noopener noreferrer'>
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
  ) : (
    <p className='no-articles'>News feed coming soon...</p>
  );
};

export default NewsFeed;
