import React, { useState, useEffect } from "react";
import Meter from "../Meters/Meter";
import { Link } from "react-router-dom";
import moment from "moment";
import {} from "twix";
import useBudgetCalculation from "../../hooks/useBudgetCalculation";
import styled from "styled-components";
import { FigCaption } from "../StyledComponents/Images";

const CardBackground = styled.div`
  background-color: #fff;
  border: 1px solid ${props => props.theme.themeColorSecondary};
  // margin: 20px 0;
  padding: 20px;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 280px 1fr;
    grid-gap: 40px;
    padding-bottom: 0;
  }
`;

const CardHeader = styled.h1`
  font-size: 1.2em;
  font-weight: normal;
  color: ${props => props.theme.darkFont};
`;

const CardSubheader = styled.h2`
  font-size: 1em;
  font-weight: normal;
  color: ${props => props.theme.darkFont};
`;

const CardImageContainer = styled.div`
  width: calc(100% + 40px);
  margin: -20px -20px 0 -20px;
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  display: block;
`;

const TripCard = props => {
  const actual = useBudgetCalculation("actual", props.expenses);
  const budgeted = useBudgetCalculation("budgeted", props.budgetItems);

  const dates = moment(props.startDate)
    .twix(props.endDate, { allDay: true })
    .format({ monthFormat: "MMM", dayFormat: "D" });

  const [imgWidth, setImgWidth] = useState(333)
  useEffect(() => {
    function updateSize() {
      if(window.innerWidth >= 700 && window.innerWidth < 1024) setImgWidth(352)
      else if(window.innerWidth >= 1024) setImgWidth(320)
      else setImgWidth(window.innerWidth - 40)
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [])

  return (
    <Link to={props.to} style={{ textDecoration: "none" }}>
      <CardBackground>
        <CardImageContainer>
          <CardImage
            src={`${props.photo}&w=${imgWidth}&h=200&fit=crop&crop=focalpoint`}
            alt=""
          />
          <FigCaption
            dangerouslySetInnerHTML={{ __html: props.photoAttribution }}
          />
        </CardImageContainer>
        <div>
          <CardHeader>{props.destination}</CardHeader>
          <CardSubheader>{dates}</CardSubheader>
          <Meter theme={props.theme} actual={actual} budgeted={budgeted} />
        </div>
      </CardBackground>
    </Link>
  );
};

export default TripCard;
