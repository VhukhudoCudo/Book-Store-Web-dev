// app/githubusers/page.jsx
const fetchGitHubUsers = async () => {
  try {
    const res = await fetch(
      "https://api.github.com/search/users?q=vhukhudocudo",
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      }
    );

    if (!res.ok) {
      console.error("GitHub API error:", res.status);
      return [];
    }

    const json = await res.json();
    return json.items || [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};

const GitHubUsersPage = async () => {
  const users = await fetchGitHubUsers();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub Users</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Avatar & Name</th>
              <th>GitHub URL</th>
              <th>Repos</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.avatar_url} alt={user.login} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.login}</div>
                      <div className="text-sm opacity-50">{user.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <a
                    href={user.html_url}
                    className="btn btn-link"
                    target="_blank"
                  >
                    View on GitHub
                  </a>
                </td>
                <td>
                  <a
                    href={`/githubusers/${user.login}`}
                    className="btn btn-link"
                  >
                    Go to Repos
                  </a>
                </td>
              </tr>
            )) || (
              <tr>
                <td colSpan={3} className="text-center">
                  No users found or API limit reached.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GitHubUsersPage;
