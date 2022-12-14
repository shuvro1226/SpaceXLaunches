import React, { useEffect, useState, useRef } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Spinner from "react-bootstrap/Spinner";
import { STATUS_CONFIG } from "../../lib/consts";
import Launches from "../Launches/Launches";
import { Status } from "../../types";
import ToastComponent from "../ToastComponent/ToastComponent";
import styles from "./LaunchByStatus.module.css";

const LaunchesByStatus = (): JSX.Element => {
  const [key, setKey] = useState<string>("success");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const timeoutID: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      const login = async () => {
        const body = {
          email: "eve.holt@reqres.in",
          password: "cityslicka",
        };

        // Used this dummy API endpoint to send a login request
        // and fetch a JWT token and store in localstorage for reuse
        const loginJSON = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const loginData = await loginJSON.json();
        localStorage.setItem("token", loginData.token);
        setIsAuthenticated(true);
        setShow(true);
      };
      
      // Adding 3 seconds delay for loggin in to show the authenticating message
      timeoutID.current = setTimeout(() => login(), 3000);
      return () => clearTimeout(timeoutID.current!);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <h3 className="mt-5 mb-2">
          <Spinner animation="border" />
        </h3>
        <h4>Authenticating...</h4>
      </>
    );
  }

  return (
    <>
      <ToastComponent
        variant="Success"
        headerMessage="Login Successful!"
        message="You are authenticated!"
        show={show}
        setShow={setShow}
      />
      <Tabs activeKey={key} onSelect={(k: any): void => setKey(k)}>
        {STATUS_CONFIG.map((status: Status, i: number) => {
          return (
            <Tab
              key={i}
              eventKey={status.identifier}
              title={status.name}
              className={`${styles.tabWrapper} pt-3`}
            >
              <Launches status={status.identifier} />
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};

export default LaunchesByStatus;
