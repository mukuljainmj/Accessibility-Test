import React, { useState } from "react";

function SimpleForm() {
  const [toggleMoreFields, setToggleMoreFields] = useState(false)

  const handleToggleMoreFields = () => {
    setToggleMoreFields(prevState => !prevState)
  }

  return (
    // Failing
    // <form>
    //   <h5>First name</h5>
    //   <input name="firstName" type="text" placeholder="Enter your first name" />
    //   <h5>Gender</h5>
    //   Male <input type="radio" name="gender" value="Male" />
    //   Female <input type="radio" name="gender" value="Female" />
    // </form>

    // Passing
    <form>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        placeholder="Enter your first name"
      />
      <h5>Gender</h5>
      <label>
        Male <input type="radio" name="gender" value="Male" />
      </label>
      <label>
        Female <input type="radio" name="gender" value="Female" />
      </label>
      <button type="button" data-testid="toggle-more-fields" onClick={handleToggleMoreFields}>
        Toogle More Fields
      </button>
      {toggleMoreFields && (
        <label className="more-field-class">
          Age <input type="text" name="age" />
        </label>
      )}
    </form>
  );
}

export default SimpleForm;
