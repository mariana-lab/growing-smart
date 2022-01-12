export function fetchRepos(language) {
    const endpoint = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );
  
    const bearer = 'Bearer ' + process.env.GITHUB_TOKEN;
  
    return fetch(endpoint,{
      method: 'GET',
      headers: {
         'Authorization': bearer,
         'Content-Type': 'application/json'
      }})
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) {
          throw new Error(data.message);
        }
  
        return data.items;
      });
  }