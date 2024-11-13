const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const carouselItems = document.querySelectorAll('.carousel-item');
    const total = carouselItems.length;
    let current = 0;
  
    // Set the first item as active
    carouselItems[current].classList.add('active');
  
    // Get the move buttons
    const moveRightButton = document.getElementById('moveRight');
    const moveLeftButton = document.getElementById('moveLeft');
  
    // Move right on next button click
    moveRightButton.addEventListener('click', function() {
      const next = (current + 1) % total; // Loop back to the first slide if we're at the last one
      setSlide(current, next);
      current = next;
    });
  
    // Move left on previous button click
    moveLeftButton.addEventListener('click', function() {
      const prev = (current - 1 + total) % total; // Loop back to the last slide if we're at the first one
      setSlide(current, prev);
      current = prev;
    });
  
    // Function to handle slide switching
    function setSlide(prev, next) {
      // Remove 'active' class from the previous item
      carouselItems[prev].classList.remove('active');
      
      // Add 'active' class to the next item
      carouselItems[next].classList.add('active');
      
      // Log the current slide index for debugging
      console.log('current: ' + current);
      console.log('prev: ' + prev);
      console.log('next: ' + next);
    }
  });
  