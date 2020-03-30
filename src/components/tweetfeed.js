import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsFeed = ({ state }) => {
  const [tweets, setTweets] = useState();

  useEffect(() => {
    state.location &&
      axios
        .get(
          `https://tranquil-wave-62543.herokuapp.com/tweets/${state.location}`
        )
        .then(_ => {
          setTweets(_.data);
        });
  }, [state.location]);

  return tweets && tweets.length > 0 ? (
    tweets.map((tweet, i) => {
      const now = new Date().getTime();
      const timePosted = new Date(tweet.created_at).getTime();
      const timeDifference = (now - timePosted) * 1000;

      const mins = new Date(timeDifference).getMinutes();
      const hours = Math.floor(mins / 60);
      const days = Math.floor(hours / 24);

      let displayTime =
        mins < 1
          ? "Just now"
          : mins >= 1 && hours < 1
          ? mins + "m"
          : hours >= 1 && days < 1
          ? hours + "h"
          : days + "d";

      return (
        <div key={i}>
          <a
            href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='tweet-item light'>
              <img
                src={tweet.user.profile_image_url}
                className='tweet-profile-img'
                alt={tweet.user.screen_name}
              />
              <div className='tweet-text'>
                <div className='head'>
                  <p className='real-name'>
                    {tweet.user.name}{" "}
                    <span className='screen-name'>
                      @{tweet.user.screen_name} {displayTime}
                    </span>
                  </p>
                </div>
                <div className='body'>
                  <p>{tweet.text}</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      );
    })
  ) : (
    <p className='no-tweets'>No tweets from this area...</p>
  );
};

export default NewsFeed;
