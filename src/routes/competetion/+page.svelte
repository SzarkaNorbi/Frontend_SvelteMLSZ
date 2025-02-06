<script>
  import VersenyApi from '../../../generated-client/src/api/VersenyApi.js';
  import { onMount } from 'svelte';
  
  let versenyek = [];  
  
  onMount(() => {
      const apiInstance = new VersenyApi();
      apiInstance.versenyGet((error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          versenyek = data;
        }
      });
  });
</script>

<section class="banner_section">
  <div class="container">
    <div class="banner-content">
      <h1>Versenyek</h1>
    </div>
  </div>
</section>

<section class="gallery_section">
  <div class="container">
    <div class="row">
      <div class="col-12 text-center pb-5">
        <h2 style="font-size: 3rem; font-weight: bold; margin-bottom: 10px;">Versenyeink</h2>
        <p style="font-size: 2rem; color: #666;">Tekintse meg versenyeinket!</p>
      </div>
        <ul>
          {#each versenyek as verseny}
            <li class="product-content">
              <p><strong>Liga:</strong> {verseny.liga}</p>
              <p><strong>Forduló:</strong> {verseny.fordulo}</p>
              <p><strong>Stadion id:</strong> {verseny.stadionId}</p>
              <p><strong>Kezdési dátum:</strong> {new Date(verseny.kezdesDatum).toLocaleDateString("hu-HU")}</p>
              <p><strong>Befejezési dátum:</strong> {new Date(verseny.befejezesDatum).toLocaleDateString("hu-HU")}</p>
              <p><strong>Leírás:</strong> {verseny.leiras}</p>
              <p><strong>Jelenleg:</strong> {verseny.aktualis ? "Jelenleg fut" : "Már végetért / Még nem kezdődött el"}</p>
            </li>
          {/each}
        </ul>
    </div>
  </div>
</section>

<style>
  .img-small {
          max-width: 250px; 
          height: auto; 
      }
  
  .product-content {
      background-color: rgba(0, 0, 0, 0.85);
      color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      border: 1px solid #32cd32;
      margin-bottom: 1rem;
  }

  .product-content h1 {
      font-size: 3rem; 
      font-weight: bold;
      color: #32cd32;
      margin-bottom: 15px;
  }

  .product-content p,
  .product-content ul {
      font-size: 1.5rem; 
      line-height: 1.7;
      color: #ffffff;
      margin-bottom: 10px;
  }

  .product-content ul li {
      margin-bottom: 8px;
      padding: 5px 0;
  }

  .product-details {
      margin-top: 20px;
  }

  .product-content h4 {
      color: #32cd32;
  }

  .modern-button {
    padding: 8px 16px; /* Kisebb padding */
    background-color: #32cd32;
    color: white;
    border: 2px solid #32cd32;
    border-radius: 30px; /* Kisebb kerekítés */
    font-size: 14px; /* Kisebb betűméret */
    font-weight: bold;
    cursor: pointer;
    outline: none;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* Hover és active effektusok */
  .modern-button:hover {
    background-color: #2980b9;
    border-color: #2980b9;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }

  .modern-button:active {
    background-color: #1c6d98;
    border-color: #1c6d98;
    transform: translateY(1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .modern-button:disabled {
    background-color: #BDC3C7;
    border-color: #BDC3C7;
    cursor: not-allowed;
    box-shadow: none;
  }
</style>
