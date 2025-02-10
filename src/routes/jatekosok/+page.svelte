<script>
    import { onMount } from 'svelte';
	  import JatekosApi from '../../../generated-client/src/api/JatekosApi.js';
  
    let jatekosok = [];
  
    onMount(() => {
      const apiInstance = new JatekosApi();
      apiInstance.apiCsapatGet((error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          jatekosok = data;
        }
      });
    });
  </script>

  <main>
    <h1>
        Játékosok
    </h1>
    <ul>
      {#each jatekosok as jatekos}
        <li>
          {jatekos.vezeteknev} {jatekos.keresztnev}
          {jatekos.szuletesiDatum}
          {jatekos.nemzetisegId}
        </li>
      {/each}
    </ul>
  </main>