import Link from "next/link";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        <li>
          <Link href="admin/users">Users</Link>
        </li>
        <li>
          <Link href="admin/teams">Teams</Link>
        </li>
        <li>
          <Link href="admin/posts">Posts</Link>
        </li>
        <li>
          <Link href="admin/comments">Comments</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminPage;
