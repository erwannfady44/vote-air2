let chart;
let votes = {
    nul: 10,
    moyen: 10,
    bien: 10
};

document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Nul', 'Moyen', 'Bien'],
            datasets: [{
                label: 'Votes',
                data: [votes.nul, votes.moyen, votes.bien],
                backgroundColor: [
                    'rgba(255, 0, 0, 0.6)',   // Rouge
                    'rgba(255, 128, 0, 0.6)', // Orange
                    'rgba(0, 200, 0, 0.6)'  // Vert
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 128, 0, 0.1)',
                    'rgba(0, 200, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Charger les données de votes depuis le cookie
    chargerDonneesDuCookie();

    // Afficher les résultats initiaux
    afficherResultats();
});

function afficherResultats() {
    chart.data.datasets[0].data = [votes.nul, votes.moyen, votes.bien];
    chart.update();

    // Mettre à jour le cookie avec les données de votes
    sauvegarderDonneesDansCookie();
}

function voter(option) {
    votes[option]++;
    afficherResultats();
}

// Fonction pour sauvegarder les données de votes dans un cookie
function sauvegarderDonneesDansCookie() {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Valide pendant 1 an
    document.cookie = `votes=${JSON.stringify(votes)}; expires=${expirationDate.toUTCString()}; path=/`;
}

// Fonction pour charger les données de votes depuis le cookie
function chargerDonneesDuCookie() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'votes') {
            const savedVotes = JSON.parse(decodeURIComponent(value));
            if (savedVotes) {
                votes = savedVotes;
            }
        }
    }
}
