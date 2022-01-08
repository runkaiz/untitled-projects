export async function convertToHTML() {
    try {
      const response = await fetch('https://ych.npkn.net/md2html', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: "# I am dumb \n I am **so** dumb."
      });

      return {
        props: { ...(await response.body) }
      };

    } catch (error) {
      console.error(`Error in load function for /: ${error}`);
    }
};

export async function getMarkdown(id) {

  var url = new URL('https://api.untitled.workers.dev')
  url.searchParams.append('id', id)

  try {
    const response = await fetch(url.href, {
      method: 'GET'
    })

    return response.text()
  } catch (error) {
    console.error(`Error in load function for /: ${error}`);
  }
}