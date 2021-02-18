import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  let history = useHistory();

  const handleClick = (pageName: string) => {
    history.push(`/${pageName}`);
  };

  return (
    <React.Fragment>
      <div className="center mt-5">
        <Card>
          <Card.Body>
            {" "}
            <Button className="m-3" onClick={() => handleClick("vehicles")}>
              Vehicles
            </Button>
            <Button className="m-3" onClick={() => handleClick("characters")}>
              Characters
            </Button>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Home;
