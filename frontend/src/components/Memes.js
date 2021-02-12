import React from "react";
import MemeContainer from "./MemeContainer";
import { Scrollbars } from "react-custom-scrollbars";
import { useState, useEffect } from "react";
import "./Memes.css";

function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://xmeme174.herokuapp.com/memes")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.reverse());
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Scrollbars style={{ height: "100vh" }}>
        <div className="memes">
          {items.map((item) => (
            <MemeContainer
              name={item.name}
              url={item.url}
              caption={item.caption}
            />
          ))}
        </div>
      </Scrollbars>
    );
  }
}

export default MyComponent;
