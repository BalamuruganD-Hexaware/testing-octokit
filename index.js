import { Octokit, App } from "octokit";
import 'dotenv/config';

const octokit = new Octokit({
  auth: process.env.ACCESS_TOKEN
});

main();


function main() {
  if (process.argv[2] === "delete") {
    deleteRepository(process.argv[3], process.argv[4])
  }
  if (process.argv[2] === "list") {
    listOrgRepos()
  }
}

async function listOrgRepos () {
  const response = await octokit.rest.orgs.listForAuthenticatedUser();
  if (response.status === 200) {
    console.log(response.data.map(datum => datum.login));
  }
}

async function deleteRepository(owner,repo) {
  try {
    const response = await octokit.rest.repos.delete( { owner, repo } )
    if (response.status === 204) {
      console.log(`Deleted ${owner}/${repo}`)
    }
  }
  catch (e) {
    console.log(`Cannot delete ${owner}/${repo}`)
    console.log(e)
  }
}