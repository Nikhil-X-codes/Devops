import { useEffect, useState } from "react";

function UserList() {
  const [userid, userchange] = useState(1);
  const [user, setuser] = useState(null);

  useEffect(() => {
    async function fetchusers() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userid}`
      );

      const data = await response.json();

      setuser(data);
    }

    fetchusers();
  }, [userid]);

  const nextuser = () => {
    userchange(userid + 1);
  };

  return (
    <>
      <button onClick={nextuser}>Next</button>

      {user && (
        <>
          <h2>{user.name}</h2>
          <h2>{user.email}</h2>
        </>
      )}
    </>
  );
}

export default UserList;