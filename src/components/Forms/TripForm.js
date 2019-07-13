import React, { useState } from "react";
import TextInput from "../FormElements/TextInput";
import Button from "../Buttons/Button";
import ButtonLink from "../Buttons/ButtonLink";
import moment from "moment";
import styled from "styled-components";
import {
  startEditTrip,
  startAddTrip,
  startRemoveTrip
} from "../../actions/trips";
import { startRemoveBudgetCategory } from "../../actions/budgetCategories";
import { startRemoveBudgetItem } from "../../actions/budgetItems";
import { startRemoveExpense } from "../../actions/expenses";
import Modal from "react-modal";
import { ModalText } from "../StyledComponents/Modals";
import { Container } from "../StyledComponents/Layout";
import { MainButtons, ButtonContainer } from "../StyledComponents/Forms";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";

const PhotoOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  max-height: 300px;
  overflow-y: auto;
`;

const PhotoOption = styled.div.attrs(props => ({
  border: props.selected ? "2px solid blue" : "0"
}))`
  position: relative;
  border: ${props => props.border};
`;

const Img = styled.img`
  width: 100%;
  display: block;
`;

const FigCaption = styled.figcaption`
  position: absolute;
  bottom: ${props => (props.selected ? 0 : "4px")};
  background-color: #333;
  color: #fff;
  opacity: 0.7;
  padding: 5px;
  width: 100%;
  font-size: 0.75em;
`;

const PhotoLabel = styled.h4`
  font-size: 0.8em;
  font-weight: bold;
`;

const TripForm = props => {
  const [destination, setDestination] = useState(
    props.trip ? props.trip.destination : ""
  );
  const [startDate, setStartDate] = useState(
    props.trip ? moment(props.trip.startDate).format("MM/DD/YY") : null
  );
  const [endDate, setEndDate] = useState(
    props.trip ? moment(props.trip.endDate).format("MM/DD/YY") : null
  );
  const [photo, setPhoto] = useState(props.trip ? props.trip.photo : "");
  const [photoAttribution, setPhotoAttribution] = useState(
    props.trip ? props.trip.photoAttribution : ""
  );
  const [photos, setPhotos] = useState([]);
  const [photoOptions, setPhotoOptions] = useState([]);
  const [selectedPhotoOption, setSelectedPhotoOption] = useState("");
  const [showPhotoOptions, setShowPhotoOptions] = useState(
    photo ? false : true
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const getPhoto = async () => {
    if (destination) {
      let response = await fetch(`/photos?keyword=${destination}`);
      let data = await response.json();

      let newPhotoOptions = [];

      data.map(photoOption => {
        newPhotoOptions.push({
          value: photoOption.id,
          text: photoOption.alt_description
        });
        return true;
      });

      if (!photo) {
        setSelectedPhotoOption(data[0].id);
        setPhoto(data[0].urls.raw);
        setPhotoAttribution(generateAttribution(data[0]));
      }
      setPhotos(data);
      setPhotoOptions(newPhotoOptions);
    }
  };
  const generateAttribution = photoSelection => {
    const attribution = `Photo by <a href="${
      photoSelection.user.links.html
    }?utm_source=Travel Budget Planner&utm_medium=referral">${
      photoSelection.user.name
    }</a> on <a href="https://unsplash.com/?utm_source=Travel Budget Planner&utm_medium=referral">Unsplash</a>`;

    return attribution;
  };
  const handleSelectPhoto = id => {
    let newPhotoSelection = photos.find(aPhoto => aPhoto.id === id);
    setSelectedPhotoOption(id);

    setPhoto(newPhotoSelection.urls.raw);
    setPhotoAttribution(generateAttribution(newPhotoSelection));
  };
  const handleClick = async () => {
    if (props.trip) {
      const updatedTrip = {
        ...props.trip,
        destination,
        startDate: moment(startDate).valueOf(),
        endDate: moment(endDate).valueOf(),
        photo,
        photoAttribution
      };

      props.startEditTrip(props.trip._id, updatedTrip);

      props.history.push(`/trip/${props.trip._id}`);
    } else {
      const newTrip = {
        // id: uniqid(),
        destination,
        startDate: moment(startDate).valueOf(),
        endDate: moment(endDate).valueOf(),
        photo,
        photoAttribution
      };

      console.log(newTrip);

      props.startAddTrip(newTrip);

      props.history.push("/");
    }
  };
  const deleteTrip = () => {
    props.startRemoveTrip(props.trip._id);

    props.budgetCategories.map(i => {
      if (i.tripId === props.trip._id) props.startRemoveBudgetCategory(i._id);
      return true;
    });

    props.budgetItems.map(i => {
      if (i.tripId === props.trip._id) props.startRemoveBudgetItem(i._id);
      return true;
    });

    props.expenses.map(i => {
      if (i.tripId === props.trip._id) props.startRemoveExpense(i._id);
      return true;
    });

    props.history.push("/");
  };
  return (
    <div>
      <Container>
        <TextInput
          theme={props.theme}
          label="Destination"
          value={destination}
          handleChange={setDestination}
          handleBlur={getPhoto}
        />
        <DateRangePicker
          startDateId="startDate"
          endDateId="endDate"
          startDate={startDate}
          endDate={endDate}
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }}
          focusedInput={focusedInput}
          onFocusChange={focusedInput => {
            setFocusedInput(focusedInput);
          }}
          orientation="horizontal"
          numberOfMonths={1}
          // verticalHeight={350}
        />
        {/* <TextInput
          theme={props.theme}
          label="Start Date"
          value={startDate}
          handleChange={setStartDate}
        />
        <TextInput
          theme={props.theme}
          label="End Date"
          value={endDate}
          handleChange={setEndDate}
        /> */}

        {!showPhotoOptions && (
          <Button
            handleClick={e => setShowPhotoOptions(true)}
            buttonText="Change Photo"
            buttonWidth="auto"
            buttonType="link"
            customStyles={{ background: { padding: "10px 0" } }}
          />
        )}
        {showPhotoOptions && (
          <div>
            {photoOptions.length > 0 && <PhotoLabel>Photo</PhotoLabel>}
            <PhotoOptions>
              {photoOptions.length > 0 &&
                photos.map(aPhoto => {
                  return (
                    <PhotoOption
                      key={aPhoto.id}
                      selected={aPhoto.id === selectedPhotoOption}
                    >
                      <Img
                        src={`${
                          aPhoto.urls.raw
                        }&w=150&h=90&fit=crop&crop=focalpoint`}
                        alt=""
                        onClick={e => handleSelectPhoto(aPhoto.id)}
                      />
                      <FigCaption
                        dangerouslySetInnerHTML={{
                          __html: generateAttribution(aPhoto)
                        }}
                        selected={aPhoto.id === selectedPhotoOption}
                      />
                    </PhotoOption>
                  );
                })}
            </PhotoOptions>
          </div>
        )}
        <ButtonContainer showDelete={props.trip}>
          {props.trip && (
            <div>
              <Button
                theme={props.theme}
                handleClick={e => setDeleteModal(true)}
                buttonText="Delete"
                buttonWidth="auto"
                buttonType="delete"
                buttonDisplay="inline"
                customStyles={{ background: { padding: "10px 0" } }}
              />
              <Modal
                isOpen={deleteModal}
                onRequestClose={e => setDeleteModal(false)}
                contentLabel="Delete Modal"
                style={{
                  overlay: {
                    backgroundColor: "rgba(0,0,0,.5)"
                  },
                  content: {
                    borderRadius: "0",
                    minHeight: "20vh",
                    maxHeight: "40vh",
                    overflowY: "auto",
                    width: "80vw",
                    top: "30vh",
                    left: "10vw",
                    right: "auto",
                    bottom: "auto"
                  }
                }}
              >
                <ModalText>
                  Are you sure you want to permanently delete this trip and all
                  its budget categories, budget items, and expenses?
                </ModalText>
                <MainButtons>
                  <Button
                    theme={props.theme}
                    handleClick={e => setDeleteModal(false)}
                    buttonText="Cancel"
                    buttonWidth="auto"
                    buttonType="link"
                    buttonDisplay="inline"
                    customStyles={{ background: { padding: "10px 0" } }}
                  />
                  <Button
                    theme={props.theme}
                    handleClick={deleteTrip}
                    buttonText="Yes, Delete"
                    buttonWidth="auto"
                    buttonType="primary"
                    buttonDisplay="inline"
                  />
                </MainButtons>
              </Modal>
            </div>
          )}
          <MainButtons>
            <ButtonLink
              theme={props.theme}
              to="/"
              buttonText="Cancel"
              buttonWidth="auto"
              buttonType="link"
              buttonDisplay="inline"
              customStyles={{ background: { padding: "10px 0" } }}
            />
            <Button
              theme={props.theme}
              buttonText="Save"
              buttonWidth="auto"
              buttonDisplay="inline"
              handleClick={handleClick}
            />
          </MainButtons>
        </ButtonContainer>
      </Container>
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  startAddTrip: updates => dispatch(startAddTrip(updates)),
  startEditTrip: (id, updates) => dispatch(startEditTrip(id, updates)),
  startRemoveTrip: id => dispatch(startRemoveTrip(id)),
  startRemoveBudgetCategory: id => dispatch(startRemoveBudgetCategory(id)),
  startRemoveBudgetItem: id => dispatch(startRemoveBudgetItem(id)),
  startRemoveExpense: id => dispatch(startRemoveExpense(id))
});

export default connect(
  null,
  mapDispatchToProps
)(TripForm);
