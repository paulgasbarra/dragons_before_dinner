/** create card, view/edit/delete hero */
/** depending on the kind of card that the user wishes to make 
    input fileds will be different */
import CardCreationForm from "../Components/Card/CardCreationForm";
/** create card */
const CreateCard = () => {
  // create a collection of input fields for each type of card
  return (
    <>
      <h1>Create Card</h1>
      <CardCreationForm />
    </>
  );
};

export default CreateCard;
