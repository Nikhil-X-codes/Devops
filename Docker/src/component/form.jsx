import { useState } from "react";

function Forms() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      setErrors("Name is required");
      return;
    }

    if (email.trim() === "") {
      setErrors("Email is required");
      return;
    }

    setErrors("");

    console.log("Form submitted");
  };

  return (
    <>
      <h1>Registration Form</h1>

      <form onSubmit={handlesubmit}>
        <div>
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {errors && <p>{errors}</p>}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Forms;