import React, { useContext } from "react";
import { Store } from "../Store";
import { withRouter } from "react-router-dom";
import TripHeader from "./Navigation/TripHeader";
// import TextInput from "./FormElements/TextInput";
// import Textarea from "./FormElements/Textarea";
// import Button from "./Buttons/Button";
// import ButtonLink from "./Buttons/ButtonLink";
// import uniqid from "uniqid";
// import { startAddBudgetCategory } from "../actions/budgetCategories";
import BudgetCategoryForm from "./Forms/BudgetCategoryForm";

const AddBudgetCategory = props => {
  const { state } = useContext(Store);
  // const containerStyles = {
  //   margin: "20px"
  // };
  // const buttonContainerStyles = {
  //   margin: "0 -10px",
  //   display: "flex",
  //   justifyContent: "flex-end"
  // };

  // const [budgetCategory, setBudgetCategory] = useState("");
  // const [notes, setNotes] = useState("");

  // const trips = JSON.parse(localStorage.getItem("trips"));
  const trip = state.trips.find(trip => trip.id === props.match.params.id);

  // const handleClick = () => {
  //   const newBudgetCategory = {
  //     id: uniqid(),
  //     tripId: trip.id,
  //     budgetCategory,
  //     notes
  //   };

  //   // let budgetCategories = state.budgetCategories;

  //   // budgetCategories.push(newBudgetCategory);

  //   // budgetCategories = JSON.stringify(budgetCategories);

  //   // localStorage.setItem("budgetCategories", budgetCategories);

  //   startAddBudgetCategory(newBudgetCategory, state, dispatch);

  //   props.history.push(`/trip/${props.match.params.id}`);
  // };

  return (
    <div>
      {trip && (
        <div>
          <TripHeader
            title="Add Budget Category"
            theme={props.theme}
            backTo={`/trip/${props.match.params.id}`}
            trip={trip}
          />
          <BudgetCategoryForm theme={props.theme} />
        </div>
      )}
    </div>
  );
};

export default withRouter(AddBudgetCategory);
