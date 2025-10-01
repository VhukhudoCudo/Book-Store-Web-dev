// app/githubusers/[user]/page.jsx
import React from "react";
import Link from "next/link";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
};

const UserReposPage = async ({ params }: { params: { user: string } }) => {
  const { user } = params;

  // Fetch user repos from GitHub
  const res = await fetch(`https://api.github.com/users/${user}/repos`);
  
  if (!res.ok) {
    console.error("GitHub API error:", res.status);
    return <div>Error fetching repos for {user}</div>;
  }

  const repos: Repo[] = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{user}'s Repositories</h1>
      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
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
      )}
    </div>
  );
};

export default UserReposPage;
