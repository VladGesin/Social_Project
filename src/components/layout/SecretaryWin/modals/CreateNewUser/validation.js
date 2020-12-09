import api from "../../../../../api";

export const validateStage1 = async (
   formDetails,
   validation,
   setValidation
) => {
   const users = await api.get("users");
   const emails = users.data.map((u) => u.email);
   const ids = users.data.map((u) => u.user_id);

   const validateEmail = (email) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
   };

   const validateDate = () => {
      const today = new Date();
      const birthDate = new Date(formDetails.birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
         age--;
      }
      if (age < 18) {
         return false;
      } else {
         return true;
      }
   };

   let isValid = true;
   if (!validateEmail(formDetails.email)) {
      setValidation((cur) => ({
         ...cur,
         emailIsValid: false,
         emailIsAlreadyExist: false,
      }));
      isValid = false;
   } else {
      if (emails.includes(formDetails.email)) {
         setValidation((cur) => ({
            ...cur,
            emailIsAlreadyExist: true,
            emailIsValid: true,
         }));
         isValid = false;
      } else {
         setValidation((cur) => ({
            ...cur,
            emailIsAlreadyExist: false,
            emailIsValid: true,
         }));
      }
   }
   if (isNaN(+formDetails.phone) || formDetails.phone.length !== 7) {
      setValidation((cur) => ({ ...cur, phoneIsValid: false }));
      isValid = false;
   } else {
      setValidation((cur) => ({ ...cur, phoneIsValid: true }));
   }
   if (formDetails.firstName.length === 0) {
      setValidation((cur) => ({ ...cur, firstNameIsValid: false }));
      isValid = false;
   } else {
      setValidation((cur) => ({ ...cur, firstNameIsValid: true }));
   }

   if (formDetails.lastName.length === 0) {
      setValidation((cur) => ({ ...cur, lastNameIsValid: false }));
      isValid = false;
   } else {
      setValidation((cur) => ({ ...cur, lastNameIsValid: true }));
   }
   if (formDetails.id.length !== 9 || isNaN(+formDetails.id)) {
      setValidation((cur) => ({
         ...cur,
         idIsValid: false,
         idIsAlreadyExist: false,
      }));
      isValid = false;
   } else {
      if (ids.includes(formDetails.id)) {
         setValidation((cur) => ({
            ...cur,
            idIsAlreadyExist: true,
            idIsValid: true,
         }));
         isValid = false;
      } else {
         setValidation((cur) => ({
            ...cur,
            idIsAlreadyExist: false,
            idIsValid: true,
         }));
      }
   }

   if (formDetails.birthday.length === 0) {
      setValidation((cur) => ({ ...cur, birthDateIsEmpty: true }));
      isValid = false;
   } else {
      setValidation((cur) => ({ ...cur, birthDateIsEmpty: false }));
   }
   if (!validateDate()) {
      setValidation((cur) => ({ ...cur, birthDateIsValid: false }));
      isValid = false;
   } else {
      setValidation((cur) => ({ ...cur, birthDateIsValid: true }));
   }
   return isValid;
};

export const validateStage3 = (formDetails, setValidation) => {
   const validatePassword = (password) => {
      var regularExpression =
         "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&])";
      if (!password.match(regularExpression) || password.length < 8)
         return false;
      return true;
   };
   let isValid = true;
   if (!validatePassword(formDetails.password)) {
      setValidation((cur) => ({ ...cur, passwordIsValid: false }));
      isValid = false;
   } else {
      setValidation((cur) => ({ ...cur, passwordIsValid: true }));
   }
   return isValid;
};
