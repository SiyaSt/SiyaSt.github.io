let isFrontVisible = false; // Track the current state of the card

document.querySelector('.generate').addEventListener('click', () => {
    const frontCard = document.getElementById('frontCard');
    const backCard = document.getElementById('backCard');

    if (!isFrontVisible) {
        // Flip from back to front
        anime({
            targets: backCard,
            rotateY: { value: 90, duration: 500, easing: 'easeInOutQuad' },
            complete: () => {
                backCard.classList.add('hidden'); // Hide the back card
                frontCard.classList.remove('hidden'); // Show the front card
                frontCard.style.transform = 'rotateY(90deg)'; // Set initial transform for front card

                anime({
                    targets: frontCard,
                    rotateY: { value: 0, duration: 500, easing: 'easeInOutQuad' }
                });
            }
        });
    } else {
        // Flip from front back to back
        anime({
            targets: frontCard,
            rotateY: { value: 90, duration: 500, easing: 'easeInOutQuad' },
            complete: () => {
                frontCard.classList.add('hidden'); // Hide the front card
                backCard.classList.remove('hidden'); // Show the back card
                backCard.style.transform = 'rotateY(90deg)'; // Set initial transform for back card

                anime({
                    targets: backCard,
                    rotateY: { value: 0, duration: 500, easing: 'easeInOutQuad' }
                });
            }
        });
    }

    isFrontVisible = !isFrontVisible; // Toggle the state
});
