import React from "react";
import { Card, Badge } from "react-bootstrap";
import styles from "./Launch.module.css";
import { STATUS_CONFIG } from "../../../lib/consts";
import placeholder from "../../../assets/placeholder.jpeg";
import dayjs from 'dayjs';
import {Launch as LaunchType, Status} from '../../../types';

type Props = {
  launch: LaunchType;
};

const Launch = (props: Props): JSX.Element => {
  const { launch } = props;  
  const { name = "", details = "", links, success, upcoming, rocket, date_utc } = launch;
  const launchDate: string = dayjs(date_utc).format('dddd, MMMM D, YYYY h:mm A')
  const imageSrc =
    links?.flickr?.original?.length > 0
      ? links?.flickr?.original[0]
      : placeholder;

  let statusDetails: Status = STATUS_CONFIG.find(
    (config: Status, i: number) => config.identifier === "success"
  )!;
  if (upcoming) {
    statusDetails = STATUS_CONFIG.find(
      (config: Status, i: number) => config.identifier === "upcoming"
    )!;
  } else if (!success) {
    statusDetails = STATUS_CONFIG.find(
      (config: Status, i: number) => config.identifier === "failed"
    )!;
  }

  return (
    <Card className="h-100">
      <Card.Img className={styles.image} variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text as="div">
          <Badge data-testid="badge" bg={statusDetails?.style}>{statusDetails?.name}</Badge>
          <div className="w-100">
            <strong>Launch Date: </strong>{launchDate}
          </div>
          <div className="w-100">
            <strong>Rocket: </strong>
            {rocket.name}
          </div>
          <div className="w-100">
            {
              details
                ? `${details?.substring(0, 200)}...`
                : "No details available for this launch."
            }
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Launch;
