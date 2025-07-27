// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const mainContentWrapper = document.getElementById('main-content-wrapper');
    const parkBenchButton = document.getElementById('park-bench-button');
    const tournamentSection = document.getElementById('tournament-section');
    const tournamentStatus = document.getElementById('tournament-status');
    const playerList = document.getElementById('player-list');
    const startMatchButton = document.getElementById('start-match-button');
    const matchResults = document.getElementById('match-results');
    const resetTournamentButton = document.getElementById('reset-tournament-button');

    // Tournament state variables
    let players = [
        "Player A", "Player B", "Player C", "Player D",
        "Player E", "Player F", "Player G", "Player H"
    ];
    let currentPlayers = [...players]; // Copy for current tournament
    let round = 1;
    let matchNumber = 1;
    let winners = [];
    let tournamentInProgress = false;

    // Function to display players
    function displayPlayers() {
        playerList.innerHTML = ''; // Clear existing list
        if (currentPlayers.length === 0) {
            playerList.innerHTML = '<li class="text-red-400">No players remaining!</li>';
            return;
        }
        currentPlayers.forEach(player => {
            const li = document.createElement('li');
            li.textContent = player;
            playerList.appendChild(li);
        });
    }

    // Function to simulate a match
    function simulateMatch() {
        if (currentPlayers.length < 2) {
            tournamentStatus.textContent = `Tournament Winner: ${currentPlayers[0] || 'No one (error)'}! Congratulations!`;
            startMatchButton.classList.add('hidden');
            resetTournamentButton.classList.remove('hidden');
            matchResults.textContent = ''; // Clear last match result
            tournamentInProgress = false;
            return;
        }

        if (!tournamentInProgress) {
            tournamentInProgress = true;
            tournamentStatus.textContent = `Round ${round}: Starting Tournament!`;
        } else {
            tournamentStatus.textContent = `Round ${round}: Match ${matchNumber}`;
        }


        const player1Index = Math.floor(Math.random() * currentPlayers.length);
        const player1 = currentPlayers.splice(player1Index, 1)[0]; // Remove player1

        const player2Index = Math.floor(Math.random() * currentPlayers.length);
        const player2 = currentPlayers.splice(player2Index, 1)[0]; // Remove player2

        const winner = Math.random() < 0.5 ? player1 : player2;
        winners.push(winner);

        matchResults.textContent = `${player1} vs ${player2} -> Winner: ${winner}`;

        // Prepare for next match/round
        if (currentPlayers.length === 0) { // All matches for current round are done
            currentPlayers = [...winners]; // Winners become players for next round
            winners = []; // Reset winners list
            round++;
            matchNumber = 1;
            if (currentPlayers.length === 1) {
                // Final winner determined
                tournamentStatus.textContent = `Tournament Winner: ${currentPlayers[0]}! Congratulations!`;
                startMatchButton.classList.add('hidden');
                resetTournamentButton.classList.remove('hidden');
                matchResults.textContent = `The champion is ${currentPlayers[0]}!`;
                tournamentInProgress = false;
            } else {
                tournamentStatus.textContent = `Round ${round}: Next Round Begins!`;
                setTimeout(displayPlayers, 500); // Update player list for next round
            }
        } else {
            matchNumber++;
            setTimeout(displayPlayers, 500); // Update player list after a match
        }
    }

    // Function to reset the tournament
    function resetTournament() {
        players = ["Player A", "Player B", "Player C", "Player D",
                   "Player E", "Player F", "Player G", "Player H"];
        currentPlayers = [...players];
        round = 1;
        matchNumber = 1;
        winners = [];
        tournamentInProgress = false;
        tournamentStatus.textContent = "Tournament not started.";
        matchResults.textContent = '';
        startMatchButton.classList.remove('hidden');
        resetTournamentButton.classList.add('hidden');
        displayPlayers();
    }


    // Event listener for the park bench button
    parkBenchButton.addEventListener('click', () => {
        // 1. Start spinning out the main content
        mainContentWrapper.classList.add('animate-spin-out');

        // 2. After animation, hide main content and show tournament section
        setTimeout(() => {
            mainContentWrapper.style.display = 'none';
            tournamentSection.style.display = 'flex'; // Show the tournament section
            tournamentSection.classList.add('animate-spin-in'); // Spin in the tournament section

            // Initialize tournament display
            displayPlayers();
        }, 1200); // Match this timeout to the animation duration (1.2s)
    });

    // Event listener for the "Simulate Next Match" button
    startMatchButton.addEventListener('click', simulateMatch);

    // Event listener for the "Reset Tournament" button
    resetTournamentButton.addEventListener('click', resetTournament);
});
