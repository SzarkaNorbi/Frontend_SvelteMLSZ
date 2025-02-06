<script>
    import { onMount } from 'svelte';
    let showModal = false;
    let events = [];

    function openModal() {
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    function loadEvents() {
        events = [
    { date: '2025-02-15', name: 'Bajnoki mérkőzés' },
    { date: '2025-03-02', name: 'Barátságos torna' },
    { date: '2025-04-10', name: 'Közösségi foci' },
    { date: '2025-05-05', name: 'Bajnoki mérkőzés' },
    { date: '2025-06-12', name: 'Barátságos torna' },
    { date: '2025-07-22', name: 'Közösségi foci' },
    { date: '2025-08-15', name: 'Bajnoki mérkőzés' },
    { date: '2025-09-10', name: 'Barátságos torna' },
    { date: '2025-10-20', name: 'Közösségi foci' },
    { date: '2025-11-05', name: 'Bajnoki mérkőzés' }
];

    }

    onMount(loadEvents);
</script>

<section class="banner_section">
    <div class="container">
        <div class="banner-content">
            <h1>Események</h1>
        </div>
    </div>
</section>

<section class="content_section">
    <div class="content-container">
        <p>
            Csatlakozz hozzánk a legizgalmasabb focis eseményeken! Legyen szó bajnoki mérkőzésekről, barátságos tornákról vagy közösségi fociról, nálunk megtalálod a legfrissebb információkat. Tekintsd meg az eseménynaptárunkat, és ne maradj le egyetlen meccsről sem!
        </p>
        <button class="btn" on:click={openModal}>Eseménynaptár</button>
    </div>
</section>

{#if showModal}
    <div class="modal">
        <div class="modal-content">
            <span class="close" on:click={closeModal}>&times;</span>
            <h2 class="modal-title">Eseménynaptár</h2>
            <ul class="event-list">
                {#each events as event}
                    <li class="event-item">{event.date}: {event.name}</li>
                {/each}
            </ul>
        </div>
    </div>
{/if}

<style>
    .banner-content {
        position: relative;
        z-index: 1;
        text-align: center;
    }

    .banner-content h1 {
        font-size: 3rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #fff;
        margin: 0;
    }

    .content_section {
        padding: 40px 20px;
        max-width: 800px;
        margin: auto;
        text-align: center;
    }

    .content-container {
        background: linear-gradient(135deg, rgba(40, 167, 69, 0.2), rgba(40, 167, 69, 0.1)), url('https://via.placeholder.com/1500x1000') center center/cover no-repeat;
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
    }

    p {
        font-size: 1.6rem;
        line-height: 1.8;
        color: #333;
        margin-bottom: 30px;
    }

    .btn {
        display: inline-block;
        padding: 12px 25px;
        background: #28a745;
        color: white;
        font-size: 1.8rem;
        text-transform: uppercase;
        border-radius: 50px;
        border: none;
        cursor: pointer;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    }

    .btn:hover {
        background: #218838;
        transform: translateY(-2px);
        box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.3);
    }

    .modal {
        display: flex;
        position: fixed;
        z-index: 10;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        animation: fadeInModal 0.3s ease;
    }

    .modal-content {
        background: white;
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        text-align: center;
        width: 90%;
        max-width: 500px;
    }

    .modal-title {
        font-size: 2.2rem;
        color: #28a745;
        margin-bottom: 20px;
        font-weight: 600;
    }

    .event-list {
        list-style: none;
        padding: 0;
    }

    .event-item {
        font-size: 1.4rem;
        padding: 12px 0;
        border-bottom: 1px solid #eee;
        color: #444;
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 30px;
        color: #333;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .close:hover {
        color: #28a745;
    }

    @keyframes fadeInModal {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        .banner-content h1 {
            font-size: 2.5rem;
        }

        .content-container {
            padding: 30px 15px;
        }

        p {
            font-size: 1.4rem;
        }

        .btn {
            font-size: 1.4rem;
            padding: 12px 25px;
        }
    }
</style>
