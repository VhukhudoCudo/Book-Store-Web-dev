// app/githubusers/[user]/page.jsx
import Repos from "../../components/Repos"; // Optional if you use separate component

const fetchUserRepos = async (user) => {
  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });

    if (!res.ok) {
      console.error("GitHub API error:", res.status);
      return [];
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};

const UserReposPage = async ({ params: { user } }) => {
  const repos = await fetchUserRepos(user);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{user}'s Repositories</h2>
      {repos.length === 0 ? (
        <p>No repos found.</p>
      ) : (
        <ul className="space-y-2">
          {repos.map((repo) => (
            <li key={repo.id} className="border p-2 rounded shadow-sm">
              <a
                href={repo.html_url}
                target="_blank"
                className="text-blue-500 underline"
              >
                {repo.name}
              </a>
              <p className="text-sm opacity-70">
                {repo.description || "No description"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserReposPage;
