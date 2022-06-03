<script>
    async function lookup() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
                'X-RapidAPI-Key': '2726ba7a4amshbc04090b749e22cp1eca41jsn46fa1b275a36'
            }
        };

        const res = await fetch(`https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=${word}`, options);
        const text = await res.json();

        if (res.ok) {
            console.log(text);
			return text;
		} else {
			throw new Error(text);
		}
    }

    let word = "";
    let res = lookup();

    function handleClick() {
		res = lookup();
	}
</script>

<div>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-10">
        <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Untitled Dictionary</h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>Look up any word you'd like the meaning of!</p>
            </div>
            <form class="mt-5 sm:flex sm:items-center" on:submit|preventDefault={lookup}>
                <div class="w-full sm:max-w-xs">
                <label for="word" class="sr-only">Word</label>
                <input type="text" name="word" id="word" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Sardonic" bind:value={word}>
                </div>
                <button type="button" class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" on:click={handleClick}>Go!</button>
            </form>
            </div>
        </div>
    </div>

    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8 py-4">
        {#await res}
            <div />
        {:then result}
            <div>
                <h2 class="sr-only">Definitions</h2>
                <div class="max-w-7xl mx-auto sm:px-2 lg:px-4">
                <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 gap-y-12 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                    <div class="sm:flex">
                    <div class="sm:flex-shrink-0">
                        <div class="flow-root">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19zm3-9h6v6H9v-6zm2 2v2h2v-2h-2z"/></svg>
                        </div>
                    </div>
                    <div class="mt-3 sm:mt-0 sm:ml-3">
                        <h3 class="text-sm font-medium text-gray-900">{word} as a Noun</h3>
                        {#if result.meaning.noun !== ""}
                            {#each result.meaning.noun.split("(nou) ") as meaning, i}
                                {#if i !== 0}
                                    <p class="mt-2 text-sm text-gray-700">{i}. {meaning}</p>
                                {/if}
                            {/each}
                        {:else}
                            <p class="mt-2 text-sm text-gray-500">No definition as an noun.</p>
                        {/if}
                    </div>
                    </div>
            
                    <div class="sm:flex">
                    <div class="sm:flex-shrink-0">
                        <div class="flow-root">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path fill="none" d="M0 0h24v24H0z"/><path d="M9.83 8.79L8 9.456V13H6V8.05h.015l5.268-1.918c.244-.093.51-.14.782-.131a2.616 2.616 0 0 1 2.427 1.82c.186.583.356.977.51 1.182A4.992 4.992 0 0 0 19 11v2a6.986 6.986 0 0 1-5.402-2.547l-.697 3.956L15 16.17V23h-2v-5.898l-2.27-1.904-.727 4.127-6.894-1.215.348-1.97 4.924.868L9.83 8.79zM13.5 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
                        </div>
                    </div>
                    <div class="mt-3 sm:mt-0 sm:ml-3">
                        <h3 class="text-sm font-medium text-gray-900">{word} as a Verb</h3>
                        {#if result.meaning.verb !== ""}
                        {#each result.meaning.verb.split("(vrb) ") as meaning, i}
                            {#if i !== 0}
                                <p class="mt-2 text-sm text-gray-700">{i}. {meaning}</p>
                            {/if}
                        {/each}
                        {:else}
                            <p class="mt-2 text-sm text-gray-500">No definition as a verb.</p>
                        {/if}
                    </div>
                    </div>
            
                    <div class="sm:flex">
                    <div class="sm:flex-shrink-0">
                        <div class="flow-root">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 13.333l-9.223 6.149A.5.5 0 0 1 2 19.066V4.934a.5.5 0 0 1 .777-.416L12 10.667V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832l-10.599 7.066a.5.5 0 0 1-.777-.416v-5.733zM10.394 12L4 7.737v8.526L10.394 12zM14 7.737v8.526L20.394 12 14 7.737z"/></svg>
                        </div>
                    </div>
                    <div class="mt-3 sm:mt-0 sm:ml-3">
                        <h3 class="text-sm font-medium text-gray-900">{word} as an Adverb</h3>
                        {#if result.meaning.adverb !== ""}
                            {#each result.meaning.adverb.split("(adv) ") as meaning, i}
                                {#if i !== 0}
                                    <p class="mt-2 text-sm text-gray-700">{i}. {meaning}</p>
                                {/if}
                            {/each}
                        {:else}
                            <p class="mt-2 text-sm text-gray-500">No definition as an adverb.</p>
                        {/if}
                    </div>
                    </div>
            
                    <div class="sm:flex">
                    <div class="sm:flex-shrink-0">
                        <div class="flow-root">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/></svg>
                        </div>
                    </div>
                    <div class="mt-3 sm:mt-0 sm:ml-3">
                        <h3 class="text-sm font-medium text-gray-900">{word} as an Adjective</h3>
                        {#if result.meaning.adjective !== ""}
                            {#each result.meaning.adjective.split("(adj) ") as meaning, i}
                                {#if i !== 0}
                                    <p class="mt-2 text-sm text-gray-700">{i}. {meaning}</p>
                                {/if}
                            {/each}
                            {:else}
                                <p class="mt-2 text-sm text-gray-500">No definition as an adjective.</p>
                        {/if}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        {:catch error}
            <p>{error}</p>
        {/await}
    </div>
</div>