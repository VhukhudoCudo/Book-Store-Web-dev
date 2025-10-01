// app/githubusers/[user]/page.jsx
import React from "react";
import Link from "next/link";

const UserReposPage = async ({ params }) => {
  const user = params.user;

  const res = await fetch(`https://api.github.com/users/${user}/repos`);
  if (!res.ok) return <div>Error fetching repos for {user}</div>;

  const repos = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{user}'s Repositories</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Repo Name</th>
              <th>Description</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr key={repo.id}>
                <td>{repo.name}</td>
                <td>{repo.description || "No description"}</td>
                <td>
                  <Link
                    href={repo.html_url}
                    className="btn btn-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserReposPage;
