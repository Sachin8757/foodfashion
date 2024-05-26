  document.addEventListener('DOMContentLoaded', function () {
    const eggpokoraInput = document.getElementById('egpo');
    const aalosamosaInput = document.getElementById('aalo');
    const pokoraInput = document.getElementById('pokora');
    const boilInput = document.getElementById('boil');
    const kachaeggInput = document.getElementById('kacha');
    const eggfryInput = document.getElementById('eggfry');
    const EggomeleteeInput = document.getElementById('eggome');
    const eggcochInput = document.getElementById('eggcoch');
    const breadInput = document.getElementById('bred');

    const priceDisplay = document.getElementById('price-display');

    // Function to calculate and display price
    function updatePrice() {
      const eggpokoraQuantity = (eggpokoraInput.value) || 0;
      const aalosamosaQuantity = (aalosamosaInput.value)|| 0;
      const pokoraQuantity = (pokoraInput.value)||0;
      const boilQuantity = (boilInput.value)||0;
      const kachaeggQuantity = (kachaeggInput.value)||0;
      const eggfryQuantity = (eggfryInput.value)||0;
      const EggomeleteeQuantity = (EggomeleteeInput.value)||0;
      const eggcochQuantity = (eggcochInput.value)||0;
      const breadQuantity = (breadInput.value)||0;

      const totalPrice = (eggpokoraQuantity * 5) + (aalosamosaQuantity * 2.5) + (boilQuantity * 8) + (pokoraQuantity * 1) + (kachaeggQuantity * 6) + (eggfryQuantity * 10) + (EggomeleteeQuantity * 10) + (eggcochQuantity * 10) + (breadQuantity * 5); 

      priceDisplay.textContent = `${totalPrice}`;
    }

    // Add event listeners to update price when quantity changes
    eggpokoraInput.addEventListener('input', updatePrice);
    aalosamosaInput.addEventListener('input', updatePrice);
    pokoraInput.addEventListener('input', updatePrice);
    boilInput.addEventListener('input', updatePrice);
    kachaeggInput.addEventListener('input', updatePrice);
    eggfryInput.addEventListener('input', updatePrice);
    EggomeleteeInput.addEventListener('input', updatePrice);
    eggcochInput.addEventListener('input', updatePrice);
    breadInput.addEventListener('input', updatePrice);

    // Initial update when page loads
    updatePrice();
  });
