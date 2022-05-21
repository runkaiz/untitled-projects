<script>
    let inputURL = "";
    let result = 0;
    let success = false;

    function idToShortURL(n) {
        let result = "";

        return result;
    }

    function shortURLtoID(shortURL) {
        let result = 0;

        const url = new URL(shortURL);
        let hostname = url.hostname;
        let protocol = url.protocol;
        let pathname = url.pathname;
        let search = url.search;

        return search;
    }

    function shorten() {
        result = shortURLtoID(inputURL);

        success = true;
    }
</script>

<div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Input your URL to shorten</h3>
        <div class="mt-2 max-w-xl text-sm text-gray-500">
            <p>Shortens the inputed URL so you may share it easier.</p>
        </div>
        <div class="mt-5 sm:flex sm:items-center">
            <div class="w-full sm:max-w-xs">
                <label for="url" class="sr-only">URL</label>
                <input type="url" name="url" id="url" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" bind:value={inputURL}>
            </div>
            <button class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" on:click={() => shorten()}>Shorten</button>
        </div>
    </div>
</div>

{#if success}
<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
        <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <!-- Heroicon name: outline/check -->
              <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Link Shortened</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">{result}</p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm" on:click={() => {success = false;}}>Copy to Clip Board</button>
            <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm" on:click={() => {success = false;}}>Close</button>
          </div>
        </div>
      </div>
    </div>
</div>
{/if}