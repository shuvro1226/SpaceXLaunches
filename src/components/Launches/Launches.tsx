/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  useCallback,
  ChangeEvent,
} from "react";
import { SPACEX_API_ENDPOINT } from "../../lib/consts";
import Launch from "./Launch/Launch";
import { Container, Row, Col, Form } from "react-bootstrap";
import styles from "./Launches.module.css";
import { setQueryParams } from "../../lib/helper";
import {Launch as LaunchType} from '../../types';

type Props = {
  status: string;
};

const Launches = (props: Props): JSX.Element => {
  const { status } = props;
  const [launches, setLaunches] = useState<LaunchType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const launchesListRef = useRef() as MutableRefObject<HTMLInputElement>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loadNextLaunches = useCallback(
    async (
      page: number,
      launches: LaunchType[],
      status: string,
      searchText: string
    ): Promise<void> => {
      const params = setQueryParams(status, page, searchText);
      // const token = localStorage.getItem("token");

      const launchesJSON = await fetch(
        `${SPACEX_API_ENDPOINT}/launches/query`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization header is used to send a valid request with the
            // JWT token retrieved during login
            // "Authorization": `Bearer ${token}`
          },
          body: params,
        }
      );
      const launchesData = await launchesJSON.json();
      const { docs, nextPage, hasNextPage } = launchesData;
      const previousLaunches: LaunchType[] = [...launches];
      const updatedLaunches: LaunchType[] = [...previousLaunches, ...docs];
      setLaunches(updatedLaunches);
      setPage(nextPage);
      setHasNextPage(hasNextPage);
    },
    []
  );

  useEffect(() => {
    loadNextLaunches(page, launches, status, searchText);
  }, [loadNextLaunches]);

  const handleScroll = (): void => {
    if (launchesListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = launchesListRef.current;
      if (scrollTop + clientHeight === scrollHeight && hasNextPage) {
        loadNextLaunches(page, launches, status, searchText);
      }
    }
  };

  const handleBlur = (): void => {
    loadNextLaunches(1, [], status, searchText);
  };

  return (
    <div
      onScroll={handleScroll}
      ref={launchesListRef}
      className={styles.launchesWrapper}
    >
      <Container>
        <Row>
          <Col>
            <Form.Control
              id={`${status}_search`}
              type="text"
              placeholder="Search"
              value={searchText}
              className="mb-4"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleSearchTextChange(e)
              }
              onBlur={handleBlur}
            />
          </Col>
        </Row>
        <Row xs={1} sm={2} md={3} lg={4}>
          {launches?.map((launch: LaunchType, key: number) => {
            return (
              <Col key={key} className="mb-4">
                <Launch launch={launch}></Launch>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Launches;
